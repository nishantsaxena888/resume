import base64
import hmac
import hashlib
import json
import time
from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel

router = APIRouter()

SECRET_KEY = "nishify_super_secret_for_now"

class LoginRequest(BaseModel):
    username: str
    password: str

def create_jwt(payload: Dict[str, Any], secret: str, expiration_seconds: int = 86400) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    payload["exp"] = int(time.time()) + expiration_seconds
    
    b64_header = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    b64_payload = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")
    
    signature_base = f"{b64_header}.{b64_payload}"
    signature = hmac.new(secret.encode(), signature_base.encode(), hashlib.sha256).digest()
    b64_signature = base64.urlsafe_b64encode(signature).decode().rstrip("=")
    
    return f"{signature_base}.{b64_signature}"

def decode_jwt(token: str, secret: str) -> Optional[Dict[str, Any]]:
    try:
        parts = token.split(".")
        if len(parts) != 3: return None
        header_b64, payload_b64, signature_b64 = parts
        
        signature_base = f"{header_b64}.{payload_b64}"
        expected_signature = hmac.new(secret.encode(), signature_base.encode(), hashlib.sha256).digest()
        expected_b64 = base64.urlsafe_b64encode(expected_signature).decode().rstrip("=")
        
        if not hmac.compare_digest(signature_b64, expected_b64):
            return None
            
        payload_pad = payload_b64 + "=" * ((4 - len(payload_b64) % 4) % 4)
        payload = json.loads(base64.urlsafe_b64decode(payload_pad).decode())
        
        if payload.get("exp", 0) < int(time.time()):
            return None # Expired
            
        return payload
    except Exception:
        return None

@router.post("/login", summary="Login Superadmin or Client User")
async def login(req: LoginRequest, x_nishify_client: str = Header(default="superadmin")):
    """
    If x_nishify_client is 'superadmin', auth against the global SuperAdmin configuration.
    Otherwise, auth against the specific client's User table and resolve UserGroup permissions.
    """
    from .entity import _get_router_for_client
    from nishify.core.sources.base import Query as SourceQuery
    
    # Simple fallback for first-time bootstrapping (before SuperAdmin table is populated)
    import os
    super_user = os.getenv("SUPERADMIN_USER", "admin")
    super_pass = os.getenv("SUPERADMIN_PASSWORD", "studio_admin_token_2026_xyz")
    
    if x_nishify_client == "superadmin" and req.username == super_user and req.password == super_pass:
        token = create_jwt({"sub": "super_bootstrapper", "role": "superadmin"}, SECRET_KEY)
        return {"access_token": token, "token_type": "bearer"}
    
    try:
        source_router = _get_router_for_client(x_nishify_client)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid client environment")
        
    if x_nishify_client == "superadmin":
        # Check against superadmin entity
        try:
            result = source_router.list(user_id="system", entity="superadmin", query=SourceQuery())
            items = getattr(result, "items", []) if hasattr(result, "items") else result
        except Exception:
            items = []
        
        user = next((u for u in items if u.get("username") == req.username), None)
        if not user or user.get("password_hash") != req.password:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        token = create_jwt({"sub": user["id"], "role": "superadmin"}, SECRET_KEY)
        return {"access_token": token, "token_type": "bearer"}
    else:
        # Client auth against User table
        try:
            user_result = source_router.list(user_id="system", entity="user", query=SourceQuery())
            items = getattr(user_result, "items", []) if hasattr(user_result, "items") else user_result
            user = next((u for u in items if u.get("username") == req.username), None)
        except Exception:
            raise HTTPException(status_code=401, detail="Client user authentication not configured")
            
        if not user or user.get("password_hash") != req.password:
            raise HTTPException(status_code=401, detail="Invalid credentials")
            
        # Resolve UserGroup permissions via Self-Join structure
        group_id = user.get("group_id")
        permissions = "{}"
        if group_id:
            try:
                group = source_router.get(user_id="system", entity="user_group", doc_id=group_id)
                permissions = group.get("permissions", "{}")
            except Exception:
                pass
                
        token = create_jwt({
            "sub": user["id"], 
            "role": "client_user", 
            "client": x_nishify_client,
            "permissions": permissions
        }, SECRET_KEY)
        
        return {"access_token": token, "token_type": "bearer"}
