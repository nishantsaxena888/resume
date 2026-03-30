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
    c_aiml = Course(id=max_course_id + 1, user_id=prep.user_id, title="AI / ML")
    db.add(c_aiml)
    db.commit()
    db.refresh(c_aiml)

    prep.courses.append(c_aiml)
    db.commit()

    max_module_id = db.query(func.max(CourseModule.id)).scalar() or 0
    
    # Create the Module
    mod_aiml = CourseModule(id=max_module_id + 1, course_id=c_aiml.id, title="AI / ML Foundation")
    db.add(mod_aiml)
    db.commit()
    db.refresh(mod_aiml)

    max_widget_id = db.query(func.max(CourseWidget.id)).scalar() or 0

    # Create the Widget with FULL PLAYLIST URL
    w_aiml = CourseWidget(
        id=max_widget_id + 1,
        module_id=mod_aiml.id,
        widget_type="youtube",
        payload={
            "title": "Machine Learning Lecture",
            "url": "https://www.youtube.com/watch?v=f3zHina9MTo"
        }
    )
    db.add(w_aiml)
    db.commit()

    print(f"SUCCESS: Bound AI/ML Course (ID: {c_aiml.id}) Pipeline into the Database!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
