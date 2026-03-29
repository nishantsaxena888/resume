import { Server, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_WebFrameworksPage() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white print:m-0 print:p-0">
      <div className="max-w-5xl w-full mx-auto p-8 print:px-0 print:py-4 bg-white shadow-xl print:shadow-none min-h-screen relative border border-slate-200 print:border-none">
        
        <div className="mb-4">
          <Link to="/static-notes/python-basics" className="print:hidden flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold mb-8 transition-colors z-50 relative">
            <ArrowLeft className="w-5 h-5" /> Back to Python 101 Hub
          </Link>
        </div>

        <div className="mb-12 print:mb-8 border-b-4 border-slate-900 pb-8 print:pb-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 print:w-12 print:h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 print:rotate-0">
              <Server className="w-10 h-10 print:w-8 print:h-8 text-blue-400" />
            </div>
            <div>
              <h1 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-5xl print:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Python: Web & ORM Frameworks
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                FastAPI, Flask, and SQLAlchemy Snippets
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION 1: FASTAPI --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             1. Standard Snippet: FastAPI & Pydantic
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# 1. PYDANTIC SCHEMA: Strict validation engine
class UserCreate(BaseModel):
    username: str
    email: str
    age: Optional[int] = None

# 2. ASYNC ROUTES
@app.post("/users/", response_model=UserCreate)
async def create_user(user: UserCreate):
    if user.age and user.age < 18:
        # Standard Exception Throw
        raise HTTPException(status_code=400, detail="Must be 18+")
    
    # User is already perfectly parsed and validated into a Pydantic object
    return user

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    # FastAPI automatically validates user_id is an integer!
    return {"user_id": user_id}`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: FLASK --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             2. Standard Snippet: Flask
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# app.py
from flask import Flask, request, jsonify

app = Flask(__name__)

# 1. DYNAMIC ROUTING
@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    return jsonify({"user": user_id, "status": "active"}), 200

# 2. HANDLING JSON PAYLOADS
@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Bad Request"}), 400
        
    return jsonify({"message": f"Created {data['name']}"}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: SQLALCHEMY --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             3. Standard Snippet: SQLAlchemy ORM
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker

# 1. DATABASE CONNECTION
engine = create_engine("postgresql://user:pass@localhost:5432/mydb")
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# 2. DEFINING THE MODEL
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)

# 3. EXECUTING QUERIES
# Always use context managers to prevent DB lockups
with SessionLocal() as session:
    # INSERT
    new_user = User(email="admin@system.com")
    session.add(new_user)
    session.commit()
    
    # SELECT
    user = session.query(User).filter(User.email == "admin@system.com").first()
    
    # UPDATE
    user.is_active = False
    session.commit()`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
