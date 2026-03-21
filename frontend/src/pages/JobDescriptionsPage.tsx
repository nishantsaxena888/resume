import React, { useState } from 'react';
import { BriefcaseBusiness, FileText, Search, Plus, Calendar, ArrowRight } from 'lucide-react';

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
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="font-bold text-slate-700">TechCorp Global <span className="text-slate-400 font-normal">| Targeting Document Match</span></h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-md">87% Match Score</button>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 divide-x divide-slate-100">
            {/* JD Text Side */}
            <div className="p-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                <BriefcaseBusiness className="w-4 h-4"/> Job Requirements
              </h4>
              <div className="prose prose-sm text-slate-600">
                <p>We are looking for a Senior Frontend Engineer who has deep experience with <strong>React</strong>, <strong>TypeScript</strong>, and complex architectural state management.</p>
                <ul>
                  <li>5+ years of production Next.js experience</li>
                  <li>Deep knowledge of CSS and Tailwind</li>
                  <li>Experience building dynamic CMS panels</li>
                </ul>
              </div>
            </div>

            {/* Tailored Resume Payload Side */}
            <div className="p-8 bg-slate-50">
              <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2"><FileText className="w-4 h-4"/> Tailored Delta</span>
                <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">Edit Resume <ArrowRight className="w-3 h-3"/></button>
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-white border border-emerald-200 rounded-lg shadow-sm">
                  <div className="text-xs font-mono text-emerald-600 font-bold mb-1">+ ADDED BULLET</div>
                  <p className="text-sm text-slate-700">"Architected custom dynamic CMS panels using React Context and TailwindCSS, reducing editorial time by 40%."</p>
                </div>

                <div className="p-4 bg-white border border-amber-200 rounded-lg shadow-sm">
                  <div className="text-xs font-mono text-amber-600 font-bold mb-1">~ MODIFIED SUMMARY</div>
                  <p className="text-sm text-slate-700">"Senior Frontend Engineer specializing in Next.js, React, and high-performance Type-Safe architectures..."</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
