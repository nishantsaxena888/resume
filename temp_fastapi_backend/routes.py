from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uuid
import subprocess
import base64

from database import get_db
from models import User, Course, CourseModule, CourseWidget, Resume, JobDescription, Preparation, PreparationNote
from schemas import (
    PreparationCreate, PreparationResponse, PreparationNoteCreate, PreparationNoteResponse
)

router = APIRouter()

# --- Pydantic Schemas ---
class CourseCreate(BaseModel):
    title: str
    user_id: int

class CourseModuleCreate(BaseModel):
    title: str
    position: int = 0

class CourseWidgetCreate(BaseModel):
    widget_type: str
    payload: Dict[Any, Any]
    position: int = 0

class WidgetResponse(BaseModel):
    id: int
    widget_type: str
    payload: Dict[Any, Any]
    position: int

class ModuleResponse(BaseModel):
    id: int
    title: str
    position: int
    widgets: List[WidgetResponse] = []

class CourseResponse(BaseModel):
    id: int
    title: str
    position: int = 0
    modules: List[ModuleResponse] = []

class CourseReorder(BaseModel):
    course_ordered_ids: List[int]

    class Config:
        orm_mode = True
        from_attributes = True

# --- API Endpoints ---

# ==========================================
# PREPARATIONS (THE ROOTS)
# ==========================================

@router.get("/preparations", response_model=List[PreparationResponse])
def get_all_preparations(db: Session = Depends(get_db)):
    """Powers the PreparationsDashboardPage.tsx"""
    preps = db.query(Preparation).order_by(Preparation.created_at.desc()).all()
    return preps

@router.post("/preparations", response_model=PreparationResponse)
def create_preparation(prep_in: PreparationCreate, db: Session = Depends(get_db)):
    """Creates a new Preparation Workspace"""
    active_user = db.query(User).first()
    if not active_user:
        active_user = User(email="nishant.ceo@skillom.ai", name="Nishant")
        db.add(active_user)
        db.flush()

    new_prep = Preparation(
        id=f"prep-{uuid.uuid4().hex[:8]}", # e.g. prep-a1b2c3d4
        user_id=active_user.id,
        title=prep_in.title,
        subtitle=prep_in.subtitle,
        icon=prep_in.icon or "BriefcaseBusiness",
        links=prep_in.links
    )
    
    if prep_in.resume_ids:
        resumes_obj = db.query(Resume).filter(Resume.id.in_(prep_in.resume_ids)).all()
        new_prep.resumes.extend(resumes_obj)
        
    if prep_in.jd_ids:
        jds_obj = db.query(JobDescription).filter(JobDescription.id.in_(prep_in.jd_ids)).all()
        new_prep.jds.extend(jds_obj)
        
    if prep_in.course_ids:
        courses_obj = db.query(Course).filter(Course.id.in_(prep_in.course_ids)).all()
        new_prep.courses.extend(courses_obj)
        
    db.add(new_prep)
    db.commit()
    db.refresh(new_prep)
    return new_prep

@router.put("/preparations/{prep_id}", response_model=PreparationResponse)
def update_preparation(prep_id: str, prep_in: PreparationCreate, db: Session = Depends(get_db)):
    """Full architectural PUT update for an existing Preparation workspace"""
    prep = db.query(Preparation).filter(Preparation.id == prep_id).first()
    if not prep:
        raise HTTPException(status_code=404, detail="Preparation not found")
        
    prep.title = prep_in.title
    prep.subtitle = prep_in.subtitle
    prep.links = prep_in.links
    if prep_in.icon:
        prep.icon = prep_in.icon
        
    # Re-map associative scopes
    prep.resumes.clear()
    if prep_in.resume_ids:
        resumes_obj = db.query(Resume).filter(Resume.id.in_(prep_in.resume_ids)).all()
        prep.resumes.extend(resumes_obj)
        
    prep.jds.clear()
    if prep_in.jd_ids:
        jds_obj = db.query(JobDescription).filter(JobDescription.id.in_(prep_in.jd_ids)).all()
        prep.jds.extend(jds_obj)
        
    prep.courses.clear()
    if prep_in.course_ids:
        courses_obj = db.query(Course).filter(Course.id.in_(prep_in.course_ids)).all()
        prep.courses.extend(courses_obj)
        
    db.commit()
    db.refresh(prep)
    return prep

