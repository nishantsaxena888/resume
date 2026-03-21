import React from 'react';
import { Database, Server, GitMerge, ArrowRight, ServerCrash, Blocks, Layers, ShieldCheck } from 'lucide-react';

export default function NSDocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-y-auto pb-32">
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 border-b border-indigo-900">
        <div className="max-w-[1000px] mx-auto px-8 py-12">
          <div className="flex items-center gap-3 text-indigo-200 mb-6 text-sm font-semibold tracking-wider">
            <button onClick={() => window.location.href = '/'} className="hover:text-white transition-colors">HOME</button>
            <span className="opacity-50">/</span>
            <button onClick={() => window.location.href = '/docs'} className="hover:text-white transition-colors">DOCS</button>
            <span className="opacity-50">/</span>
            <span className="text-white">NS BACKEND CONVERGENCE</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            The Nishify Studio (NS) Convergence
          </h1>
          <p className="text-lg text-indigo-200 max-w-2xl leading-relaxed">
            A clear, non-technical breakdown of the existing NS Backend Architecture and the roadmap for migrating the Resume Engine's configuration layers natively into it.
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-8 py-12 space-y-16">
        
        {/* Section 1: The current state */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><ServerCrash className="w-5 h-5" /></div>
            <h2 className="text-2xl font-bold text-slate-900">1. Why Are We Merging?</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm leading-relaxed text-slate-700">
            <p className="mb-4">
              Right now, our <strong>Resume Frontend</strong> is incredibly smart, but it is entirely faking a backend. It loads local JSON files (like <code>users.json</code> and `permissions.json`) to figure out who is logged in and what they are allowed to edit. 
            </p>
            <p>
              Meanwhile, sitting right next to it in the workspace is the <strong>NS Directory (Nishify Studio)</strong>. NS is a fully-built, battle-tested Python FastAPI backend that does exactly this, but for real. It connects to real PostgreSQL databases and Elasticsearch instances. 
            </p>
          </div>
        </section>

        {/* Section 2: What is NS? */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Layers className="w-5 h-5" /></div>
            <h2 className="text-2xl font-bold text-slate-900">2. What is the NS Backend?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <Blocks className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">"Everything is a Source"</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The NS Backend doesn't care if data lives in Memory, Postgres, or Elastic. Its `SourceRouter` treats all databases identically.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-indigo-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Deep Authorization</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                It has a native Role-Based Access Control (RBAC) engine that blocks invalid saves mathematically before they ever hit the database.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <Database className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Live JSON Schemas</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instead of hardcoding APIs, the backend serves `/options` routes that physically tell frontends what input fields need to be rendered.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: The Plan */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><GitMerge className="w-5 h-5" /></div>
            <h2 className="text-2xl font-bold text-slate-900">3. The Convergence Strategy (How we merge)</h2>
          </div>
          
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="ml-2 text-xs font-mono text-slate-400">Migration Plan</span>
            </div>
            <div className="p-8 text-slate-300 space-y-8">
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono">1</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Yank the Frontend Configurations</h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    We will rip the <code>system-configuration/</code> folder (schemas, tenants, RBAC rules) physically out of the React workspace and copy it natively into the python backend under <code>NS/clients/resume_engine</code>.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono">2</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Wire the React Context to the APIs</h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    We will delete the hardcoded <code>mockResume.ts</code> data. We will update the <code>ResumeContext.tsx</code> file to trigger a live <code>fetch()</code> call to <code>http://localhost:8000/entities/resumes/{"{active_profile_id}"}</code> to pull down real Postgres/Elasticsearch database rows instead of mock strings.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono">3</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Dynamic Config Slider</h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    The beautiful new sliding Sidebar Drawer we just built will stop relying on flat JSON lists. Instead, it will fetch the list of <code>Users</code> and <code>Tenants</code> dynamically from the backend, ensuring scaling controls are securely centralized.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
