import os
import sys
import argparse
import json
import requests
from sqlalchemy.orm import Session
from database import SessionLocal, CourseWidget
from utils import extract_video_logic

def error_exit(msg):
    print(f"FATAL: {msg}")
    sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Autonomous Gemini Curriculum Agent")
    parser.add_argument("--widget_id", type=int, required=True, help="ID of the CourseWidget containing the YouTube video")
    parser.add_argument("--module_id", type=int, required=True, help="ID of the active Module to inject the notes into")
    args = parser.parse_args()

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        error_exit("GEMINI_API_KEY environment variable is absolutely required to operate the GenAI architecture.")

    print(f"[*] Booting Remote DB connection for Widget ID {args.widget_id}...")
    db: Session = SessionLocal()
    widget = db.query(CourseWidget).filter(CourseWidget.id == args.widget_id).first()
    
    if not widget or widget.type != "youtube":
        error_exit("Target Widget missing or is not a strictly configured 'youtube' type matrix.")
        
    url = widget.payload.get("url")
    if not url:
        error_exit("No isolated YouTube URL found inside payload dictionary.")
    
    video_id = url.split("v=")[-1].split("&")[0]

    print(f"[*] Dynamically extracting massive transcript buffer natively for {video_id}...")
    payload = extract_video_logic(url)
    if "error" in payload:
        error_exit(f"Extraction Pipeline Failed: {payload['error']}")
        
    timeline = payload.get("timeline", [])
    if not timeline:
        error_exit("YouTube returned a barren transcription block! Unable to read subtitles.")

    transcript_text = ""
    for node in timeline:
        if node["type"] == "text":
            transcript_text += f"[{node['timestamp']}s] {node['content']}\n"

    print("[*] Launching Google GenAI SDK to autonomously architect curriculum blocks...")
    from google import genai
    from google.genai import types
    from pydantic import BaseModel

    class SectionNote(BaseModel):
        heading: str
        markdown_content: str
        snapshot_timestamp: float

    class GeneratedNotes(BaseModel):
        sections: list[SectionNote]

    client = genai.Client(api_key=api_key)
    
    prompt = """
    You are an elite technical curriculum architect. Analyze the provided technical video transcript, which includes explicit millisecond timestamps for every sentence.
    Divide the massive video log into highly logical, chronological technical sections.
    For each distinct section:
    1. Write a formal `heading`.
    2. Write a highly detailed, beautifully structured `markdown_content` block containing comprehensive notes, bullet points, and code block explanations where relevant.
    3. Logically determine the single most useful `snapshot_timestamp` (in seconds, as a float) where an important architectural diagram, code screen, or informative slide is predominantly on-screen. Deduce this using context clues like 'As you can see on this diagram', 'Notice this code', or simply taking the median timestamp of a deeply technical lecture block.
    
    Transcript JSON map:
    """ + transcript_text

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
    
    final_markdown = f"# AI Synthesized Notes: {widget.payload.get('title', 'Curriculum')}\n\n"
    
    print(f"[*] Success! Gemini extracted {len(structured_data['sections'])} semantic modules. Engaging headless Local FastAPI API loops...")
    
    for idx, section in enumerate(structured_data['sections']):
        heading = section['heading']
        content = section['markdown_content']
        ts = section['snapshot_timestamp']
        
        final_markdown += f"## {heading}\n\n"
        final_markdown += f"{content}\n\n"
        
        print(f"    -> [Module {idx+1}] FFmpeg slicing frame {ts}s for '{heading}'...")
        try:
            resp = requests.get(f"http://localhost:9999/api/v1/youtube/capture?video_id={video_id}&timestamp={ts}", timeout=25)
            if resp.ok:
                data = resp.json()
                if data.get("success") and data.get("image"):
                    b64 = data["image"]
                    final_markdown += f"![Automated Frame Abstraction at {ts}s]({b64})\n\n"
                    print("       --> Base64 Frame Injected Successfully.")
                else:
                    print(f"       --> Frame Rip failed: {data.get('error')}")
            else:
                print(f"       --> API Server HTTP Code: {resp.status_code}")
        except Exception as e:
            print(f"       --> Connection to local FFmpeg broker failed: {e}")
            
    print("[*] AI Synthesis completely assembled! Overwriting Cloud UI State...")
    
    new_widget = CourseWidget(
        module_id=args.module_id,
        type="markdown",
        payload={
            "content": final_markdown
        },
        order=99
    )
    db.add(new_widget)
    db.commit()
    print("[*] DONE! Instantly Refresh your Web Dashboard's active Curriculum Module to view the synthesized WYSIWYG notes!")

if __name__ == "__main__":
    main()
