import os
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

    print(f"Target Prep Found: {prep.title}")

    # Fix Postgres Sequence collision by explicitly grabbing max ID
    from sqlalchemy import func
    max_course_id = db.query(func.max(Course.id)).scalar() or 0

    # Create the Course
    c_k8s = Course(id=max_course_id + 1, user_id=prep.user_id, title="Kubernetes")
    db.add(c_k8s)
    db.commit()
    db.refresh(c_k8s)

    prep.courses.append(c_k8s)
    db.commit()

    max_module_id = db.query(func.max(CourseModule.id)).scalar() or 0
    
    # Create the Module
    mod_k8s = CourseModule(id=max_module_id + 1, course_id=c_k8s.id, title="Kubernetes Core Architecture")
    db.add(mod_k8s)
    db.commit()
    db.refresh(mod_k8s)

    max_widget_id = db.query(func.max(CourseWidget.id)).scalar() or 0

    # Create the Widget with FULL PLAYLIST URL
    w_k8s = CourseWidget(
        id=max_widget_id + 1,
        module_id=mod_k8s.id,
        widget_type="youtube",
        payload={
            "title": "Kubernetes Masterclass",
            "url": "https://www.youtube.com/watch?v=a-nWPre5QYI"
        }
    )
    db.add(w_k8s)
    db.commit()

    print(f"SUCCESS: Bound Kubernetes Course (ID: {c_k8s.id}) Pipeline into the Database!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
