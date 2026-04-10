import { FileText, ChevronRight, BookOpen, Menu, X, AlignLeft } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface BookViewerProps {
  title: string;
  chapterNumber: number;
  chapterTitle: string;
  sidebarModules: { id: string; title: string; active?: boolean }[];
  onModuleSelect: (id: string) => void;
  children: ReactNode;
}

export function BookViewer({ title, chapterNumber, chapterTitle, sidebarModules, onModuleSelect, children }: BookViewerProps) {
  const [isTocOpen, setIsTocOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcfcfb] flex flex-col font-sans text-slate-800 selection:bg-indigo-200">
      
      {/* Absolute Minimalist Book Header */}
      <header className="bg-white border-b border-slate-200/60 px-6 py-4 flex items-center gap-4 shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsTocOpen(!isTocOpen)}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-md transition-colors flex items-center gap-2"
          >
            <AlignLeft className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Contents</span>
          </button>
          <div className="w-px h-6 bg-slate-200" />
          <BookOpen className="w-5 h-5 text-indigo-600 hidden sm:block" />
          <span className="text-slate-900 font-bold tracking-tight">{title}</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded border border-amber-200 hidden sm:block">
            Preview Mode
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sleek Overlay TOC Sidebar */}
        {isTocOpen && (
          <div className="absolute inset-0 z-30 flex">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsTocOpen(false)}
            />
            
            {/* TOC Drawer */}
            <aside className="relative w-80 bg-[#fefefe] border-r border-slate-200/80 flex flex-col shadow-2xl animate-in slide-in-from-left-4 duration-200 h-full">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Table of Contents</h2>
                  <p className="text-sm font-bold text-slate-800 leading-tight">Advanced Systems Architecture</p>
                </div>
                <button onClick={() => setIsTocOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-md transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                {sidebarModules.map(mod => (
                  <button 
                    key={mod.id}
                    onClick={() => {
                      onModuleSelect(mod.id);
                      setIsTocOpen(false);
                    }}
                    className={`w-full flex items-center text-left px-3 py-3 rounded-lg text-sm font-medium transition-all group
                    ${mod.active 
                      ? 'bg-slate-50 text-indigo-700 border border-slate-200/60 shadow-sm' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}
                  >
                    <span className={`text-xs font-mono mr-3 ${mod.active ? 'text-indigo-400' : 'text-slate-300'}`}>0{mod.id}</span>
                    <span className="truncate">{mod.title.replace(/^[0-9.]+\s*/, '')}</span>
                    {mod.active && <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        )}

        {/* Central Book Reading Canvas - Kindle Aesthetic */}
        <main className="flex-1 overflow-y-auto bg-[#fcfcfb] z-20 custom-scrollbar">
          <div className="max-w-[800px] mx-auto px-6 py-12 sm:px-12 md:py-16">
            
            {/* Elegant Chapter Header (Kindle Style) */}
            <div className="mb-12 border-b border-slate-200 pb-8">
              <span className="text-xs font-bold text-indigo-500/80 uppercase tracking-widest mb-3 block font-sans">
                Chapter {chapterNumber}
              </span>
              <h1 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                {chapterTitle}
              </h1>
            </div>

            {/* Content Injection Zone - Kindle Book Typography Formatting */}
            <div className="
              relative 
              text-lg text-slate-800 leading-[1.8]
              [&>h2]:font-sans [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:mt-10 [&>h2]:mb-4
              [&>h3]:font-sans [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-slate-800 [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:mb-6
              [&>strong]:font-bold [&>strong]:text-slate-900
            " style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              {children}
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
