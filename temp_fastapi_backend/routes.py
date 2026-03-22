from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from database import get_db
from models import User, Course, CourseModule, CourseWidget, Resume

router = APIRouter()

# --- Pydantic Schemas ---
class CourseCreate(BaseModel):
    title: str
    user_id: int

class CourseModuleCreate(BaseModel):
    title: str
    position: int = 0

class CourseWidgetCreate(BaseModel):
    widget_type: str
    payload: Dict[Any, Any]
    position: int = 0

class WidgetResponse(BaseModel):
    id: int
    widget_type: str
    payload: Dict[Any, Any]
    position: int

class ModuleResponse(BaseModel):
    id: int
    title: str
    position: int
    widgets: List[WidgetResponse] = []

class CourseResponse(BaseModel):
    id: int
    title: str
    modules: List[ModuleResponse] = []


# --- API Endpoints ---

@router.post("/courses", response_model=CourseResponse)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(title=course.title, user_id=course.user_id)
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.get("/courses/{course_id}/curriculum", response_model=CourseResponse)
def get_course_curriculum(course_id: int, db: Session = Depends(get_db)):
    """
    Fetches the ENTIRE nested tree: Course -> Modules -> Widgets.
    This routes powers the whole InterviewPrepPage.tsx CMS.
    """
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    return course

@router.post("/courses/{course_id}/modules", response_model=ModuleResponse)
def add_module_to_course(course_id: int, module: CourseModuleCreate, db: Session = Depends(get_db)):
    db_module = CourseModule(course_id=course_id, title=module.title, position=module.position)
    db.add(db_module)
    db.commit()
    db.refresh(db_module)
    return db_module

@router.post("/modules/{module_id}/widgets", response_model=WidgetResponse)
def add_widget_to_module(module_id: int, widget: CourseWidgetCreate, db: Session = Depends(get_db)):
    db_widget = CourseWidget(
        module_id=module_id, 
        widget_type=widget.widget_type, 
        payload=widget.payload, 
        position=widget.position
    )
    db.add(db_widget)
    db.commit()
    db.refresh(db_widget)
    return db_widget

@router.get("/resumes")
def get_all_resumes(db: Session = Depends(get_db)):
    resumes = db.query(Resume).order_by(Resume.id.desc()).all()
    # SQLAlchemy JSONB natively translates to python dicts and then to FastAPI JSON responses
    return resumes

@router.post("/resumes")
def save_resume(resume_in: dict, db: Session = Depends(get_db)):
    """Receives the gigantic JSON payload from React and binds it to PostgreSQL"""
    
    # Grab or create default user since we disabled authentication placeholders
    active_user = db.query(User).first()
    if not active_user:
        active_user = User(email="nishant.ceo@skillom.ai", name="Nishant")
        db.add(active_user)
        db.flush() # get ID without committing 
        
    payload = resume_in.get("payload", {})
    title = resume_in.get("title", "Nishant Primary Resume")
    
    # We will just overwrite the first one or create new to simulate a master save hook
    existing_resume = db.query(Resume).filter(Resume.user_id == active_user.id).first()
    
    if existing_resume:
        existing_resume.payload = payload
        existing_resume.title = title
    else:
        existing_resume = Resume(user_id=active_user.id, title=title, payload=payload)
        db.add(existing_resume)
        
    db.commit()
    db.refresh(existing_resume)
    
    return {"status": "success", "resume_id": existing_resume.id}
