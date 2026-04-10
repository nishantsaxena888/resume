import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Course, CourseModule, CourseWidget

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
    c_ls = db.query(Course).filter(Course.title == "Lightspeed").first()
    if not c_ls:
        print("Lightspeed course not found!")
        sys.exit(1)
        
    mod = db.query(CourseModule).filter(CourseModule.course_id == c_ls.id).order_by(CourseModule.position.desc()).first()
    if not mod:
        mod = CourseModule(course_id=c_ls.id, title="Module 1: Introduction", position=0)
        db.add(mod)
        db.commit()
        db.refresh(mod)
        
    from sqlalchemy import func
    max_pos = db.query(func.max(CourseWidget.position)).filter(CourseWidget.module_id == mod.id).scalar()
    new_pos = (max_pos + 1) if max_pos is not None else 0

    w = CourseWidget(
        module_id=mod.id,
        widget_type="youtube",
        position=new_pos,
        payload={
            "title": "Lightspeed Training Video Part 2",
            "url": "https://www.youtube.com/watch?v=stGkGU9lWv4"
        }
    )
    db.add(w)
    db.commit()

    print(f"SUCCESS: Appended the second YouTube video to the Lightspeed module!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
