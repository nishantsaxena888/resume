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
    c_ai = db.query(Course).filter(Course.title.ilike('%AI / ML%')).first()
    
    if not c_ai:
        print("Could not locate existing AI / ML course in DB to append to!")
        sys.exit(1)

    print(f"Target Course Found: {c_ai.title} (ID: {c_ai.id})")

    from sqlalchemy import func
    max_module_id = db.query(func.max(CourseModule.id)).scalar() or 0
    
    # Create the New Module natively underneath the targeted course
    mod_ai = CourseModule(id=max_module_id + 1, course_id=c_ai.id, title="Large Language Models & GPT Architecture")
    db.add(mod_ai)
    db.commit()
    db.refresh(mod_ai)

    max_widget_id = db.query(func.max(CourseWidget.id)).scalar() or 0

    # Create the Widget with FULL YOUTUBE URL
    w_ai = CourseWidget(
        id=max_widget_id + 1,
        module_id=mod_ai.id,
        widget_type="youtube",
        payload={
            "title": "LLM Generative Architecture Tutorial",
            "url": "https://www.youtube.com/watch?v=vYelTr1uQmA"
        }
    )
    db.add(w_ai)
    db.commit()

    print(f"SUCCESS: Bound the new AI/ML Tutorial (Widget ID: {w_ai.id}) into the existing {c_ai.title} pipeline!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
