import os
from dotenv import load_dotenv
from database import SessionLocal, engine
from models import CourseModule, CourseWidget
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker

load_dotenv(".env")
db_url = os.getenv("DATABASE_URL")
if db_url and db_url.startswith("postgres://"): 
    db_url = db_url.replace("postgres://", "postgresql://", 1)

if not db_url:
    db_url = "sqlite:///./interview_prep.db"

engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

module_id = 100

max_pos = db.query(func.max(CourseWidget.position)).filter(CourseWidget.module_id == module_id).scalar() or 0

content = """# Cloud Run vs Cloud Functions (Kya differences hain aur Cloud Functions kab use karein?)

Chaliye isey ekdam aasaan "Simple Bhasha" aur technical logic mein tod kar samajhte hain ki jab Cloud Run zero cost par web apps chala sakta hai, toh log Cloud Functions ka use kya karte hain:

## Cloud Functions Hai Kya?
Aap sirf ek `.py` ya `.js` file likhte ho jisme sirf ek "function" hota hai (e.g. `def compress_video()`). Google is file ko leta hai, aur use tab trigger karta hai jab Cloud par koi "Event" hota hai. Aapko server backend (FastAPI ya Express) setup karne ki zaroorat hi nahi hoti. 

## Toh jab **Cloud Run** hai, toh iski Zaroorat Kyu Nahi Padti Jyada?

Aaj kal sach mein lagbhag **95% modern applications mein Cloud Functions ki zaroorat nahi padti**. Industry standard pura ka pura **Cloud Run** pe shift ho chuka hai, uske 3 main reasons hain:

### 1. No Full Web Server: 
Cloud Functions pe aap ek proper web API (Jaise FastAPI jisme `/login`, `/register`, `/home` endpoints hon) easily deploy nahi kar sakte. Ek function sirf ek hi task run karta hai. Jabki **Cloud Run** par aap entire Flask, Node.js, ya Django backend ek hi Docker container mein host kar sakte ho.

### 2. The Docker Freedom (Any Image):
Cloud Functions mein aap Google par strict dependent ho. Agar kal ko aapko FFmpeg software chahiye backend pe video compress karne ke liye, toh Cloud Functions mein error aa jayega kyunki wo OS environment me pre-installed nahi hota! Jabki **Cloud Run** mein aap khudka Docker banate ho, yaani usme aap FFmpeg, C++, ya koi bhi heavy C library easily install kar sakte ho aur image gcr.io par phool-proof deploy ho jayegi.

### 3. Concurrent Users (Cost!):
Cloud Functions ka sabse bada drawback ye hai ki **1 container sirf 1 hi request handle kar sakta hai ek baar me**. Agar 100 log aapki website par api click karein, toh Google pichhe 100 alag-alag Cloud Functions jagayega (jiska aapko heavily pay karna padega). 
Par **Cloud Run** ka ek akela container ek saath 1000 users ki HTTP request ko process kar sakta hai (high concurrency). Toh isse scaling cost practically drastically kam aati hai.

---

## Phir Log Isey (Cloud Functions) Use Kab Karte Hain?
Log isko sirf "Glue" (Fevicol) ki tarah use karte hain 2 alag cloud services ko naturally jodne ke liye (Event Architecture). 

> **Example Workflow:** Agar kisi ne Cloud Storage (Storage Drive) pe PDF upload ki, toh automatically background me ek Cloud Function trigger hoga jo uspe ek chota Watermark lagakar use wapas usi waqt save kar dega. That's it! 

Lekin uss type ke logic ko ab aaraam se **Cloud Run + Eventarc** triggers se smoothly container me handle kiya ja raha hai, isiliye Cloud Functions dheere-dheere gayab ho raha hai aur saara focus Cloud Run aur self-contained Docker par drift ho gaya hai.
"""

widget = CourseWidget(
    module_id=module_id,
    widget_type="markdown",
    position=max_pos + 1,
    payload={
        "title": "Cloud Run vs Cloud Functions Deep Dive",
        "content": content
    }
)
db.add(widget)
db.commit()

print("Successfully added the Cloud Run vs Functions comparison as the next widget in Module 100 on the live Live Postgres Heroku database!")
