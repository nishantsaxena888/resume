from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uuid

from database import get_db
from models import User, Course, CourseModule, CourseWidget, Resume, JobDescription, Preparation, PreparationNote
from schemas import (
    PreparationCreate, PreparationResponse, PreparationNoteCreate, PreparationNoteResponse
)

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

    class Config:
        orm_mode = True
        from_attributes = True

# --- API Endpoints ---

# ==========================================
# PREPARATIONS (THE ROOTS)
# ==========================================

@router.get("/preparations", response_model=List[PreparationResponse])
def get_all_preparations(db: Session = Depends(get_db)):
    """Powers the PreparationsDashboardPage.tsx"""
    preps = db.query(Preparation).order_by(Preparation.created_at.desc()).all()
    return preps

@router.post("/preparations", response_model=PreparationResponse)
def create_preparation(prep_in: PreparationCreate, db: Session = Depends(get_db)):
    """Creates a new Preparation Workspace"""
    active_user = db.query(User).first()
    if not active_user:
        active_user = User(email="nishant.ceo@skillom.ai", name="Nishant")
        db.add(active_user)
        db.flush()

    new_prep = Preparation(
        id=f"prep-{uuid.uuid4().hex[:8]}", # e.g. prep-a1b2c3d4
        user_id=active_user.id,
        title=prep_in.title,
        subtitle=prep_in.subtitle,
        icon=prep_in.icon or "BriefcaseBusiness"
    )
    
    if prep_in.resume_ids:
        resumes_obj = db.query(Resume).filter(Resume.id.in_(prep_in.resume_ids)).all()
        new_prep.resumes.extend(resumes_obj)
        
    if prep_in.jd_ids:
        jds_obj = db.query(JobDescription).filter(JobDescription.id.in_(prep_in.jd_ids)).all()
        new_prep.jds.extend(jds_obj)
        
    if prep_in.course_ids:
        courses_obj = db.query(Course).filter(Course.id.in_(prep_in.course_ids)).all()
        new_prep.courses.extend(courses_obj)
        
    db.add(new_prep)
    db.commit()
    db.refresh(new_prep)
    return new_prep

@router.put("/preparations/{prep_id}", response_model=PreparationResponse)
def update_preparation(prep_id: str, prep_in: PreparationCreate, db: Session = Depends(get_db)):
    """Full architectural PUT update for an existing Preparation workspace"""
    prep = db.query(Preparation).filter(Preparation.id == prep_id).first()
    if not prep:
        raise HTTPException(status_code=404, detail="Preparation not found")
        
    prep.title = prep_in.title
    prep.subtitle = prep_in.subtitle
    if prep_in.icon:
        prep.icon = prep_in.icon
        
    # Re-map associative scopes
    prep.resumes.clear()
    if prep_in.resume_ids:
        resumes_obj = db.query(Resume).filter(Resume.id.in_(prep_in.resume_ids)).all()
        prep.resumes.extend(resumes_obj)
        
    prep.jds.clear()
    if prep_in.jd_ids:
        jds_obj = db.query(JobDescription).filter(JobDescription.id.in_(prep_in.jd_ids)).all()
        prep.jds.extend(jds_obj)
        
    prep.courses.clear()
    if prep_in.course_ids:
        courses_obj = db.query(Course).filter(Course.id.in_(prep_in.course_ids)).all()
        prep.courses.extend(courses_obj)
        
    db.commit()
    db.refresh(prep)
    return prep

@router.delete("/preparations/{prep_id}")
def delete_preparation(prep_id: str, db: Session = Depends(get_db)):
    """Physically purges the target Workspace and cascades removal"""
    prep = db.query(Preparation).filter(Preparation.id == prep_id).first()
    if not prep:
        raise HTTPException(status_code=404, detail="Preparation not found")
        
    db.delete(prep)
    db.commit()
    return {"success": True}

@router.get("/preparations/{prep_id}", response_model=PreparationResponse)
def get_preparation(prep_id: str, db: Session = Depends(get_db)):
    """Fetches the Single Workspace and its nested notes/courses"""
    prep = db.query(Preparation).filter(Preparation.id == prep_id).first()
    if not prep:
        raise HTTPException(status_code=404, detail="Preparation not found")
    return prep

@router.put("/preparations/{prep_id}/notes", response_model=PreparationNoteResponse)
def save_preparation_notes(prep_id: str, note_in: PreparationNoteCreate, db: Session = Depends(get_db)):
    """Auto-saves the rich text content from NotesForPrintPage.tsx"""
    prep = db.query(Preparation).filter(Preparation.id == prep_id).first()
    if not prep:
        raise HTTPException(status_code=404, detail="Preparation not found")
        
    if prep.notes:
        prep.notes.content = note_in.content
    else:
        new_note = PreparationNote(preparation_id=prep_id, content=note_in.content)
        db.add(new_note)
        prep.notes = new_note
        
    db.commit()
    db.refresh(prep.notes)
    return prep.notes

# ==========================================
# COURSES & MODULES
# ==========================================

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
    return resumes

@router.get("/jds")
def get_all_jds(db: Session = Depends(get_db)):
    jds = db.query(JobDescription).order_by(JobDescription.id.desc()).all()
    return jds

@router.get("/courses")
def get_all_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).order_by(Course.id.desc()).all()
    return courses

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
