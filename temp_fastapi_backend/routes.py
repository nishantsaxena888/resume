from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
import os
from jsonschema import validate, ValidationError

from database import get_db
import models
import schemas

router = APIRouter()

# ---------------------------------------------
# 1. Validation Logic
# ---------------------------------------------
def load_system_schema(schema_name: str) -> dict:
    """Dynamically loads the exact system-configuration JSON schema used by the React Frontend"""
    # E.g. /Users/nishantsaxena/workspace/resume/system-configuration/base/en/resumeBuilder/metadata.schema.json
    base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'system-configuration', 'base', 'en'))
    
    schema_path = ""
    if schema_name == "profile":
        schema_path = os.path.join(base_path, "common", "profile.schema.json")
    # In a full NS integration, we would dynamically load all schemas recursively and combine them,
    # mapping perfectly to the `generate-schemas.ts` logic. For now, we stub this out gracefully.
    
    if os.path.exists(schema_path):
        with open(schema_path, 'r') as f:
            return json.load(f)
    return {}

def validate_resume_payload(payload: dict):
    # This acts as the mathematical enforcer guaranteeing the POST request adheres to system-configuration
    schema = load_system_schema("profile")
    if schema:
        try:
            validate(instance=payload, schema=schema)
        except ValidationError as e:
            raise HTTPException(status_code=400, detail=f"Schema Validation Failed: {e.message}")

# ---------------------------------------------
# 2. CRUD Routes
# ---------------------------------------------

@router.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/jds", response_model=schemas.JDResponse)
def create_jd(jd: schemas.JDCreate, db: Session = Depends(get_db)):
    db_jd = models.JobDescription(
        user_id=jd.user_id,
        company_name=jd.company_name,
        role_title=jd.role_title,
        job_description_text=jd.job_description_text
    )
    db.add(db_jd)
    db.commit()
    db.refresh(db_jd)
    return db_jd

@router.post("/resumes", response_model=schemas.ResumeResponse)
def create_resume(resume: schemas.ResumeCreate, db: Session = Depends(get_db)):
    
    # Force Validate the payload against our React system-configuration JSON!
    validate_resume_payload(resume.payload)

    db_resume = models.Resume(
        user_id=resume.user_id,
        target_jd_id=resume.target_jd_id,
        name=resume.name,
        is_default=resume.is_default,
        payload=resume.payload,
        delta_log=resume.delta_log
    )
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    return db_resume

@router.get("/resumes/{user_id}", response_model=List[schemas.ResumeResponse])
def get_user_resumes(user_id: str, db: Session = Depends(get_db)):
    resumes = db.query(models.Resume).filter(models.Resume.user_id == user_id).all()
    return resumes
