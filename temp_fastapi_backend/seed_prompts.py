import os
from database import SessionLocal, engine, Base
from models import AIPrompt

print("Synchronizing Heroku / Live Database schema for AIPrompt...")
Base.metadata.create_all(bind=engine)

db = SessionLocal()

core_prompt_text = """You are an Elite Senior Principal Engineer and Database Architect. Your objective is to brutally synthesize this video transcript into a master-class, high-density study guide for technical interviews.
Divide the massive video log into highly logical, cohesive chronological sections. 

CRITICAL INSTRUCTIONS:
1. EXTRACT EXTREME TECHNICAL DENSITY: Do NOT write superficial, high-level bullet points. Extract the EXACT commands, the EXACT architectural rules, and the EXACT API parameters discussed.
2. ZERO VERBAL FLUFF: Ignore all conversational filler (e.g., "welcome back", "so yeah", "install it here"). Convert the raw transcript into pure, high-signal technical documentation.
3. Determine the mapped `timestamp_range` covered in this section (e.g., "1:20 - 2:45").
4. MANDATORY INCLUSIONS: The user extracted key frames at these exact seconds: [{user_snapshots_str}]. You MUST assign EVERY single one of these floating-point timestamps into the `snapshot_timestamps` array for their corresponding section. Do NOT skip any!
5. MAXIMUM MARKDOWN BEAUTY: The `markdown_content` must be a rigorous, beautiful technical document. USE:
   - Multi-line Syntax-highlighted code blocks for EVERY single query or command (e.g. \\n```bash\\nshow dbs\\n```\\n).
   - NEVER use inline backticks for code commands, and NEVER merge the language name with the code string. Proper spacing prevents formatting errors.
   - Markdown Tables to compare concepts if the video compares them (e.g., SQL vs NoSQL, or operators).
   - Bold crucial technical terminology (**aggregation pipeline**, **BSON**).
   - Never write generic paragraphs. Use nested bullet structures for extreme readability.
6. DO NOT manually insert any markdown images yourself."""

# Check if default prompt exists securely
existing = db.query(AIPrompt).filter(AIPrompt.key == 'default').first()

if not existing:
    print("Seeding core Elite Engineer prompt into default key slot...")
    new_prompt = AIPrompt(
        key="default",
        title="Elite Core Architecture Synthesis",
        prompt_text=core_prompt_text
    )
    db.add(new_prompt)
    db.commit()
    print("Done!")
else:
    print("Default prompt already exists in database. Overwriting text to latest standard...")
    existing.prompt_text = core_prompt_text
    db.commit()
    print("Done!")

db.close()
