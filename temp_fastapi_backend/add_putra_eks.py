import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Preparation, Course, CourseModule, CourseWidget, User

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
        print("Preparation not found.")
        exit(1)

    print(f"Target Prep Found: {prep.title}")

    # Fix Postgres Sequence collision by explicitly grabbing max ID
    from sqlalchemy import func
    max_course_id = db.query(func.max(Course.id)).scalar() or 0

    # Create the Course
    c_eks = Course(id=max_course_id + 1, user_id=prep.user_id, title="Amazon EKS Masterclass (Anton Putra)")
    db.add(c_eks)
    db.commit()
    db.refresh(c_eks)

    prep.courses.append(c_eks)
    db.commit()

    max_module_id = db.query(func.max(CourseModule.id)).scalar() or 0
    
    # Create the Module
    mod_eks = CourseModule(id=max_module_id + 1, course_id=c_eks.id, title="EKS Infrastructure (Terraform)")
    db.add(mod_eks)
    db.commit()
    db.refresh(mod_eks)

    max_widget_id = db.query(func.max(CourseWidget.id)).scalar() or 0

    # Create the Widget with FULL PLAYLIST URL
    w_eks = CourseWidget(
        id=max_widget_id + 1,
        module_id=mod_eks.id,
        widget_type="youtube",
        payload={
            "title": "Amazon EKS Tutorial (Terraform - Ingress - Autoscaling)",
            "url": "https://www.youtube.com/watch?v=kwq9EfELYII&list=PLiMWaCMwGJXnKY6XmeifEpjIfkWRo9v2l"
        }
    )
    db.add(w_eks)
    db.commit()

    print("SUCCESS: Bound Anton Putra EKS Playlist to AWS Architect Preparation Workspace!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
