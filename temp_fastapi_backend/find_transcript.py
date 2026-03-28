from database import SessionLocal
from models import CourseWidget
import sys

db = SessionLocal()
# Find any youtube widget possessing an active timeline
yt_widgets = db.query(CourseWidget).filter(CourseWidget.widget_type == "youtube").order_by(CourseWidget.id.desc()).all()

for yt in yt_widgets:
    payload = yt.payload
    if payload and "timeline" in payload and payload["timeline"]:
        print(f"FOUND WIDGET ID: {yt.id}")
        timeline = payload.get("timeline", [])
        transcript_text = "\n".join([f"[{t.get('timestamp', 0)}s] {t.get('content', '')}" for t in timeline if t.get('type') == 'text'])

        print("_TRANSCRIPT_START_")
        if len(transcript_text) > 4000:
            print(transcript_text[:2000] + "\n... [TRUNCATED] ...\n" + transcript_text[-2000:])
        else:
            print(transcript_text)
        print("_TRANSCRIPT_END_")
        sys.exit(0)

print("CRITICAL ERROR: Absolutely none of the YouTube widgets in the database have an active timeline extracted. You must go to the UI and click 'Extract Timeline' at least once first!")
sys.exit(1)
