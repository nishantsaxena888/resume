import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Preparation, Course, CourseModule, CourseWidget

load_dotenv(".env")
db_url = os.getenv("DATABASE_URL")
if db_url and db_url.startswith("postgres://"): 
    db_url = db_url.replace("postgres://", "postgresql://", 1)

if not db_url:
    db_url = "sqlite:///./interview_prep.db"

engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

try:
    prep = db.query(Preparation).first()

    # Create the core Lightspeed Course natively
    c_target = Course(title="Lightspeed", user_id=prep.user_id)
    db.add(c_target)
    db.commit()
    db.refresh(c_target)
    
    # Tie course to preparation
    prep.courses.append(c_target)
    db.commit()

    # Add Module
    mod = CourseModule(course_id=c_target.id, title="Module 1: Introduction", position=0)
    db.add(mod)
    db.commit()
    db.refresh(mod)
    
    # Add Widget for YouTube video
    w = CourseWidget(
        module_id=mod.id,
        widget_type="youtube",
        position=0,
        payload={
            "title": "Lightspeed Training Video",
            "url": "https://www.youtube.com/watch?v=wOua5P3T_vE"
        }
    )
    db.add(w)
    db.commit()

    print(f"SUCCESS: Synthesized the complete Lightspeed Course with the YouTube video into the Database!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
