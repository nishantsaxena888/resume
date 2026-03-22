import { useResume } from '../../context/resumeBuilder/ResumeContext';
import { Download, Book, Save, Loader2, ArrowLeft } from 'lucide-react';
import ConfigSidebar from './ConfigSidebar';

export default function TopBar() {
  const { isSaving, isSaved, hasChanges, saveToDatabase } = useResume();
  const hash = window.location.hash.replace('#', '');

  return (
    <>
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm print:hidden">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="font-extrabold text-lg tracking-tighter text-slate-800 flex items-center gap-2">
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xl shadow-inner shadow-indigo-900/20">R</span>
              Resume Engine
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold tracking-widest ml-2 border border-emerald-200">Live PostgreSQL Sync</span>
          </div>

          <div className="flex items-center gap-3">
          
            {hash && hash.startsWith('prep-') && (
              <button 
                onClick={() => window.location.href = `/prep/${hash}/courses`}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors mr-2 border border-slate-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Workspace
              </button>
            )}

            <button 
              onClick={saveToDatabase}
              disabled={isSaving || (!hasChanges && !isSaved)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 shadow-sm hover:shadow active:scale-95 transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
              {isSaving ? "Syncing..." : isSaved ? "Saved !" : "Save"}
            </button>

            <button 
              onClick={() => window.location.href = '/docs'}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 text-sm font-medium rounded-lg transition-colors"
            >
              <Book className="w-4 h-4" /> Developer Docs
            </button>

            <button 
              onClick={() => window.location.href = '/ns-docs'}
              className="flex items-center gap-2 px-3 py-2 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 text-sm font-bold rounded-lg transition-colors shadow-sm"
            >
              NS-Docs
            </button>

            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 shadow-sm hover:shadow active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      </div>
      
      {/* Mount the Sidebar globally beneath the TopBar z-index */}
      <ConfigSidebar />
    </>
  );
}
