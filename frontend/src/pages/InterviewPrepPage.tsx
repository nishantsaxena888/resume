import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, ChevronRight, PanelLeftClose, PanelLeftOpen, ShieldCheck, Zap, Network, Cloud, Maximize, Minimize, Globe, MessageSquare } from 'lucide-react';
import { PrepNoteWidget, PrepFlashcardWidget, PrepCodeWidget, PrepVideoWidget, PrepYouTubeWidget } from '../components/preparation/PrepWidgets';
import type { CourseModel } from '../types/resumeBuilder/resume';

const mockCoursePayload: CourseModel = {
  id: "python-advanced-01",
  title: "Python/AWS Lead Architect Preparation",
  tags: ["AWS", "Serverless", "IAM", "Lambda", "Step Functions"],
  modules: [
    {
      id: "mod-iam-serverless",
      title: "AWS IAM Serverless",
      icon: "ShieldCheck",
      widgets: [
        {
          id: "wid-iam-1",
          widgetType: "markdown",
          payload: { title: "Serverless IAM Security Constraints", content: "In a fully Serverless architecture, IAM Roles and Policies form the rigid backbone of boundary enforcement.\n\nNever use `*` wildcards. An AWS Lambda execution role must be explicitly scoped to exactly the resources it touches (e.g., `dynamodb:PutItem` on a specific ARN) to enforce the Principle of Least Privilege." }
        },
        {
          id: "wid-iam-2",
          widgetType: "flashcard",
          payload: { question: "What is the difference between an IAM Role and a Resource Policy in API Gateway?", answer: "An IAM Role (Execution Role) defines what an entity (like a Lambda) can do downstream. A Resource Policy (on API Gateway) controls exactly WHO can invoke the API endpoint itself from the outside." }
        }
      ]
    },
    {
      id: "mod-lambda",
      title: "Lambda",
      icon: "Zap",
      widgets: [
        {
          id: "wid-lambda-1",
          widgetType: "markdown",
          payload: { title: "Lambda Cold Starts & VPC Bridging", content: "Serverless functions natively run in AWS-managed VPCs and execute extremely fast. \n\nHowever, if a Lambda needs to connect to an internal RDS database, it must attach ENIs (Elastic Network Interfaces) to land inside your private VPC. This historically caused massive Cold Starts, though AWS dramatically improved this with Hyperplane ENIs." }
        },
        {
          id: "wid-lambda-2",
          widgetType: "code_snippet",
          payload: { language: "python", snippet: "import boto3\nimport json\nimport os\n\ndef lambda_handler(event, context):\n    \"\"\"\n    Native Serverless Entrypoint.\n    Executes in a transient microVM.\n    \"\"\"\n    # Event parsing ensures strict boundary validation\n    payload = json.loads(event.get('body', '{}'))\n    \n    return {\n        'statusCode': 200,\n        'body': json.dumps({'message': 'Lambda processed successfully.', 'echo': payload})\n    }" }
        },
        {
          id: "wid-lambda-yt-1",
          widgetType: "youtube",
          payload: { title: "AWS Lambda Masterclass Playlist", url: "https://www.youtube.com/watch?v=iUIWG0h2D84&list=PL9nWRykSBSFjodfc8l8M8yN0ieP94QeEL" }
        }
      ]
    },
    {
      id: "mod-step-functions",
      title: "Step Functions",
      icon: "Network",
      widgets: [
        {
          id: "wid-step-1",
          widgetType: "markdown",
          payload: { title: "State Machine Orchestration", content: "Serverless pipelines rapidly grow too complex for Lambdas linearly calling other Lambdas (Spaghetti Code).\n\nStep Functions orchestrate distributed microservices using Amazon States Language (ASL). They handle error retries, exponential backoffs, `.catch` blocks, and branching parallelism completely out of the Lambda execution runtime." }
        },
        {
          id: "wid-step-yt-1",
          widgetType: "youtube",
          payload: { title: "Step Functions Overview", url: "https://www.youtube.com/watch?v=zCIpWFYDJ8s" }
        },
        {
          id: "wid-step-yt-2",
          widgetType: "youtube",
          payload: { title: "Step Functions Advanced Tutorial", url: "https://www.youtube.com/watch?v=GVpmVu8vcNQ" }
        },
        {
          id: "wid-step-yt-3",
          widgetType: "youtube",
          payload: { title: "Step Functions Deep Dive Playlist", url: "https://www.youtube.com/watch?v=zCIpWFYDJ8s&list=PL9nWRykSBSFgQrO66TmO1vHFP6yuPF5G-" }
        }
      ]
    },
    {
      id: "mod-api-gateway",
      title: "API Gateway",
      icon: "Globe",
      widgets: [
        {
          id: "wid-apigw-yt-1",
          widgetType: "youtube",
          payload: { title: "API Gateway Complete Guide", url: "https://www.youtube.com/watch?v=jcibXVFiFek" }
        }
      ]
    },
    {
      id: "mod-sqs-sns-eventbridge",
      title: "SQS SNS EventBridge",
      icon: "MessageSquare",
      widgets: [
        {
          id: "wid-messaging-yt-1",
          widgetType: "youtube",
          payload: { title: "AWS Asynchronous Messaging", url: "https://www.youtube.com/watch?v=RoKAEzdcr7k" }
        }
      ]
    }
  ]
};

