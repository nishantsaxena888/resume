import { Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_DjangoPage() {
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
              <Globe className="w-10 h-10 print:w-8 print:h-8 text-blue-400" />
            </div>
            <div>
              <h1 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-5xl print:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Python: Django Backend
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                ORM Models, Views, and N+1 Query Optimizations
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION 1: MODELS & ORM --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             1. Standard Snippet: Models & Querysets
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# models.py
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    # Automatically creates SQL Foreign Key and reverse relationship (author.books.all())
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="books")
    published_date = models.DateField(auto_now_add=True)

# -----------------
# INTERVIEW: Querying the DB (Standard Snippets)
# -----------------
# 1. Fetching
authors = Author.objects.all()
author = Author.objects.get(id=1)           # Crashes if not found (Raises DoesNotExist)
safe_author = Author.objects.filter(id=1).first() # Returns None if not found (SAFE)

# 2. Creating
new_book = Book.objects.create(title="Django Guide", author_id=1)

# 3. Filtering
recent_books = Book.objects.filter(published_date__year=2024)
title_search = Book.objects.filter(title__icontains="django")`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE N+1 QUERY TRAP --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             2. Interview Mechanics: N+1 Optimization
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# INTERVIEW QUESTION: "How do you optimize Database Queries in Django?"
# The N+1 Problem: Iterating through an un-optimized queryset fires a brand new SQL query for EVERY loop iteration.

# THE TRAP (100 Books = 101 SQL Queries!)
books = Book.objects.all()
for book in books:
    print(book.author.name) # Fires a fresh DB hit here!

# THE FIX: select_related (For ForeignKeys / One-to-One)
# Forces a SQL INNER JOIN so authors are fetched immediately in 1 single Query
books = Book.objects.select_related("author").all()
for book in books:
    print(book.author.name)

# THE FIX: prefetch_related (For Many-to-Many / Reverse Lookups)
# Performs 2 isolated SQL queries and merges them natively in Python RAM
authors = Author.objects.prefetch_related("books").all()
for author in authors:
    print([book.title for book in author.books.all()])`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: VIEWS & ROUTING --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             3. Standard Snippet: Views & URLs
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# views.py
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Book

# 1. Standard HTML Rendering
def book_list(request):
    books = Book.objects.all()
    # Renders the exact variables into a standard HTML template
    return render(request, "books/list.html", {"books": books})

# 2. Modern JSON API Response
def book_detail(request, book_id):
    # Safely fetches or throws 404 instantly
    book = get_object_or_404(Book, id=book_id)
    return JsonResponse({
        "title": book.title,
        "author": book.author.name
    })

# -----------------
# urls.py
# -----------------
from django.urls import path
from . import views

urlpatterns = [
    path("books/", views.book_list, name="book_list"),
    path("books/<int:book_id>/", views.book_detail, name="book_detail"),
]`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: DJANGO REST FRAMEWORK (DRF) --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             4. Standard Snippet: Django Rest Framework (DRF)
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# serializers.py
from rest_framework import serializers
from .models import Book

# 1. THE SERIALIZER: Converts complex ORM models to/from native Python JSON
class BookSerializer(serializers.ModelSerializer):
    # Automatically extracts Author's __str__ string representation instead of raw integer ID
    author_name = serializers.StringRelatedField(source='author', read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author_name', 'published_date']

# -----------------
# views.py
# -----------------
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# 2. THE VIEWSET: Automatically generates all C.R.U.D endpoints instantly!
class BookViewSet(viewsets.ModelViewSet):
    # CRITICAL: Use select_related here to prevent N+1 Queries when Serializing!
    queryset = Book.objects.select_related('author').all()
    serializer_class = BookSerializer
    
    # Strictly lock down the endpoint
    permission_classes = [IsAuthenticated]

# -----------------
# urls.py
# -----------------
from rest_framework.routers import DefaultRouter
from django.urls import path, include

# 3. THE ROUTER: Automatically maps the ViewSet to /api/books/ and /api/books/1/
router = DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
