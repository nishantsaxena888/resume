import { Mail, Phone, Linkedin, Trash2, MapPin } from 'lucide-react';
import type { ResumeModel } from '../../types/resumeBuilder/resume';
import { useResume } from '../../context/resumeBuilder/ResumeContext';
import { EditableField } from '../../components/EditableField';

interface TemplateProps {
  data: ResumeModel;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { updateData, updatePersonalInfo } = useResume();
  const info = data.personalInfo;

  return (
    <div className="w-full max-w-[850px] bg-white text-gray-900 shadow-xl print:shadow-none print:w-full print:max-w-none print:p-0 p-10 sm:p-14 font-sans relative group/template">
      
      {/* Header section */}
      <header className="text-center mb-8 border-b-2 border-gray-800 pb-6 relative group/header">
        <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight uppercase">
          <EditableField 
          entity="personalInfo" field="fullName"
          value={info.fullName} 
          onChange={(val: string) => updatePersonalInfo({ fullName: val })} 
          className="text-4xl font-light text-slate-800 tracking-tight text-center"
          placeholder="First Last"
        />
        </h1>
        
        <h2 className="text-xl text-gray-700 font-medium mb-3">
          <EditableField 
          entity="personalInfo" field="title"
          value={info.title || ''} 
          onChange={(val: string) => updatePersonalInfo({ title: val })} 
          className="text-xl text-slate-500 font-medium text-center mt-2"
          placeholder="Professional Title"
        />
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-600">
          <span className="flex items-center">
            <Mail className="w-3.5 h-3.5 mr-1.5"/> 
            <EditableField entity="personalInfo" field="email" value={info.email} onChange={(val: string) => updatePersonalInfo({ email: val })} placeholder="Email" />
          </span>
          <span>|</span>
          <span className="flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1.5"/> 
            <EditableField entity="personalInfo" field="location" value={info.location || ''} onChange={(val: string) => updatePersonalInfo({ location: val })} placeholder="Location" />
          </span>
          <span>|</span>
          <span className="flex items-center">
            <Phone className="w-3.5 h-3.5 mr-1.5"/> 
            <EditableField entity="personalInfo" field="phone" value={info.phone || ''} onChange={(val: string) => updatePersonalInfo({ phone: val })} placeholder="Phone" />
          </span>
          <span>|</span>
          <span className="flex items-center">
            <Linkedin className="w-3.5 h-3.5 mr-1.5 text-blue-600"/> 
            <EditableField entity="personalInfo" field="linkedin" value={info.linkedin || ''} onChange={(val: string) => updatePersonalInfo({ linkedin: val })} className="text-blue-600" placeholder="LinkedIn URL" />
          </span>
        </div>
      </header>
      
      <div className="space-y-6">
        
        {/* Professional Summary */}
        <section className="relative group/section">
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 mb-3 tracking-wider flex items-center justify-between">
            Professional Summary
          </h3>
          <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm text-gray-800 leading-relaxed">
            {data.summary.map((point, idx) => (
              <li key={idx} className="group/item relative">
                <EditableField 
                  value={point} 
                  multiline
                  onChange={(val: string) => {
                    const updated = [...data.summary];
                    updated[idx] = val;
                    updateData({ summary: updated });
                  }} 
                />
                <button onClick={() => updateData({ summary: data.summary.filter((_, i) => i !== idx) })} className="absolute -left-6 top-1 print:hidden opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
              </li>
            ))}
          </ul>
        </section>
        
        {/* Skill Specifications */}
        <section className="relative group/section">
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 mb-3 tracking-wider flex items-center justify-between">
            Skill Specifications
          </h3>
          <div className="space-y-2 text-sm text-gray-800 leading-relaxed">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="flex gap-2 group/item relative">
                <button onClick={() => updateData({ skills: data.skills.filter((_, i) => i !== idx) })} className="absolute -left-6 top-1 print:hidden opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                <div className="font-bold text-black min-w-[150px] whitespace-nowrap">
                  <EditableField 
                    value={skillGroup.category} 
                    onChange={(val: string) => {
                      const updated = [...data.skills];
                      updated[idx].category = val;
                      updateData({ skills: updated });
                    }} 
                  />:
                </div>
                <div className="flex-1 w-full">
                  <EditableField 
                    value={skillGroup.items} 
                    multiline
                    onChange={(val: string) => {
                      const updated = [...data.skills];
                      updated[idx].items = val;
                      updateData({ skills: updated });
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="relative group/section">
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 mb-4 tracking-wider flex items-center justify-between">
            Professional Experience
          </h3>
          <div className="space-y-6">
            {data.experience.map((job, idx) => (
              <div key={idx} className="group/job relative">
                <button onClick={() => updateData({ experience: data.experience.filter((_, i) => i !== idx) })} className="absolute -left-6 top-1 print:hidden opacity-0 group-hover/job:opacity-100 text-red-500 hover:text-red-700 bg-red-50 p-1 rounded-full"><Trash2 size={14}/></button>
                
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1 gap-4">
                  <h4 className="font-bold text-black text-base flex-1">
                    <EditableField 
                      value={job.company} 
                      onChange={(val: string) => {
                        const updated = [...data.experience];
                        updated[idx].company = val;
                        updateData({ experience: updated });
                      }} 
                    />
                  </h4>
                  <span className="text-sm font-semibold text-gray-700 whitespace-nowrap text-right min-w-[150px]">
                    <EditableField 
                      value={job.dates} 
                      className="text-right"
                      onChange={(val: string) => {
                        const updated = [...data.experience];
                        updated[idx].dates = val;
                        updateData({ experience: updated });
                      }} 
                    />
                  </span>
                </div>
                <div className="font-semibold text-gray-800 text-sm mb-2 italic">
                  <EditableField 
                    value={job.role} 
                    onChange={(val: string) => {
                      const updated = [...data.experience];
                      updated[idx].role = val;
                      updateData({ experience: updated });
                    }} 
                  />
                </div>
                <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm text-gray-800 leading-relaxed relative group/points">
                  
                  {job.points.map((point, pIdx) => (
                    <li key={pIdx} className="group/point relative">
                      <button onClick={() => {
                        const updated = [...data.experience];
                        updated[idx].points = updated[idx].points.filter((_, i) => i !== pIdx);
                        updateData({ experience: updated });
                      }} className="absolute -left-6 top-1 print:hidden opacity-0 group-hover/point:opacity-100 text-red-400 hover:text-red-600"><Trash2 size={12}/></button>
                      <EditableField 
                        value={point} 
                        multiline
                        onChange={(val: string) => {
                          const updated = [...data.experience];
                          updated[idx].points[pIdx] = val;
                          updateData({ experience: updated });
                        }} 
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="relative group/section">
          <h3 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-400 mb-3 tracking-wider flex items-center justify-between">
            Education
          </h3>
          <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm text-gray-800 leading-relaxed">
            {data.education.map((edu, idx) => (
              <li key={idx} className="group/item relative flex gap-1 flex-wrap">
                <button onClick={() => updateData({ education: data.education.filter((_, i) => i !== idx) })} className="absolute -left-6 top-1 print:hidden opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                <span className="font-semibold text-black inline-block min-w-[100px]">
                  <EditableField value={edu.degree} onChange={(val: string) => {
                      const updated = [...data.education];
                      updated[idx].degree = val;
                      updateData({ education: updated });
                    }} />
                </span> 
                <span className="inline-block px-1">in</span>
                <span className="inline-block min-w-[50px]">
                  <EditableField value={edu.dates} onChange={(val: string) => {
                      const updated = [...data.education];
                      updated[idx].dates = val;
                      updateData({ education: updated });
                    }} />
                </span>
                <span className="inline-block px-1">from</span>
                <span className="inline-block flex-1 min-w-[150px]">
                  <EditableField value={edu.institution} onChange={(val: string) => {
                      const updated = [...data.education];
                      updated[idx].institution = val;
                      updateData({ education: updated });
                    }} />
                </span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
};
