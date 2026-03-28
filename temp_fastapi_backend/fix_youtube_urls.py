from database import SessionLocal
from models import CourseWidget
from sqlalchemy.orm.attributes import flag_modified
import json

def patch_youtube_urls():
    db = SessionLocal()
    widgets = db.query(CourseWidget).filter(CourseWidget.widget_type == "youtube").all()
    count = 0
    for w in widgets:
        payload = w.payload
        url = payload.get("url", "")
        
        # 1. Fix the `&list=` YouTube iframe killer
        if "&list=" in url:
            payload["url"] = url.split("&list=")[0]
            
        # 2. Fix the `&t=` YouTube iframe killer
        if "&t=" in payload["url"]:
            payload["url"] = payload["url"].split("&t=")[0]
            
        w.payload = payload
        flag_modified(w, "payload")
        count += 1
        
    db.commit()
    print(f"Fixed {count} YouTube URLs!")

if __name__ == "__main__":
    patch_youtube_urls()
