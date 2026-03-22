import React, { useState, useEffect } from 'react';
import { BookOpen, Search, BriefcaseBusiness, FileText, Server, Terminal, Code, Brain, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CoursesDashboardPage() {
  const navigate = useNavigate();
  const { prepId } = useParams();

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (prepId) {
      fetch(`http://localhost:9999/api/v1/preparations/${prepId}`)
        .then(res => res.json())
        .then(data => {
          setCourses(data.courses || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      fetch(`http://localhost:9999/api/v1/courses`)
        .then(res => res.json())
        .then(data => {
          setCourses(data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [prepId]);
  
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('aws')) return <Server className="w-6 h-6 text-indigo-500" />;
    if (title.toLowerCase().includes('python')) return <Terminal className="w-6 h-6 text-emerald-500" />;
    return <BookOpen className="w-6 h-6 text-slate-500" />;
  };
  
  const getColor = (title: string) => {
    if (title.toLowerCase().includes('aws')) return 'bg-indigo-500';
    if (title.toLowerCase().includes('python')) return 'bg-emerald-500';
    return 'bg-slate-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Workspace Scoped Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-5">
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-600 drop-shadow-sm" />
          Targeted Prep Curriculum
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Modules strictly curated for Python & AWS architectural readiness.</p>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-8 max-w-[1400px] mx-auto w-full">
        
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search active courses..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm transition-all"
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            Showing {courses.length} critical paths
          </div>
        </div>

        {/* Course Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map(course => (
            <div 
              key={course.id}
              onClick={() => navigate(`/courses/${course.id}`)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group cursor-pointer hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col h-72 relative"
            >
              {/* Embedded JD Context Badge */}
              {course.attachedJd && (
                 <div className="absolute top-4 right-4 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md z-10 flex items-center gap-1 shadow-sm">
                   <BriefcaseBusiness className="w-3 h-3" />
                   Priority Map
                 </div>
              )}

              <div className={`h-2 w-full ${getColor(course.title)}`} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  {getIcon(course.title)}
                </div>
                
                <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1">
                  A foundational curriculum block aligned with your target context mapping.
                </p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-2">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                       <span className="text-xs font-bold text-slate-700">0%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className={`${getColor(course.title)} h-1.5 rounded-full transition-all`} style={{ width: `0%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-medium text-slate-500">Launch Platform</span>
                  <ChevronRight className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
            ))}
        </div>

      </main>
    </div>
  );
}
