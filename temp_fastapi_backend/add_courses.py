from database import SessionLocal
from models import Preparation, Course, User

db = SessionLocal()
prep = db.query(Preparation).filter(Preparation.id == "prep-1ebf7db3").first()
user = db.query(User).filter_by(email="nishant.ceo@skillom.ai").first()

if prep and user:
    # First clear out existing courses to keep it strictly these three
    prep.courses.clear()
    db.commit()

    # Create the new courses
    c1 = Course(user_id=user.id, title="AWS IAM Serverless")
    c2 = Course(user_id=user.id, title="Lambda")
    c3 = Course(user_id=user.id, title="Step Functions")
    
    db.add_all([c1, c2, c3])
    db.commit()
    
    # Attach them to the prep
    prep.courses = [c1, c2, c3]
    db.commit()
    print("SUCCESS: 3 AWS Courses manually injected and bound to the workspace!")
else:
    print("FAILED: Data not found!")
