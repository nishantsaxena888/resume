import { Book, Shield, Code, Blocks, Network, FileJson, ArrowLeft, FolderTree, Key, Layers, Puzzle } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      
      {/* Header Sticky Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-inner">
              <Book className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">System Architecture</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Nishify Studio Enterprise Resume Builder</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/'} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to App
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-8 mt-12 space-y-20">

        {/* Introduction */}
        <section className="space-y-4 max-w-3xl">
          <h2 className="text-4xl text-slate-900 tracking-tight leading-tight">
            Developer <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">Syllabus</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            Welcome to the configuration-driven Resume Engine. This application relies heavily on strict JSON-Schema validations, monolithic React Context state generation, and dynamic Field-Level Security matrices. Read this documentation thoroughly before contributing.
          </p>
        </section>

        {/* 1. Directory Structure */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <FolderTree className="w-6 h-6 text-emerald-500" />
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">1. Core Folder Structure</h3>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            The repository is fundamentally split into the React application logic (<code>frontend/</code>) and the engine's central nervous system (<code>system-configuration/</code>).
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-slate-300 px-6 py-4 border-b border-slate-700">
                <code className="text-sm font-semibold tracking-wide text-emerald-400">/frontend/src/</code>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="font-mono text-slate-800 font-semibold w-28">components/</span>
                    <span className="flex-1">UI primitives, Modals, and the universal <code>$lt;EditableField$gt;</code>.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-slate-800 font-semibold w-28">context/</span>
                    <span className="flex-1">The monolithic <code>ResumeContext.tsx</code> global state hub.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-slate-800 font-semibold w-28">types/</span>
                    <span className="flex-1">Strongly typed Zod models representing Zod derivations.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-slate-800 font-semibold w-28">templates/</span>
                    <span className="flex-1">The rendering canvases (e.g. <code>ClassicTemplate.tsx</code>, <code>ModernTemplate.tsx</code>).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-slate-800 font-semibold w-28">config/</span>
                    <span className="flex-1">TypeScript routing dictionaries like <code>tenantConfig.ts</code>.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-slate-300 px-6 py-4 border-b border-slate-700">
                <code className="text-sm font-semibold tracking-wide text-blue-400">/system-configuration/</code>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="font-mono text-slate-800 font-semibold w-28">base/en/</span>
                    <span className="flex-1">The master JSON schemas (Zod validators) defining application data layers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-slate-800 font-semibold w-28">client_specific/</span>
                    <span className="flex-1">Tenant inheritance logic. These JSON maps deep-merge cleanly over <code>base/</code>.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-mono text-slate-800 font-semibold w-28">auth/</span>
                    <span className="flex-1">Contains the absolute sources of truth for RBAC logic: <code>permissions.json</code> and <code>users.json</code>.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Hooks and Context */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <Network className="w-6 h-6 text-blue-500" />
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">2. Global Hooks & Context Architecture</h3>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            In standard React projects, data is passed down through props. In this multi-tenant engine, the <code>$lt;ResumeProvider$gt;</code> serves as the monolithic brain executing the translation mapping, tenant overrrides, and security computations on every cycle. 
          </p>
          <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-6 space-y-4">
            <h4 className="font-semibold text-blue-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              The useResume() Hook
            </h4>
            <p className="text-sm text-blue-800 leading-relaxed max-w-3xl font-light">
              Every component in the application accesses global state by calling <code>const &#123; data, updateData, role, getPermissions &#125; = useResume()</code>. 
              The Provider maintains the following internal pipelines:
            </p>
            <ul className="list-inside list-disc text-sm text-blue-800 space-y-3 font-medium">
              <li><strong>Schema Data Graph:</strong> Safely stores and exposes the `ResumeModel` payload.</li>
              <li><strong>Impersonation Matrix:</strong> Listens for shifts in <code>userId</code> and <code>profileId</code>. If the IDs match, the hook violently escalates the `role` variable to <code>"owner"</code> (self-impersonation mode).</li>
              <li><strong>Dynamic Translations:</strong> If the active <code>language</code> drops to <code>'es'</code>, the hook intercepts the pipeline and injects Spanish `mockData` before passing the payload down map.</li>
            </ul>
          </div>
        </section>

        {/* 3. Field Level Security Engine */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <Shield className="w-6 h-6 text-rose-500" />
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">3. RBAC Field-Level Security Engine</h3>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            We operate a **Zero-Trust, JSON-Driven Rendering Engine**. Developers are strictly prohibited from writing hard-coded `if (user.role === 'admin')` checks inside components.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-3">
              <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileJson className="w-4 h-4 text-rose-500" />
                Step 1: The Matrix (`permissions.json`)
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                A massive 3-dimensional mapping located in <code>system-configuration/auth/</code>.
              </p>
              <pre className="bg-slate-900 text-slate-300 p-3 rounded-lg text-[10px] overflow-x-auto shadow-sm">
{`"guest": {
  "personalInfo": {
    "fullName": ["read"],
    "phone": []
  }
}`}
              </pre>
              <p className="text-xs text-slate-500 italic mt-2">
                A `guest` is not permitted to touch the `fullName` (read-only) and is completely oblivious to the existence of the `phone` variable (both read and update are locked).
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-3">
              <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                <Puzzle className="w-4 h-4 text-rose-500" />
                Step 2: The &lt;EditableField&gt;
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                The absolute final guardian of the DOM pipeline. EVERY editable text node in the application must use this wrapper.
              </p>
              <pre className="bg-slate-900 text-slate-300 p-3 rounded-lg text-[10px] overflow-x-auto shadow-sm">
{`$lt;EditableField 
  entity="personalInfo" 
  field="phone" 
  value={payload} 
/$gt;`}
              </pre>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                On every React render-cycle, EditableField calls <code>getPermissions(entity, field)</code> pointing at the JSON matrix.
                If `"read"` is missing, the component returns <code>null</code>. If `"update"` is missing, it returns a grayed out, unclickable <code>$lt;span$gt;</code>.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 space-y-3">
            <h4 className="font-bold text-amber-800 flex items-center gap-2">
              <Key className="w-4 h-4" /> 
              Resource Ownership Escalation (Self)
            </h4>
            <p className="text-sm text-amber-700 leading-relaxed font-medium">
              If Bob (`Role: Recruiter`) views Bob's Resume (`Workspace: bob`), the React `ResumeContext` mathematically intercepts his standard role. Because `userId === profileId`, it injects the `"owner"` role payload into the evaluator instead. The `"owner"` map in `permissions.json` specifies `"update"` bounds for all fields, instantly converting his read-only layout into an interactive editing suite.
            </p>
          </div>
        </section>

        {/* 4. Multi-Tenant Infrastructure */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <Blocks className="w-6 h-6 text-indigo-500" />
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">4. Multi-Tenant Override Flow</h3>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            This module represents absolute White-Label capability.
          </p>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 font-semibold">Mechanism</th>
                  <th className="px-6 py-4 font-semibold">Purpose</th>
                  <th className="px-6 py-4 font-semibold">Execution Layer</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600 divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Dynamic Templates (`tenantConfig.ts`)</td>
                  <td className="px-6 py-4">Dictates which UI Layout components a tenant is permitted to load (e.g. Google cannot natively load the Modern layout).</td>
                  <td className="px-6 py-4 font-mono text-xs text-indigo-600">frontend/src/components/TopBar.tsx</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">JSON Schema Deep-Merge</td>
                  <td className="px-6 py-4">Overwrites the fundamental Zod validation algorithms and form structures if `VITE_APP_CLIENT` does not equal `default`.</td>
                  <td className="px-6 py-4 font-mono text-xs text-indigo-600">generate-schemas.ts</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Dynamic UI Data Swaps (`ResumeContext`)</td>
                  <td className="px-6 py-4">Physically alters the active application state mock arrays if the tenant is switched at runtime in the TopBar.</td>
                  <td className="px-6 py-4 font-mono text-xs text-indigo-600">useEffect `[client]` pipeline</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
