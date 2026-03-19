"""Unified FastAPI router for all entity mutations.

Instead of writing custom routers for each table, this single set of endpoints handles 
EVERY entity in the system. It delegates directly to the abstract `SourceRouter`, which
determines whether the data should go to Postgres, Amazon, Elastic, etc., based on 
the configuration files. Also triggers async Elasticsearch write-through indexing.
"""

import os
from fastapi import APIRouter, HTTPException, Request, Query, Header, Depends
from pydantic import BaseModel
from typing import Dict, Any, List, Optional

from nishify.core.sources.base import Query as SourceQuery
from nishify.core.runtime.event_bus import publish

router = APIRouter()

async def verify_auth_token(
    authorization: Optional[str] = Header(None),
    x_nishify_token: Optional[str] = Header(None, alias="x-nishify-token")
) -> dict:
    from .auth import decode_jwt, SECRET_KEY
    
    token = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split("Bearer ")[1]
    elif x_nishify_token:
        token = x_nishify_token
    elif authorization:
        token = authorization
        
    if not token:
        raise HTTPException(status_code=401, detail="Missing authentication token")
        
    if token and token == os.getenv("SUPERADMIN_PASSWORD", "studio_admin_token_2026_xyz"):
        return {"sub": "system", "role": "superadmin"}
        
    payload = decode_jwt(token, SECRET_KEY)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
        
    return payload

def enforce_permissions(user: dict, entity_name: str, required_action: str):
    if user.get("role") == "superadmin":
        return
        
    perms_str = user.get("permissions", "{}")
    try:
        import json
        perms = json.loads(perms_str)
    except Exception:
        perms = {}
        
    entity_perms = perms.get(entity_name, [])
    if required_action not in entity_perms:
        raise HTTPException(status_code=403, detail=f"Permission denied: Requires '{required_action}' on '{entity_name}'")

class EntityMutate(BaseModel):
    id: Optional[str] = None
    data: Dict[str, Any]

# Endpoints

@router.get("/admin/schemas/{client_name}", summary="Get the raw schema configuration for a client")
async def get_raw_schema(client_name: str, token: str = Query(None)):
    if token != os.getenv("SUPERADMIN_PASSWORD", "studio_admin_token_2026_xyz"):
        raise HTTPException(status_code=403, detail="Invalid superadmin token")
    
    if client_name == "pioneer":
        import importlib
        import nishify.clients.pioneer.entities
        importlib.reload(nishify.clients.pioneer.entities)
        return nishify.clients.pioneer.entities.ENTITIES
    return {}

@router.post("/admin/schemas/{client_name}", summary="Update the raw schema configuration for a client")
async def update_raw_schema(client_name: str, payload: Dict[str, Any], token: str = Query(None)):
    if token != os.getenv("SUPERADMIN_PASSWORD", "studio_admin_token_2026_xyz"):
        raise HTTPException(status_code=403, detail="Invalid superadmin token")
    
    if client_name == "pioneer":
        import pprint
        import os
        
        file_path = os.path.join(os.getcwd(), f"nishify/clients/{client_name}/entities.py")
        formatted = pprint.pformat(payload, indent=4, sort_dicts=False)
        
        with open(file_path, "w") as f:
            f.write(f"# nishify/clients/{client_name}/entities.py\n\nENTITIES = {formatted}\n")
            
        import importlib
        import nishify.clients.pioneer.entities
        importlib.reload(nishify.clients.pioneer.entities)
        
        source_router.entities = getattr(nishify.clients.pioneer.entities, 'ENTITIES', {})
        
        return {"status": "success", "message": f"Successfully updated and hot-reloaded schema for {client_name}"}
    return {"status": "error", "message": "Client not found"}

@router.get("/admin/source-config/{client_name}", summary="Get the database source/mapping configuration")
async def get_source_config(client_name: str, token: str = Query(None)):
    if token != os.getenv("SUPERADMIN_PASSWORD", "studio_admin_token_2026_xyz"):
        raise HTTPException(status_code=403, detail="Invalid superadmin token")
    
    from .bootstrapper import GLOBAL_SCHEMA_CACHE
    client_data = GLOBAL_SCHEMA_CACHE.get(client_name)
    if not client_data:
        raise HTTPException(status_code=404, detail="Client not found")
        
    entities = client_data.get("entities", {})
    
    # Reconstruct a safe visual representation of source vs fields
    schema_map = {}
    for entity_id, entity_def in entities.items():
        # Expose only the fields structure and source type
        fields_safe = {}
        for f_id, f_def in entity_def.get("fields", {}).items():
            fields_safe[f_id] = {
                "type": f_def.get("type"),
                "required": f_def.get("required", False)
            }
            
        schema_map[entity_id] = {
            "source": entity_def.get("source", "relational"),
            "table_name": entity_id,
            "fields": fields_safe
        }
        
    credentials = client_data.get("credentials", {})
    
    return {
        "client": client_name,
        "database": {
            "type": "postgres",
            "name": credentials.get("db_name", client_name),
            "host": credentials.get("db_host", "postgres:5432"),
            "user": credentials.get("db_user", "nishify"),
            "pass": credentials.get("db_pass", "****")
        },
        "search": {
            "type": "elasticsearch",
            "host": credentials.get("es_host", "elasticsearch:9200")
        },
        "entities": schema_map
    }

