import React, { useState, useEffect } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { Search, FileText, CheckCircle2, BriefcaseBusiness, Copy, Terminal } from 'lucide-react';
import { useResume } from '../context/resumeBuilder/ResumeContext';
import { useParams } from 'react-router-dom';

export default function NotesForPrintPage() {
  const { prepId } = useParams();
  const { data: resume } = useResume();
  const [notesContent, setNotesContent] = useState('<h2>Interview Talking Points</h2><p>Synthesize your stories and architectures here...</p>');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 1. Fetch existing Notes payload from the DB on load
  useEffect(() => {
    fetch(`http://localhost:9999/api/v1/preparations/${prepId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.notes && data.notes.content) {
          setNotesContent(data.notes.content);
        }
      })
      .catch(console.error);
  }, [prepId]);

  // 2. Debounced Auto-Save to the DB
  useEffect(() => {
    if (isInitialLoad) {
       setIsInitialLoad(false);
       return;
    }
    
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      fetch(`http://localhost:9999/api/v1/preparations/${prepId}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: notesContent })
      })
      .then(() => {
         setSaveStatus('saved');
         setTimeout(() => setSaveStatus('idle'), 3000);
      })
      .catch(console.error);
    }, 1500); // 1.5s debounce

    return () => clearTimeout(timer);
  }, [notesContent, prepId]);

  // Explicitly mapping the Founder's "Optional Resume/JD" specification
  // In the real DB hookup, this will query: prep.hasResume() and prep.hasJd()
  const hasAttachedResume = true;
  const hasAttachedJd = true;

  // Search logic for Resume Data (Only query if a Resume is actually attached)
  const filteredWork = resume?.experience ? resume.experience.filter(w => 
    w.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
    w.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.achievements.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  const filteredSkills = resume?.skills ? resume.skills.filter(s => 
    s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.items.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  return (
    <div className="flex w-full h-full bg-slate-50 overflow-hidden font-sans">
      
      {/* LEFT PANEL: The Smart Document */}
      <div className="flex-1 overflow-y-auto px-6 py-10 md:px-10 flex flex-col items-center">
        
        <div className={`w-full flex items-center justify-between ${hasAttachedResume ? 'max-w-4xl' : 'max-w-6xl'} mb-6`}>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Printable Cheat Sheet
              {saveStatus === 'saving' && <span className="text-[10px] uppercase tracking-widest bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" /> Saving...</span>}
              {saveStatus === 'saved' && <span className="text-[10px] uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Saved!</span>}
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Compile your absolute best talking points here for the interview.</p>
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 font-bold text-sm px-4 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> Print Document
          </button>
        </div>

        {/* The Google Doc Canvas */}
        <main className={`${hasAttachedResume ? 'max-w-4xl' : 'max-w-6xl'} w-full bg-white shadow-sm border border-slate-200 rounded-2xl flex flex-col overflow-hidden min-h-[800px] transition-all`}>
          <DefaultEditor 
            value={notesContent} 
            onChange={(e) => setNotesContent(e.target.value)} 
            className="flex-1 w-full border-0 !shadow-none text-[17px] leading-8 text-slate-800 [&_.rsw-toolbar]:bg-slate-50/50 [&_.rsw-toolbar]:border-b [&_.rsw-toolbar]:border-slate-100 [&_.rsw-toolbar]:p-4 [&_.rsw-editor]:px-10 [&_.rsw-editor]:py-10 [&_.rsw-editor]:!text-slate-800 [&_.rsw-editor_*]:!text-slate-800 [&_.rsw-editor]:font-normal [&_.rsw-editor]:leading-[1.8] [&_p]:mb-6 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 focus-within:ring-0 focus-within:border-0"
          />
        </main>

      </div>

      {/* RIGHT PANEL: The Reference Sidebar (Only renders if Resume is voluntarily attached) */}
      {hasAttachedResume && (
        <div className="w-[400px] border-l border-slate-200 bg-white flex flex-col shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)] z-10 transition-all">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex flex-col gap-2">
            <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest px-1">Context Engine</h2>
            <div className="flex gap-4 border-b border-indigo-600 mt-2">
                <button className={`pb-3 px-1 text-sm font-bold transition-all relative text-indigo-600`}>
                  Resume Mapping Strategy
                  <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />
                </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto bg-slate-50/50">
            
            <div className="p-5 flex flex-col gap-6">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search attached resume..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              {/* Skills Injector */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Core Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {filteredSkills.map((skill, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm cursor-copy hover:border-indigo-400 hover:text-indigo-700 transition-all flex items-center gap-1 group">
                      {skill.category}
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
                    </div>
                  ))}
                  {filteredSkills.length === 0 && <span className="text-xs text-slate-400 px-1">No technologies match your search.</span>}
                </div>
              </div>

              {/* Projects & Work History Injector */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                  <BriefcaseBusiness className="w-3.5 h-3.5" /> Project Context
                </div>
                <div className="flex flex-col gap-3">
                  {filteredWork.map((work, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm cursor-copy hover:border-indigo-400 group transition-all">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-700">{work.company}</h4>
                        <Copy className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </div>
                      <p className="text-xs font-bold text-slate-500 mb-2">{work.role}</p>
                      <ul className="text-xs font-medium text-slate-600 list-disc pl-3">
                        {work.achievements.slice(0, 2).map((ach, i) => (
                          <li key={i} className="mb-1 leading-relaxed">{ach}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {filteredWork.length === 0 && <span className="text-xs text-slate-400 px-1">No projects match your search.</span>}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
