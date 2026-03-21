import React from 'react';
import { BriefcaseBusiness, FileText, ArrowRight } from 'lucide-react';

export default function JdSplitView() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
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
  );
}
