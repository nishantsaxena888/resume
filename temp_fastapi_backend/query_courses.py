import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Course, Preparation

load_dotenv(".env")
db_url = os.getenv("DATABASE_URL")
if db_url and db_url.startswith("postgres://"): 
    db_url = db_url.replace("postgres://", "postgresql://", 1)

engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

try:
    print("--- Courses ---")
    courses = db.query(Course).all()
    for c in courses:
        print(f"ID {c.id}: {c.title}")
    
    print("\n--- Preparations ---")
    preps = db.query(Preparation).all()
    for p in preps:
        print(f"ID {p.id}: {p.title}")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
