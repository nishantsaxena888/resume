import { useState } from 'react';
import { FileText, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownWidget({ payload, widgetId, onUpdate, onDelete }: { payload: any, widgetId?: number, onUpdate?: (id: number, p: any) => void, onDelete?: (id: number) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(payload.content || "");
  const [title, setTitle] = useState(payload.title || "Study Note");

  const save = () => {
    if (onUpdate && widgetId) onUpdate(widgetId, { ...payload, title, content });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl border border-indigo-300 shadow-sm overflow-hidden flex flex-col h-80 p-4 relative z-20 ring-4 ring-indigo-50">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Widget Title..." className="font-bold text-sm mb-3 border-b border-slate-200 focus:outline-none focus:border-indigo-500 py-1" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Markdown Content..." className="flex-1 resize-none text-sm text-slate-600 focus:outline-none p-3 border border-slate-100 bg-slate-50 rounded-lg custom-scrollbar" />
        <div className="flex justify-end gap-2 mt-4 shrink-0">
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-xs text-slate-500 font-bold hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
          <button onClick={save} className="px-4 py-2 text-xs bg-indigo-600 text-white font-bold hover:bg-indigo-700 rounded-lg shadow border border-indigo-700 transition-colors">Save Changes</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-80 relative group transition-all duration-300 hover:shadow-md hover:border-slate-300">
      {onUpdate && (
         <button onClick={() => setIsEditing(true)} className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded flex items-center gap-1 text-[10px] font-bold z-10 uppercase tracking-widest border border-slate-200 shadow-sm">
           Edit
         </button>
      )}
      {onDelete && widgetId && (
         <button onClick={() => onDelete(widgetId)} className="absolute top-2.5 right-16 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded flex items-center justify-center z-10 border border-rose-200 shadow-sm" title="Delete Note">
           <Trash2 className="w-3.5 h-3.5" />
         </button>
      )}
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2 pr-20 shrink-0">
        <FileText className="w-4 h-4 text-blue-500"/>
        <span className="text-sm font-bold text-slate-700 line-clamp-1">{payload.title || "Study Note"}</span>
      </div>
      <div className="p-5 overflow-y-auto prose prose-slate prose-sm max-w-none text-slate-600 flex-1 custom-scrollbar">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {payload.content || "Empty content payload."}
        </ReactMarkdown>
      </div>
    </div>
  );
}
