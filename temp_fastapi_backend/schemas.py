from pydantic import BaseModel, EmailStr
from typing import Dict, Any, Optional, List
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
    payload: Dict[str, Any] # Mirrors the jd.schema.json layout

class JDResponse(BaseModel):
    id: int
    payload: Optional[Dict[str, Any]] = None

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
    id: int
    title: str
    payload: Optional[Dict[str, Any]] = None

    class Config:
        orm_mode = True
        from_attributes = True

class WidgetResponse(BaseModel):
    id: int
    widget_type: str
    payload: Dict[str, Any]
    position: int

    class Config:
        orm_mode = True
        from_attributes = True

class ModuleResponse(BaseModel):
    id: int
    title: str
    position: int
    widgets: List[WidgetResponse] = []

    class Config:
        orm_mode = True
        from_attributes = True

class CourseResponse(BaseModel):
    id: int
    title: str
    position: int = 0
    modules: List[ModuleResponse] = []
    
    class Config:
        orm_mode = True
        from_attributes = True

class CourseReorder(BaseModel):
    course_ordered_ids: List[int]

# --- Preparation Omni-OS Schemas ---

class PreparationNoteBase(BaseModel):
    content: str
    
class PreparationNoteCreate(PreparationNoteBase):
    pass

class PreparationNoteResponse(PreparationNoteBase):
    id: int
    last_updated: Any
    
    class Config:
        orm_mode = True
        from_attributes = True

class PreparationCreate(BaseModel):
    title: str
    subtitle: Optional[str] = None
    icon: Optional[str] = "BriefcaseBusiness"
    resume_ids: List[int] = []
    jd_ids: List[int] = []
    course_ids: List[int] = []
    links: List[Dict[str, str]] = []

class PreparationResponse(BaseModel):
    id: str
    title: str
    subtitle: Optional[str] = None
    icon: str
    status: str
    progress: int
    links: List[Dict[str, str]] = []
    created_at: Any
    
    notes: Optional[PreparationNoteResponse] = None
    resumes: List[ResumeResponse] = []
    jds: List[JDResponse] = []
    courses: List[CourseResponse] = []

    class Config:
        orm_mode = True
        from_attributes = True
