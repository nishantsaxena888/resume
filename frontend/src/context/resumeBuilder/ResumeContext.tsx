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
  isSaving: boolean;
  isSaved: boolean;
  hasChanges: boolean;
  saveToDatabase: () => Promise<void>;
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
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lastSavedDataStr, setLastSavedDataStr] = useState<string>(JSON.stringify(initialData));
  
  const hasChanges = JSON.stringify(data) !== lastSavedDataStr;

  // 0. Auto-Fetch true database persistence payload on mount!
  useEffect(() => {
    fetch('http://localhost:9999/api/v1/resumes')
      .then(async res => {
        if (res.status === 401) {
          console.warn("⚠️ Database initialization locked behind a 401 Unauthorized NS Backend payload on Port 9999. Please ensure JWT is injected.");
          return [];
        }
        return res.json();
      })
      .then(dbResumes => {
        if (dbResumes && dbResumes.length > 0 && dbResumes[0].payload) {
          console.log("🔥 Successfully intercepted PostgreSQL Database Payload. Deep merging with structural anchors!");
          const dbPayload = dbResumes[0].payload;
          
          const mergedData = {
            ...initialData,
            ...dbPayload,
            personalInfo: { ...initialData.personalInfo, ...(dbPayload.personalInfo || {}) },
            experience: dbPayload.experience?.length ? dbPayload.experience : initialData.experience,
            education: dbPayload.education?.length ? dbPayload.education : initialData.education,
            skills: dbPayload.skills && Object.keys(dbPayload.skills).length ? dbPayload.skills : initialData.skills,
            metadata: { ...initialData.metadata, ...(dbPayload.metadata || {}) }
          };
          
          setData(mergedData);
          setLastSavedDataStr(JSON.stringify(mergedData));
        }
      })
      .catch(e => console.error("Database connection failed, falling back to local mocks:", e));
  }, []);

  const saveToDatabase = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:9999/api/v1/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.personalInfo.fullName + " Auto-Saved Resume",
          payload: data
        })
      });
      
      if (response.status === 401) {
        alert("🔒 Unauthorized: The NS Backend (Port 9999) rejected the sync request due to a missing or expired authentication token. Please Log In!");
        throw new Error("HTTP 401: Unauthorized API Lockout");
      }

      if (!response.ok) {
        const errText = await response.text();
        alert(`❌ Backend Rejected Save (Status ${response.status}):\n${errText}`);
        throw new Error(`HTTP ${response.status}: ${errText}`);
      }
      
      const result = await response.json();
      console.log("✅ Successfully persisting physical state to PostgreSQL:", result);
      setLastSavedDataStr(JSON.stringify(data));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("❌ Fatal PostgreSQL synchronization error:", error);
      alert(`⚠️ Network Error: Could not connect to the Backend on port 8080.\nDetails: ${String(error)}`);
    } finally {
      setIsSaving(false);
    }
  };

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
    <ResumeContext.Provider value={{ data, client, language, role, user, profileId, isConfigOpen, updateData, updateMetadata, updatePersonalInfo, setClient, setLanguage, setRole, setUser, setProfileId, setIsConfigOpen, getPermissions, isSaving, isSaved, hasChanges, saveToDatabase }}>
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
