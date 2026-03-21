from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin, ModelView
from database import engine, Base
from models import User, JobDescription, Resume, Course, CourseModule, CourseWidget

# Rebuild all database tables locally
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Interview Prep Engine")

# CORS config to allow the local Vite React frontend to call us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

admin = Admin(app, engine)

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.email, User.name]

class CourseAdmin(ModelView, model=Course):
    column_list = [Course.id, Course.title, Course.user]

class CourseModuleAdmin(ModelView, model=CourseModule):
    column_list = [CourseModule.id, CourseModule.title, CourseModule.course, CourseModule.position]

class CourseWidgetAdmin(ModelView, model=CourseWidget):
    column_list = [CourseWidget.id, CourseWidget.widget_type, CourseWidget.module, CourseWidget.position]

class JobDescriptionAdmin(ModelView, model=JobDescription):
    column_list = [JobDescription.id, JobDescription.company, JobDescription.role]

class ResumeAdmin(ModelView, model=Resume):
    column_list = [Resume.id, Resume.title, Resume.user]

# Register views
admin.add_view(UserAdmin)
admin.add_view(CourseAdmin)
admin.add_view(CourseModuleAdmin)
admin.add_view(CourseWidgetAdmin)
admin.add_view(JobDescriptionAdmin)
admin.add_view(ResumeAdmin)

# Mount the CRUD routes (Wait until routes are updated to re-enable)
from routes import router
app.include_router(router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Interview Prep Skillon API is running."}
