import { useResume } from '../../context/resumeBuilder/ResumeContext';
import { Globe, Building, Shield, User, LayoutTemplate, X, Settings2 } from 'lucide-react';
import { tenantConfigs } from '../../config/tenantConfig';
import usersConfig from '../../../../system-configuration/auth/users.json';

export default function ConfigSidebar() {
  const { data, updateMetadata, client, setClient, language, setLanguage, role, user, setUser, profileId, setProfileId, isConfigOpen, setIsConfigOpen } = useResume();

  const activeTenantConfig = tenantConfigs[client] || tenantConfigs['default'];

  return (
    <>
      {/* Background Overlay */}
      {isConfigOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity print:hidden"
          onClick={() => setIsConfigOpen(false)}
        />
      )}

      {/* Slide-over Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out print:hidden ${
          isConfigOpen ? 'translate-x-0' : 'translate-x-full'
        } border-l border-slate-200 flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800">
            <Settings2 className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold tracking-tight">System Configuration</h2>
          </div>
          <button 
            onClick={() => setIsConfigOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Tenant overrides */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Environment overrides</h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform"><Globe className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-slate-700">Language Engine</span>
                </div>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-sm font-bold text-slate-900 cursor-pointer outline-none text-right appearance-none"
                >
                  <option value="en">English (EN)</option>
                  <option value="es">Español (ES)</option>
                </select>
              </label>

              <label className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-200 text-slate-600 rounded-lg group-hover:scale-110 transition-transform"><Building className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-slate-700">Active Tenant</span>
                </div>
                <select 
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="bg-transparent text-sm font-bold text-slate-900 cursor-pointer outline-none text-right appearance-none"
                >
                  <option value="default">Default</option>
                  <option value="vighneshwaraya">Vighneshwaraya</option>
                </select>
              </label>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Identity & Workspaces */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Identity & Workspaces</h3>
            
            <div className="space-y-3">
              <label className="flex flex-col gap-2 p-4 border border-indigo-100 rounded-xl bg-indigo-50/50 hover:bg-indigo-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><User className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-indigo-900">Impersonating User</span>
                </div>
                <select 
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm text-indigo-700 font-bold cursor-pointer outline-none shadow-sm focus:ring-2 focus:ring-indigo-500/20"
                >
                  {usersConfig.users.map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
                <p className="text-xs text-indigo-400 font-medium">Controls the session identity</p>
              </label>

              <label className="flex flex-col gap-2 p-4 border border-emerald-100 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><LayoutTemplate className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-emerald-900">Viewing Workspace</span>
                </div>
                <select 
                  value={profileId}
                  onChange={(e) => setProfileId(e.target.value)}
                  className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm text-emerald-700 font-bold cursor-pointer outline-none shadow-sm focus:ring-2 focus:ring-emerald-500/20"
                >
                  {usersConfig.users.map(u => (
                    <option key={`p_${u.id}`} value={u.id}>{u.name}'s Resume Profile</option>
                  ))}
                </select>
                <p className="text-xs text-emerald-500 font-medium">The resume data shown on screen</p>
              </label>

              <label className="flex items-center justify-between p-3 border border-rose-100 rounded-xl bg-rose-50 opacity-70 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Shield className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-rose-900">Derived Role</span>
                </div>
                <span className="text-sm font-bold text-rose-700 uppercase">{role === 'owner' ? 'Owner (Self)' : role}</span>
              </label>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Presentation layer */}
           <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Presentation</h3>
            
            <label className="flex flex-col gap-2 p-4 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">UI Template Layout</span>
                </div>
                <select 
                  value={data.metadata.template}
                  onChange={(e) => updateMetadata({ template: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 font-bold cursor-pointer outline-none shadow-sm"
                >
                  {activeTenantConfig.availableTemplates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.name} Layout
                    </option>
                  ))}
                </select>
              </label>
          </div>

        </div>
      </div>
    </>
  );
}