@router.delete("/preparations/{prep_id}")
def delete_preparation(prep_id: str, db: Session = Depends(get_db)):
    """Physically purges the target Workspace and cascades removal"""
    prep = db.query(Preparation).filter(Preparation.id == prep_id).first()
    if not prep:
        raise HTTPException(status_code=404, detail="Preparation not found")
        
    db.delete(prep)
    db.commit()
    return {"success": True}

@router.get("/preparations/{prep_id}", response_model=PreparationResponse)
def get_preparation(prep_id: str, db: Session = Depends(get_db)):
    """Fetches the Single Workspace and its nested notes/courses"""
    prep = db.query(Preparation).filter(Preparation.id == prep_id).first()
    if not prep:
        raise HTTPException(status_code=404, detail="Preparation not found")
    return prep

@router.put("/preparations/{prep_id}/notes", response_model=PreparationNoteResponse)
def save_preparation_notes(prep_id: str, note_in: PreparationNoteCreate, db: Session = Depends(get_db)):
    """Auto-saves the rich text content from NotesForPrintPage.tsx"""
    prep = db.query(Preparation).filter(Preparation.id == prep_id).first()
    if not prep:
        raise HTTPException(status_code=404, detail="Preparation not found")
        
    if prep.notes:
        prep.notes.content = note_in.content
    else:
        new_note = PreparationNote(preparation_id=prep_id, content=note_in.content)
        db.add(new_note)
        prep.notes = new_note
        
    db.commit()
    db.refresh(prep.notes)
    return prep.notes

# ==========================================
# COURSES & MODULES
# ==========================================

@router.post("/courses", response_model=CourseResponse)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(title=course.title, user_id=course.user_id)
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@router.patch("/preparations/{prep_id}/courses/reorder")
def reorder_prep_courses(prep_id: str, payload: CourseReorder, db: Session = Depends(get_db)):
    for idx, cid in enumerate(payload.course_ordered_ids):
        course = db.query(Course).filter(Course.id == cid).first()
        if course:
            course.position = idx
    db.commit()
    return {"status": "ok"}

@router.get("/courses/{course_id}/curriculum", response_model=CourseResponse)
def get_course_curriculum(course_id: int, db: Session = Depends(get_db)):
    """
    Fetches the ENTIRE nested tree: Course -> Modules -> Widgets.
    This routes powers the whole InterviewPrepPage.tsx CMS.
    """
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    return course

@router.post("/courses/{course_id}/modules", response_model=ModuleResponse)
def add_module_to_course(course_id: int, module: CourseModuleCreate, db: Session = Depends(get_db)):
    db_module = CourseModule(course_id=course_id, title=module.title, position=module.position)
    db.add(db_module)
    db.commit()
    db.refresh(db_module)
    return db_module

@router.put("/modules/{module_id}")
def update_course_module(module_id: int, payload: Dict[Any, Any], db: Session = Depends(get_db)):
    db_mod = db.query(CourseModule).filter(CourseModule.id == module_id).first()
    if not db_mod:
        raise HTTPException(status_code=404, detail="Module not found")
    if "title" in payload:
        db_mod.title = payload["title"]
    db.commit()
    return {"status": "ok"}

@router.delete("/modules/{module_id}")
def delete_course_module(module_id: int, db: Session = Depends(get_db)):
    db_mod = db.query(CourseModule).filter(CourseModule.id == module_id).first()
    if not db_mod:
        raise HTTPException(status_code=404, detail="Module not found")
    db.delete(db_mod)
    db.commit()
    return {"status": "ok"}

