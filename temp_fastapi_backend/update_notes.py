from database import SessionLocal
from models import Preparation, PreparationNote
db = SessionLocal()

prep_id = "prep-7e172486"
prep = db.query(Preparation).filter_by(id=prep_id).first()

if prep:
    with open('/Users/nishantsaxena/workspace/resume/answer.txt', 'r') as f:
        content = f.read()

    # Convert basic markdown to HTML for the WYSIWYG editor
    html_content = content.replace('\n', '<br>').replace('**', '<b>').replace('***', '<hr>')
    
    if prep.notes:
        prep.notes.content = html_content
    else:
        new_note = PreparationNote(preparation_id=prep_id, content=html_content)
        db.add(new_note)
        
    db.commit()
    print("SUCCESS")
else:
    print("PREP NOT FOUND")
