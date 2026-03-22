import React, { useState } from 'react';
import { BookOpen, Search, BriefcaseBusiness, FileText, Server, Terminal, Code, Brain, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CoursesDashboardPage() {
  const navigate = useNavigate();

  // Mock global filters
  const [selectedJd, setSelectedJd] = useState('all');
  const [selectedResume, setSelectedResume] = useState('all');

  // Hardcoded prep targets matching the user's Charlotte JD configuration
  const courses = [
    {
      id: 'aws-architecture-01',
      title: 'AWS Serverless Architecture Mastery',
      description: 'Deep dive into Step Functions, Lambda, API Gateway, and Terraform deployments for large-scale migrations.',
      progress: 85,
      icon: <Server className="w-6 h-6 text-indigo-500" />,
      color: 'bg-indigo-500',
      attachedJd: 'Python/AWS Lead (Charlotte)'
    },
    {
      id: 'python-advanced-01',
      title: 'Advanced Python System Design',
      description: 'Master FastAPI, Django, Celery, and asynchronous pipeline processors. Heavily requested in Charlotte interview loops.',
      progress: 42,
      icon: <Terminal className="w-6 h-6 text-emerald-500" />,
      color: 'bg-emerald-500',
      attachedJd: 'Python/AWS Lead (Charlotte)'
    },
    {
      id: 'tdd-engineering-01',
      title: 'Test-Driven Development (TDD) Fundamentals',
      description: 'Learn how to write resilient Python code by constructing tests first. A core requirement for CapitalOne/Centene profiles.',
      progress: 10,
      icon: <Code className="w-6 h-6 text-rose-500" />,
      color: 'bg-rose-500',
      attachedJd: null
    },
    {
      id: 'ai-doc-extraction-01',
      title: 'Document AI & OCR Strategies',
      description: 'Architecting extraction systems using AWS Textract, Azure Document Intelligence, and GenAI models.',
      progress: 60,
      icon: <Brain className="w-6 h-6 text-amber-500" />,
      color: 'bg-amber-500',
      attachedJd: null
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Global Filter Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <img src="/skillom-logo.png" alt="Skillom Ai" className="w-8 h-8 drop-shadow-sm" />
            Interview Preparation Modules
          </h1>
          <p className="text-sm text-slate-500 mt-1">Select a curriculum engineered to secure your target role</p>
        </div>

        {/* The required Global Filters for JD/Resume */}
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200 shadow-sm">
          
          <div className="flex items-center gap-2 px-3 border-r border-slate-200">
            <BriefcaseBusiness className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedJd}
              onChange={e => setSelectedJd(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none w-48 truncate cursor-pointer"
            >
              <option value="all">Any Target JD...</option>
              <option value="charlotte">Python/AWS Lead (Charlotte)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pl-1 pr-3">
            <FileText className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedResume}
              onChange={e => setSelectedResume(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none w-48 truncate cursor-pointer"
            >
              <option value="all">Any Tailored Resume...</option>
              <option value="default">Nishant Saxena (Default)</option>
            </select>
          </div>

        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-8 max-w-[1400px] mx-auto w-full">
        
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search active courses..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm transition-all"
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            Showing {courses.length} critical paths
          </div>
        </div>

        {/* Course Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map(course => (
            <div 
              key={course.id}
              onClick={() => navigate(`/courses/${course.id}`)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group cursor-pointer hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col h-72 relative"
            >
              {/* Embedded JD Context Badge */}
              {course.attachedJd && (
                 <div className="absolute top-4 right-4 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md z-10 flex items-center gap-1 shadow-sm">
                   <BriefcaseBusiness className="w-3 h-3" />
                   Priority Map
                 </div>
              )}

              <div className={`h-2 w-full ${course.color}`} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  {course.icon}
                </div>
                
                <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1">
                  {course.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-2">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                       <span className="text-xs font-bold text-slate-700">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className={`${course.color} h-1.5 rounded-full transition-all`} style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-medium text-slate-500">Launch Platform</span>
                  <ChevronRight className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
            ))}
        </div>

      </main>
    </div>
  );
}
