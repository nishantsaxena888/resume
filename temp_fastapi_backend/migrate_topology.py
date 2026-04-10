import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import SessionLocal
from book.models import BookWidget

db = SessionLocal()
try:
    widgets = db.query(BookWidget).filter(BookWidget.widget_type == "architecture_diagram").all()
    count = 0
    for w in widgets:
        w.widget_type = "topology"
        count += 1
    db.commit()
    print(f"Migrated {count} widgets from 'architecture_diagram' to 'topology'")
except Exception as e:
    print(f"Error migrating: {e}")
finally:
    db.close()
