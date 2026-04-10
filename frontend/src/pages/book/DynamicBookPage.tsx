import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookViewer } from '../../components/book/BookViewer';
import { MonacoWidget } from '../../components/book/widgets/MonacoWidget';
import { TopologyWidget } from '../../components/book/widgets/TopologyWidget';
import { StepDetailsWidget } from '../../components/book/widgets/StepDetailsWidget';

export default function DynamicBookPage() {
  const { bookId, chapterNum } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);

  useEffect(() => {
    // If we have a specific bookId in the URL, fetch it. Otherwise get the latest.
    const fetchStrategy = bookId 
      ? Promise.resolve({ id: bookId })
      : fetch('/api/v1/book/')
          .then(res => res.json())
          .then(booksArray => {
            if (!booksArray || booksArray.length === 0) {
              throw new Error("No books exist in database.");
            }
            return { id: booksArray[0].id }; // Grab newest
          });

    fetchStrategy
      .then(target => fetch(`/api/v1/book/${target.id}`))
      .then(res => res.json())
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch dynamic book:", err);
        setLoading(false);
      });
  }, [bookId]);

  useEffect(() => {
    if (book && book.chapters && book.chapters.length > 0) {
      // Find the specific chapter or default to Chapter 1
      const target = chapterNum 
        ? book.chapters.find((c: any) => c.chapter_number.toString() === chapterNum) || book.chapters[0]
        : book.chapters.find((c: any) => c.chapter_number === 1) || book.chapters[0];
        
      setActiveChapterId(target.id);
      
      // Keep URL cleanly synchronized
      if (!chapterNum || target.chapter_number.toString() !== chapterNum) {
        navigate(`/books/${bookId || book.id}/${target.chapter_number}`, { replace: true });
      }
    }
  }, [book, chapterNum, navigate, bookId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfb] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#fcfcfb] flex items-center justify-center font-serif text-slate-500">
        Database connection failed. Ensure FastAPI is running and seed_engine.py was executed.
      </div>
    );
  }

  const activeChapter = book.chapters.find((c: any) => c.id === activeChapterId);
  if (!activeChapter) return null;

  // Map backend TOC format to the BookViewer Sidebar format
  const sidebarModules = book.chapters.map((c: any) => ({
    id: String(c.chapter_number),
    title: `${c.chapter_number}. ${c.title}`,
    active: c.id === activeChapterId
  }));

  const handleModuleSelect = (chapterNumberStr: string) => {
      navigate(`/books/${bookId}/${chapterNumberStr}`);
  };

  return (
    <BookViewer 
      title={book.title}
      chapterNumber={activeChapter.chapter_number}
      chapterTitle={activeChapter.title}
      sidebarModules={sidebarModules}
      onModuleSelect={handleModuleSelect}
    >
      {/* 
        This is the dynamic polymorphic engine! 
        It loops through all widgets in the Chapter and renders them natively 
        based entirely on the JSONB widget_type injected by the database. 
      */}
      {activeChapter.widgets.map((widget: any) => {
        
        if (widget.widget_type === 'markdown') {
          // We use dangerouslySetInnerHTML safely here as it's our authenticated curriculum
          return (
            <div key={widget.id} dangerouslySetInnerHTML={{ __html: widget.payload.content }} />
          );
        }

        if (widget.widget_type === 'step_details') {
          return (
            <StepDetailsWidget key={widget.id} payload={widget.payload} />
          );
        }
        
        if (widget.widget_type === 'topology') {
          return (
            <TopologyWidget 
              key={widget.id}
              initialNodes={widget.payload.nodes} 
              initialEdges={widget.payload.edges} 
              height={widget.payload.height || "400px"} 
              editable={true} 
            />
          );
        }
        
        if (widget.widget_type === 'monaco_lab') {
          return (
            <div key={widget.id} className="my-8">
              <MonacoWidget 
                language={widget.payload.language || "python"} 
                defaultCode={widget.payload.defaultCode} 
                height={widget.payload.height || "300px"}
                readOnly={false}
              />
            </div>
          );
        }

        return null;
      })}
      
      {activeChapter.chapter_number === 3 && (
        <div className="bg-emerald-900/10 border border-emerald-500/30 p-6 rounded-xl mt-8 font-sans">
          <h3 className="text-emerald-700 mt-0 text-sm tracking-widest uppercase">Database Status</h3>
          <p className="text-emerald-900/80 text-sm m-0">
            <strong>SUCCESS!</strong> Everything you see above was queried dynamically from PostgreSQL via FastAPI!
            The ReactFlow parameters, the Monaco code, and the Text are all rendered entirely from the `JSONB` native payloads.
          </p>
        </div>
      )}
    </BookViewer>
  );
}
