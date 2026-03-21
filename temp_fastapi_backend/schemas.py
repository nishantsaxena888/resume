from pydantic import BaseModel, EmailStr
from typing import Dict, Any, Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr

class UserResponse(BaseModel):
    id: str
    name: str
    email: str

    class Config:
        orm_mode = True
        from_attributes = True

class JDCreate(BaseModel):
    user_id: str
    company_name: str
    role_title: str
    job_description_text: str

class JDResponse(BaseModel):
    id: str
    company_name: str
    role_title: str
    job_description_text: str

    class Config:
        orm_mode = True
        from_attributes = True

class ResumeCreate(BaseModel):
    user_id: str
    target_jd_id: Optional[str] = None
    name: str # e.g. "Software Engineer - Standard" 
    is_default: str # "True" or "False"
    payload: Dict[str, Any] # This is the giant JSON tree
    delta_log: Optional[Dict[str, Any]] = None # Tracks exactly what changed from the master

class ResumeResponse(BaseModel):
    id: str
    name: str
    is_default: str
    target_jd_id: Optional[str]

    class Config:
        orm_mode = True
        from_attributes = True