@router.get("/admin/source-config-all/{client_name}", summary="Get configuration for all environments (Dev/Test/Stage/Prod)")
async def get_source_config_all(client_name: str, token: str = Query(None)):
    if token != os.getenv("SUPERADMIN_PASSWORD", "studio_admin_token_2026_xyz"):
        raise HTTPException(status_code=403, detail="Invalid superadmin token")
    
    from .bootstrapper import GLOBAL_SCHEMA_CACHE
    
    # Extract the base client name (strip any existing suffix just in case)
    base_client = client_name
    for suffix in ["_dev", "_test", "_stage", "_prod"]:
        if client_name.endswith(suffix):
            base_client = client_name[:-len(suffix)]
            break
            
    environments = ["dev", "test", "stage", "prod"]
    result_map = {}
    
    for env in environments:
        env_client_name = f"{base_client}_{env}"
        client_data = GLOBAL_SCHEMA_CACHE.get(env_client_name)
        
        if not client_data:
            result_map[env] = {"status": "Not Configured"}
            continue
            
        credentials = client_data.get("credentials", {})
        
        result_map[env] = {
            "status": "Active",
            "database": {
                "type": "postgres",
                "name": credentials.get("db_name", env_client_name),
                "host": credentials.get("db_host", "postgres:5432"),
                "user": credentials.get("db_user", "nishify"),
                "pass": credentials.get("db_pass", "****")
            }
        }
        
    return {
        "client": base_client,
        "environments": result_map
    }

def _get_router_for_client(client_name: str):
    from .bootstrapper import GLOBAL_SCHEMA_CACHE
    from nishify.core.sources.router import SourceRouter
    from .state import _default_source
    
    # Defaults to pioneer_dev if client not found to prevent system crashes
    client_data = GLOBAL_SCHEMA_CACHE.get(client_name, GLOBAL_SCHEMA_CACHE.get("pioneer_dev", {}))
    entities = client_data.get("entities", {})
    return SourceRouter(default_source=_default_source, entity_map=entities)

@router.get("/{entity_name}/options", summary="Get the schema definition for this entity")
async def get_options(entity_name: str, x_nishify_client: str = Header(default="pioneer_dev"), user: dict = Depends(verify_auth_token)):
    enforce_permissions(user, entity_name, "R")
    try:
        router = _get_router_for_client(x_nishify_client)
        options = router.options(entity_name)
        return options
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{entity_name}", summary="List or query an entity collection")
async def list_entities(
    entity_name: str,
    page: int = 1,
    size: int = 20,
    q: Optional[str] = None,
    x_nishify_client: str = Header(default="pioneer_dev"),
    user: dict = Depends(verify_auth_token)
):
    """
    Highly scalable unified GET /list Endpoint. Automatically enforces roles.
    """
    enforce_permissions(user, entity_name, "R")
    query = SourceQuery(page=page, size=size, q=q)
    
    try:
        router = _get_router_for_client(x_nishify_client)
        result = router.list(user_id=user.get("sub", "system"), entity=entity_name, query=query)
        return {"items": result.items, "total": result.total, "page": result.page, "size": result.size}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{entity_name}/{doc_id}", summary="Get a single entity document")
async def get_entity(entity_name: str, doc_id: str, x_nishify_client: str = Header(default="pioneer_dev"), user: dict = Depends(verify_auth_token)):
    enforce_permissions(user, entity_name, "R")
    try:
        router = _get_router_for_client(x_nishify_client)
        data = router.get(user_id=user.get("sub", "system"), entity=entity_name, doc_id=doc_id)
        return data
    except KeyError:
        raise HTTPException(status_code=404, detail="Entity not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{entity_name}", summary="Create a new entity record")
async def create_entity(entity_name: str, payload: EntityMutate, x_nishify_client: str = Header(default="pioneer_dev"), user: dict = Depends(verify_auth_token)):
    enforce_permissions(user, entity_name, "C")
    # Validation checks
    if not payload.id and not payload.data.get("id"):
        raise HTTPException(status_code=400, detail="Must provide an explicitly generated 'id'")
        
    actual_id = payload.id or payload.data.get("id")
    payload.data["id"] = actual_id
    
    try:
        router = _get_router_for_client(x_nishify_client)
        result = router.create(user_id=user.get("sub", "system"), entity=entity_name, data=payload.data)
        
        # Publish write-through indexing event
        publish({
            "type": "entity_updated",
            "entity_name": entity_name,
            "doc_id": actual_id,
            "operation": "upsert",
            "payload": payload.data,
            "search_config": {},
        })
        
        return {"status": "created", "doc_id": actual_id, "data": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{entity_name}/{doc_id}", summary="Update an existing entity record")
async def update_entity(entity_name: str, doc_id: str, payload: EntityMutate, x_nishify_client: str = Header(default="pioneer_dev"), user: dict = Depends(verify_auth_token)):
    enforce_permissions(user, entity_name, "U")
    try:
        router = _get_router_for_client(x_nishify_client)
        result = router.update(user_id=user.get("sub", "system"), entity=entity_name, doc_id=doc_id, data=payload.data)
        
        publish({
            "type": "entity_updated",
            "entity_name": entity_name,
            "doc_id": doc_id,
            "operation": "upsert",
            "payload": payload.data,
            "search_config": {},
        })
        return {"status": "updated", "doc_id": doc_id, "data": result}
    except KeyError:
        raise HTTPException(status_code=404, detail="Entity not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{entity_name}/{doc_id}", summary="Delete an entity document")
async def delete_entity(entity_name: str, doc_id: str, x_nishify_client: str = Header(default="pioneer_dev"), user: dict = Depends(verify_auth_token)):
    enforce_permissions(user, entity_name, "D")
    try:
        router = _get_router_for_client(x_nishify_client)
        router.delete(user_id=user.get("sub", "system"), entity=entity_name, doc_id=doc_id)
        
        publish({
            "type": "entity_updated",
            "entity_name": entity_name,
            "doc_id": doc_id,
            "operation": "delete",
            "payload": {},
            "search_config": {},
        })
        return {"status": "deleted", "doc_id": doc_id}
    except KeyError:
        raise HTTPException(status_code=404, detail="Entity not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

