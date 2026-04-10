import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Library, BookOpen, Loader2, Calendar } from 'lucide-react';

interface LightweightBook {
  id: number;
  title: string;
  author: string;
  chapters: any[]; // Used just for counting
}

export default function BooksDashboardPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<LightweightBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/book/')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-transparent w-full font-sans pb-24">
      <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Interactive Books</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : books.length === 0 ? (
            <div className="col-span-full flex justify-center py-20 text-slate-400 font-medium">
              No interactive books found in the database.
            </div>
          ) : (
            books.map((book) => (
              <div 
                key={book.id}
                onClick={() => navigate(`/books/${book.id}`)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-slate-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                  
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Library className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full uppercase tracking-wider">Course Book</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1 relative z-10 group-hover:text-indigo-600 transition-colors">{book.title}</h3>
                  <p className="text-slate-500 font-medium relative z-10">{book.author}</p>
                </div>

                {/* Card Body - Stats */}
                <div className="p-6 bg-slate-50/50 flex flex-col gap-5 flex-1">
                  <div className="flex items-center justify-between text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-slate-400" /> {book.chapters?.length || 0} Interactive Chapters
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 group-hover:gap-2 transition-all">
                    Open Book
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
