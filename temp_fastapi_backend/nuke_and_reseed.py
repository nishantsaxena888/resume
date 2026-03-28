from database import SessionLocal
from models import CourseModule, CourseWidget, Course

def clean_and_reseed():
    db = SessionLocal()
    
    # 1. Purge all widgets and modules
    print("Purging legacy grouping matrices...")
    db.query(CourseWidget).delete()
    db.query(CourseModule).delete()
    db.commit()
    
    # 2. Get the target Step Functions course
    course = db.query(Course).filter(Course.title == "Step Functions").first()
    if not course:
        print("Creating placeholder Step Functions course...")
        course = Course(title="Step Functions", user_id=1, position=0)
        db.add(course)
        db.commit()
        db.refresh(course)
        
    print(f"Targeting Course ID {course.id}")
    
    # 3. Create Module for Video 1 (The Deep Dive Playlist)
    mod1 = CourseModule(course_id=course.id, title="Step Functions Deep Dive Playlist", position=0)
    db.add(mod1)
    db.commit()
    db.refresh(mod1)
    
    widget1 = CourseWidget(
        module_id=mod1.id,
        widget_type="youtube",
        position=0,
        payload={
             "url": "https://www.youtube.com/watch?v=JyoB8QabH6c&list=PL9nWRykSBSFjl9Yn1R2d-G4xNlz_Jj4Qe",
             "title": "Step Functions Deep Dive Playlist",
             "has_notes": False
        }
    )
    db.add(widget1)
    
    # 4. Create Module for Video 2 (Advanced Tutorial)
    mod2 = CourseModule(course_id=course.id, title="AWS Step Functions Tutorial", position=1)
    db.add(mod2)
    db.commit()
    db.refresh(mod2)
    
    widget2 = CourseWidget(
        module_id=mod2.id,
        widget_type="youtube",
        position=0,
        payload={
             "url": "https://www.youtube.com/watch?v=Z5v8GE8HlyQ&t=8s",
             "title": "AWS Step Functions Tutorial - Theory & Build",
             "has_notes": False
        }
    )
    db.add(widget2)
    
    db.commit()
    print("Successfully mapped 1 Video = 1 Module!")
    
if __name__ == "__main__":
    clean_and_reseed()