@router.post("/modules/{module_id}/widgets", response_model=WidgetResponse)
def add_widget_to_module(module_id: int, widget: CourseWidgetCreate, db: Session = Depends(get_db)):
    db_widget = CourseWidget(
        module_id=module_id, 
        widget_type=widget.widget_type, 
        payload=widget.payload, 
        position=widget.position
    )
    db.add(db_widget)
    db.commit()
    db.refresh(db_widget)
    return db_widget

@router.put("/widgets/{widget_id}")
def update_widget(widget_id: int, payload: Dict[Any, Any], db: Session = Depends(get_db)):
    db_widget = db.query(CourseWidget).filter(CourseWidget.id == widget_id).first()
    if not db_widget:
        raise HTTPException(status_code=404, detail="Widget not found")
    
    # Needs to be explicitly re-assigned so SQLAlchemy tracks the JSON mutation
    db_widget.payload = payload
    db.commit()
    db.refresh(db_widget)
    return {"status": "ok"}

@router.get("/resumes")
def get_all_resumes(db: Session = Depends(get_db)):
    resumes = db.query(Resume).order_by(Resume.id.desc()).all()
    return resumes

@router.get("/jds")
def get_all_jds(db: Session = Depends(get_db)):
    jds = db.query(JobDescription).order_by(JobDescription.id.desc()).all()
    result = []
    for jd in jds:
        pl = jd.payload
        if isinstance(pl, str):
            import json
            try: pl = json.loads(pl)
            except: pass
        result.append({"id": jd.id, "user_id": jd.user_id, "payload": pl})
    return result

@router.put("/jds/{jd_id}")
def update_jd(jd_id: int, jd_in: dict, db: Session = Depends(get_db)):
    jd = db.query(JobDescription).filter(JobDescription.id == jd_id).first()
    if not jd:
        raise HTTPException(status_code=404, detail="JD not found")
        
    jd.payload = jd_in.get("payload", jd.payload)
    db.commit()
    db.refresh(jd)
    return {"status": "success", "jd_id": jd.id}


@router.get("/courses")
def get_all_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).order_by(Course.id.desc()).all()
    return courses

@router.post("/resumes")
def save_resume(resume_in: dict, db: Session = Depends(get_db)):
    """Receives the gigantic JSON payload from React and binds it to PostgreSQL"""
    
    # Grab or create default user since we disabled authentication placeholders
    active_user = db.query(User).first()
    if not active_user:
        active_user = User(email="nishant.ceo@skillom.ai", name="Nishant")
        db.add(active_user)
        db.flush() # get ID without committing 
        
    payload = resume_in.get("payload", {})
    title = resume_in.get("title", "Nishant Primary Resume")
    
    # We will just overwrite the first one or create new to simulate a master save hook
    existing_resume = db.query(Resume).filter(Resume.user_id == active_user.id).first()
    
    if existing_resume:
        existing_resume.payload = payload
        existing_resume.title = title
    else:
        existing_resume = Resume(user_id=active_user.id, title=title, payload=payload)
        db.add(existing_resume)
        
    db.commit()
    db.refresh(existing_resume)
    
    return {"status": "success", "resume_id": existing_resume.id}

