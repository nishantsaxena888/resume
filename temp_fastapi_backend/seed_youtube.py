from database import SessionLocal
from models import Course, CourseModule, CourseWidget

db = SessionLocal()

lambda_course = db.query(Course).filter(Course.title == "Lambda").first()
if lambda_course:
    # Check if a module already exists so we don't duplicate
    if not lambda_course.modules:
        mod_lambda = CourseModule(course_id=lambda_course.id, title="AWS Lambda Advanced")
        db.add(mod_lambda)
        db.commit()
        db.refresh(mod_lambda)
        
        w1 = CourseWidget(
            module_id=mod_lambda.id,
            widget_type="youtube",
            payload={"title": "AWS Lambda Masterclass Playlist", "url": "https://www.youtube.com/watch?v=iUIWG0h2D84&list=PL9nWRykSBSFjodfc8l8M8yN0ieP94QeEL"}
        )
        w2 = CourseWidget(
            module_id=mod_lambda.id,
            widget_type="markdown",
            payload={"title": "Lambda Cold Starts", "content": "Lambda functions execute inside temporary execution environments (microVMs) provisioned dynamically. VPC ENI attachements previously caused tremendous cold starts."}
        )
        db.add_all([w1, w2])
        db.commit()
        print(f"Successfully migrated Lambda AWS Masterlist video to course {lambda_course.id}")

step_course = db.query(Course).filter(Course.title == "Step Functions").first()
if step_course:
    if not step_course.modules:
        mod_step = CourseModule(course_id=step_course.id, title="State Machine Orchestration")
        db.add(mod_step)
        db.commit()
        db.refresh(mod_step)
        
        ws1 = CourseWidget(
            module_id=mod_step.id,
            widget_type="youtube",
            payload={"title": "Step Functions Deep Dive Playlist", "url": "https://www.youtube.com/watch?v=zCIpWFYDJ8s&list=PL9nWRykSBSFgQrO66TmO1vHFP6yuPF5G-"}
        )
        ws2 = CourseWidget(
            module_id=mod_step.id,
            widget_type="youtube",
            payload={"title": "Step Functions Advanced Tutorial", "url": "https://www.youtube.com/watch?v=GVpmVu8vcNQ"}
        )
        db.add_all([ws1, ws2])
        db.commit()
        print(f"Successfully migrated Step Functions playlists to course {step_course.id}")

api_course = db.query(Course).filter(Course.title == "API Gateway").first()
if api_course:
    if not api_course.modules:
        mod_api = CourseModule(course_id=api_course.id, title="REST and WebSocket APIs")
        db.add(mod_api)
        db.commit()
        db.refresh(mod_api)
        
        wa1 = CourseWidget(
            module_id=mod_api.id,
            widget_type="youtube",
            payload={"title": "API Gateway Complete Guide", "url": "https://www.youtube.com/watch?v=jcibXVFiFek"}
        )
        db.add_all([wa1])
        db.commit()
        print("Migrated API Gateway youtube widget.")

print("All legacy curriculum media successfully ported to Postgres!")
