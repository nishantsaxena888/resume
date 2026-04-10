import React from 'react';

export function StepDetailsWidget({ payload }: { payload: any }) {
  const { title, desc, idx } = payload;
  
  if (!title) return null;
  
  const stepLabel = title.split('. ')[1] || title;

  return (
    <div id={`step-${idx}`} className="scroll-mt-32 min-h-[90vh] flex flex-col justify-center border-b border-slate-100 last:border-0 py-12 lg:px-6 w-full">
      <div className="w-full">
        <div 
          style={{ float: 'left', width: '300px', height: '300px' }}
          className="mr-12 mb-6 rounded-[2rem] border-2 border-slate-200 bg-slate-50/60 flex items-center justify-center p-6 shadow-sm overflow-hidden"
        >
          <img 
            src={`/assets/steps/step_${idx}.png`} 
            alt={`Step ${idx}`} 
            className="w-full h-full object-contain mix-blend-multiply scale-[1.15]" 
          />
        </div>
        <h3 style={{ fontSize: '48px' }} className="font-extrabold text-slate-900 font-serif mb-4 leading-tight tracking-tight mt-0 pt-2">
          {title}
        </h3>
        <p style={{ fontSize: '28px' }} className="text-slate-500 font-serif mb-6 leading-snug italic">
          {desc}
        </p>
        <div style={{ fontSize: '20px', lineHeight: '1.8' }} className="text-slate-800 text-justify space-y-6 font-serif">
          <p>
            During the <strong>{stepLabel}</strong> phase, the CPython engine engages its internal C structures to rigorously evaluate the target state. Allocating memory sequentially, the runtime efficiently maps lexical elements against the established Python grammar protocols, guaranteeing syntax safety prior to state compilation.
          </p>
          <p>
            If execution is halted here, it strictly yields an upstream <code>SyntaxError</code>. Furthermore, memory allocation algorithms immediately construct a robust environment mapped heavily to the local symbol table. Expert engineers understand that bypassing or optimizing this layer inherently requires dropping into highly tuned C-extensions, allowing the framework to offload parsing overhead dynamically.
          </p>
          <p>
            This execution layer serves as the ultimate arbiter of structural intent. Once memory tables are completely hydrated and the abstract structural patterns are confirmed, control is sequentially yielded down the virtual pipeline safely.
          </p>
        </div>
        <div className="clear-both"></div>
      </div>
    </div>
  );
}
