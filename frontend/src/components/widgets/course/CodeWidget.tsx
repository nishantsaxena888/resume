import { useState, useEffect } from 'react';
import { Code, Trash2 } from 'lucide-react';

export function CodeWidget({ payload, widgetId, onUpdate, onDelete }: { payload: any, widgetId?: number, onUpdate?: (id: number, p: any) => void, onDelete?: (id: number) => void }) {
  const [isEditing, setIsEditing] = useState(!payload.snippet);
  const [language, setLanguage] = useState(payload.language || "python");
  const [snippet, setSnippet] = useState(payload.snippet || "");

  useEffect(() => {
    if (isEditing) {
      setLanguage(payload.language || "python");
      setSnippet(payload.snippet || "");
    }
  }, [isEditing, payload]);

  const save = () => {
    if (onUpdate && widgetId) onUpdate(widgetId, { ...payload, language, snippet });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-slate-900 rounded-xl shadow-lg border border-emerald-500 overflow-hidden flex flex-col h-80 p-4 relative z-30">
        <div className="flex gap-2 mb-3">
           <Code className="w-4 h-4 text-emerald-400 mt-0.5" />
           <input value={language} onChange={e => setLanguage(e.target.value)} placeholder="Language (python, js, sql...)" className="bg-slate-800 border-b border-emerald-600 text-emerald-400 font-mono p-1 px-2 text-xs focus:outline-none rounded w-1/2" />
        </div>
        <textarea value={snippet} onChange={e => setSnippet(e.target.value)} spellCheck={false} placeholder="code string..." className="flex-1 resize-none text-xs text-slate-300 font-mono focus:outline-none p-3 border border-slate-700 bg-slate-950 rounded-lg custom-scrollbar whitespace-pre" />
        <div className="flex justify-end gap-2 mt-4 shrink-0">
          <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-xs text-slate-400 font-bold hover:bg-slate-800 rounded transition-colors">Cancel</button>
          <button onClick={save} className="px-3 py-1.5 text-xs bg-emerald-600 text-slate-900 font-bold hover:bg-emerald-500 rounded shadow border border-emerald-400 transition-colors">Sync Exec</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden flex flex-col h-80 group relative border border-slate-800 transition-colors hover:border-slate-600 hover:shadow-lg">
      {onUpdate && (
         <button onClick={() => setIsEditing(true)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded flex items-center gap-1 text-[10px] font-bold z-10 uppercase tracking-widest shadow border border-slate-700">
           Edit Block
         </button>
      )}
      {onDelete && widgetId && (
         <button onClick={(e) => { e.stopPropagation(); onDelete(widgetId); }} className="absolute top-2 right-24 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-rose-900/50 hover:bg-rose-800 text-rose-400 rounded flex items-center justify-center z-20 shadow-sm border border-rose-800/50" title="Delete Code Block">
           <Trash2 className="w-3.5 h-3.5" />
         </button>
      )}
      <div className="p-5 overflow-y-auto font-mono text-xs md:text-sm text-emerald-300 flex-1 whitespace-pre custom-scrollbar w-full overflow-x-auto">
        {payload.snippet || "// write some code"}
      </div>
    </div>
  );
}
