import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, BriefcaseBusiness, BookOpen, Settings, LogOut } from 'lucide-react';

export default function GlobalAppShell() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  // Do not wrap Developer/NS docs in the app shell
  if (path.includes('/docs') || path.includes('/ns-docs')) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      
      {/* 1. Slim Persistent Global Sidebar */}
      <nav className="w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 z-50 shadow-2xl">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl mb-8 shadow-lg">
          <img src="/skillom-logo.png" alt="S" className="w-6 h-6 object-contain" />
        </div>

        <div className="flex-1 w-full flex flex-col items-center gap-6">
          <Link 
            to="/resume" 
            title="Resume Engine"
            className={`p-3 rounded-xl transition-all duration-200 group relative ${path.includes('/resume') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <FileText className="w-5 h-5" />
            <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Resume Engine</span>
          </Link>

          <Link 
            to="/jds" 
            title="JD Tracker"
            className={`p-3 rounded-xl transition-all duration-200 group relative ${path.includes('/jds') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <BriefcaseBusiness className="w-5 h-5" />
            <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Job Tracker</span>
          </Link>

          <Link 
            to="/courses" 
            title="Interview Prep Base"
            className={`p-3 rounded-xl transition-all duration-200 group relative ${path.includes('/courses') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Prep Base</span>
          </Link>
        </div>

        <div className="mt-auto w-full flex flex-col items-center pb-4 gap-4">
           <button title="Settings" className="p-3 cursor-pointer text-slate-500 hover:text-white transition-colors rounded-xl hover:bg-slate-800 group relative">
             <Settings className="w-5 h-5" />
             <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-50">Platform Config</span>
           </button>

           <button onClick={() => navigate('/')} title="Logout" className="p-3 cursor-pointer text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors rounded-xl group relative">
             <LogOut className="w-5 h-5" />
             <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-50">Secure Logout</span>
           </button>
        </div>
      </nav>

      {/* 2. Main Content Container (Pillars mount here) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Outlet />
      </main>

    </div>
  );
}
