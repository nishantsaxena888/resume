import React, { useState } from 'react';
import { BookOpen, Search, BriefcaseBusiness, FileText, ChevronRight, Orbit, Layers, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CoursesDashboardPage() {
  const navigate = useNavigate();

  // Mock global filters
  const [selectedJd, setSelectedJd] = useState('all');
  const [selectedResume, setSelectedResume] = useState('all');

  // Mock Skillon Courses List
  const courses = [
    {
      id: 'course-123',
      title: 'React & Architecture Skillon Engine',
      description: 'Master the deepest levels of System Design, React render performance, and Next.js scale.',
      tags: ['Frontend', 'System Design'],
      progress: 65,
      icon: Layers,
      color: 'bg-emerald-500',
      attachedJd: 'Senior Frontend Engineer @ OpenAI'
    },
    {
      id: 'course-456',
      title: 'PostgreSQL & Distributed DBs',
      description: 'JSONB indexing patterns, read/write replication clustering, and data partitioning strategies.',
      tags: ['Backend', 'Database Architecture'],
      progress: 12,
      icon: Orbit,
      color: 'bg-blue-500',
      attachedJd: null
    },
    {
      id: 'course-789',
      title: 'Leadership & Behavioral Core',
      description: 'The Amazon Leadership Principles mapped against behavioral competency frameworks.',
      tags: ['Soft Skills', 'Management'],
      progress: 100,
      icon: Award,
      color: 'bg-rose-500',
      attachedJd: 'Engineering Manager @ Stripe'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Global Filter Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <img src="/skillom-logo.png" alt="Skillom Ai" className="w-8 h-8 drop-shadow-sm" />
            My Skillom Ai Courses
          </h1>
          <p className="text-sm text-slate-500 mt-1">Select a curriculum to launch the Preparation CMS</p>
        </div>

        {/* The required Global Filters for JD/Resume */}
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
          
          <div className="flex items-center gap-2 px-3 border-r border-slate-200">
            <BriefcaseBusiness className="w-4 h-4 text-slate-400" />
            <select 
              value={selectedJd}
              onChange={e => setSelectedJd(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none w-48 truncate cursor-pointer"
            >
              <option value="all">Any Target JD...</option>
              <option value="openai">Senior Frontend Engineer @ OpenAI</option>
              <option value="stripe">Engineering Manager @ Stripe</option>
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
              <option value="lead">Frontend Lead - OpenAI Variant</option>
              <option value="default">Default Master Resume</option>
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
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            Showing {courses.length} / {courses.length} curriculums
          </div>
        </div>

        {/* Course Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map(course => {
            const Icon = course.icon;
            return (
              <div 
                key={course.id}
                onClick={() => navigate(`/courses/${course.id}`)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group cursor-pointer hover:shadow-xl hover:border-rose-300 transition-all duration-300 flex flex-col h-72 relative"
              >
                {/* Embedded JD Context Badge (if it has one) */}
                {course.attachedJd && (
                   <div className="absolute top-4 right-4 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md z-10 flex items-center gap-1">
                     <BriefcaseBusiness className="w-3 h-3" />
                     Pinned JD
                   </div>
                )}

                <div className={`h-2 w-full ${course.color}`} />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 text-slate-700`} />
                  </div>
                  
                  <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-rose-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
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
                  <ChevronRight className="w-4 h-4 text-rose-500" />
                </div>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  );
}
