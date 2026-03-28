import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BriefcaseBusiness, Calendar, ArrowRight, BookOpen, FileText, Loader2, Home, Check, Trash2, Edit } from 'lucide-react';

// Define the Preparation interface expected from FastAPI
interface Preparation {
  id: string;
  title: string;
  subtitle?: string;
  status: string;
  progress: number;
  created_at: string;
  resumes?: any[];
  jds?: any[];
  courses?: any[];
}
export default function PreparationsDashboardPage() {
  const navigate = useNavigate();
  const [preparations, setPreparations] = useState<Preparation[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletingPrepId, setDeletingPrepId] = useState<string | null>(null);
  const [editingPrepId, setEditingPrepId] = useState<string | null>(null);
  const [newPrepTitle, setNewPrepTitle] = useState('');
  const [newPrepSubtitle, setNewPrepSubtitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('BriefcaseBusiness');
  const [selectedResumes, setSelectedResumes] = useState<number[]>([]);
  const [selectedJds, setSelectedJds] = useState<number[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  // Live Database Caches
  const [dbResumes, setDbResumes] = useState<{id: number, title: string}[]>([]);
  const [dbJds, setDbJds] = useState<{id: number, payload: any}[]>([]);
  const [dbCourses, setDbCourses] = useState<{id: number, title: string}[]>([]);

  const toggleArray = (arr: number[], setArr: any, id: number) => {
    if (arr.includes(id)) setArr(arr.filter((x: number) => x !== id));
    else setArr([...arr, id]);
  };

  const toggleSingle = (arr: number[], setArr: any, id: number) => {
    if (arr.includes(id)) setArr([]); // Deselect
    else setArr([id]);                // Exclusive Select
  };

  // Fetch all active preparations from the Python FastAPI Backend
    useEffect(() => {
    fetch('/api/v1/preparations')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setPreparations(data);
        } else {
          setPreparations([]);
          console.error("API returned non-array payload:", data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch preparations:", err);
        setLoading(false);
      });

    // Hydrate Configuration Modal Selectors natively from the DB
    fetch('/api/v1/resumes')
      .then(res => res.json())
      .then(setDbResumes)
      .catch(console.error);

    fetch('/api/v1/jds')
      .then(res => res.json())
      .then(setDbJds)
      .catch(console.error);

    fetch('/api/v1/courses')
      .then(res => res.json())
      .then(setDbCourses)
      .catch(console.error);

  }, []);

  const handleCreateSubmit = async () => {
    if (!newPrepTitle.trim()) {
      alert("Please provide a Target Role Name.");
      return;
    }
    // Removed course validation logic as 0 or more courses are now permitted

    setCreating(true);
    
    const payload = {
      title: newPrepTitle,
      subtitle: newPrepSubtitle,
      icon: selectedIcon,
      resume_ids: selectedResumes,
      jd_ids: selectedJds,
      course_ids: selectedCourses
    };

    try {
      const isEditing = !!editingPrepId;
      const url = isEditing 
        ? `/api/v1/preparations/${editingPrepId}`
        : '/api/v1/preparations';

      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
         const errText = await res.text();
         throw new Error(errText);
      }
      
      const savedPrep = await res.json();
      
      // Complete Success
      setCreating(false);
      setShowModal(false);
      
      if (isEditing) {
        window.location.reload();
      } else {
        navigate(`/prep/${savedPrep.id}/courses`);
      }
      
    } catch (err) {
      console.error("Failed to save prep", err);
      alert("Failed to save workspace. Please check your data or try again.");
      setCreating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent w-full font-sans pb-24">
      
      {/* Main Hub Dashboard */}
      <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* Hub Action Bar Zenith Compression */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Preparations Hub</h2>
          <button 
            onClick={() => { 
                setEditingPrepId(null); 
                setNewPrepTitle(''); 
                setNewPrepSubtitle(''); 
                setSelectedCourses([]); 
                setSelectedResumes([]); 
                setSelectedJds([]); 
                setShowModal(true); 
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            New Workspace
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <>
              {preparations.map((prep) => (
                <div 
                  key={prep.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
                  onClick={() => navigate(`/prep/${prep.id}/courses`)}
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                    
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                        <BriefcaseBusiness className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full uppercase tracking-wider">{prep.status || 'Active'}</span>
                      </div>
                      
                      {/* Edit and Delete Actions */}
                      <div className="ml-auto flex items-center gap-1">
                        <button 
                          onClick={async (e) => { 
                             e.stopPropagation(); 
                             setEditingPrepId(prep.id);
                             setNewPrepTitle(prep.title);
                             setNewPrepSubtitle(prep.subtitle || '');
                             // Fetch full preparation details for editing
                             try {
                               const res = await fetch(`/api/v1/preparations/${prep.id}`);
                               if (!res.ok) throw new Error(`HTTP ${res.status}`);
                               const fullPrep = await res.json();
                               setSelectedResumes(fullPrep.resumes?.map((r: any) => r.id) || []);
                               setSelectedJds(fullPrep.jds?.map((j: any) => j.id) || []);
                               setSelectedCourses(fullPrep.courses?.map((c: any) => c.id) || []);
                             } catch (error) {
                               console.error("Failed to fetch full prep details for editing:", error);
                               // Fallback to potentially incomplete data if fetch fails
                               setSelectedResumes(prep.resumes?.map((r: any) => r.id) || []);
                               setSelectedJds(prep.jds?.map((j: any) => j.id) || []);
                               setSelectedCourses(prep.courses?.map((c: any) => c.id) || []);
                             }
                             setShowModal(true); 
                          }}
                          className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="Edit Workspace"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { 
                            e.preventDefault();
                            e.stopPropagation(); 
                            if (deletingPrepId === prep.id) {
                               fetch(`/api/v1/preparations/${prep.id}`, {method: 'DELETE'})
                                 .then(res => {
                                    if(res.ok) {
                                       setPreparations(preparations.filter(p => p.id !== prep.id));
                                       setDeletingPrepId(null);
                                    }
                                 });
                            } else {
                               setDeletingPrepId(prep.id);
                               setTimeout(() => setDeletingPrepId(null), 3000);
                            }
                          }}
                          className={`p-2 rounded-lg transition-colors shadow-sm ${deletingPrepId === prep.id ? 'bg-rose-600 text-white hover:bg-rose-700' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'}`}
                          title={deletingPrepId === prep.id ? "Click to confirm deletion" : "Delete Workspace"}
                        >
                          {deletingPrepId === prep.id ? <span className="text-[10px] font-black tracking-widest uppercase px-1">Confirm</span> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1 relative z-10 group-hover:text-indigo-600 transition-colors">{prep.title}</h3>
                    <p className="text-slate-500 font-medium relative z-10">Application Target</p>
                  </div>

                  {/* Card Body - Stats */}
                  <div className="p-6 bg-slate-50/50 flex flex-col gap-5 flex-1">
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" /> Target Profile
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-slate-400" /> {prep.progress}% Ready
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full">
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                          style={{ width: `${prep.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <Calendar className="w-3.5 h-3.5" /> Updated {new Date(prep.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 group-hover:gap-2 transition-all">
                      Open Workspace <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              ))}

              {/* Create New Empty State Card */}
              <div 
                onClick={() => setShowModal(true)}
                className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-400 transition-all flex flex-col items-center justify-center p-8 text-center cursor-pointer min-h-[320px] group"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all mb-4">
                  {creating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">New Preparation</h3>
                <p className="text-sm text-slate-500 font-medium max-w-[200px]">Create an isolated workspace map for a new target scenario.</p>
              </div>
            </>
          )}

        </div>

      </div>

      {/* Configuration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all relative border border-slate-100">
            <div className="p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">New Preparation Space</h2>
              <p className="text-sm text-slate-500 font-medium mb-6">Create an isolated context map linking your target resumes and role descriptions.</p>
              
              <div className="max-h-[60vh] overflow-y-auto pr-2 pb-4 -mr-2">
                <div className="flex flex-col gap-1 mb-8 group">
                  <input 
                    id="prepTitle"
                    type="text" 
                    value={newPrepTitle}
                    onChange={(e) => setNewPrepTitle(e.target.value)}
                    placeholder="Untitled Workspace..." 
                    className="w-full bg-transparent border-0 px-0 py-1 text-3xl md:text-4xl font-black text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-0 transition-all"
                    autoFocus
                    autoComplete="off"
                  />
                  <input 
                    id="prepSubtitle"
                    type="text" 
                    value={newPrepSubtitle}
                    onChange={(e) => setNewPrepSubtitle(e.target.value)}
                    placeholder="Add target role or company context..." 
                    className="w-full bg-transparent border-0 px-0 py-1 text-base font-bold text-slate-500 placeholder:text-slate-300 focus:outline-none focus:ring-0 transition-all -mt-1"
                    autoComplete="off"
                  />
                </div>

                {/* Resumes Multi-Select */}
                {dbResumes.length > 0 && (
                  <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Include Resumes</label>
                    <div className="flex flex-wrap gap-2">
                      {dbResumes.map(res => (
                        <div key={res.id} onClick={() => toggleSingle(selectedResumes, setSelectedResumes, res.id)} className={`px-3 py-2 rounded-lg border cursor-pointer text-xs font-bold transition-all flex items-center gap-2 ${selectedResumes.includes(res.id) ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:shadow-sm'}`}>
                          {selectedResumes.includes(res.id) && <Check className="w-3.5 h-3.5" />} {res.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* JDs Multi-Select */}
                {dbJds.length > 0 && (
                  <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Include Target Descriptions</label>
                    <div className="flex flex-wrap gap-2">
                      {dbJds.map(jd => (
                        <div key={jd.id} onClick={() => toggleSingle(selectedJds, setSelectedJds, jd.id)} className={`px-3 py-2 rounded-lg border cursor-pointer text-xs font-bold transition-all flex items-center gap-2 ${selectedJds.includes(jd.id) ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:shadow-sm'}`}>
                          {selectedJds.includes(jd.id) && <Check className="w-3.5 h-3.5" />} 
                          <span>{jd.payload?.role || jd.payload?.title || jd.payload?.target_role || `Target Context #${jd.id}`}</span>
                          {jd.payload?.company && <span className="text-slate-400 font-medium group-hover:text-indigo-200">@ {jd.payload.company}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses Multi-Select */}
                {dbCourses.length > 0 && (
                  <div className="mb-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Include Interactive Courses</label>
                    <div className="flex flex-col gap-2">
                      {dbCourses.map(course => (
                        <div key={course.id} onClick={() => toggleArray(selectedCourses, setSelectedCourses, course.id)} className={`px-4 py-3 rounded-lg border cursor-pointer text-sm font-bold transition-all flex items-center justify-between ${selectedCourses.includes(course.id) ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:shadow-sm'}`}>
                           <span>{course.title}</span>
                           {selectedCourses.includes(course.id) && <Check className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => { setShowModal(false); setNewPrepTitle(''); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateSubmit}
                  disabled={creating || !newPrepTitle.trim()}
                  className={`bg-indigo-600 text-white font-bold px-8 py-2.5 rounded-xl shadow-[0_4px_15px_-3px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2 ${(creating || !newPrepTitle.trim()) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700 hover:-translate-y-0.5'}`}
                >
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {creating ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
