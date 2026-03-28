import { Link, useLocation, useNavigate, Outlet, useParams } from 'react-router-dom';
import { FileText, BriefcaseBusiness, BookOpen, PenTool, ArrowLeft, Target, Loader2, PanelLeftClose, PanelLeftOpen, ChevronUp, ChevronDown, Plus, ExternalLink, Link as LinkIcon, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { EditableField } from './EditableField';

export default function PreparationWorkspaceShell() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const { prepId } = useParams();

  const [prep, setPrep] = useState<{ id: string; title: string; company: string; resumes?: any[]; jds?: any[]; courses?: any[]; links?: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  // Remember the global Show/Hide preference in the browser cache
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('isWorkspaceSidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('isWorkspaceSidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Fetch the active target preparation context
  useEffect(() => {
    if (!prepId) return;
    fetch(`/api/v1/preparations/${prepId}`)
      .then(res => {
         if (!res.ok) throw new Error("Preparation essentially unmapped or out of bounds.");
         return res.json();
      })
      .then(data => {
         setPrep(data);
         setLoading(false);
      })
      .catch(() => {
         setPrep(null);
         setLoading(false);
      });
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

  if (!prep && !loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 flex-col gap-4 p-8 text-center">
        <Target className="w-12 h-12 text-rose-500 mb-2" />
        <h2 className="text-2xl font-black text-slate-800">Workspace Context Not Found</h2>
        <p className="text-slate-500 max-w-md">The requested Preparation record does not exist in the current Postgres database pool. Please navigate back to your Home Dashboard to select an active workflow.</p>
        <button onClick={() => navigate('/')} className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all">Return Home</button>
      </div>
    );
  }

  const currentPrepId = prepId || 'unknown';



  const handleUpdateTitle = async (newTitle: string) => {
    if (!prep || prep.title === newTitle) return;
    
    // Convert populated objects back to simple ID arrays for the Backend Pydantic Schema wrapper
    const putPayload = {
      ...prep,
      title: newTitle,
      course_ids: prep.courses?.map((c: any) => c.id) || [],
      resume_ids: prep.resumes?.map((r: any) => r.id) || [],
      jd_ids: prep.jds?.map((j: any) => j.id) || []
    };

    // Optimistic UI update
    setPrep({ ...prep, title: newTitle });
    
    try {
      await fetch(`/api/v1/preparations/${currentPrepId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putPayload)
      });
    } catch (e) {
      console.error("Failed to update prep title", e);
    }
  };

  const handleAddLink = async () => {
    const url = prompt("Enter the exact URL to bind to this Workspace (e.g. /static-notes/aws-architect or https://google.com):");
    if (!url) return;
    
    const title = prompt("Enter a short recognizable Title for this Bookmark:");
    if (!title) return;

    if (!prep) return;
    const currentLinks = Array.isArray(prep.links) ? prep.links : (typeof prep.links === 'string' && prep.links ? JSON.parse(prep.links) : []);
    
    const newLinks = [...currentLinks, { title, url }];
    
    const putPayload = {
      ...prep,
      course_ids: prep.courses?.map((c: any) => c.id) || [],
      resume_ids: prep.resumes?.map((r: any) => r.id) || [],
      jd_ids: prep.jds?.map((j: any) => j.id) || [],
      links: newLinks
    };

    setPrep({ ...prep, links: newLinks });
    
    try {
      await fetch(`/api/v1/preparations/${currentPrepId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putPayload)
      });
    } catch (e) {
      console.error("Failed to add link", e);
    }
  };

  const handleDeleteLink = async (index: number) => {
    if (!prep) return;
    const currentLinks = Array.isArray(prep.links) ? prep.links : (typeof prep.links === 'string' && prep.links ? JSON.parse(prep.links) : []);
    const newLinks = currentLinks.filter((_: any, i: number) => i !== index);

    const putPayload = {
      ...prep,
      course_ids: prep.courses?.map((c: any) => c.id) || [],
      resume_ids: prep.resumes?.map((r: any) => r.id) || [],
      jd_ids: prep.jds?.map((j: any) => j.id) || [],
      links: newLinks
    };

    setPrep({ ...prep, links: newLinks });
    
    try {
      await fetch(`/api/v1/preparations/${currentPrepId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putPayload)
      });
    } catch (e) {
      console.error("Failed to delete link", e);
    }
  };

  const moveCourse = async (e: React.MouseEvent, index: number, direction: 'up' | 'down') => {
    e.preventDefault();
    e.stopPropagation();
    if (!prep || !prep.courses) return;
    
    const newCourses = [...prep.courses];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newCourses.length) return;
    
    // Swap
    const temp = newCourses[index];
    newCourses[index] = newCourses[targetIndex];
    newCourses[targetIndex] = temp;
    
    setPrep({ ...prep, courses: newCourses });
    
    // API Call
    try {
      await fetch(`/api/v1/preparations/${currentPrepId}/courses/reorder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_ordered_ids: newCourses.map(c => c.id) })
      });
    } catch (err) {
      console.error("Failed to reorder courses", err);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      
      {/* 1. Contextual Workspace Sidebar Table of Contents */}
      <nav className={`${isSidebarOpen ? 'w-72' : 'w-0'} shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col z-50 shadow-2xl relative transition-all duration-300 ease-in-out`}>
        <div className={`flex flex-col h-full w-72 pt-5 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
           <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 p-1 bg-slate-800 rounded absolute right-4 top-4"
              title="Collapse Workspace"
           >
              <PanelLeftClose className="w-4 h-4" />
           </button>

          {/* Minimalist Sidebar Title Block */}
          <div className="px-6 pb-5 mb-4 border-b border-slate-800/50 mt-1">
             <div className="relative group w-full">
               <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1 block">Workspace Target</span>
               <EditableField 
                  value={prep?.title || 'Loading Context...'} 
                  onChange={handleUpdateTitle}
                  className="text-white font-black text-xl line-clamp-2 bg-transparent hover:bg-slate-800 focus:bg-slate-800 outline-none w-full cursor-pointer px-1 -ml-1 rounded transition-colors"
               />
             </div>
          </div>

        <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-6 scrollbar-hide">
          
          {/* Main Content Sections */}
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-3 block">Requirement</span>
            <div className="flex flex-col gap-1">
              <Link 
                to={`/prep/${currentPrepId}/notes`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${path.includes('/notes') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <PenTool className="w-4 h-4" />
                Notes
              </Link>
              
              {prep?.resumes && prep.resumes.length > 0 && (
                <Link 
                  to={`/prep/${currentPrepId}/resume`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${path.includes('/resume') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </Link>
              )}

              {prep?.jds && prep.jds.length > 0 && (
                <Link 
                  to={`/prep/${currentPrepId}/jd`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${path.includes('/jd') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  <BriefcaseBusiness className="w-4 h-4" />
                  Job Description
                </Link>
              )}

              <Link 
                to={`/prep/${currentPrepId}/courses`}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 font-bold text-sm ${path.endsWith('/courses') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  Curriculum Hub
                </div>
                <div className="w-5 h-5 rounded flex items-center justify-center bg-slate-800/50 text-[10px] text-slate-500">
                  {prep?.courses?.length || 0}
                </div>
              </Link>
            </div>
          </div>

          {/* Custom Resource Links (Internal & External) */}
          <div className="mt-2">
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Bookmarks & Static Links</span>
              <button 
                 onClick={handleAddLink}
                 className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-indigo-600 transition-colors shadow-sm"
                 title="Add External Bookmark or Internal Static Page URL"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-1">
              {(Array.isArray(prep?.links) ? prep.links : (typeof prep?.links === 'string' && prep.links ? JSON.parse(prep.links) : [])).map((link: any, i: number) => {
                 const isExternal = link.url.startsWith('http');
                 return (
                  <div key={i} className="group flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/80 transition-all font-medium text-sm border border-transparent hover:border-slate-700/50">
                     <div 
                        className="flex items-center gap-3 w-full cursor-pointer group-hover:text-white transition-colors" 
                        onClick={() => {
                          if (isExternal) window.open(link.url, '_blank', 'noopener,noreferrer');
                          else navigate(link.url);
                        }}
                     >
                        {isExternal ? <ExternalLink className="w-4 h-4 text-emerald-500 shrink-0" /> : <LinkIcon className="w-4 h-4 text-rose-400 shrink-0" />}
                        <span className="line-clamp-1 truncate block max-w-[130px] group-hover:underline">{link.title}</span>
                     </div>
                     <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteLink(i); }} 
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-rose-500 hover:bg-slate-700 rounded-lg transition-all shrink-0 ml-1"
                        title="Delete Bookmark"
                     >
                       <Trash2 className="w-3.5 h-3.5" />
                     </button>
                  </div>
                 );
              })}
              
              {(!prep?.links || (Array.isArray(prep.links) ? prep.links : JSON.parse(prep.links || '[]')).length === 0) && (
                 <div 
                    className="px-3 py-3 rounded-xl border-2 border-dashed border-slate-800/60 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-900/30 mx-1 mt-1 text-center cursor-pointer hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-900/20 transition-all uppercase tracking-wider shadow-inner" 
                    onClick={handleAddLink}
                 >
                   <Plus className="w-3 h-3" /> Attach Bound URLs
                 </div>
              )}
            </div>
          </div>

          {/* Connected Curriculum Courses */}
          {prep?.courses && prep.courses.length > 0 && (
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-3 block">Courses</span>
              <div className="flex flex-col gap-1">

                {prep.courses.map((course: any, index: number) => {
                  const isCourseActive = path.includes(`/courses/${course.id}`);
                  const currentModuleParam = new URLSearchParams(window.location.search).get('module');
                  
                  return (
                  <div key={course.id} className="flex flex-col gap-0.5 mt-0.5">
                    <Link 
                      to={`/prep/${currentPrepId}/courses/${course.id}`}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${isCourseActive && !currentModuleParam ? 'text-indigo-400 bg-indigo-600/20 shadow-inner' : isCourseActive ? 'text-white bg-slate-800/80 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className={`w-4 h-4 ${isCourseActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <span className="line-clamp-1 truncate block max-w-[130px]">{course.title}</span>
                      </div>
                      
                      <div className="flex flex-col gap-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => moveCourse(e, index, 'up')}
                          disabled={index === 0}
                          className={`p-0.5 rounded transition-colors ${index === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={(e) => moveCourse(e, index, 'down')}
                          disabled={index === (prep.courses?.length || 0) - 1}
                          className={`p-0.5 rounded transition-colors ${index === (prep.courses?.length || 0) - 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </Link>

                    {/* Drill-Down Module Tree Selector */}
                    {isCourseActive && course.modules && course.modules.length > 0 && (
                      <div className="flex flex-col gap-1 mt-1 mb-2 ml-[1.6rem] border-l border-slate-700/50 pl-2">
                        {course.modules.map((mod: any) => {
                          const isModActive = currentModuleParam === String(mod.id);
                          return (
                            <div key={mod.id} className="flex flex-col">
                              <Link 
                                to={`/prep/${currentPrepId}/courses/${course.id}?module=${mod.id}`}
                                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all line-clamp-1 truncate block max-w-[170px] ${isModActive ? 'text-indigo-400 bg-indigo-900/30 border border-indigo-800/30' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border border-transparent'}`}
                              >
                                {mod.title}
                              </Link>
                              
                              {isModActive && mod.widgets && mod.widgets.length > 0 && (
                                <div className="flex flex-col gap-1 mt-1 mb-1 ml-2 border-l border-slate-700/30 pl-2">
                                  {mod.widgets.filter((w: any) => w.widget_type !== 'youtube').map((widget: any) => (
                                    <button
                                      key={widget.id}
                                      onClick={() => {
                                        const el = document.getElementById(`widget-${widget.id}`);
                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                      }}
                                      className="text-left px-2 py-1.5 rounded-md text-[10px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors line-clamp-2"
                                    >
                                      {widget.widget_type === 'markdown' ? '📝 ' : '⚡ '} 
                                      {widget.payload?.title || 'Widget Component'}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )})}
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
        </div>
      </nav>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
        
        {/* Floating Open Button (visible only when Sidebar is collapsed) */}
        {!isSidebarOpen && (
          <button 
             onClick={() => setIsSidebarOpen(true)}
             className="absolute top-4 left-4 z-50 w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors focus:outline-none"
             title="Expand Workspace"
          >
             <PanelLeftOpen className="w-4 h-4" />
          </button>
        )}

        {/* Content Outlet */}
        <main className="flex-1 w-full relative overflow-hidden flex flex-col">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
