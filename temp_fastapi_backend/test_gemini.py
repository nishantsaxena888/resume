import os
import json
from google import genai
from google.genai import types
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("GEMINI_API_KEY")

class SectionNote(BaseModel):
    heading: str
    markdown_content: str
    snapshot_timestamp: float

class GeneratedNotes(BaseModel):
    sections: list[SectionNote]

client = genai.Client(api_key=api_key)
prompt = "Give me 1 section note about AWS lambda."

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
    print("SUCCESS JSON:", response.text)
except Exception as e:
    print("EXCEPTION CAUGHT:", e)
