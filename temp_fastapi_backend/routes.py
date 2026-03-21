from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from database import get_db
from models import User, Course, CourseModule, CourseWidget

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
