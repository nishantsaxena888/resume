import { useResume } from '../../context/resumeBuilder/ResumeContext';
import { Download, Book, SlidersHorizontal } from 'lucide-react';
import ConfigSidebar from './ConfigSidebar';

export default function TopBar() {
  const { setIsConfigOpen } = useResume();

  return (
    <>
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm print:hidden">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="font-extrabold text-lg tracking-tighter text-slate-800 flex items-center gap-2">
              <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xl shadow-inner shadow-indigo-900/20">R</span>
              Resume Engine
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-widest ml-2 border border-slate-200">v1.2.0</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsConfigOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 bg-slate-50 border border-slate-200 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 text-sm font-semibold rounded-lg transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" /> System Config
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            <button 
              onClick={() => window.location.href = '/docs'}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 text-sm font-medium rounded-lg transition-colors"
            >
              <Book className="w-4 h-4" /> Syllabus
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
