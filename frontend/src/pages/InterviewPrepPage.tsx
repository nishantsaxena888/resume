import React, { useState } from 'react';
import { BookOpen, Layers, Terminal, Server, Orbit, ChevronRight, HelpCircle } from 'lucide-react';
import { PrepNoteWidget, PrepFlashcardWidget } from '../components/preparation/PrepWidgets';

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
               <PrepNoteWidget />
               <PrepFlashcardWidget />
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
