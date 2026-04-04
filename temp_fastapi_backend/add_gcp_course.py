import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Preparation, Course, CourseModule, CourseWidget

load_dotenv(".env")
db_url = os.getenv("DATABASE_URL")
if db_url and db_url.startswith("postgres://"): 
    db_url = db_url.replace("postgres://", "postgresql://", 1)

if not db_url:
    db_url = "sqlite:///./interview_prep.db"

engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

try:
    prep = db.query(Preparation).first()

    # Create the core GCP Course natively
    c_target = Course(title="Google Cloud Platform (GCP)", user_id=prep.user_id)
    db.add(c_target)
    db.commit()
    db.refresh(c_target)
    
    # Tie course to preparation
    prep.courses.append(c_target)
    db.commit()

    modules_data = [
        {
            "title": "Module 1: Serverless Compute (Cloud Run vs Functions)",
            "content": f"""# 1. Serverless Compute (The Backend)
            
- **Cloud Run:** The absolute gold standard for full-stack. You containerize your API (FastAPI, Express, Node) and it scales from 0 to infinity. Fully serverless.
- **Cloud Functions:** For single-purpose, event-driven microservices (like triggering a script when a file is uploaded to storage)."""
        },
        {
            "title": "Module 2: Managed Databases (Data Layer)",
            "content": f"""# 2. Managed Databases (The Data Layer)

- **Cloud SQL:** Managed PostgreSQL or MySQL. Not strictly serverless (you pick an instance size), but fully managed.
- **Firestore (Datastore):** Serverless, extremely fast NoSQL document database. Great for rapid web/mobile app development.
- **AlloyDB / Spanner:** For enterprise-grade, massive global scale relational data."""
        },
        {
            "title": "Module 3: Frontend Hosting & CDN",
            "content": f"""# 3. Frontend Hosting & CDN (The UI)

- **Firebase Hosting:** The easiest way to deploy React/Vite applications. Native global CDN and free SSL out of the box.
- **Cloud CDN:** Edge caching to deliver your static assets locally to users worldwide."""
        },
        {
            "title": "Module 4: Storage (Assets)",
            "content": f"""# 4. Storage (The Assets)

- **Cloud Storage:** Serverless object storage for images, videos, unstructured data, and backups (equivalent to AWS S3)."""
        },
        {
            "title": "Module 5: Authentication (Users)",
            "content": f"""# 5. Authentication (The Users)

- **Identity Platform (Firebase Auth):** Serverless user authentication (Google, GitHub, Email/Password, JWTs)."""
        },
        {
            "title": "Module 6: Messaging & Asynchronous Events",
            "content": f"""# 6. Messaging & Asynchronous Events (The Glue)

- **Cloud Pub/Sub:** Serverless message bus. Use it to decouple heavy background worker tasks from your fast API responses.
- **Eventarc:** Routes events from GCP services (like Cloud Storage) directly to Cloud Run."""
        },
        {
            "title": "Module 7: Networking & API Management",
            "content": f"""# 7. Networking & API Management (The Gateway)

- **API Gateway:** Serverless gateway to route, secure, and throttle API requests before they hit Cloud Run.
- **Cloud Load Balancing:** Essential if you scale up globally and need to balance traffic across multiple regions securely."""
        },
        {
            "title": "Module 8: Google App Engine (Legacy Serverless)",
            "content": f"""# 8. Google App Engine (GAE)

**Google App Engine (GAE)** is definitely a serverless compute option, but it has largely been superseded by **Cloud Run** for modern full-stack architectures.

## Architecture Breakdown

- **What it is:** GAE was Google's very first serverless PaaS (Platform as a Service). You push your source code (Python, Node), and Google builds and runs it.
- **Why it's fading:** It has strict language runtimes, older infrastructure constraints, and vendor lock-in. 
- **Why Cloud Run won:** Cloud Run does exactly what App Engine does (scale-to-zero serverless), but it runs **Docker containers**. This means you can use any language, any OS library (like FFmpeg), and you aren't locked into Google's proprietary environment. 

> **The TL;DR:** If you are building a *new* application today, you almost always choose **Cloud Run** instead of **App Engine**. Most engineers only touch App Engine today if they are maintaining legacy systems."""
        }
    ]

    for i, m_data in enumerate(modules_data):
        mod = CourseModule(course_id=c_target.id, title=m_data["title"], position=i)
        db.add(mod)
        db.commit()
        db.refresh(mod)
        
        # Injects the Markdown into the DB natively
        w = CourseWidget(
            module_id=mod.id,
            widget_type="markdown",
            position=0,
            payload={
                "title": m_data["title"],
                "content": m_data["content"]
            }
        )
        db.add(w)
        db.commit()

    print(f"SUCCESS: Synthesized the complete GCP Foundation Course with 8 exact sub-modules into the Live PostgreSQL Database!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
