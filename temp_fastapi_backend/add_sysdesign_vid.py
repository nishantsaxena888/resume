import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Preparation, Course, CourseModule, CourseWidget

load_dotenv(".env")
db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"): 
    db_url = db_url.replace("postgres://", "postgresql://", 1)

engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

try:
    prep = db.query(Preparation).filter(Preparation.id == "prep-e8f34509").first()
    if not prep:
        prep = db.query(Preparation).first()

    # Find the existing System Design course
    c_sys = db.query(Course).filter(Course.title.ilike('%System Design%')).first()
    
    # If not found, intelligently scaffold a new System Design course root
    if not c_sys:
        from sqlalchemy import func
        max_course_id = db.query(func.max(Course.id)).scalar() or 0
        c_sys = Course(id=max_course_id + 1, user_id=prep.user_id, title="System Design")
        db.add(c_sys)
        db.commit()
        db.refresh(c_sys)
        prep.courses.append(c_sys)
        db.commit()
        print(f"Created new System Design Course (ID: {c_sys.id})")
    else:
        print(f"Target Course Found natively: {c_sys.title} (ID: {c_sys.id})")

    from sqlalchemy import func
    max_module_id = db.query(func.max(CourseModule.id)).scalar() or 0
    
    # Append the New Module natively underneath the System Design Course
    mod_sys = CourseModule(id=max_module_id + 1, course_id=c_sys.id, title="High-Level Architecture & Scaling")
    db.add(mod_sys)
    db.commit()
    db.refresh(mod_sys)

    max_widget_id = db.query(func.max(CourseWidget.id)).scalar() or 0

    # Create the Widget with FULL YOUTUBE URL
    w_sys = CourseWidget(
        id=max_widget_id + 1,
        module_id=mod_sys.id,
        widget_type="youtube",
        payload={
            "title": "System Design Masterclass",
            "url": "https://www.youtube.com/watch?v=ZJJHm_bd9Zo"
        }
    )
    db.add(w_sys)
    db.commit()

    print(f"SUCCESS: Bound the new System Design Tutorial (Widget ID: {w_sys.id}) into the {c_sys.title} pipeline!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
