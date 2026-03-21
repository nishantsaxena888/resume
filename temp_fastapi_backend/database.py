import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Fallback to local SQLite if Postgres isn't running yet to prevent blocking interview prep
# You can swap this to postgresql://user:password@localhost/dbname when ready
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./interview_prep.db")

# If using SQLite, we need connect_args to allow multithreading in FastAPI
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
