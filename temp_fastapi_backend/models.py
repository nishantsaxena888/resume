from sqlalchemy import Column, String, Text, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    resumes = relationship("Resume", back_populates="user", cascade="all, delete-orphan")
    jds = relationship("JobDescription", back_populates="user", cascade="all, delete-orphan")

class JobDescription(Base):
    """Stores the specific JDs you are targeting for the interview"""
    __tablename__ = "job_descriptions"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    company_name = Column(String, nullable=False)
    role_title = Column(String, nullable=False)
    job_description_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="jds")
    targeted_resumes = relationship("Resume", back_populates="targeted_jd")

class Resume(Base):
    """Stores a specific resume configuration"""
    __tablename__ = "resumes"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    target_jd_id = Column(String, ForeignKey("job_descriptions.id"), nullable=True) # Optional: if this resume is tailored
    
    name = Column(String, nullable=False) # e.g., "Software Engineer - Default" or "Apple Frontend Tailored"
    is_default = Column(Column(String)) # Is this the master baseline resume?
    
    # The actual massive JSON payload (follows system-configuration schemas)
    payload = Column(JSON, nullable=False)
    
    # Delta Tracking: If this is a JD-tailored resume, what exactly changed from the default?
    delta_log = Column(JSON, nullable=True) 

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="resumes")
    targeted_jd = relationship("JobDescription", back_populates="targeted_resumes")