@router.get("/youtube/transcript")
def get_youtube_transcript(video_id: str):
    """Fetches YouTube transcript dynamically using youtube-transcript-api"""
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        transcript = YouTubeTranscriptApi().fetch(video_id)
        
        nodes = []
        for item in transcript:
            if isinstance(item, dict):
                start_val = item.get("start", 0)
                text_val = item.get("text", "")
            else:
                start_val = getattr(item, "start", 0)
                text_val = getattr(item, "text", "")
                
            nodes.append({
                "type": "text",
                "timestamp": float(start_val),
                "text": text_val
            })
            
        return {"success": True, "video_id": video_id, "nodes": nodes}
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/youtube/capture")
def capture_youtube_frame(video_id: str, timestamp: float):
    """Headless FFmpeg extractor that slices a clean Image natively via yt-dlp tunneling."""
    try:
        # 1. Fetch the direct streaming MP4 url internally bypassing YouTube UI protections
        ytdlp_cmd = ["yt-dlp", "-f", "bestvideo[ext=mp4]/best", "-g", f"https://www.youtube.com/watch?v={video_id}"]
        stream_url = subprocess.check_output(ytdlp_cmd).decode('utf-8').strip()
        
        # 2. Extract exactly 1 high-res jpeg frame directly in memory without disk IO
        ffmpeg_cmd = [
            "ffmpeg", 
            "-ss", str(timestamp), 
            "-i", stream_url, 
            "-vframes", "1", 
            "-q:v", "2",
            "-f", "image2", 
            "-c:v", "mjpeg", 
            "pipe:1"
        ]
        
        frame_bytes = subprocess.check_output(ffmpeg_cmd, stderr=subprocess.DEVNULL)
        b64_image = base64.b64encode(frame_bytes).decode('utf-8')
        
        return {
            "success": True, 
            "video_id": video_id, 
            "timestamp": timestamp,
            "image": f"data:image/jpeg;base64,{b64_image}"
        }
    except subprocess.CalledProcessError as e:
        return {"success": False, "error": f"FFmpeg processing failed permanently. Check dependencies. {e}"}
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/youtube/capture.jpg")
def capture_youtube_frame_jpg(video_id: str, timestamp: float):
    """Asynchronous headless image endpoint that natively returns JPEG buffers for deeply embedded markdown rendering."""
    try:
        ytdlp_cmd = ["yt-dlp", "-f", "bestvideo[ext=mp4]/best", "-g", f"https://www.youtube.com/watch?v={video_id}"]
        stream_url = subprocess.check_output(ytdlp_cmd).decode('utf-8').strip()
        ffmpeg_cmd = [
            "ffmpeg", "-ss", str(timestamp), "-i", stream_url, 
            "-vframes", "1", "-q:v", "2", "-f", "image2", "-c:v", "mjpeg", "pipe:1"
        ]
        frame_bytes = subprocess.check_output(ffmpeg_cmd, stderr=subprocess.DEVNULL)
        from fastapi.responses import Response
        return Response(content=frame_bytes, media_type="image/jpeg")
    except Exception as e:
        # Upon yt-dlp 429 Rate Limits or FFmpeg segfaults, yield a 1x1 transparent binary 
        # GIF instantly to prevent browser DOMs from rendering broken HTML image artifacts 
        # or triggering secondary urllib concurrent crashing loops.
        blank_gif = b'GIF89a\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\x00\x00\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;'
        from fastapi.responses import Response
        return Response(content=blank_gif, media_type="image/gif")

from pydantic import BaseModel
class GenerateNotesRequest(BaseModel):
    widget_id: int
    module_id: int

