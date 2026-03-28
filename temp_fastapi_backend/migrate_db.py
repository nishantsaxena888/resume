import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pandas as pd

import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from dotenv import load_dotenv

if __name__ == "__main__":
    load_dotenv()
    
    print("Initializing ETL Pipeline: SQLite -> Heroku Postgres")
    
    # 1. SQLite Source
    sqlite_engine = create_engine(f"sqlite:///{os.path.abspath('interview_prep.db')}")
    
    # 2. Postgres Target
    pg_url = os.environ.get("DATABASE_URL")
    if pg_url and pg_url.startswith("postgres://"):
        pg_url = pg_url.replace("postgres://", "postgresql://", 1)
        
    if not pg_url:
        print("DATABASE_URL not found!")
        sys.exit(1)
        
    pg_engine = create_engine(pg_url)
    
    # 3. Tables required for the UI to map correctly
    tables = [
        "users", 
        "courses", 
        "course_modules", 
        "course_widgets", 
        "job_descriptions", 
        "resumes", 
        "preparations", 
        "prep_course_link", 
        "prep_resume_link", 
        "prep_jd_link", 
        "preparation_notes"
    ]

    for table in tables:
        print(f"Migrating [{table}]...")
        try:
            df = pd.read_sql_table(table, sqlite_engine)
            if not df.empty:
                df.to_sql(table, pg_engine, if_exists="append", index=False)
                print(f"  -> Merged {len(df)} rows.")
            else:
                print("  -> Skipped (Empty in Source)")
        except Exception as e:
            print(f"  -> Error migrating {table}: {e}")

    print("ETL complete. UI Dashboard can now securely boot from the cloud.")
