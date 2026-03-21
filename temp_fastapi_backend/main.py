from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin, ModelView
from database import engine, Base
from models import User, JobDescription, Resume

# Initialize Database Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Interview Prep Backend", version="1.0.0")

# CORS for React frontend connecting from localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Admin Dashboard Setup
admin = Admin(app, engine)

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.name, User.email]

class JobDescriptionAdmin(ModelView, model=JobDescription):
    column_list = [JobDescription.id, JobDescription.company_name, JobDescription.role_title]
    can_create = True
    can_edit = True
    can_delete = True
    can_view_details = True

class ResumeAdmin(ModelView, model=Resume):
    column_list = [Resume.id, Resume.name, Resume.is_default, Resume.user_id, Resume.target_jd_id]

# Register views
admin.add_view(UserAdmin)
admin.add_view(JobDescriptionAdmin)
admin.add_view(ResumeAdmin)

# Mount the CRUD and Delta Validation Routes
from routes import router
app.include_router(router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Interview Prep API is running."}

# We will add precise Pydantic logic and endpoints in Phase 2.
