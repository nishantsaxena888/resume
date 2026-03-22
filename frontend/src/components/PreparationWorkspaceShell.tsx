import { Link, useLocation, useNavigate, Outlet, useParams } from 'react-router-dom';
import { FileText, BriefcaseBusiness, BookOpen, PenTool, LogOut, ArrowLeft, Target, Loader2, Trash2, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { EditableField } from './EditableField';

export default function PreparationWorkspaceShell() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { prepId } = useParams();

  const [prep, setPrep] = useState<{ id: string; title: string; company: string; resumes?: any[]; jds?: any[]; courses?: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the active target preparation context
  useEffect(() => {
    if (!prepId) return;
    fetch(`http://localhost:9999/api/v1/preparations/${prepId}`)
      .then(res => res.json())
      .then(data => {
         setPrep(data);
         setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [prepId]);

  if (path.includes('/docs') || path.includes('/ns-docs')) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 flex-col gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="text-sm font-bold text-slate-500 tracking-widest uppercase">Initializing Workspace...</span>
      </div>
    );
  }

  const currentPrepId = prepId || 'unknown';



  const handleUpdateTitle = async (newTitle: string) => {
    if (!prep || prep.title === newTitle) return;
    
    // Optimistic UI update
    setPrep({ ...prep, title: newTitle });
    try {
      await fetch(`http://localhost:9999/api/v1/preparations/${currentPrepId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...prep, title: newTitle })
      });
    } catch (e) {
      console.error("Failed to update prep title", e);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      
      {/* 1. Contextual Workspace Sidebar Table of Contents */}
      <nav className="w-72 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col py-6 z-50 shadow-2xl relative">
        <div className="px-6 mb-8 flex items-center justify-between">
           <div className="flex flex-col">
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Workspace Target</span>
             <h2 className="text-white font-black text-lg line-clamp-1">{prep?.title || 'Loading Context...'}</h2>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-6 scrollbar-hide">
          
          {/* Main Content Sections */}
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-3 block">Application Tools</span>
            <div className="flex flex-col gap-1">
              <Link 
                to={`/prep/${currentPrepId}/notes`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${path.includes('/notes') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <PenTool className="w-4 h-4" />
                Notes Section
              </Link>
              
              {prep?.resumes && prep.resumes.length > 0 && (
                <Link 
                  to={`/prep/${currentPrepId}/resume`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${path.includes('/resume') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  <FileText className="w-4 h-4" />
                  Target Resume Engine
                </Link>
              )}

              {prep?.jds && prep.jds.length > 0 && (
                <Link 
                  to={`/prep/${currentPrepId}/jd`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${path.includes('/jd') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  <BriefcaseBusiness className="w-4 h-4" />
                  Target JD
                </Link>
              )}
            </div>
          </div>

          {/* Connected Curriculum Courses */}
          {prep?.courses && prep.courses.length > 0 && (
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-3 block">Interactive Curriculum</span>
              <div className="flex flex-col gap-1">
                <Link 
                  to={`/prep/${currentPrepId}/courses`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${path.endsWith('/courses') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  <BookOpen className="w-4 h-4" />
                  Course Overview
                </Link>
                {prep.courses.map((course: any) => (
                  <Link 
                    key={course.id}
                    to={`/prep/${currentPrepId}/courses/${course.id}`}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${path.includes(`/courses/${course.id}`) ? 'text-white bg-slate-800/80 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <BookOpen className={`w-4 h-4 ${path.includes(`/courses/${course.id}`) ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="line-clamp-1">{course.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="px-4 mt-auto pt-6 border-t border-slate-800">
           <button onClick={() => navigate('/dashboard')} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-colors">
             <ArrowLeft className="w-4 h-4" />
             Exit Workspace
           </button>
        </div>
      </nav>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
        
        {/* Workspace Identification Topbar */}
        <header className="h-[60px] shrink-0 bg-white border-b border-slate-200 flex items-center px-6 justify-between z-40 shadow-sm relative">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
               <Target className="w-4 h-4" />
             </div>
             {loading ? (
               <div className="flex items-center gap-2 text-slate-400">
                 <Loader2 className="w-4 h-4 animate-spin" />
                 <span className="text-sm font-medium">Loading Workspace Context...</span>
               </div>
             ) : (
               <div className="flex items-center gap-2 flex-1">
                 <span className="text-sm font-black text-slate-900 tracking-tight inline-block min-w-[250px]">
                   <EditableField 
                      value={prep?.title || `Preparation Workspace #${currentPrepId}`} 
                      onChange={handleUpdateTitle} 
                      className="font-black"
                   />
                 </span>
                 {prep?.company && (
                   <>
                     <span className="text-slate-300">•</span>
                     <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{prep.company}</span>
                   </>
                 )}
               </div>
             )}
          </div>
          <div className="flex items-center gap-3">
             {/* Action items removed per Founder request */}
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 w-full relative overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
