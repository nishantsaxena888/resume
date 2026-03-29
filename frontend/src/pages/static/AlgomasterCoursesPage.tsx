import { Server, ArrowLeft, ExternalLink, Cpu, Briefcase, Code, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AlgomasterCoursesPage() {
  const categories = [
    {
      name: "System Design & Architecture",
      icon: <Server className="w-6 h-6 text-emerald-600" />,
      courses: [
        {
          title: "System Design Fundamentals",
          url: "https://algomaster.io/learn/system-design/course-introduction",
          tldr: "Build a rock-solid foundation in distributed systems concepts and scaling patterns."
        },
        {
          title: "System Design Interviews",
          url: "/static-notes/algomaster/system-design-interviews",
          isOffline: true,
          tldr: "Master advanced system design interview concepts, specific technologies and 50+ interview questions."
        },
        {
          title: "Low Level Design (LLD)",
          url: "https://algomaster.io/learn/lld/course-introduction",
          tldr: "Master object-oriented design principles (SOLID) and design patterns. Build highly maintainable software systems."
        }
      ]
    },
    {
      name: "Algorithms & Concurrency",
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      courses: [
        {
          title: "Data Structures & Algorithms (DSA) Patterns",
          url: "https://algomaster.io/learn/dsa",
          tldr: "Master 50+ essential coding patterns to ace any technical whiteboard interview."
        },
        {
          title: "Concurrency Interview Prep",
          url: "https://algomaster.io/learn/concurrency-interview",
          tldr: "Master multiprocessing, the GIL, race conditions, and multi-threading fundamentals."
        }
      ]
    },
    {
      name: "AI Engineering & Machine Learning",
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      courses: [
        {
          title: "AI Engineering Mastery",
          url: "https://algomaster.io/learn/ai-engineering",
          tldr: "Master AI engineering from first principles. Learn LLMs, prompt engineering, RAG pipelines, and autonomous agents."
        }
      ]
    },
    {
      name: "Programming Languages Mastery",
      icon: <Code className="w-6 h-6 text-orange-500" />,
      courses: [
        {
          title: "Advanced Python",
          url: "https://algomaster.io/learn/python",
          tldr: "Learn Python from scratch to advanced level. Master Pythonic programming practices and internal memory models."
        },
        {
          title: "Advanced Java",
          url: "https://algomaster.io/learn/java",
          tldr: "Comprehensive Java backend programming. Covers pure OOP architectures, collections, streams, and concurrency."
        },
        {
          title: "Modern C++",
          url: "https://algomaster.io/learn/cpp",
          tldr: "Master C++ memory management, Smart Pointers, STL, templates, and modern C++14/20 features."
        }
      ]
    },
    {
      name: "Behavioral & Soft Skills",
      icon: <Briefcase className="w-6 h-6 text-slate-800" />,
      courses: [
        {
          title: "Behavioral Interviews Framework",
          url: "https://algomaster.io/learn/behavioral/what-are-behavioral-interviews",
          tldr: "Prepare for HR/Manager rounds with structured execution frameworks. Master the STAR method perfectly."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white print:m-0 print:p-0 pb-24">
      <div className="max-w-[1000px] w-full mx-auto p-4 md:p-8 print:px-0 print:py-4 bg-white shadow-xl min-h-screen relative border border-slate-200">
        
        <div className="mb-4">
          <Link to="/static-notes" className="print:hidden flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold mb-8 transition-colors z-50 relative">
            <ArrowLeft className="w-5 h-5" /> Back to Notes Hub
          </Link>
        </div>

        <div className="mb-12 print:mb-8 border-b-4 border-slate-900 pb-8 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <Code className="w-10 h-10 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Algomaster Playbook
              </h1>
              <p className="text-lg md:text-xl font-bold text-slate-500 mt-2">
                Curated Educational Matrix for DSA, LLD, and System Design
              </p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl mb-12">
          <p className="text-md text-slate-800 font-medium leading-relaxed">
            <strong className="text-indigo-700">Mission Directives:</strong> This module extracts the official certification paths and study curriculums directly from <a href="https://algomaster.io/courses" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Algomaster.io</a>. These resources are mathematically designed to harden your theoretical boundaries before tackling the raw engineering playbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl shadow-sm border border-slate-200">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-black text-slate-900">{category.name}</h2>
              </div>
              
              <div className="space-y-4">
                {category.courses.map((course, cIdx) => (
                  <div key={cIdx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col gap-3">
                    {course.isOffline ? (
                      <Link 
                        to={course.url} 
                        className="text-lg font-bold text-indigo-900 group-hover:text-indigo-600 transition-colors flex items-start justify-between gap-4"
                      >
                        <span className="flex items-center gap-2 flex-wrap">
                          {course.title}
                          <span className="bg-rose-500 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full tracking-widest leading-none shrink-0 border border-transparent">Extracted Offline</span>
                        </span>
                        <ArrowLeft className="w-5 h-5 mt-0.5 text-rose-500 group-hover:text-rose-600 flex-shrink-0 rotate-180" />
                      </Link>
                    ) : (
                      <a 
                        href={course.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-start justify-between gap-4"
                      >
                        <span>{course.title}</span>
                        <ExternalLink className="w-5 h-5 mt-0.5 text-slate-400 group-hover:text-indigo-600 flex-shrink-0" />
                      </a>
                    )}
                    <p className="text-slate-600 font-medium text-sm leading-relaxed border-l-4 border-slate-300 pl-3 group-hover:border-indigo-400 transition-colors">
                      <span className="font-bold text-indigo-600 uppercase text-[10px] tracking-widest block mb-1">Curriculum Focus:</span>
                      {course.tldr}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
