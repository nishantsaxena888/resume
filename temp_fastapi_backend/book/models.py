from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime

# Import the centralized Base from the main database module
from database import Base

class Book(Base):
    """The master book model. Holds TOC and interactive flow."""
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    preparation_id = Column(String, ForeignKey("preparations.id", ondelete="SET NULL"), nullable=True)
    title = Column(String, nullable=False)
    author = Column(String, default="System Data")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    chapters = relationship("BookChapter", back_populates="book", cascade="all, delete-orphan", order_by="BookChapter.position")

class BookChapter(Base):
    """The Chapters/Sections of the Book."""
    __tablename__ = "book_chapters"
    id = Column(Integer, primary_key=True, index=True)
    book_id = Column(Integer, ForeignKey("books.id", ondelete="CASCADE"))
    position = Column(Integer, default=0) # Controls chapter ordering
    chapter_number = Column(Integer, default=1)
    title = Column(String, nullable=False)
    
    book = relationship("Book", back_populates="chapters")
    widgets = relationship("BookWidget", back_populates="chapter", cascade="all, delete-orphan", order_by="BookWidget.position")

class BookWidget(Base):
    """The payload holder for polymorphic Widgets (Monaco, ReactFlow, Markdown)."""
    __tablename__ = "book_widgets"
    id = Column(Integer, primary_key=True, index=True)
    chapter_id = Column(Integer, ForeignKey("book_chapters.id", ondelete="CASCADE"))
    position = Column(Integer, default=0)
    widget_type = Column(String, nullable=False) # 'markdown', 'monaco_lab', 'react_flow_lab'
    
    # The infinitely extendible JSON block for storing code schemas, graphs, text, etc.
    payload = Column(JSON, nullable=False)
    
    chapter = relationship("BookChapter", back_populates="widgets")
