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

        {/* Section 4: Advanced Architectural Mechanics */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Server className="w-5 h-5" /></div>
            <h2 className="text-2xl font-bold text-slate-900">4. Advanced Backend Mechanics</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Schema Dynamic Caching & Cache-Poisoning Defenses</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                The NS API explicitly defends against SSR Cache Poisoning where the <code>/options</code> definition APIs would accidentally memoize empty array <code>404s</code> during edge-network deployments. The endpoints enforce strict <code>no-store</code> HTTP cache policies, guaranteeing the React frontend always pulls the absolute latest JSON schema natively from Python on every load.
              </p>
            </div>
            
            <hr className="border-slate-100" />

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">The Event Bus & Full-Text Search Sync</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Because resumes behave like high-density query documents, the NS architecture does not rely solely on PostgreSQL `LIKE` queries. It utilizes an internal <code>event_bus.py</code> module with a <code>publish()</code> hook. This mechanism intercepts massive resume payload updates and silently acts as a write-through cache to the internal Elasticsearch cluster, guaranteeing lightning-fast keyword traversal without choking the primary RDBMS.
              </p>
            </div>

            <hr className="border-slate-100" />
            
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Pluggable Orchestrator Pipeline</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                The core <code>core/sources/router.py</code> does not simply save data. Before execution reaches <code>SourceRouter.create()</code>, it must clear the <code>_enforce_tenant_authorization()</code> hooks locally in memory, ensuring that a user trying to impersonate another Tenant mathematically fails before a database lock is even established.
              </p>
            </div>

            <hr className="border-slate-100" />
            
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Double-Entry Ledger Tracking</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                A massive concept in NS is un-cheatable accounting limits. As profiles are created or APIs are consumed, the underlying PostgreSQL database doesn't just bump a counter—it uses native ledger double-entry tables ensuring point-in-time recovery and perfect audit trailing for enterprise SaaS billing limits.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Future TODOs */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Blocks className="w-5 h-5" /></div>
            <h2 className="text-2xl font-bold text-slate-900">5. Future Roadmap & TODOs</h2>
          </div>
          
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-widest">TODO</span>
                TDD Multi-Source, Multi-Cloud Architecture
              </h3>
              <p className="text-amber-800 leading-relaxed text-sm mt-2">
                We must implement strict Test-Driven Development (TDD) suites to rigorously validate the <code>SourceRouter</code>. The tests need to explicitly guarantee that Entity payloads interact identically whether they are routed through local <code>Memory</code>, bare-metal <code>Postgres</code>, or managed <code>Multi-Cloud</code> clusters across AWS/GCP, catching schema mismatches across varied infrastructures before deployment.
              </p>
            </div>
            
            <hr className="border-amber-200/50" />

            <div>
              <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-widest">TODO</span>
                Strict Auth Permission Matrix (Parity w/ Resume Engine)
              </h3>
              <p className="text-amber-800 leading-relaxed text-sm mt-2">
                The NS Backend currently utilizes a basic role-checker. We need to physically port the advanced, 3-Dimensional JSON Field-Level Security matrix (<code>permissions.json</code>) from the React Frontend directly into the Python FastAPI middleware. This will ensure that if a <code>guest</code> tries to illegally <code>PATCH</code> a <code>fullName</code> field via API, the backend mathematically drops the request using the exact same logic the frontend utilizes to hide the DOM element.
              </p>
            </div>

            <hr className="border-amber-200/50" />

            <div>
              <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded font-bold uppercase tracking-widest">TODO</span>
                Native Multi-Lingual (i18n) Support
              </h3>
              <p className="text-amber-800 leading-relaxed text-sm mt-2">
                The Frontend currently fakes multi-lingual support by hot-swapping hardcoded mock data arrays when the language dropdown changes. The Backend must formally implement a localized <code>Translations</code> indexing table in PostgreSQL, binding every Resume Entity to a specific <code>language_code</code> (like <code>en</code>, <code>es</code>, or <code>hi</code>) so that <code>/entities/resumes/{"{profile_id}"}?lang=es</code> fetches the correct localized dialect perfectly.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
