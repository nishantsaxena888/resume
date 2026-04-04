import sys
sys.path.append('/Users/nishantsaxena/workspace/resume/temp_fastapi_backend')
from database import SessionLocal
from models import Resume
from sqlalchemy.orm.attributes import flag_modified

db = SessionLocal()

target_resume = db.query(Resume).filter(Resume.title == 'AI / ML (GCP)').first()
if not target_resume:
    raise Exception("Resume not found")

payload = dict(target_resume.payload)

for job in payload.get('experience', []):
    if job.get('id') == 'infomagnus':
        new_achievements = []
        for ach in job['achievements']:
            if "Deployed the tools on AWS" in ach:
                new_achievements.append("Deployed the tools on GCP Cloud, leveraging Firebase and Google App Engine for scalable serverless infrastructure and reliability.")
            else:
                new_achievements.append(ach)
        job['achievements'] = new_achievements
        break

target_resume.payload = payload
flag_modified(target_resume, 'payload')
db.commit()

print("SUCCESS")
