import React from 'react';
import { FileText, HelpCircle } from 'lucide-react';

export function PrepNoteWidget() {
  return (
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
  );
}

export function PrepFlashcardWidget() {
  return (
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
  );
}
