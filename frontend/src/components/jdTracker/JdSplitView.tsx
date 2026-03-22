import React, { useState } from 'react';
import { BriefcaseBusiness, FileText, ArrowRight, Save, RefreshCw, Loader2 } from 'lucide-react';
import type { JobDescriptionModel } from '../../types/resumeBuilder/resume';
import jdSchema from '../../../../system-configuration/base/en/jd/jd.schema.json';
import { EditableField } from '../EditableField';

export default function JdSplitView() {
  const [data, setData] = useState<JobDescriptionModel>({
    companyName: 'Truist Bank (via CTS)',
    roleTitle: 'Lead AWS / Python Engineer',
    location: 'Charlotte, NC (100% Remote)',
    minExperience: 10,
    requiredSkills: ['AWS', 'Python', 'Lambda', 'Step Functions', 'Terraform', 'IAM', 'Cognito'],
    recruiterFeedback: 'Feedback: Candidates previously failed AWS scenario-based questions. Needs a strong technical profile who can rationally think, answer scenario-based questions with good communication, and take ownership like an FTE. Must lead an offshore team (3-4 members) and be flexible for late evening calls.'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Saved !");
    }, 1500);
  };

  const handleCompare = () => {
    setIsComparing(true);
    setMatchScore(null);
    setTimeout(() => {
      setIsComparing(false);
      setMatchScore(94);
    }, 2000);
  };

  const handleChange = (path: string, value: any) => {
    setData(prev => {
      const keys = path.split('.');
      const newData = { ...prev } as any;
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (typeof current[key] !== 'object') current[key] = {};
        current = current[key];
      }
      current[keys[keys.length - 1]] = value;
      return newData as JobDescriptionModel;
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h2 className="font-bold text-slate-700">{data.companyName} <span className="text-slate-400 font-normal">| {data.roleTitle}</span></h2>
        <div className="flex gap-2">
          <button 
            onClick={handleCompare}
            disabled={isComparing || isSaving}
            className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-700 rounded-md shadow flex items-center gap-1 hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {isComparing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />} 
            {isComparing ? "Analyzing..." : "Compare"}
          </button>

          <button 
            onClick={handleSave}
            disabled={isSaving || isComparing}
            className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-md shadow flex items-center gap-1 hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} 
            {isSaving ? "Saving..." : "Save"}
          </button>
          
          {matchScore && (
            <button className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-md animate-in fade-in zoom-in duration-300">
              {matchScore}% Match Score
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-2 divide-x divide-slate-100 overflow-hidden">
        {/* Dynamic JD JSON Schema Form Side */}
        <div className="p-6 overflow-y-auto">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
            <BriefcaseBusiness className="w-4 h-4"/> Job Requirements Schema
          </h4>
          <div className="space-y-5">
            {Object.entries(jdSchema.properties).map(([key, config]) => {
              const value = (data as any)[key] || '';
              const isArray = (config as any).type === 'array';
              
              return (
                <div key={key} className="flex flex-col gap-1.5 border border-slate-100 p-4 rounded-xl bg-white shadow-sm hover:shadow hover:border-slate-300 transition-all">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{(config as any).title || key}</label>
                  {(config as any).description && <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">{(config as any).description}</p>}
                  
                  {isArray ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Array.isArray(value) && value.length > 0 ? value.map((v, i) => (
                        <div key={i} className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 flex items-center gap-1 rounded-md text-xs font-bold shadow-sm">
                          {v}
                        </div>
                      )) : <span className="text-slate-400 text-xs italic">Awaiting schema constraint data...</span>}
                      {/* Placeholder add button for future logic */}
                      <button className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold px-2 py-1 rounded bg-slate-50 hover:bg-indigo-50 border border-dashed border-slate-300 transition-colors">+ Add Skill</button>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden group focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition-all">
                      <EditableField
                        value={value.toString()}
                        onChange={(val) => handleChange(key, val)}
                        className="px-3 py-2 text-sm text-slate-800 w-full min-h-[40px]"
                        multiline={key === 'recruiterFeedback'}
                        placeholder={`Enter ${(config as any).title}...`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tailored Resume Payload Side */}
        <div className="p-6 bg-slate-50 overflow-y-auto">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2"><FileText className="w-4 h-4"/> Tailored Delta Mapping</span>
            <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">Edit Master Resume <ArrowRight className="w-3 h-3"/></button>
          </h4>
          <div className="space-y-4">
            <div className="p-4 bg-white border border-emerald-200 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widerborder border-emerald-100">+ Targeted Achievement (CapitalOne)</div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">"Developed a transaction pipeline using AWS Step Functions, Lambda, and DynamoDB. Converted Java to Python using TDD."</p>
              <div className="mt-3 flex gap-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">AWS Step Functions</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">Python</span>
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-bold rounded">Matched: Lambda</span>
              </div>
            </div>

            <div className="p-4 bg-white border border-emerald-200 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widerborder border-emerald-100">+ Targeted Achievement (Centene)</div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">"Configured fine-grained AWS IAM permissions and Cognito user pools across distributed CI/CD pipelines deploying infrastructure via Terraform."</p>
              <div className="mt-3 flex gap-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">Terraform</span>
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-bold rounded">Matched: IAM</span>
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] font-bold rounded">Matched: Cognito</span>
              </div>
            </div>

            <div className="p-4 bg-white border border-indigo-200 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-widerborder border-indigo-100">~ Dynamically Updated Summary</div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">"Principal AWS / Python Architect specializing in Serverless pipelines (Lambda, Step Functions, IAM, Cognito). Demonstrated FTE-ownership mindset with extensive experience leading globally distributed offshore teams (4+ members) and actively driving complex scenario-based architectural decisions."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
