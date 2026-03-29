import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Maximize, Minimize, PlusSquare, ChevronDown, ChevronRight, Edit2, Trash2, Check, X } from 'lucide-react';
import { WidgetRenderer } from '../components/widgets/WidgetRenderer';

export default function InterviewPrepPage() {
  const { courseId } = useParams();
  const [courseTitle, setCourseTitle] = useState("");
  const [openWidgets, setOpenWidgets] = useState<Record<number, boolean>>({});
  const [modules, setModules] = useState<any[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<number | string | null>(null);
  const [isEditingModule, setIsEditingModule] = useState(false);
  const [editModuleTitle, setEditModuleTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      setIsLoading(true);
      fetch(`/api/v1/courses/${courseId}/curriculum`)
        .then(res => res.json())
        .then(data => {
          if (data && data.title) {
            setCourseTitle(data.title);
            setModules(data.modules || []);
            
            // Sync with URL Query Param or Fallback
            const urlModuleId = searchParams.get('module');
            if (urlModuleId) {
              setActiveModuleId(Number(urlModuleId));
            } else {
              setActiveModuleId(null);
            }
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [courseId]);

  // Sync state if URL changes dynamically via Outer Shell
  useEffect(() => {
    const urlModuleId = searchParams.get('module');
    if (urlModuleId && activeModuleId !== Number(urlModuleId)) {
      setActiveModuleId(Number(urlModuleId));
    } else if (!urlModuleId && activeModuleId !== null) {
      setActiveModuleId(null);
    }
  }, [searchParams, activeModuleId]);

  const [isFocusMode, setIsFocusMode] = useState(false);

  const activeModule = modules.find(m => m.id === activeModuleId);

  const addModule = async () => {
    const title = prompt("Enter new module name:");
    if (!title) return;
    try {
      const res = await fetch(`/api/v1/courses/${courseId}/modules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, position: modules.length })
      });
      if (res.ok) {
        const newMod = await res.json();
        setModules([...modules, { ...newMod, widgets: [] }]);
        setActiveModuleId(newMod.id);
      }
    } catch (e) { console.error(e); }
  };

  const saveModuleTitle = async () => {
    if (!activeModuleId || !editModuleTitle.trim()) return;
    try {
      const res = await fetch(`/api/v1/modules/${activeModuleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editModuleTitle })
      });
      if (res.ok) {
        setModules(modules.map(m => m.id === activeModuleId ? { ...m, title: editModuleTitle } : m));
        setIsEditingModule(false);
      }
    } catch(e) {}
  };

  const deleteModule = async () => {
    if (!activeModuleId) return;
    if (!window.confirm("Are you securely authorizing the formal permanent deletion of this Module and ALL its underlying Curriculum Widgets?")) return;
    try {
      const res = await fetch(`/api/v1/modules/${activeModuleId}`, { method: 'DELETE' });
      if (res.ok) {
        setModules(modules.filter(m => m.id !== activeModuleId));
        setActiveModuleId(null);
      }
    } catch(e) {}
  };

  const [showWidgetMenu, setShowWidgetMenu] = useState(false);

  const addWidget = async (type: string) => {
    if (!activeModuleId) return;
    
    let payload = {};
    if (type === 'markdown') payload = { title: "", content: "" };
    else if (type === 'flashcard') payload = { question: "", answer: "" };
    else if (type === 'youtube') payload = { title: "", url: "" };
    else if (type === 'code_snippet') payload = { language: "python", snippet: "" };
    else if (type === 'video_embed') payload = { videoUrl: "" };

    const activeMod = modules.find(m => m.id === activeModuleId);
    if (!activeMod) return;

    try {
      const res = await fetch(`/api/v1/modules/${activeModuleId}/widgets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widget_type: type, payload, position: activeMod.widgets?.length || 0 })
      });
      if (res.ok) {
        const newWidget = await res.json();
        const updatedModules = modules.map(m => {
          if (m.id === activeModuleId) {
            return { ...m, widgets: [...(m.widgets || []), newWidget] };
          }
          return m;
        });
        setModules(updatedModules);
        setShowWidgetMenu(false);
      }
    } catch (e) { console.error(e); }
  };

  const updateWidgetPayload = async (widgetId: number, newPayload: any) => {
    try {
      const res = await fetch(`/api/v1/widgets/${widgetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPayload)
      });
      if (res.ok) {
        setModules(modules.map(m => m.id === activeModuleId ? {
          ...m, widgets: m.widgets.map((w: any) => w.id === widgetId ? { ...w, payload: newPayload } : w)
        } : m));
      }
    } catch (e) { console.error(e); }
  };

  const removeWidget = async (widgetId: number) => {
    if (!window.confirm("Are you securely authorizing the formal deletion of this Curriculum Widget? This action cannot be reversed.")) return;
    try {
      const res = await fetch(`/api/v1/widgets/${widgetId}`, { method: 'DELETE' });
      if (res.ok) {
        setModules(modules.map(m => ({
          ...m,
          widgets: m.widgets?.filter((w: any) => w.id !== widgetId)
        })));
      }
    } catch (e) { console.error(e); }
  };



  // Sync React state accurately if User naturally exits Fullscreen via 'Esc' key hardware event
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsFocusMode(false);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const navigateToWidget = (moduleId: number, widgetId: number) => {
    setSearchParams({ module: moduleId.toString() });
    
    // Auto-open Accordion when navigating to it from Index
    setOpenWidgets(prev => ({ ...prev, [widgetId]: true }));
    
    setTimeout(() => {
      const el = document.getElementById(`widget-${widgetId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200); // Allow render cycle
  };

  const toggleWidget = (widgetId: number) => {
    setOpenWidgets(prev => ({ ...prev, [widgetId]: prev[widgetId] === undefined ? false : !prev[widgetId] }));
  };

  const navigateToModule = (moduleId: number) => {
    setSearchParams({ module: moduleId.toString() });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Expansive Full-Screen Canvas Layout (Zero Sidebars) */}
      <main className="flex-1 flex overflow-hidden h-[100vh] relative">
        {/* Right Canvas Layout (Polymorphic Widget Renderer) */}
        <section id="course-zen-canvas" className={`bg-slate-50 overflow-y-auto p-8 relative transition-all duration-300 ${isFocusMode ? 'fixed inset-0 z-[100] w-screen h-screen' : 'flex-1'}`}>
          
          <div className="absolute top-6 right-8 flex items-center gap-3 z-50">
             <button 
                onClick={addModule} 
                className={`py-2 px-4 bg-white text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-sm font-bold flex justify-center items-center gap-2 transition-all shadow-sm ${isFocusMode ? 'hidden' : 'flex'}`}
             >
               <PlusSquare className="w-4 h-4" /> Add Module Node
             </button>
             
             <button 
                onClick={() => {
                   const nextMode = !isFocusMode;
                   setIsFocusMode(nextMode);
                   try {
                     if (nextMode) {
                       document.getElementById('course-zen-canvas')?.requestFullscreen?.();
                     } else {
                       if (document.fullscreenElement) {
                         document.exitFullscreen?.();
                       }
                     }
                   } catch (e) {
                     console.error("Fullscreen API not supported", e);
                   }
                }}
                className={`p-2.5 rounded-xl border transition-all duration-300 shadow-sm focus:outline-none 
                  ${isFocusMode ? 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:text-indigo-600 hover:bg-slate-50'}
                `}
                title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
             >
                {isFocusMode ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
             </button>
          </div>
          
          {/* Dynamic Configuration Driven Course Index */}
          {!activeModuleId && !isLoading ? (
            <div className="max-w-4xl mx-auto py-12 px-8 z-10 relative">
               <h1 className="text-4xl font-black text-slate-900 mb-8 border-b-4 border-indigo-600 pb-4 inline-block tracking-tight">{courseTitle} • Dynamic Engine Index</h1>
               <div className="grid gap-8">
                 {modules.map((mod: any, idx: number) => (
                   <div key={mod.id} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                     <h2 className="flex items-center gap-4 text-2xl font-bold text-slate-800 mb-6 cursor-pointer hover:text-indigo-600 transition-colors"
                         onClick={() => navigateToModule(mod.id)}>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">{idx + 1}</div>
                        {mod.title}
                     </h2>
                     {mod.widgets && mod.widgets.length > 0 ? (
                       <ul className="space-y-3 ml-14">
                         {mod.widgets.map((w: any) => (
                           <li key={w.id} className="flex flex-col gap-1">
                             <button
                               onClick={() => navigateToWidget(mod.id, w.id)}
                               className="text-left text-slate-600 hover:text-indigo-600 font-medium hover:underline text-lg flex items-center gap-3 transition-colors"
                             >
                                <span className="text-xl bg-slate-50 p-2 rounded-xl text-slate-500 shadow-sm border border-slate-100 group-hover:bg-indigo-50">
                                  {w.widget_type === 'youtube' ? '📺' : w.widget_type === 'markdown' ? '📝' : w.widget_type === 'flashcard' ? '⚡' : '⚙️'}
                                </span>
                                {w.payload?.title || w.widget_type}
                             </button>
                           </li>
                         ))}
                       </ul>
                     ) : (
                       <p className="ml-14 text-slate-400 italic">No exact curriculum injected for this chapter yet.</p>
                     )}
                   </div>
                 ))}
                 
                 {modules.length === 0 && (
                   <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">
                     <p>This course is completely empty. Create a module to begin.</p>
                   </div>
                 )}
               </div>
            </div>
          ) : (
          <div className="ml-0">
            <div className="mb-8 mt-2 flex flex-col items-start gap-1 group/mheader">
              {isEditingModule ? (
                <div className="flex items-center gap-2 mb-2 w-full max-w-xl bg-white p-2 rounded-xl shadow-sm border border-indigo-200 animate-in fade-in zoom-in-95 duration-200">
                  <input
                    autoFocus
                    value={editModuleTitle}
                    onChange={(e) => setEditModuleTitle(e.target.value)}
                    className="flex-1 text-2xl font-black text-slate-800 bg-transparent focus:outline-none placeholder-slate-300 px-2"
                    placeholder="Enter Module Name..."
                  />
                  <div className="flex gap-1 shrink-0">
                     <button onClick={() => setIsEditingModule(false)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors" title="Cancel">
                       <X className="w-5 h-5"/>
                     </button>
                     <button onClick={saveModuleTitle} disabled={!editModuleTitle.trim()} className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-slate-400 rounded-lg transition-colors shadow-sm" title="Save Module Title">
                       <Check className="w-5 h-5"/>
                     </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center flex-wrap gap-3 mb-2">
                  <h2 className="text-3xl font-black text-slate-900 capitalize flex items-center gap-3">
                    {activeModule?.title}
                  </h2>
                  <div className="flex items-center gap-1.5 ml-2 mt-1">
                    <button onClick={() => { setEditModuleTitle(activeModule?.title || ""); setIsEditingModule(true); }} className="p-2 text-indigo-500 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg transition-all shadow-sm shrink-0 flex items-center gap-1.5 font-bold text-xs" title="Edit Module Name">
                      <Edit2 className="w-3.5 h-3.5"/> Edit Title
                    </button>
                    <button onClick={deleteModule} className="p-2 text-rose-500 bg-rose-50/50 border border-rose-100 hover:bg-rose-100 hover:text-rose-700 rounded-lg transition-all shadow-sm shrink-0 flex items-center gap-1.5 font-bold text-xs" title="Delete Entire Module">
                      <Trash2 className="w-3.5 h-3.5"/> Delete
                    </button>
                  </div>
                </div>
              )}
              <p className="text-slate-500 text-lg">Interactive structured study material and widgets for {activeModule?.title || 'this module'}.</p>
            </div>          {/* Interactive Widget Accordion Stack */}
          {isLoading ? (
             <div className="flex justify-center my-12 text-slate-400">Loading Configuration...</div>
          ) : (
            <div className="flex flex-col gap-6">
              {activeModule?.widgets?.map((widget: any) => {
                const isOpen = openWidgets[widget.id] ?? true; // Default Open if undefined
                return (
                  <div 
                    key={widget.id} 
                    id={`widget-${widget.id}`}
                    className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                  >
                    {/* Native Accordion Wrapper Header */}
                    <div 
                      className="px-6 py-4 flex items-center justify-between bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors border-b border-transparent data-[open=true]:border-slate-200"
                      data-open={isOpen}
                      onClick={() => toggleWidget(widget.id)}
                    >
                      <div className="flex items-center gap-4">
                         <span className="text-xl bg-white p-2 rounded-xl text-slate-500 shadow-sm border border-slate-200">
                           {widget.widget_type === 'youtube' || widget.widget_type === 'video_embed' ? '📺' : widget.widget_type === 'markdown' ? '📝' : widget.widget_type === 'flashcard' ? '⚡' : '⚙️'}
                         </span>
                         <h3 className="text-[17px] font-black tracking-tight text-slate-800">
                           {widget.payload?.title || widget.payload?.question || widget.payload?.language || (
                             widget.widget_type === 'markdown' ? 'Study Note' :
                             widget.widget_type === 'youtube' ? 'Media Player' :
                             widget.widget_type === 'flashcard' ? 'Flashcard Node' :
                             widget.widget_type === 'code_snippet' ? 'Code Sandbox' :
                             widget.widget_type
                           )}
                         </h3>
                      </div>
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm">
                        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Accordion Content Body */}
                    {isOpen && (
                      <div className="p-0 sm:p-2 bg-slate-100/50">
                        <WidgetRenderer 
                          domain="course" 
                          widget={widget} 
                          onUpdate={updateWidgetPayload} 
                          onDelete={removeWidget}
                          activeModuleId={Number(activeModuleId)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          {(!activeModule?.widgets || activeModule.widgets.length === 0) && (
             <div className="col-span-full p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center text-slate-400">
               <p className="font-bold mb-2 text-slate-500">No Widgets Found</p>
               <p className="text-sm max-w-sm">This module currently contains no study resources. Start adding interactive notes, flashcards, or video timelines to build your curriculum.</p>
             </div>
          )}

          {activeModuleId && !isLoading && (
            <div className="mt-8 flex flex-col items-center">
              {!showWidgetMenu ? (
                <button onClick={() => setShowWidgetMenu(true)} className="px-6 py-3 bg-white border border-dashed border-slate-300 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 rounded-xl text-sm font-bold flex justify-center items-center gap-2 transition-colors shadow-sm w-max">
                  <PlusSquare className="w-5 h-5" /> Inject New Curriculum Widget
                </button>
              ) : (
                <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-lg p-6 animate-in slide-in-from-bottom-2 fade-in duration-200">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                     <h4 className="font-black text-slate-800 text-lg">Select Widget Type</h4>
                     <button onClick={() => setShowWidgetMenu(false)} className="text-sm font-bold text-slate-400 hover:text-slate-600 px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors">Cancel</button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                     <button onClick={() => addWidget('markdown')} className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all group">
                       <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📝</span>
                       <span className="text-[11px] font-bold text-slate-600 group-hover:text-indigo-600 uppercase tracking-wider">Markdown</span>
                     </button>
                     <button onClick={() => addWidget('youtube')} className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all group">
                       <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📺</span>
                       <span className="text-[11px] font-bold text-slate-600 group-hover:text-rose-600 uppercase tracking-wider">YouTube</span>
                     </button>
                     <button onClick={() => addWidget('flashcard')} className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600 transition-all group">
                       <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚡</span>
                       <span className="text-[11px] font-bold text-slate-600 group-hover:text-amber-600 uppercase tracking-wider">Flashcard</span>
                     </button>
                     <button onClick={() => addWidget('code_snippet')} className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all group">
                       <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚙️</span>
                       <span className="text-[11px] font-bold text-slate-600 group-hover:text-emerald-600 uppercase tracking-wider">Code Exec</span>
                     </button>
                  </div>
                </div>
              )}
            </div>
          )}

          </div>
          )}

        </section>
      </main>
    </div>
  );
}
