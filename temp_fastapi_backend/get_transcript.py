from database import SessionLocal
from models import CourseWidget
import sys
import json

db = SessionLocal()
yt = db.query(CourseWidget).filter(CourseWidget.widget_type == "youtube").order_by(CourseWidget.id.desc()).first()

if not yt:
    print("No YouTube widget active.")
    sys.exit(1)

timeline = yt.payload.get("timeline")
if not timeline:
    print("No timeline dynamically attached to this video widget payload. Unable to read transcript natively.")
    sys.exit(1)

transcript_text = "\n".join([f"[{t['timestamp']}s] {t['content']}" for t in timeline if t['type'] == 'text'])

print("_TRANSCRIPT_START_")
if len(transcript_text) > 4000:
    print(transcript_text[:2000] + "\n... [TRUNCATED] ...\n" + transcript_text[-2000:])
else:
    print(transcript_text)
print("_TRANSCRIPT_END_")
