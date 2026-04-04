import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownWidget({ payload, widgetId, onUpdate, onDelete }: { payload: any, widgetId?: number, onUpdate?: (id: number, p: any) => void, onDelete?: (id: number) => void }) {
  const [isEditing, setIsEditing] = useState(!payload.content && !payload.title);
  const [content, setContent] = useState(payload.content || "");
  const [title, setTitle] = useState(payload.title || "");

  // Force strict synchronization with remote database payload when entering edit mode 
  // to discard phantom unsaved changes or stale states from previous interactions
  useEffect(() => {
    if (isEditing) {
      setContent(payload.content || "");
      setTitle(payload.title || "Study Note");
    }
  }, [isEditing, payload]);

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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[550px] relative group transition-all duration-300 hover:shadow-md hover:border-slate-300">
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
      <div className="p-5 overflow-y-auto w-full max-w-none text-slate-600 flex-1 custom-scrollbar">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-6 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-lg font-bold text-slate-800 mt-6 mb-3 border-b border-slate-200 pb-2" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-base font-bold text-slate-800 mt-4 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="text-[15px] text-slate-600 leading-relaxed mb-4" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-5 space-y-2 marker:text-indigo-400" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-5 space-y-2 marker:text-indigo-500 font-medium" {...props} />,
            li: ({node, ...props}) => <li className="text-[14px] text-slate-700 leading-relaxed pl-1" {...props} />,
            strong: ({node, ...props}) => <strong className="font-extrabold text-slate-900" {...props} />,
            code({node, inline, className, children, ...props}: any) {
              const match = new RegExp("language-(\\w+)").exec(className || "");
              const isBlock = !inline && match;
              return isBlock ? (
                <div className="relative my-4 overflow-hidden rounded-xl bg-[#0f172a] shadow-xl border border-slate-700/50">
                  <div className="flex items-center px-4 py-2 bg-[#1e293b] border-b border-slate-700/50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{match[1]}</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[13px] font-mono text-emerald-400 leading-relaxed custom-scrollbar">
                    <code className="" {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              ) : (
                <code className="px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[13px] font-bold border border-indigo-100/50 shadow-sm" {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {payload.content || "Empty content payload."}
        </ReactMarkdown>
      </div>
    </div>
  );
}
