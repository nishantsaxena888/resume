import { useState } from 'react';
import { HelpCircle, Trash2 } from 'lucide-react';

export function FlashcardWidget({ payload, widgetId, onUpdate, onDelete }: { payload: any, widgetId?: number, onUpdate?: (id: number, p: any) => void, onDelete?: (id: number) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState(payload.question || "");
  const [answer, setAnswer] = useState(payload.answer || "");

  const save = () => {
    if (onUpdate && widgetId) onUpdate(widgetId, { ...payload, question, answer });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl border border-indigo-300 shadow-sm flex flex-col h-80 p-4 relative z-20 ring-4 ring-indigo-50">
        <h3 className="font-bold text-sm mb-3 text-slate-700 border-b border-slate-200 pb-2">Edit Flashcard Node</h3>
        <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Question String" className="bg-slate-50 border border-slate-200 text-slate-700 p-3 text-sm focus:outline-none focus:border-indigo-500 rounded-lg mb-3" />
        <textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Answer Reveal" className="bg-slate-50 border border-slate-200 text-slate-700 p-3 text-sm focus:outline-none focus:border-indigo-500 rounded-lg flex-1 resize-none" />
        
        <div className="flex justify-end gap-2 mt-4 shrink-0">
          <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-xs text-slate-500 font-bold hover:bg-slate-100 rounded transition-colors">Cancel</button>
          <button onClick={save} className="px-3 py-1.5 text-xs bg-indigo-600 text-white font-bold hover:bg-indigo-700 rounded shadow-sm transition-colors">Save Frame</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-80 group cursor-pointer hover:border-rose-300 transition-colors relative">
      {onUpdate && (
         <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded flex items-center gap-1 text-[10px] font-bold z-20 uppercase tracking-widest shadow-sm border border-rose-200">
           Edit Card
         </button>
      )}
      {onDelete && widgetId && (
         <button onClick={(e) => { e.stopPropagation(); onDelete(widgetId); }} className="absolute top-2.5 right-24 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded flex items-center justify-center z-20 shadow-sm border border-rose-200" title="Delete Flashcard">
           <Trash2 className="w-3.5 h-3.5" />
         </button>
      )}
      <div className="absolute inset-0 bg-rose-50/50 opacity-0 group-hover:opacity-100 transition duration-300 -z-0"></div>
      <div className="p-8 flex items-center justify-center flex-1 text-center relative z-10 px-12">
        <div>
          <h4 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-3">Flashcard Front</h4>
          <p className="font-semibold text-lg text-slate-800 group-hover:text-rose-900 transition">{payload.question || "Unknown Question"}</p>
        </div>
      </div>
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center relative z-10 shrink-0">
        <span className="text-xs text-slate-500 font-medium line-clamp-1 pr-4">Click to flip: {payload.answer || "Unknown Answer"}</span>
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0"/>
      </div>
    </div>
  );
}
