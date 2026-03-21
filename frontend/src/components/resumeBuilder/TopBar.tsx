import { useResume } from '../../context/resumeBuilder/ResumeContext';
import { Download, Globe, Building, Shield, User, LayoutTemplate } from 'lucide-react';
import { tenantConfigs } from '../../config/tenantConfig';
import usersConfig from '../../../../system-configuration/auth/users.json';

export default function TopBar() {
  const { data, updateMetadata, client, setClient, language, setLanguage, role, user, setUser, profileId, setProfileId } = useResume();

  // Safety check to grab the active tenant's configurations dynamically
  const activeTenantConfig = tenantConfigs[client] || tenantConfigs['default'];

  return (
    <div className="bg-white border-b sticky top-0 z-50 shadow-sm print:hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between overflow-x-auto whitespace-nowrap">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="en">English (EN)</option>
              <option value="es">Español (ES)</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gray-500" />
            <select 
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="default">Client: Default</option>
              <option value="vighneshwaraya">Client: Vighneshwaraya</option>
            </select>
          </div>

          <div className="h-6 w-px bg-gray-300 mx-1"></div>

          <div className="flex items-center gap-2" title="The Resume currently rendering on the screen">
            <LayoutTemplate className="w-4 h-4 text-emerald-500" />
            <select 
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              className="px-2 py-1.5 border border-emerald-200 rounded-lg text-xs bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-100 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option disabled>Viewing Workspace:</option>
              {usersConfig.users.map(u => (
                <option key={`p_${u.id}`} value={u.id}>{u.name}'s Resume</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2" title="The session cookie identity (who is looking at the screen)">
            <User className="w-4 h-4 text-indigo-500" />
            <select 
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="px-2 py-1.5 border border-indigo-200 rounded-lg text-xs bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option disabled>Impersonating User:</option>
              {usersConfig.users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-rose-500 opacity-60" />
            <select 
              value={role}
              disabled
              title="Role is automatically inherited from the active User profile in system-configuration"
              className="px-2 py-1.5 border border-rose-200 rounded-lg text-xs bg-rose-50 text-rose-700 font-medium opacity-60 cursor-not-allowed outline-none hover:bg-rose-50 appearance-none pointer-events-none"
            >
              <option value="admin">Derived Role: Admin</option>
              <option value="recruiter">Derived Role: Recruiter</option>
              <option value="guest">Derived Role: Guest</option>
            </select>
          </div>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Template:</span>
            <select 
              value={data.metadata.template}
              onChange={(e) => updateMetadata({ template: e.target.value })}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20"
            >
               {activeTenantConfig.availableTemplates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 hover:shadow-md transition-all active:scale-95"
        >
          <Download className="w-4 h-4" /> Export
        </button>
      </div>
    </div>
  );
}
