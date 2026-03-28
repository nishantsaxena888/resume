import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Load Local Environment Variables if present natively
load_dotenv()

# Fallback to local SQLite if Postgres isn't running yet to prevent blocking interview prep
# You can swap this to postgresql://user:password@localhost/dbname when ready
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./interview_prep.db")

# Fix Heroku's dialect format for SQLAlchemy >= 1.4
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

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