@router.post("/youtube/generate_notes")
def generate_ai_notes(
    req: GenerateNotesRequest,
    db: Session = Depends(get_db)
):
    import os
    import json
    from google import genai
    from google.genai import types
    from pydantic import BaseModel
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY environment variable is absolutely required to operate the GenAI architecture.")
        
    widget = db.query(CourseWidget).filter(CourseWidget.id == req.widget_id).first()
    if not widget or widget.widget_type != "youtube":
        raise HTTPException(status_code=400, detail="Target Widget missing or is not a strictly configured 'youtube' type matrix.")
        
    url = widget.payload.get("url")
    if not url:
        raise HTTPException(status_code=400, detail="No isolated YouTube URL found inside payload dictionary.")
        
    video_id = url.split("v=")[-1].split("&")[0]
    
    from youtube_transcript_api import YouTubeTranscriptApi
    try:
        transcript = YouTubeTranscriptApi().fetch(video_id)
        transcript_text = "\n".join([f"[{t.start}s] {t.text}" for t in transcript])
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch streaming transcript: {str(e)}")

    class SectionNote(BaseModel):
        heading: str
        timestamp_range: str
        snapshot_timestamps: list[float]
        markdown_content: str

    class GeneratedNotes(BaseModel):
        sections: list[SectionNote]

    user_timeline = widget.payload.get("timeline", [])
    user_snapshots = [node["timestamp"] for node in user_timeline if node.get("type") == "image"]
    user_snapshots_str = ", ".join([str(t) for t in user_snapshots]) if user_snapshots else "None"

    client = genai.Client(api_key=api_key)
    prompt = f"""
    You are an elite technical curriculum architect. Analyze the provided video transcript and its timestamps.
    Divide the video log into logical, highly cohesive, chronological sections.
    
    CRITICAL INSTRUCTIONS:
    1. EXPLAIN THE CONCEPTS SMARTLY and thoroughly, but STRICTLY retain the original flow, language, and core phrasing of the speaker. Do not miss any details! 
    2. Write a formal `heading` for each section.
    3. Determine the actual mapped `timestamp_range` covered in this section (e.g., "1:20 - 2:45").
    4. MANDATORY INCLUSIONS: The user explicitly extracted key frames at these specific elapsed seconds: [{user_snapshots_str}]. You MUST definitively assign and include every single one of these exact floating-point timestamps into the `snapshot_timestamps` array for their chronologically corresponding section. Do NOT skip any user-defined snapshots!
    5. Additionally, you may provide MAXIMUM 1 or 2 extra autonomous `snapshot_timestamps` ONLY IF a completely undocumented architectural diagram or critical code screen appears. Otherwise, do not spam timestamps artificially!
    6. Write the `markdown_content` block containing the smartly explained flow, formatted into highly readable bullet points. DO NOT manually insert any markdown images yourself.

    Transcript JSON map:
    """ + transcript_text

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=GeneratedNotes,
                temperature=0.2
            )
        )
        structured_data = json.loads(response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Google GenAI semantic parsing failed permanently: {str(e)}")
        
    final_markdown = f"# AI Synthesized Notes: {widget.payload.get('title', 'Curriculum')}\n\n"
    
    for section in structured_data['sections']:
        heading = section['heading']
        content = section['markdown_content']
        time_range = section['timestamp_range']
        ts_list = section.get('snapshot_timestamps', [])
        
        final_markdown += f"## {heading} `[{time_range}]`\n\n"
        for ts in ts_list:
            final_markdown += f"![Automated Frame Abstraction at {ts}s](/api/v1/youtube/capture.jpg?video_id={video_id}&timestamp={ts})\n\n"
        final_markdown += f"{content}\n\n"
            
    # Shift positions of subsequent widgets down to make absolute structural room
    db.query(CourseWidget).filter(
        CourseWidget.module_id == req.module_id,
        CourseWidget.position > widget.position
    ).update({"position": CourseWidget.position + 1})
    
    # Abstract notes into Curriculum DB directly sequentially married to the video
    new_widget = CourseWidget(
        module_id=req.module_id,
        widget_type="markdown",
        payload={
            "content": final_markdown
        },
        position=widget.position + 1
    )
    
    # Update parent YouTube widget to hide the button
    widget.payload["has_notes"] = True
    # SQLAlchemy JSON mutation tracking constraint
    from sqlalchemy.orm.attributes import flag_modified
    flag_modified(widget, 'payload')
    db.add(new_widget)
    db.commit()
    db.refresh(new_widget)
    
    return {"success": True, "widget": {"id": new_widget.id, "widget_type": new_widget.widget_type, "payload": new_widget.payload, "position": new_widget.position}}

@router.delete("/widgets/{widget_id}")
def delete_widget(widget_id: int, db: Session = Depends(get_db)):
    """Obliterates unified media/markdown nodes permanently from the global DB topology."""
    widget = db.query(CourseWidget).filter(CourseWidget.id == widget_id).first()
    if not widget:
        raise HTTPException(status_code=404, detail="Requested Matrix Widget instance inherently missing.")
        
    # Rebalance parent nodes before final mutation
    # For now, simply execute standard truncation
    db.delete(widget)
    db.commit()
    return {"success": True, "message": "Widget fully detached from live Curriculum sequence."}
