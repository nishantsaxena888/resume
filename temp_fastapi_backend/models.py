from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime

Base = declarative_base()

# Many-to-Many Association Table linking a Course to context-providing JDs
course_jd_association = Table(
    'course_jd_link',
    Base.metadata,
    Column('course_id', Integer, ForeignKey('courses.id', ondelete="CASCADE"), primary_key=True),
    Column('jd_id', Integer, ForeignKey('job_descriptions.id', ondelete="CASCADE"), primary_key=True)
)

# Many-to-Many Association Table linking a Course to contextual Resumes
course_resume_association = Table(
    'course_resume_link',
    Base.metadata,
    Column('course_id', Integer, ForeignKey('courses.id', ondelete="CASCADE"), primary_key=True),
    Column('resume_id', Integer, ForeignKey('resumes.id', ondelete="CASCADE"), primary_key=True)
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
    company = Column(String)
    role = Column(String)
    raw_text = Column(Text)
    
    user = relationship("User", back_populates="job_descriptions")
    courses = relationship("Course", secondary=course_jd_association, back_populates="jds")

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, default="Default Configuration")
    payload = Column(JSONB) # The Resume schema JSON

    user = relationship("User", back_populates="resumes")
    courses = relationship("Course", secondary=course_resume_association, back_populates="resumes")

# ==========================================
# THE PREPARATION ENGINE (SKILLON PLATFORM)
# ==========================================

class Course(Base):
    """The absolute primary entity. E.g., 'Google Staff Interview Prep'"""
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="courses")
    modules = relationship("CourseModule", back_populates="course", cascade="all, delete-orphan", order_by="CourseModule.position")
    
    # Optional Context associations
    jds = relationship("JobDescription", secondary=course_jd_association, back_populates="courses")
    resumes = relationship("Resume", secondary=course_resume_association, back_populates="courses")

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
    payload = Column(JSONB, nullable=False)
    
    module = relationship("CourseModule", back_populates="widgets")
