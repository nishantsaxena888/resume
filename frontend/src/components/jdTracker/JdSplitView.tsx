import React from 'react';
import { BriefcaseBusiness, FileText, ArrowRight } from 'lucide-react';

export default function JdSplitView() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h2 className="font-bold text-slate-700">Charlotte Client <span className="text-slate-400 font-normal">| Targeting Document Match</span></h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-md">94% Match Score</button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-2 divide-x divide-slate-100">
        {/* JD Text Side */}
        <div className="p-8">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
            <BriefcaseBusiness className="w-4 h-4"/> Job Requirements
          </h4>
          <div className="prose prose-sm text-slate-600">
            <p>We need a <strong>strong technical profile</strong> (Python/AWS Lead) who can rationally think and answer scenario-based questions with good communication.</p>
            <ul>
              <li>Strong Python coding experience.</li>
              <li>AWS (Lambda, Terraform, Step Functions, IAM, Cognito).</li>
              <li>Experience leading an offshore team of 3–4 members.</li>
              <li>Flexible FTE mindset (occasional late evening calls).</li>
              <li>Location: Charlotte.</li>
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
              <div className="text-xs font-mono text-emerald-600 font-bold mb-1">+ ADDED BULLET (CapitalOne)</div>
              <p className="text-sm text-slate-700">"Developed a transaction pipeline using AWS Step Functions, Lambda, and DynamoDB. Converted Java to Python using TDD."</p>
            </div>

            <div className="p-4 bg-white border border-emerald-200 rounded-lg shadow-sm">
              <div className="text-xs font-mono text-emerald-600 font-bold mb-1">+ ADDED BULLET (Centene)</div>
              <p className="text-sm text-slate-700">"Leading backend services in Python (FastAPI/Django) while managing distributed workflows and stabilizing production systems."</p>
            </div>

            <div className="p-4 bg-white border border-amber-200 rounded-lg shadow-sm">
              <div className="text-xs font-mono text-amber-600 font-bold mb-1">~ MODIFIED SUMMARY</div>
              <p className="text-sm text-slate-700">"Senior Python Architect specializing in AWS Serverless (Lambda, Step Functions, Terraform) with deep experience leading hybrid onshore/offshore teams..."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