export default function InterviewPrepPage() {
  const { prepId, courseId } = useParams();
  const [courseTitle, setCourseTitle] = useState(mockCoursePayload.title);

  // Dynamically filter mock payload based on explicit active database Course
  const getFilteredModules = () => {
    const t = courseTitle.toLowerCase();
    if (t.includes('iam')) return mockCoursePayload.modules.filter(m => m.id === 'mod-iam-serverless');
    if (t.includes('lambda')) return mockCoursePayload.modules.filter(m => m.id === 'mod-lambda');
    if (t.includes('step')) return mockCoursePayload.modules.filter(m => m.id === 'mod-step-functions');
    if (t.includes('api gateway')) return mockCoursePayload.modules.filter(m => m.id === 'mod-api-gateway');
    if (t.includes('sqs') || t.includes('sns') || t.includes('event')) return mockCoursePayload.modules.filter(m => m.id === 'mod-sqs-sns-eventbridge');
    return mockCoursePayload.modules;
  };

  const filteredModules = getFilteredModules();
  const [activeModuleId, setActiveModuleId] = useState(filteredModules[0]?.id || mockCoursePayload.modules[0].id);
  
  // Re-sync active module when the context dynamically pivots
  useEffect(() => {
    const newModules = getFilteredModules();
    if (newModules.length > 0 && !newModules.find(m => m.id === activeModuleId)) {
      setActiveModuleId(newModules[0].id);
    }
  }, [courseTitle, activeModuleId]);
  
  const [isModuleSidebarOpen, setIsModuleSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem('isModuleSidebarOpen');
    return savedState !== null ? JSON.parse(savedState) : true;
  });
  
  const [isFocusMode, setIsFocusMode] = useState(false);

  const activeModule = mockCoursePayload.modules.find(m => m.id === activeModuleId);

  useEffect(() => {
    localStorage.setItem('isModuleSidebarOpen', JSON.stringify(isModuleSidebarOpen));
  }, [isModuleSidebarOpen]);

  // Sync React state accurately if User naturally exits Fullscreen via 'Esc' key hardware event
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsFocusMode(false);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const getModuleIcon = (iconName: string, isActive: boolean) => {
    const className = `w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-rose-600' : 'text-slate-400'}`;
    if (iconName === 'ShieldCheck') return <ShieldCheck className={className} />;
    if (iconName === 'Zap') return <Zap className={className} />;
    if (iconName === 'Network') return <Network className={className} />;
    if (iconName === 'Globe') return <Globe className={className} />;
    if (iconName === 'MessageSquare') return <MessageSquare className={className} />;
    return <Cloud className={className} />;
  };

  useEffect(() => {
    if (prepId && courseId) {
      fetch(`http://localhost:9999/api/v1/preparations/${prepId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.courses) {
            const course = data.courses.find((c: any) => c.id.toString() === courseId);
            if (course && course.title) {
              setCourseTitle(course.title);
            }
          }
        })
        .catch(console.error);
    }
  }, [prepId, courseId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
             onClick={() => setIsModuleSidebarOpen(!isModuleSidebarOpen)}
             className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none hidden md:flex shrink-0"
             title={isModuleSidebarOpen ? "Collapse Modules" : "Expand Modules"}
          >
             {isModuleSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-lg text-rose-600 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 line-clamp-1">{courseTitle}</h1>
              <p className="text-sm text-slate-500">JSON Schema Extensible CMS Board</p>
            </div>
          </div>
        </div>
        
      </header>

      {/* Split Pane CMS Layout */}
      <main className="flex-1 flex overflow-hidden h-[calc(100vh-73px)]">
        
        {/* Left TOC Nav (Generic Menu Editor) */}
        <aside className={`${isModuleSidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-slate-200 overflow-y-auto hidden md:flex flex-col transition-all duration-300 ease-in-out shrink-0`}>
          <div className="p-4 flex flex-col w-full h-full relative">
            {isModuleSidebarOpen && <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-2 whitespace-nowrap">Knowledge Base</h2>}
            <div className="flex flex-col gap-2 w-full mt-2">
              {filteredModules.map(module => {
                const isActive = activeModuleId === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModuleId(module.id)}
                    title={!isModuleSidebarOpen ? module.title : undefined}
                    className={`flex items-center transition-all duration-200 rounded-lg font-medium text-sm
                      ${isModuleSidebarOpen ? 'w-full px-3 py-2.5 justify-between' : 'w-10 h-10 mx-auto justify-center px-0 py-0'}
                      ${isActive ? 'bg-rose-50 text-rose-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {getModuleIcon(module.icon || 'Cloud', isActive)}
                      {isModuleSidebarOpen && <span className="line-clamp-1 text-left">{module.title}</span>}
                    </div>
                    {isModuleSidebarOpen && isActive && <ChevronRight className="w-4 h-4 text-rose-500 shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Right Canvas Layout (Polymorphic Widget Renderer) */}
        <section id="course-zen-canvas" className={`bg-slate-50 overflow-y-auto p-8 relative transition-all duration-300 ${isFocusMode ? 'fixed inset-0 z-[100] w-screen h-screen' : 'flex-1'}`}>
          
          <button 
             onClick={() => {
                const nextMode = !isFocusMode;
                setIsFocusMode(nextMode);
                try {
                  if (nextMode) {
                    document.getElementById('course-zen-canvas')?.requestFullscreen?.();
                  } else {
                    if (document.fullscreenElement) {
                      document.exitFullscreen?.();
                    }
                  }
                } catch (e) {
                  console.error("Fullscreen API not supported", e);
                }
             }}
             className={`absolute top-6 right-8 p-2.5 rounded-xl border border-slate-200 transition-all duration-300 shadow-sm focus:outline-none z-50
               ${isFocusMode ? 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700 shadow-md' : 'bg-white text-slate-500 hover:text-indigo-600 hover:bg-slate-50'}
             `}
             title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
          >
             {isFocusMode ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
          
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
               if (widget.widgetType === 'youtube') return <PrepYouTubeWidget key={widget.id} payload={widget.payload} />;
               return <div key={widget.id} className="p-4 bg-red-100 text-red-600">Unknown Widget Type Error!</div>
            })}
          </div>

        </section>
      </main>
    </div>
  );
}
