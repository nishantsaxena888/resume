from database import SessionLocal
from models import CourseWidget
import json

db = SessionLocal()
widgets = db.query(CourseWidget).filter(CourseWidget.widget_type == "youtube").all()
for w in widgets:
    payload = w.payload
    url = payload.get("url", "")
    if "&list=" in url:
        payload["url"] = url.split("&list=")[0]
        w.payload = payload
        from sqlalchemy.orm.attributes import flag_modified
        flag_modified(w, "payload")
db.commit()
print("Fixed YouTube URLs!")
