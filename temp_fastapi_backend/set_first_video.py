from database import SessionLocal
from models import CourseWidget, CourseModule
from sqlalchemy.orm.attributes import flag_modified

def set_first_video():
    db = SessionLocal()
    # Ensure they are sorted by position to get the actual first one (Deep Dive)
    first_widget = db.query(CourseWidget).filter(CourseWidget.widget_type == "youtube").order_by(CourseWidget.module_id).first()
    
    if first_widget:
        payload = first_widget.payload
        payload["url"] = "https://www.youtube.com/watch?v=GVpmVu8vcNQ&t=13s"
        # Update the parent Module title to match the video
        parent_mod = db.query(CourseModule).filter(CourseModule.id == first_widget.module_id).first()
        if parent_mod:
            parent_mod.title = "AWS Step Functions - A Full Tutorial"
            payload["title"] = "AWS Step Functions - A Full Tutorial"
            
        first_widget.payload = payload
        flag_modified(first_widget, "payload")
        db.commit()
        print("First video accurately replaced with GVpmVu8vcNQ!")
    else:
        print("No youtube widgets found.")

if __name__ == "__main__":
    set_first_video()
