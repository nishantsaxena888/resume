import { Book, Shield, Code, Blocks, Network, FileJson, ArrowLeft } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      
      {/* Header Sticky Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-inner">
              <Book className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Architecture</h1>
          </div>
          <button 
            onClick={() => window.location.href = '/'} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to App
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-8 mt-12 space-y-16">

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Developer Syllabus
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Welcome to the configuration-driven Resume Engine. This document outlines the core architectural patterns, state-management flows, and multi-tenant security modules necessary to contribute to the frontend codebase.
          </p>
        </section>

        {/* 1. Global Context */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <Network className="w-6 h-6 text-blue-500" />
            <h3 className="text-2xl font-bold text-slate-800">1. Global State Hub (ResumeContext)</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            The application abandons traditional prop-drilling in favor of a monolithic React Context layer located at <code>src/context/resumeBuilder/ResumeContext.tsx</code>. This single file is the beating heart of the frontend.
          </p>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h4 className="font-semibold text-slate-800">Core Responsibilities:</h4>
            <ul className="list-inside list-disc text-sm text-slate-600 space-y-2">
              <li><strong>Resume Data:</strong> Houses the JSON payload of the active resume tree (<code>data</code>).</li>
              <li><strong>Multi-Tenancy:</strong> Tracks the active <code>client</code> (e.g., 'default', 'vighneshwaraya').</li>
              <li><strong>Localization:</strong> Tracks the active <code>language</code> translation map (e.g., 'en', 'es').</li>
              <li><strong>Auth Injection:</strong> Owns the <code>user</code>, <code>profileId</code>, and computationally derived <code>role</code> capabilities.</li>
              <li><strong>Universal Mutations:</strong> Exposes standardized <code>update...()</code> sub-tree modifiers.</li>
            </ul>
          </div>
        </section>

        {/* 2. Security Engine */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <Shield className="w-6 h-6 text-rose-500" />
            <h3 className="text-2xl font-bold text-slate-800">2. Field-Level Security (FLS) & RBAC</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            The frontend operates a zero-trust, matrix-driven rendering engine. A centralized JSON registry dictates exact CRUD abilities per-field.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-3">
              <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileJson className="w-4 h-4 text-gray-400" /> permissions.json
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Located in <code>system-configuration/auth/permissions.json</code>. Forms a 3-Dimensional matrix mapping <code>[Role] -$gt; [Entity] -$gt; [Field]</code> to HTTP OPTIONS capabilities (e.g. <code>["read", "update"]</code>).
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-3">
              <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                <Blocks className="w-4 h-4 text-gray-400" /> EditableField.tsx
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                The universal wrapper component. Every input on the screen passes through this component. On every render it queries <code>getPermissions(entity, field)</code>. If 'read' is absent, it returns <code>null</code> (purging the node). If 'update' is absent, it renders a grayed-out <code>$lt;span$gt;</code>.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6 space-y-3">
            <h4 className="font-bold text-emerald-800">✨ Resource Ownership ("Self" Logic)</h4>
            <p className="text-sm text-emerald-700 leading-relaxed">
              The Context engine is programmed to intercept Authentication tokens. If the Logged In User's token (<code>user</code> ID) perfectly matches the Workspace URI ID (<code>profileId</code>), the engine forcibly elevates the React state to <code>role = "owner"</code> regardless of the user's base identity.
            </p>
          </div>
        </section>

        {/* 3. Multi-Tenant Cascading */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <Code className="w-6 h-6 text-amber-500" />
            <h3 className="text-2xl font-bold text-slate-800">3. JSON Schema Multi-Tenancy</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            The fundamental architecture prevents duplicating code for new clients. Instead, everything inherits from an inheritance tree mapping inside <code>system-configuration/</code>:
          </p>

          <pre className="bg-slate-900 text-slate-300 p-4 rounded-xl text-xs overflow-x-auto shadow-sm">
{`system-configuration/
  ├── base/                 # Master Schemas
  │   └── en/               # Default english templates
  └── client_specific/      # Tenant Overrides
      └── vighneshwaraya/   # Client ID
          └── en/           # Client language injection`}
          </pre>

          <p className="text-slate-600 leading-relaxed">
            At build-time, the <code>generate-schemas.ts</code> script absorbs <code>VITE_APP_CLIENT</code> and deep-merges the client-specific folders <strong>over</strong> the <code>base/</code> folder, executing surgical JSON payload injections without requiring physical component forks.
          </p>
        </section>

      </main>
    </div>
  );
}
