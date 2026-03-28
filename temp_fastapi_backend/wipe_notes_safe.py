import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models import CourseWidget
from sqlalchemy.orm.attributes import flag_modified

def wipe_notes():
    db = SessionLocal()
    deleted = db.query(CourseWidget).filter(CourseWidget.widget_type == 'markdown').delete()
    youtube_widgets = db.query(CourseWidget).filter(CourseWidget.widget_type == 'youtube').all()
    restored = 0
    for w in youtube_widgets:
        if 'has_notes' in w.payload:
            del w.payload['has_notes']
            flag_modified(w, 'payload')
            restored += 1
    db.commit()
    print(f"Deleted {deleted} Study Notes. Restored {restored} YouTube widgets.")

if __name__ == "__main__":
    wipe_notes()
