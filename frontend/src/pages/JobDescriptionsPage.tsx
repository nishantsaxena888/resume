import React, { useState } from 'react';
import { BriefcaseBusiness, FileText, Search, Plus, Calendar } from 'lucide-react';
import JdSplitView from '../components/jdTracker/JdSplitView';

export default function JobDescriptionsPage() {
  // Mock Data until FastAPI is hooked up
  const [jds] = useState([
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-sm shadow-sm">
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
