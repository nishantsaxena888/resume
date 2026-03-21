import { useResume } from '../../context/resumeBuilder/ResumeContext';
import { Globe, Building, X, Settings2 } from 'lucide-react';
import { tenantConfigs } from '../../config/tenantConfig';

export default function ConfigSidebar() {
  const { data, updateMetadata, client, setClient, language, setLanguage, isConfigOpen, setIsConfigOpen } = useResume();

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
