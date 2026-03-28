import { ChevronRight, Folder, FileText, PlaySquare, HelpCircle, Code } from 'lucide-react';

interface TOCNode {
  id: number | string;
  title: string;
  type?: string; 
  children?: TOCNode[];
  isActive?: boolean;
}

interface RecursiveTOCProps {
  nodes: TOCNode[];
  onSelectNode: (node: TOCNode) => void;
  level?: number;
}

function getIconForType(type?: string) {
  switch (type) {
    case 'course': return <Folder className="w-4 h-4 text-slate-400" />;
    case 'module': return <Folder className="w-4 h-4 text-indigo-400" />;
    case 'markdown': return <FileText className="w-3.5 h-3.5 text-blue-500" />;
    case 'youtube': return <PlaySquare className="w-3.5 h-3.5 text-rose-500" />;
    case 'video_embed': return <PlaySquare className="w-3.5 h-3.5 text-purple-500" />;
    case 'flashcard': return <HelpCircle className="w-3.5 h-3.5 text-amber-500" />;
    case 'code_snippet': return <Code className="w-3.5 h-3.5 text-emerald-500" />;
    case 'resume': return <FileText className="w-4 h-4 text-emerald-500" />;
    case 'jd': return <FileText className="w-4 h-4 text-rose-500" />;
    default: return <FileText className="w-3.5 h-3.5 text-slate-400" />;
  }
}

export function RecursiveTOC({ nodes, onSelectNode, level = 0 }: RecursiveTOCProps) {
  return (
    <div className="flex flex-col w-full">
      {nodes.map((node) => (
        <div key={`${node.type}-${node.id}`} className="flex flex-col">
          <button
            onClick={() => onSelectNode(node)}
            className={`flex items-center gap-2 py-1.5 px-3 text-sm text-left transition-colors hover:bg-slate-100 ${node.isActive ? 'bg-indigo-50 font-bold text-indigo-700 border-r-2 border-indigo-600' : 'text-slate-600 font-medium'}`}
            style={{ paddingLeft: `${(level * 12) + 12}px` }}
          >
            {getIconForType(node.type)}
            <span className="truncate flex-1">{node.title}</span>
            {node.children && node.children.length > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          </button>
          
          {node.children && node.children.length > 0 && (
            <div className="flex flex-col">
               <RecursiveTOC nodes={node.children} onSelectNode={onSelectNode} level={level + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
