import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, BookOpen, Check, Save } from 'lucide-react';

export default function CoursesDashboardPage() {
  const navigate = useNavigate();
  const { prepId } = useParams();

  const [loading, setLoading] = useState(true);
  const [prep, setPrep] = useState<any>(null);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (prepId) {
           const [prepRes, coursesRes] = await Promise.all([
             fetch(`/api/v1/preparations/${prepId}`),
             fetch('/api/v1/courses')
           ]);
           
           const prepData = await prepRes.json();
           const coursesData = await coursesRes.json();
           
           setPrep(prepData);
           setAllCourses(coursesData);
           
           if (prepData.courses) {
             setSelectedCourseIds(prepData.courses.map((c: any) => c.id));
           }
        } else {
           // Global fallback routing
           const res = await fetch(`/api/v1/courses`);
           const data = await res.json();
           if (data && data.length > 0) {
             navigate(`/courses/${data[0].id}`, { replace: true });
           }
        }
      } catch (e) {
        console.error("Failed to load Hub", e);
      } finally {
        setLoading(false);
      }
    };
    
    initialize();
  }, [prepId, navigate]);

  const toggleCourse = (id: number) => {
    setSelectedCourseIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!prep) return;
    setIsSaving(true);
    
    // Reconstruct the full Pydantic payload required by the PUT endpoint
    const putPayload = {
      ...prep,
      course_ids: selectedCourseIds,
      resume_ids: prep.resumes?.map((r: any) => r.id) || [],
      jd_ids: prep.jds?.map((j: any) => j.id) || []
    };

    try {
      await fetch(`/api/v1/preparations/${prepId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(putPayload)
      });
      // Force hard refresh to rehydrate the Global Sidebar state natively 
      window.location.reload();
    } catch (e) {
      console.error(e);
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">Initializing Curriculum Manager...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-10 font-sans w-full">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
        
        <header className="flex items-center justify-between border-b border-slate-200 pb-6">
           <div>
             <h1 className="text-2xl font-black text-slate-900 tracking-tight">Curriculum Manager</h1>
             <p className="text-sm font-medium text-slate-500">Bind independent study modules into your Active Preparation context.</p>
           </div>
           <button 
             onClick={handleSave} 
             disabled={isSaving}
             className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-75 disabled:cursor-not-allowed"
           >
             {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
             {isSaving ? 'Synchronizing...' : 'Save & Attach'}
           </button>
        </header>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
           <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">Available Global Courses</h3>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
             {allCourses.length === 0 ? (
               <div className="col-span-3 py-10 text-center text-slate-500 font-medium">No courses exist in the global platform yet. Create one from the Home Dashboard to link it here.</div>
             ) : (
               allCourses.map((course) => {
                 const isSelected = selectedCourseIds.includes(course.id);
                 return (
                   <div 
                     key={course.id}
                     onClick={() => toggleCourse(course.id)}
                     className={`cursor-pointer transition-all duration-200 p-5 rounded-xl border flex flex-col gap-3 group ${isSelected ? 'bg-indigo-50 border-indigo-400 shadow-inner' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'}`}
                   >
                     <div className="flex items-start justify-between">
                       <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                         <BookOpen className="w-5 h-5" />
                       </div>
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 bg-white'}`}>
                         {isSelected && <Check className="w-3 h-3 text-white" />}
                       </div>
                     </div>
                     <h4 className={`font-bold text-sm line-clamp-2 ${isSelected ? 'text-indigo-900' : 'text-slate-700 group-hover:text-slate-900'}`}>{course.title}</h4>
                   </div>
                 );
               })
             )}
           </div>
        </section>

      </div>
    </div>
  );
}
