from database import SessionLocal
from models import Preparation, Course, User

db = SessionLocal()
prep = db.query(Preparation).filter(Preparation.id == "prep-1ebf7db3").first()
user = db.query(User).filter_by(email="nishant.ceo@skillom.ai").first()

if prep and user:
    # Create the new courses
    c4 = Course(user_id=user.id, title="API Gateway")
    c5 = Course(user_id=user.id, title="SQS SNS EventBridge")
    
    db.add_all([c4, c5])
    db.commit()
    
    # Attach them explicitly
    prep.courses.append(c4)
    prep.courses.append(c5)
    db.commit()
    print("SUCCESS: 2 More AWS Courses (API Gateway, SQS SNS EventBridge) manually injected and bound to the workspace!")
else:
    print("FAILED: Data not found!")
