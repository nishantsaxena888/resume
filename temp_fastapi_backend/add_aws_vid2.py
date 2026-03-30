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

    # Find the existing AWS course
    c_aws = db.query(Course).filter(Course.title.ilike('%AWS%')).first()
    if not c_aws:
        c_aws = db.query(Course).filter(Course.title.ilike('%EKS%')).first()
        
    if not c_aws:
        print("Could not locate existing AWS course in DB to append to!")
        sys.exit(1)

    print(f"Target Course Found: {c_aws.title} (ID: {c_aws.id})")

    from sqlalchemy import func
    max_module_id = db.query(func.max(CourseModule.id)).scalar() or 0
    
    # Create the New Module natively underneath the targeted course
    mod_aws = CourseModule(id=max_module_id + 1, course_id=c_aws.id, title="Modern Serverless Architectures")
    db.add(mod_aws)
    db.commit()
    db.refresh(mod_aws)

    max_widget_id = db.query(func.max(CourseWidget.id)).scalar() or 0

    # Create the Widget with FULL YOUTUBE URL
    w_aws = CourseWidget(
        id=max_widget_id + 1,
        module_id=mod_aws.id,
        widget_type="youtube",
        payload={
            "title": "AWS Serverless Deep Dive",
            "url": "https://www.youtube.com/watch?v=RoKAEzdcr7k"
        }
    )
    db.add(w_aws)
    db.commit()

    print(f"SUCCESS: Bound the new AWS Tutorial (Widget ID: {w_aws.id}) into the existing {c_aws.title} pipeline!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
