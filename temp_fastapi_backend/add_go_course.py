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

    # Find the existing AI / ML course
    c_target = db.query(Course).filter(Course.title.ilike('%AI / ML%')).first()
    if not c_target:
        print("Error: Could not locate the 'AI / ML' course to insert into!")
        sys.exit(1)

    print(f"Target Course Found: {c_target.title} (ID: {c_target.id})")

    from sqlalchemy import func
    max_module_id = db.query(func.max(CourseModule.id)).scalar() or 0
    
    # Create the New Module natively underneath the targeted course
    mod_go = CourseModule(id=max_module_id + 1, course_id=c_target.id, title="Golang for Backend Services")
    db.add(mod_go)
    db.commit()
    db.refresh(mod_go)

    max_widget_id = db.query(func.max(CourseWidget.id)).scalar() or 0

    # Create the Widget with FULL YOUTUBE URL
    w_go = CourseWidget(
        id=max_widget_id + 1,
        module_id=mod_go.id,
        widget_type="youtube",
        payload={
            "title": "Learn Go in 12 Minutes",
            "url": "https://www.youtube.com/watch?v=eLvFInC0Mgo&list=PLwbWIFE49l8lF0RVW5y6pdWzZTOs2be94"
        }
    )
    db.add(w_go)
    db.commit()

    print(f"SUCCESS: Bound the new Golang Tutorial (Widget ID: {w_go.id}) into the {c_target.title} pipeline!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
