import React, { useState } from 'react';
import { BookOpen, Layers, ChevronRight } from 'lucide-react';
import { PrepNoteWidget, PrepFlashcardWidget, PrepCodeWidget, PrepVideoWidget } from '../components/preparation/PrepWidgets';
import type { CourseModel } from '../types/resumeBuilder/resume';

// Temporary mock data simulating the FastAPI payload strictly adhering to our new Zod CourseModelSchema
const mockCoursePayload: CourseModel = {
  id: "course-123",
  title: "React & Architecture Skillon Engine",
  tags: ["Frontend", "System Design"],
  modules: [
    {
      id: "mod-1",
      title: "System Design",
      icon: "Orbit",
      widgets: [
        {
          id: "wid-1-1",
          widgetType: "markdown",
          payload: { title: "Scaling Fast", content: "Use Postgres JSONB to store polymorphic payloads instantly without gigantic joins." }
        },
        {
          id: "wid-1-2",
          widgetType: "flashcard",
          payload: { question: "What is the Big-O of Redis GET?", answer: "O(1) Time Complexity" }
        }
      ]
    },
    {
      id: "mod-2",
      title: "React Deep Dives",
      icon: "Layers",
      widgets: [
        {
          id: "wid-2-1",
          widgetType: "code_snippet",
          payload: { language: "typescript", snippet: "function App() {\n  return <Providers />;\n}" }
        },
        {
          id: "wid-2-2",
          widgetType: "video_embed",
          payload: { videoUrl: "https://youtube.com/watch?v=12345" }
        }
      ]
    }
  ]
};

export default function InterviewPrepPage() {
  const [activeModuleId, setActiveModuleId] = useState(mockCoursePayload.modules[0].id);
  const activeModule = mockCoursePayload.modules.find(m => m.id === activeModuleId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{mockCoursePayload.title}</h1>
            <p className="text-sm text-slate-500">JSON Schema Extensible CMS Board</p>
          </div>
        </div>
      </header>

      {/* Split Pane CMS Layout */}
      <main className="flex-1 flex overflow-hidden h-[calc(100vh-73px)]">
        
        {/* Left TOC Nav (Generic Menu Editor) */}
        <aside className="w-72 bg-white border-r border-slate-200 overflow-y-auto hidden md:block">
          <div className="p-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Knowledge Base</h2>
            <div className="space-y-1">
              {mockCoursePayload.modules.map(module => {
                const isActive = activeModuleId === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModuleId(module.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'bg-rose-50 text-rose-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Layers className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                      {module.title}
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-rose-500" />}
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Right Canvas Layout (Polymorphic Widget Renderer) */}
        <section className="flex-1 bg-slate-50 overflow-y-auto p-8 relative">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 capitalize flex items-center gap-3 mb-2">
              {activeModule?.title}
            </h2>
            <p className="text-slate-500">The RHS Widget engine natively rendering from system-configuration Zod schemas.</p>
          </div>

          {/* Interactive Widget Grid Loop */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {activeModule?.widgets.map(widget => {
               if (widget.widgetType === 'markdown') return <PrepNoteWidget key={widget.id} payload={widget.payload} />;
               if (widget.widgetType === 'flashcard') return <PrepFlashcardWidget key={widget.id} payload={widget.payload} />;
               if (widget.widgetType === 'code_snippet') return <PrepCodeWidget key={widget.id} payload={widget.payload} />;
               if (widget.widgetType === 'video_embed') return <PrepVideoWidget key={widget.id} payload={widget.payload} />;
               return <div key={widget.id} className="p-4 bg-red-100 text-red-600">Unknown Widget Type Error!</div>
            })}
          </div>

        </section>
      </main>
    </div>
  );
}
