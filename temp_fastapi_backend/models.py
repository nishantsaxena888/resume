from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# Many-to-Many Association Table linking a Preparation to Courses
prep_course_association = Table(
    'prep_course_link',
    Base.metadata,
    Column('preparation_id', String, ForeignKey('preparations.id', ondelete="CASCADE"), primary_key=True),
    Column('course_id', Integer, ForeignKey('courses.id', ondelete="CASCADE"), primary_key=True)
)

# Many-to-Many Association Table linking a Preparation to Resumes
prep_resume_association = Table(
    'prep_resume_link',
    Base.metadata,
    Column('preparation_id', String, ForeignKey('preparations.id', ondelete="CASCADE"), primary_key=True),
    Column('resume_id', Integer, ForeignKey('resumes.id', ondelete="CASCADE"), primary_key=True)
)

# Many-to-Many Association Table linking a Preparation to JDs
prep_jd_association = Table(
    'prep_jd_link',
    Base.metadata,
    Column('preparation_id', String, ForeignKey('preparations.id', ondelete="CASCADE"), primary_key=True),
    Column('jd_id', Integer, ForeignKey('job_descriptions.id', ondelete="CASCADE"), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String)
    
    courses = relationship("Course", back_populates="user", cascade="all, delete-orphan")
    job_descriptions = relationship("JobDescription", back_populates="user", cascade="all, delete-orphan")
    resumes = relationship("Resume", back_populates="user", cascade="all, delete-orphan")

class JobDescription(Base):
    __tablename__ = "job_descriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    payload = Column(JSON) # The JD Schema JSON containing company, role, skills, etc.
    
    user = relationship("User", back_populates="job_descriptions")
    preparations = relationship("Preparation", secondary=prep_jd_association, back_populates="jds")

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, default="Default Configuration")
    payload = Column(JSON) # The Resume schema JSON

    user = relationship("User", back_populates="resumes")
    preparations = relationship("Preparation", secondary=prep_resume_association, back_populates="resumes")
# ==========================================
# THE PREPARATION ENGINE (SKILLOM PLATFORM)
# ==========================================

class Preparation(Base):
    """The Absolute Root Node. A Study Space containing Courses, Notes, and Optional Targets."""
    __tablename__ = "preparations"
    id = Column(String, primary_key=True, index=True) # UUID string e.g. "prep-1"
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False) # e.g. "AWS Principal Architect"
    subtitle = Column(String(250), nullable=True)
    icon = Column(String(50), default="BriefcaseBusiness")
    status = Column(String, default="Active")
    progress = Column(Integer, default=0)
    links = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", backref="preparations")
    resumes = relationship("Resume", secondary=prep_resume_association, back_populates="preparations")
    jds = relationship("JobDescription", secondary=prep_jd_association, back_populates="preparations")
    
    # Content
    courses = relationship("Course", secondary=prep_course_association, back_populates="preparations", order_by="Course.position")
    notes = relationship("PreparationNote", back_populates="preparation", uselist=False, cascade="all, delete-orphan")

class PreparationNote(Base):
    """The massive extensive knowledge base for the entire Preparation"""
    __tablename__ = "preparation_notes"
    id = Column(Integer, primary_key=True, index=True)
    preparation_id = Column(String, ForeignKey("preparations.id", ondelete="CASCADE"), unique=True)
    content = Column(Text, default="") # Rich HTML/Markdown payload
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    preparation = relationship("Preparation", back_populates="notes")

class Course(Base):
    """A highly reusable learning module. E.g., 'AWS Serverless Mastery'"""
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    position = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="courses")
    modules = relationship("CourseModule", back_populates="course", cascade="all, delete-orphan", order_by="CourseModule.position")
    
    # Linked to preparations
    preparations = relationship("Preparation", secondary=prep_course_association, back_populates="courses")

class CourseModule(Base):
    """Left Nav TOC items. E.g., 'System Design', 'Behavioral Leadership'"""
    __tablename__ = "course_modules"
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    position = Column(Integer, default=0) # Controls TOC sorting
    
    course = relationship("Course", back_populates="modules")
    widgets = relationship("CourseWidget", back_populates="module", cascade="all, delete-orphan", order_by="CourseWidget.position")

class CourseWidget(Base):
    """Right pane study elements. E.g., Flashcards, Notes, Code Snippets"""
    __tablename__ = "course_widgets"
    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(Integer, ForeignKey("course_modules.id", ondelete="CASCADE"))
    widget_type = Column(String, nullable=False) # 'markdown', 'flashcard', 'code'
    position = Column(Integer, default=0)
    
    # Polymorphic payload holding the actual widget study data
    payload = Column(JSON, nullable=False)
    
    module = relationship("CourseModule", back_populates="widgets")


# ==========================================
# ARTIFICIAL INTELLIGENCE CORE
# ==========================================

class AIPrompt(Base):
    """Dynamically injected System Prompts to power different internal AI Personas."""
    __tablename__ = "ai_prompts"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True, nullable=False) # e.g., 'default', 'json-only', 'roast-mode'
    title = Column(String, nullable=False) # e.g., 'Elite Senior Engineer'
    prompt_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

