import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { ResumeModelSchema, type ResumeModel } from '../../types/resumeBuilder/resume';
import { mockResume } from '../../data/resumeBuilder/mockResume';

let initialData = mockResume;
try {
  // Validate the incoming JSON strictly against our schema before handing it to React
  initialData = ResumeModelSchema.parse(mockResume);
  console.log("✅ Strict JSON Schema Validation Passed.");
} catch (e) {
  console.error("❌ Fatal Validation Error parsing Resume Data:", e);
}

interface ResumeContextType {
  data: ResumeModel;
  updateData: (newData: Partial<ResumeModel>) => void;
  updateMetadata: (newMetadata: Partial<ResumeModel['metadata']>) => void;
  updatePersonalInfo: (newPersonalInfo: Partial<ResumeModel['personalInfo']>) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeModel>(initialData);

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
    <ResumeContext.Provider value={{ data, updateData, updateMetadata, updatePersonalInfo }}>
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
