import React, { useState } from 'react';
import { BriefcaseBusiness, FileText, Search, Plus, Calendar, X, Building2 } from 'lucide-react';
import JdSplitView from '../components/jdTracker/JdSplitView';

export default function JobDescriptionsPage() {
  const [jds, setJds] = useState([
    {
      id: '1',
      company: 'TechCorp Global',
      role: 'Senior Frontend Engineer',
      date: 'Oct 24, 2026',
      resumeTailored: 'Frontend Lead - TechCorp Variant'
    },
    {
      id: '2',
      company: 'DataFlow Systems',
      role: 'Fullstack Staff Engineer',
      date: 'Oct 22, 2026',
      resumeTailored: 'Default Resume'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newJd, setNewJd] = useState({ company: '', role: '', rawText: '' });

  const handleCreateJd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJd.company || !newJd.role) return;

    setJds([
      {
        id: Math.random().toString(),
        company: newJd.company,
        role: newJd.role,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        resumeTailored: 'Default Resume'
      },
      ...jds
    ]);
    setIsCreating(false);
    setNewJd({ company: '', role: '', rawText: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative">
      
      {/* --- CREATION MODAL OVERLAY --- */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-500" /> Track New Target Role
              </h2>
              <button onClick={() => setIsCreating(false)} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateJd} className="p-6 flex flex-col gap-5 bg-white">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Company Name</label>
                  <input 
                    required autoFocus
                    type="text" 
                    placeholder="e.g. OpenAI" 
                    value={newJd.company}
                    onChange={e => setNewJd({...newJd, company: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Role / Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Senior Software Engineer" 
                    value={newJd.role}
                    onChange={e => setNewJd({...newJd, role: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Raw Job Description</label>
                <textarea 
                  required
                  placeholder="Paste the entire raw text of the job description here so the scanner can map your resume deltas..." 
                  value={newJd.rawText}
                  onChange={e => setNewJd({...newJd, rawText: e.target.value})}
                  className="w-full h-48 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-bold text-sm shadow-sm flex items-center gap-2">
                  <Plus className="w-4 h-4"/> Save Target JD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <BriefcaseBusiness className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Job Descriptions Tracker</h1>
            <p className="text-sm text-slate-500">Map your tailored resumes to specific roles</p>
          </div>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" /> New JD Target
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: List of JDs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search companies or roles..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-3">
            {jds.map(jd => (
              <div key={jd.id} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition cursor-pointer group">
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600">{jd.company}</h3>
                <p className="text-slate-600 text-sm font-medium mb-3">{jd.role}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {jd.date}</span>
                  <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-indigo-500"/> {jd.resumeTailored}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Split Comparison View */}
        <div className="lg:col-span-2">
          <JdSplitView />
        </div>

      </main>
    </div>
  );
}
