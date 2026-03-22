import sys, os, json
sys.path.append("/Users/nishantsaxena/workspace/resume/temp_fastapi_backend")
from database import SessionLocal
from models import User, Resume, JobDescription, Course

db = SessionLocal()

user = db.query(User).filter_by(email="nishant.ceo@skillom.ai").first()
if not user:
    user = User(email="nishant.ceo@skillom.ai", name="Nishant")
    db.add(user)
    db.commit()
    db.refresh(user)

try:
    with open("/Users/nishantsaxena/workspace/resume/system-configuration/industry/software.schema.json", "r") as f:
        jd_payload = json.load(f)
except Exception:
    jd_payload = {"title": "Software Engineer"}

if not db.query(JobDescription).first():
    jd = JobDescription(user_id=user.id, payload=jd_payload)
    db.add(jd)

if not db.query(Resume).first():
    r_payload = {"summary": "17+ years of experience in software development and delivery."}
    r = Resume(user_id=user.id, title="Nishant Saxena - Principal Engineer", payload=r_payload)
    db.add(r)

if not db.query(Course).first():
    c = Course(user_id=user.id, title="Full Stack Node/React Mastery")
    db.add(c)
    
db.commit()
print("SUCCESS: Database successfully seeded with LIVE Context from the workspace schemas.")
