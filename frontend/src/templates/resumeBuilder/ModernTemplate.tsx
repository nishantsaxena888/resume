import React from 'react';
import { Mail, Phone, Linkedin, Trash2, MapPin } from 'lucide-react';
import type { ResumeModel } from '../../types/resumeBuilder/resume';
import { useResume } from '../../context/resumeBuilder/ResumeContext';
import { EditableField } from '../../components/EditableField';

interface TemplateProps {
  data: ResumeModel;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { updateData, updatePersonalInfo } = useResume();
  const info = data.personalInfo;

  return (
    <div className="w-full max-w-[850px] bg-white text-gray-900 shadow-xl print:shadow-none print:w-full print:max-w-none font-sans relative flex min-h-[1100px]">
      
      {/* Left Column (Dark) */}
      <div className="w-1/3 bg-slate-800 text-slate-100 p-8 sm:p-10 flex flex-col gap-10">
        
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-sm tracking-[0.2em] uppercase font-semibold text-slate-400 border-b border-slate-600 pb-2 mb-4">Contact</h2>
          
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-slate-400" />
            <div className="flex-1">
              <EditableField entity="personalInfo" field="email" value={info.email} onChange={(val: string) => updatePersonalInfo({ email: val })} placeholder="Email" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-slate-400" />
            <div className="flex-1">
              <EditableField entity="personalInfo" field="phone" value={info.phone || ''} onChange={(val: string) => updatePersonalInfo({ phone: val })} placeholder="Phone" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Linkedin className="w-4 h-4 text-slate-400" />
            <div className="flex-1">
               <EditableField entity="personalInfo" field="linkedin" value={info.linkedin || ''} onChange={(val: string) => updatePersonalInfo({ linkedin: val })} className="text-blue-600" placeholder="LinkedIn URL" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <div className="flex-1">
              <EditableField entity="personalInfo" field="location" value={info.location || ''} onChange={(val: string) => updatePersonalInfo({ location: val })} placeholder="Location" />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4 group/section relative">
          <h2 className="text-sm tracking-[0.2em] uppercase font-semibold text-slate-400 border-b border-slate-600 pb-2 mb-4 flex justify-between items-center">
            Skills
          </h2>

          <div className="space-y-5">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="group/item relative">
                <button onClick={() => updateData({ skills: data.skills.filter((_, i) => i !== idx) })} className="absolute -left-6 top-1 print:hidden opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-300"><Trash2 size={14}/></button>
                <div className="font-bold text-slate-200 mb-1">
                  <EditableField value={skillGroup.category} onChange={(val: string) => {
                      const updated = [...data.skills]; updated[idx].category = val; updateData({ skills: updated });
                    }} />
                </div>
                <div className="text-sm text-slate-300 leading-relaxed">
                  <EditableField value={skillGroup.items} multiline onChange={(val: string) => {
                      const updated = [...data.skills]; updated[idx].items = val; updateData({ skills: updated });
                    }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education (Moved here for visual balance in two-column) */}
        <div className="space-y-4 group/section relative">
          <h2 className="text-sm tracking-[0.2em] uppercase font-semibold text-slate-400 border-b border-slate-600 pb-2 mb-4 flex justify-between items-center">
            Education
          </h2>

          <div className="space-y-4">
             {data.education.map((edu, idx) => (
              <div key={idx} className="group/item relative">
                <button onClick={() => updateData({ education: data.education.filter((_, i) => i !== idx) })} className="absolute -left-6 top-1 print:hidden opacity-0 group-hover/item:opacity-100 text-red-400 hover:text-red-300"><Trash2 size={14}/></button>
                <div className="font-bold text-slate-200">
                  <EditableField value={edu.degree} onChange={(val: string) => {
                      const updated = [...data.education]; updated[idx].degree = val; updateData({ education: updated });
                    }} />
                </div>
                <div className="text-sm text-slate-400 mb-0.5">
                  <EditableField value={edu.institution} onChange={(val: string) => {
                      const updated = [...data.education]; updated[idx].institution = val; updateData({ education: updated });
                    }} />
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  <EditableField value={edu.dates} onChange={(val: string) => {
                      const updated = [...data.education]; updated[idx].dates = val; updateData({ education: updated });
                    }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column (Light) */}
      <div className="w-2/3 bg-white p-8 sm:p-12 flex flex-col pt-16">
        
        {/* Header Title */}
        <div className="mb-10 group/header relative">
          <div className="flex flex-col text-left">
            <EditableField entity="personalInfo" field="fullName" value={info.fullName} onChange={(val: string) => updatePersonalInfo({ fullName: val })} className="text-4xl font-bold text-slate-800 tracking-tight" placeholder="First Last" />
            <EditableField entity="personalInfo" field="title" value={info.title || ''} onChange={(val: string) => updatePersonalInfo({ title: val })} className="text-xl text-indigo-600 font-medium mt-2" placeholder="Professional Title" />
          </div>
        </div>

        {/* Profile Summary */}
        <div className="mb-10 group/section relative">
          <h3 className="text-2xl font-bold text-slate-800 mb-4 flex justify-between items-center group-hover/section:text-indigo-600 transition-colors">
            Profile
          </h3>
          <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-slate-700 leading-relaxed">
             {data.summary.map((point, idx) => (
              <li key={idx} className="group/item relative">
                <button onClick={() => updateData({ summary: data.summary.filter((_, i) => i !== idx) })} className="absolute -left-6 top-1 print:hidden opacity-0 group-hover/item:opacity-100 text-red-500 hover:text-red-700"><Trash2 size={14}/></button>
                <EditableField 
                  value={point} multiline onChange={(val: string) => { const updated = [...data.summary]; updated[idx] = val; updateData({ summary: updated }); }} 
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div className="group/section relative">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex justify-between items-center group-hover/section:text-indigo-600 transition-colors">
            Experience
          </h3>
          
          <div className="space-y-8">
            {data.experience.map((job, idx) => (
              <div key={idx} className="group/job relative">
                <button onClick={() => updateData({ experience: data.experience.filter((_, i) => i !== idx) })} className="absolute -left-10 top-1 print:hidden opacity-0 group-hover/job:opacity-100 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full"><Trash2 size={14}/></button>
                
                <div className="flex flex-col mb-3">
                  <h4 className="font-bold text-slate-900 text-lg">
                    <EditableField value={job.role} onChange={(val: string) => { const updated = [...data.experience]; updated[idx].role = val; updateData({ experience: updated }); }} />
                  </h4>
                  <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                    <span>
                       <EditableField value={job.company} onChange={(val: string) => { const updated = [...data.experience]; updated[idx].company = val; updateData({ experience: updated }); }} />
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">
                      <EditableField value={job.dates} onChange={(val: string) => { const updated = [...data.experience]; updated[idx].dates = val; updateData({ experience: updated }); }} />
                    </span>
                  </div>
                </div>
                
                <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm text-slate-700 leading-relaxed relative group/points">

                  {job.points.map((point, pIdx) => (
                    <li key={pIdx} className="group/point relative">
                      <button onClick={() => {
                        const updated = [...data.experience];
                        updated[idx].points = updated[idx].points.filter((_, i) => i !== pIdx);
                        updateData({ experience: updated });
                      }} className="absolute -left-6 top-1 print:hidden opacity-0 group-hover/point:opacity-100 text-red-400 hover:text-red-600"><Trash2 size={12}/></button>
                      <EditableField 
                        value={point} multiline onChange={(val: string) => { const updated = [...data.experience]; updated[idx].points[pIdx] = val; updateData({ experience: updated }); }} 
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
