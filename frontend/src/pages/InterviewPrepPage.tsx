import React, { useState } from 'react';
import { BookOpen, Layers, ChevronRight, BriefcaseBusiness } from 'lucide-react';
import { PrepNoteWidget, PrepFlashcardWidget, PrepCodeWidget, PrepVideoWidget } from '../components/preparation/PrepWidgets';
import type { CourseModel } from '../types/resumeBuilder/resume';

const mockCoursePayload: CourseModel = {
  id: "python-advanced-01",
  title: "Python/AWS Lead Architect Preparation",
  tags: ["Python", "AWS", "Leadership"],
  modules: [
    {
      id: "mod-python",
      title: "Deep WSGI/ASGI Architectural Theory",
      icon: "Terminal",
      widgets: [
        {
          id: "wid-py-1",
          widgetType: "markdown",
          payload: { title: "The Web Server Gateway Interface (WSGI)", content: "`PEP 3333` establishes exactly how NGINX routes bytes through a unified C-socket up into the Python interpreter.\n\nWithout WSGI, web servers like Gunicorn wouldn't know how to interface with high-level Python application frameworks (Django, Flask). This contract defines an `environ` dictionary and a `start_response` callable mapping." }
        },
        {
          id: "wid-py-2",
          widgetType: "code_snippet",
          payload: { language: "python", snippet: "def simple_wsgi_app(environ, start_response):\n    \"\"\"\n    Bare-metal Python WSGI entrypoint.\n    No Django, no FastAPI—just the raw pipeline.\n    \"\"\"\n    status = '200 OK'\n    headers = [('Content-type', 'text/plain; charset=utf-8')]\n    \n    # The WSGI Server invokes this callable\n    start_response(status, headers)\n    \n    # The framework returns the exact binary payload down the C socket\n    return [b\"Hello from the exact NS Backend Pipeline Architecture!\"]\n\n# Gunicorn run command:\n# gunicorn -w 4 'app:simple_wsgi_app'" }
        },
        {
           id: "wid-py-3",
           widgetType: "markdown",
           payload: { title: "Production Architecture Diagram", content: "```mermaid\ngraph LR\n    A[Client Request] -->|TCP 443| B(NGINX Proxy)\n    B -->|Unix Socket| C(Gunicorn Master Node)\n    C -->|WSGI spec| D{Django NS Backend}\n    D -->|psycopg2| E[(PostgreSQL)]\n```\nObserve how the proxy acts as a robust shield, buffering slow requests so the synchronous Python Gunicorn workers are not exhausted by slow clients." }
        },
        {
          id: "wid-py-4",
          widgetType: "flashcard",
          payload: { question: "Why migrate a WSGI architecture to ASGI (FastAPI)?", answer: "ASGI (Asynchronous Server Gateway Interface) allows continuous non-blocking web sockets and HTTP/2 multiplexing, fundamentally shattering WSGI's strict 'one-response-per-request' synchronous lock. This allows highly concurrent NS Backend operations on a single port." }
        }
      ]
    },
    {
      id: "mod-aws",
      title: "AWS Infrastructure & Terraform",
      icon: "Server",
      widgets: [
        {
          id: "wid-aws-1",
          widgetType: "markdown",
          payload: { title: "The Charlotte Stack", content: "The required skills explicitly demand AWS Lambda, Terraform, Step Functions, IAM, and Cognito. The client interview process is 'very detailed and technical'. Be prepared to whiteboard Step Function state machines live." }
        },
        {
          id: "wid-aws-2",
          widgetType: "code_snippet",
          payload: { language: "hcl", snippet: "resource \"aws_sfn_state_machine\" \"transaction_pipeline\" {\n  name     = \"Charlotte-Transaction-Pipeline\"\n  role_arn = aws_iam_role.step_function_role.arn\n\n  definition = jsonencode({\n    Comment = \"Orchestrating Lambda via Step Functions\",\n    StartAt = \"ProcessTransaction\",\n    States = {\n      ProcessTransaction = {\n        Type     = \"Task\",\n        Resource = aws_lambda_function.python_processor.arn,\n        End      = true\n      }\n    }\n  })\n}" }
        },
        {
          id: "wid-aws-3",
          widgetType: "flashcard",
          payload: { question: "How do you securely handle API authentication using Cognito?", answer: "Use Amazon Cognito User Pools to generate JWT (JSON Web Tokens). Attach a Cognito Custom Authorizer to the API Gateway to validate the token before the Python Lambda is even invoked." }
        }
      ]
    },
    {
      id: "mod-leadership",
      title: "Offshore Leadership & Agility",
      icon: "Award",
      widgets: [
        {
          id: "wid-lead-1",
          widgetType: "markdown",
          payload: { title: "Hybrid Team Mentoring", content: "The role requires leading an offshore team of 3-4 members and taking occasional late evening calls. The recruiter feedback stated: 'We need a strong technical profile who can rationally think and answer some scenario-based questions and good communication.'" }
        },
        {
          id: "wid-lead-2",
          widgetType: "flashcard",
          payload: { question: "Scenario: An offshore team member pushes code that brings down the staging server right before a major Charlotte demo. What is your FTE reaction?", answer: "1. Assume immediate absolute ownership. \n2. Rollback the deployment using Terraform state to restore staging stability instantly.\n3. Conduct a blameless post-mortem later focusing on why the CI/CD pipeline did not catch the error during testing." }
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
        
        {/* User request: If attached having a tool tip on top right */}
        <div className="flex items-center gap-3 hidden md:flex">
           <div className="group relative">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-lg text-sm font-medium cursor-help">
               <BriefcaseBusiness className="w-4 h-4" />
               <span className="truncate max-w-[200px]">Attached: Charlotte AWS Lead</span>
             </div>
             {/* Hover Tooltip */}
             <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
               <div className="font-bold mb-1">Target Job Description</div>
               <p className="text-slate-300">This generic course structure is currently constrained against "Python/AWS Lead @ Charlotte Client". All generated notes and code snippets reflect this contextual boundary.</p>
             </div>
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
