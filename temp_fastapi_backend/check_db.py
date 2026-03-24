from database import SessionLocal
from models import Preparation

db = SessionLocal()
prep = db.query(Preparation).filter(Preparation.id == "prep-1ebf7db3").first()

if prep:
    print(f"Preparation found: {prep.id}")
    print("Courses:")
    for c in prep.courses:
        print(f" - {c.id}: {c.title}")
else:
    print("Preparation not found")
