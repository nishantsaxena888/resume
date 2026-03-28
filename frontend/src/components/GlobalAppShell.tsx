import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Menu, X, Network, FileText, BriefcaseBusiness, BookOpen, LogOut, LayoutTemplate } from 'lucide-react';
import { useState } from 'react';

export default function GlobalAppShell() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Do not wrap Developer/NS docs in the app shell
  if (path.includes('/docs') || path.includes('/ns-docs')) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col h-screen print:h-auto w-screen print:w-auto overflow-hidden print:overflow-visible bg-slate-50 relative">
      
      {/* 1. Global Header with Hamburger */}
      <header className="print:hidden h-[72px] shrink-0 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm z-40 relative">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => setMenuOpen(true)}
            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm group"
          >
            <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')} title="Go to Home">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-md shrink-0 overflow-hidden">
              <span className="text-sm">S</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight hidden sm:block">Skillom Ai</h1>
          </div>
        </div>

        {/* Action Center on Right */}
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-md overflow-hidden cursor-pointer" title="Founder Account">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nishant" alt="Profile" className="w-full h-full object-cover" />
           </div>
        </div>
      </header>

      {/* 2. Hamburger Slide-Out Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setMenuOpen(false)}></div>
          
          {/* Menu Panel */}
          <div className="relative w-[320px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col py-6">
            <div className="flex flex-col px-6 mb-8 border-b border-slate-100 pb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => { setMenuOpen(false); navigate('/'); }} title="Go to Home">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
                    <span className="text-base">S</span>
                  </div>
                  <span className="font-black tracking-tight text-xl text-slate-900">Workspace</span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="p-2.5 bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full flex flex-col gap-2 overflow-y-auto px-4">
              <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-4 mb-2">Global Sandbox Environment</span>
              
              <Link 
                to="/resumes" 
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 font-bold ${path.includes('/resumes') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-200'}`}
              >
                <div className={`p-2 rounded-xl border ${path.includes('/resumes') ? 'bg-white/20 border-white/20' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span>Resumes</span>
              </Link>
              
              <Link 
                to="/jds"
                onClick={() => setMenuOpen(false)} 
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 font-bold ${path.includes('/jds') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-200'}`}
              >
                <div className={`p-2 rounded-xl border ${path.includes('/jds') ? 'bg-white/20 border-white/20' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <BriefcaseBusiness className="w-5 h-5" />
                </div>
                <span>JDs</span>
              </Link>
              
              <Link 
                to="/courses" 
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 font-bold ${path.includes('/courses') && !path.includes('/prep/') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-200'}`}
              >
                <div className={`p-2 rounded-xl border ${path.includes('/courses') && !path.includes('/prep/') ? 'bg-white/20 border-white/20' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <span>Courses</span>
              </Link>

              <Link 
                to="/static-notes" 
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 font-bold ${path.includes('/static-notes') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-200'}`}
              >
                <div className={`p-2 rounded-xl border ${path.includes('/static-notes') ? 'bg-white/20 border-white/20' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <LayoutTemplate className="w-5 h-5" />
                </div>
                <span>Static Notes</span>
              </Link>

              <div className="w-full h-px bg-slate-100 my-4"></div>
              <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-4 mb-2 mt-2">Platform Orchestration</span>
              
              <Link 
                to="/dashboard" 
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 font-bold ${path.includes('/dashboard') ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-200'}`}
              >
                <div className={`p-2 rounded-xl border ${path.includes('/dashboard') ? 'bg-white/20 border-white/20' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <Network className="w-5 h-5" />
                </div>
                <span>Preparations</span>
              </Link>
            </div>

            <div className="mt-auto w-full px-6 pt-6 border-t border-slate-100">
               <button onClick={() => navigate('/')} className="flex items-center justify-center gap-3 py-4 w-full cursor-pointer text-rose-500 font-bold hover:text-white hover:bg-rose-500 hover:shadow-lg transition-all rounded-xl border border-rose-100 hover:border-rose-500">
                 <LogOut className="w-5 h-5" />
                 <span>Secure Logout</span>
               </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Global Container */}
      <main className="flex-1 overflow-y-auto print:overflow-visible bg-slate-50 h-full print:h-auto">
        <Outlet />
      </main>
    </div>
  );
}
