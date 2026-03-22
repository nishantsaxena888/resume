import React, { useState } from 'react';
import { BriefcaseBusiness, Save, CheckCircle2, Edit2 } from 'lucide-react';
import { DefaultEditor } from 'react-simple-wysiwyg';

export default function SingleJDPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [jd, setJd] = useState({
    company: 'Truist Bank (via CTS)',
    role: 'Principal AWS / Python Architect',
    description: `14+ years software engineering
Extensive experience leading offshore teams (this is a key requirement - 4+ members).
10+ years Python/AWS
5+ years Serverless/Lambda, Step Functions
AWS IAM/Cognito Security implementation
Terraform infrastructure deployment`,
    feedback: `Need someone with FTE ownership mindset, not contractor mentality.
Very solid on API / Systems design on Lambda.
Scenario based interview evaluating driving architectural decisions.`
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 w-full overflow-y-auto">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-700">
            <BriefcaseBusiness className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Active Job Description</h1>
            <p className="text-sm font-medium text-slate-500">Your current primary target role context</p>
          </div>
        </div>
        {isEditing ? (
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-bold text-sm shadow-md disabled:opacity-70"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"/>
            ) : saved ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Saving...' : saved ? 'Saved!' : 'Save Details'}
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-bold text-sm shadow-sm"
          >
            <Edit2 className="w-4 h-4" />
            Edit JD
          </button>
        )}
      </header>

      <div className="flex-1 w-full p-6 md:p-10">
        <main className="max-w-4xl mx-auto w-full bg-white shadow-sm border border-slate-200 rounded-2xl p-10 md:p-14 flex flex-col gap-10">
        
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Target Company</label>
            {isEditing ? (
              <input 
                type="text" 
                value={jd.company}
                onChange={(e) => setJd({ ...jd, company: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-slate-200 shadow-sm rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all focus:border-indigo-500"
              />
            ) : (
              <div className="w-full px-4 py-3 bg-white border border-slate-100 shadow-sm rounded-xl text-slate-900 font-bold">
                {jd.company}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Role Title</label>
            {isEditing ? (
              <input 
                type="text" 
                value={jd.role}
                onChange={(e) => setJd({ ...jd, role: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-slate-200 shadow-sm rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all focus:border-indigo-500"
              />
            ) : (
              <div className="w-full px-4 py-3 bg-white border border-slate-100 shadow-sm rounded-xl text-slate-900 font-bold">
                {jd.role}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Direct Job Requirements (Paragraphs)</label>
          <div className="flex flex-col w-full transition-all">
            <div className={isEditing ? 'block rounded-xl border border-slate-200 shadow-sm bg-white overflow-hidden' : 'hidden'}>
              <DefaultEditor 
                value={jd.description} 
                onChange={(e) => setJd({ ...jd, description: e.target.value })} 
                className="w-full border-0 !shadow-none text-[17px] leading-8 text-slate-800 [&_.rsw-toolbar]:bg-slate-50/50 [&_.rsw-toolbar]:border-b [&_.rsw-toolbar]:border-slate-100 [&_.rsw-toolbar]:px-3 [&_.rsw-toolbar]:py-2 [&_.rsw-editor]:min-h-[120px] [&_.rsw-editor]:px-5 [&_.rsw-editor]:py-5 [&_.rsw-editor]:!text-slate-800 [&_.rsw-editor_*]:!text-slate-800 [&_.rsw-editor]:font-normal [&_.rsw-editor]:leading-8 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
              />
            </div>
            {!isEditing && (
              <div 
                className="w-full py-2 text-[17px] text-slate-800 font-normal leading-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_p]:mb-5 last:[&_p]:mb-0 [&_b]:font-bold [&_b]:text-slate-900"
                dangerouslySetInnerHTML={{ __html: jd.description }}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-black text-amber-600 uppercase tracking-widest pl-1">Recruiter Feedback & Meta Context</label>
          <div className="flex flex-col w-full transition-all">
            <div className={isEditing ? 'block rounded-xl border border-amber-200 shadow-sm bg-[#FFFAF0] overflow-hidden' : 'hidden'}>
              <DefaultEditor 
                value={jd.feedback} 
                onChange={(e) => setJd({ ...jd, feedback: e.target.value })} 
                className="w-full border-0 !shadow-none text-[17px] leading-8 text-amber-950 [&_.rsw-toolbar]:bg-amber-50/50 [&_.rsw-toolbar]:border-b [&_.rsw-toolbar]:border-amber-100 [&_.rsw-toolbar]:px-3 [&_.rsw-toolbar]:py-2 [&_.rsw-editor]:min-h-[120px] [&_.rsw-editor]:px-5 [&_.rsw-editor]:py-5 [&_.rsw-editor]:!text-amber-950 [&_.rsw-editor_*]:!text-amber-950 [&_.rsw-editor]:font-normal [&_.rsw-editor]:leading-8 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500"
              />
            </div>
            {!isEditing && (
              <div 
                className="w-full py-2 text-[17px] text-amber-950 font-normal leading-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_p]:mb-5 last:[&_p]:mb-0 [&_b]:font-bold [&_b]:text-amber-950"
                dangerouslySetInnerHTML={{ __html: jd.feedback }}
              />
            )}
          </div>
        </div>

        </main>
      </div>
    </div>
  );
}
