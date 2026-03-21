import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ResumeModelSchema, type ResumeModel } from '../../types/resumeBuilder/resume';
import { mockResume } from '../../data/resumeBuilder/mockResume';
import { mockResumeEs } from '../../data/resumeBuilder/mockResumeEs';
import { mockResumeVighneshwaraya } from '../../data/resumeBuilder/mockResumeVighneshwaraya';
import { tenantConfigs } from '../../config/tenantConfig';
import permissionsConfig from '../../../../system-configuration/auth/permissions.json';
import usersConfig from '../../../../system-configuration/auth/users.json';

let initialData = mockResume;
try {
  initialData = ResumeModelSchema.parse(mockResume);
  console.log("✅ Strict JSON Schema Validation Passed.");
} catch (e) {
  console.error("❌ Fatal Validation Error parsing Resume Data:", e);
}

interface ResumeContextType {
  data: ResumeModel;
  client: string;
  language: string;
  role: string;
  user: string;
  profileId: string;
  isConfigOpen: boolean;
  updateData: (newData: Partial<ResumeModel>) => void;
  updateMetadata: (newMetadata: Partial<ResumeModel['metadata']>) => void;
  updatePersonalInfo: (newPersonalInfo: Partial<ResumeModel['personalInfo']>) => void;
  setClient: (client: string) => void;
  setLanguage: (lang: string) => void;
  setRole: (role: string) => void;
  setUser: (user: string) => void;
  setProfileId: (profileId: string) => void;
  setIsConfigOpen: (isOpen: boolean) => void;
  getPermissions: (entity: string, field: string) => string[];
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeModel>(initialData);
  const [client, setClient] = useState('default');
  const [language, setLanguage] = useState('en');
  const [role, setRole] = useState('admin');
  const [user, setUser] = useState('u_ceo'); // Logged in as Alice
  const [profileId, setProfileId] = useState('u_ceo'); // Viewing Alice's Resume
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // 0. Auto-Resolve Role when standard User impersonation changes
  // Escalates to 'owner' if the Active User matches the Viewing Profile Workspace
  useEffect(() => {
    if (user === profileId) {
      setRole('owner');
    } else {
      const activeUser = usersConfig.users.find(u => u.id === user);
      if (activeUser) {
        setRole(activeUser.role);
      }
    }
  }, [user, profileId]);

  // 1. RBAC Field-Level Security Engine
  const getPermissions = (entity: string, field: string): string[] => {
    try {
      const roleMap: any = permissionsConfig;
      if (!roleMap[role] || !roleMap[role][entity] || !roleMap[role][entity][field]) {
        return ["read", "update"]; // Default to permissive if unmapped
      }
      return roleMap[role][entity][field];
    } catch (e) {
      return ["read", "update"];
    }
  };

  // Multi-Tenant Optimization Engine: React dynamically to client/language shifts
  useEffect(() => {
    // 1. Pick the base layout based on Client
    const baseMock = client === 'vighneshwaraya' ? mockResumeVighneshwaraya : mockResume;
    
    // 2. Deep clone safely so we don't accidentally mutate constant files
    let activePayload = JSON.parse(JSON.stringify(baseMock));

    // Dynamically inject the name of the profile we are viewing to prove the view changed!
    const targetProfileName = usersConfig.users.find(u => u.id === profileId)?.name;
    if (targetProfileName) {
      activePayload.personalInfo.fullName = targetProfileName + " Resume";
    }

    // 3. Apply Language Layer Translations
    if (language === 'es') {
      // Pull heavily translated Spanish content
      const esContent = JSON.parse(JSON.stringify(mockResumeEs));
      // Inject Spanish into active layout
      activePayload.summary = esContent.summary;
      activePayload.experience = esContent.experience;
      activePayload.education = esContent.education;
      
      // Also visibly translate the top-level info
      activePayload.personalInfo.fullName = client === 'vighneshwaraya' 
        ? "Nishant Saxena (Formato Vighneshwaraya)" 
        : "Juan Pérez (Español)";
      activePayload.personalInfo.title = "Ingeniero de Software Senior";
    }

    try {
      const validatedPayload = ResumeModelSchema.parse(activePayload);
      
      // Enforce the tenant's exact UI template rules when swapping
      const config = tenantConfigs[client] || tenantConfigs['default'];
      validatedPayload.metadata.template = config.defaultTemplate;
      
      setData(validatedPayload);
    } catch (e) {
      console.error("Failed to parse localized/tenant payload", e);
    }
  }, [client, language]);

  const updateData = (newData: Partial<ResumeModel>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const updateMetadata = (newMetadata: Partial<ResumeModel['metadata']>) => {
    setData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, ...newMetadata },
    }));
  };

  const updatePersonalInfo = (newPersonalInfo: Partial<ResumeModel['personalInfo']>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...newPersonalInfo },
    }));
  };

  return (
    <ResumeContext.Provider value={{ data, client, language, role, user, profileId, isConfigOpen, updateData, updateMetadata, updatePersonalInfo, setClient, setLanguage, setRole, setUser, setProfileId, setIsConfigOpen, getPermissions }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
