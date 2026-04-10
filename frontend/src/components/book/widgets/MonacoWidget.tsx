import Editor from '@monaco-editor/react';

interface MonacoWidgetProps {
  language: string;
  defaultCode: string;
  height?: string;
  readOnly?: boolean;
}

export function MonacoWidget({ language, defaultCode, height = "400px", readOnly = false }: MonacoWidgetProps) {
  return (
    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-slate-700 shadow-xl my-6 group">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{language} {readOnly ? "(Read Only)" : "(Interactive)"}</span>
        </div>
        {!readOnly && (
           <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
             Editable Demo
           </span>
        )}
      </div>
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={defaultCode}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 16, bottom: 16 },
          readOnly: readOnly,
          scrollBeyondLastLine: false,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
        }}
      />
    </div>
  );
}
