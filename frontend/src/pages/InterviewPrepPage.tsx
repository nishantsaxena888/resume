import React, { useState } from 'react';
import { BookOpen, Layers, Terminal, Server, Orbit, HelpCircle, ChevronRight, FileText } from 'lucide-react';

export default function InterviewPrepPage() {
  const [activeTopic, setActiveTopic] = useState('system-design');

  const topics = [
    { id: 'system-design', label: 'System Design', icon: Orbit },
    { id: 'react-advanced', label: 'React Deep Dives', icon: Layers },
    { id: 'backend-db', label: 'Postgres & FastAPI', icon: Server },
    { id: 'algorithms', label: 'Algorithms', icon: Terminal },
    { id: 'behavioral', label: 'Behavioral Q&A', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Interview Command Center</h1>
            <p className="text-sm text-slate-500">CMS Topic Board & Study Widgets</p>
          </div>
        </div>
      </header>

      {/* Split Pane CMS Layout */}
      <main className="flex-1 flex overflow-hidden h-[calc(100vh-73px)]">
        
        {/* Left TOC Nav */}
        <aside className="w-72 bg-white border-r border-slate-200 overflow-y-auto hidden md:block">
          <div className="p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Knowledge Base</h2>
            <div className="space-y-1">
              {topics.map(topic => {
                const Icon = topic.icon;
                const isActive = activeTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopic(topic.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-rose-50 text-rose-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                      {topic.label}
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-rose-500" />}
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Right Canvas Layout */}
        <section className="flex-1 bg-slate-50 overflow-y-auto p-8 relative">
          
          {/* Top Canvas Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 capitalize flex items-center gap-3 mb-2">
              {topics.find(t => t.id === activeTopic)?.label}
            </h2>
            <p className="text-slate-500">Select any widget below to drill into specific preparatory topics. This board is connected dynamically to the FastAPI endpoints.</p>
          </div>

          {/* Interactive Widget Grid */}
          {activeTopic === 'system-design' && (
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
               {/* Note Widget */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-80">
                 <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                   <FileText className="w-4 h-4 text-blue-500"/>
                   <span className="text-sm font-bold text-slate-700">Scaling Resume Platform</span>
                 </div>
                 <div className="p-5 overflow-y-auto prose prose-sm text-slate-600 flex-1">
                   <p>When migrating from JSON to Database:</p>
                   <ul>
                     <li>Avoid massive join ops by utilizing Postgres JSONB for the Resume Payloads.</li>
                     <li>Cache heavily using Redis if read ratios exceed 10:1.</li>
                     <li>ElasticSearch sync via Logstash tracking DB row modification streams.</li>
                   </ul>
                 </div>
               </div>

                {/* Q&A Flashcard Widget */}
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-80 group cursor-pointer hover:border-rose-300 transition-colors relative">
                 <div className="absolute inset-0 bg-rose-50/50 opacity-0 group-hover:opacity-100 transition duration-300 -z-0"></div>
                 <div className="p-8 flex items-center justify-center flex-1 text-center relative z-10">
                    <div>
                      <h4 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-3">Flashcard Front</h4>
                      <p className="font-semibold text-lg text-slate-800 group-hover:text-rose-900 transition">How does React Handle Context Re-Renders?</p>
                    </div>
                 </div>
                 <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center relative z-10">
                   <span className="text-xs text-slate-500 font-medium">Click to flip card</span>
                   <HelpCircle className="w-4 h-4 text-slate-400"/>
                 </div>
               </div>
             </div>
          )}

          {activeTopic !== 'system-design' && (
             <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
               <Orbit className="w-8 h-8 mb-3 opacity-50" />
               <p className="font-medium text-sm">Select 'System Design' to see sample widgets.</p>
               <p className="text-xs mt-1 opacity-70">Add more modules here dynamically.</p>
             </div>
          )}

        </section>
      </main>
    </div>
  );
}
