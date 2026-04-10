from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from database import get_db
from book.models import Book, BookChapter, BookWidget

router = APIRouter()

# --- Pydantic Schemas for the Book Engine ---

class BookWidgetResponse(BaseModel):
    id: int
    position: int
    widget_type: str
    payload: Dict[Any, Any]
    
    class Config:
        orm_mode = True
        from_attributes = True

class BookChapterResponse(BaseModel):
    id: int
    position: int
    chapter_number: int
    title: str
    widgets: List[BookWidgetResponse] = []
    
    class Config:
        orm_mode = True
        from_attributes = True

class BookResponse(BaseModel):
    id: int
    title: str
    author: str
    chapters: List[BookChapterResponse] = []
    
    class Config:
        orm_mode = True
        from_attributes = True

# --- Book API Endpoints ---

@router.get("/", response_model=List[BookResponse])
def get_all_books(db: Session = Depends(get_db)):
    """Fetches all books in the database (lightweight TOC only usually, but deeply nested for ease and speed currently)."""
    books = db.query(Book).order_by(Book.id.desc()).all()
    return books

@router.get("/{book_id}", response_model=BookResponse)
def get_book_by_id(book_id: int, db: Session = Depends(get_db)):
    """Gets a specific book fully hydrated with chapters and nested polymorphic widgets."""
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found natively in the PostgreSQL environment.")
        
    return book

# --- Widget Mutators (For Live IDE Persistence) ---
@router.put("/widgets/{widget_id}")
def update_book_widget(widget_id: int, payload: Dict[Any, Any], db: Session = Depends(get_db)):
    """
    Called by the Frontend when a student types code into MonacoEditor 
    or moves ReactFlow nodes around, persisting the JSONB natively.
    """
    db_widget = db.query(BookWidget).filter(BookWidget.id == widget_id).first()
    if not db_widget:
        raise HTTPException(status_code=404, detail="Widget not found")
        
    db_widget.payload = payload
    db.commit()
    db.refresh(db_widget)
    return {"status": "success", "widget_id": widget_id, "message": "State successfully converged into Postgres JSONB mapping."}
