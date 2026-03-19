from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Preparation Backend API is running", "status": "success"}

@app.get("/api/resume/variants")
def get_resume_variants():
    # Placeholder for serving different resume templates based on the source text
    return [
        {"id": "full-stack", "name": "Full Stack Lead"},
        {"id": "backend", "name": "Backend Python Architect"},
        {"id": "ai-ml", "name": "AI/ML & Document AI Specialist"}
    ]
