import React, { useState, useCallback, useMemo } from 'react';
import { 
  ReactFlow, 
  Controls, 
  Background, 
  MarkerType,
  Handle,
  Position,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Code, Terminal, Info, X } from 'lucide-react';

// Custom Node to make it look extremely premium
const JourneyNode = ({ data, selected }: any) => {
  return (
    <div className={`relative px-6 py-4 shadow-lg rounded-xl border-2 transition-all cursor-pointer font-sans w-[280px]
      ${selected ? 'border-indigo-500 bg-indigo-50 scale-105' : 'border-slate-200 bg-white hover:border-indigo-300'}`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 border-2 border-white bg-slate-400" />
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${data.color || 'bg-slate-100 text-slate-600'}`}>
            {data.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{data.category}</span>
            <span className="font-bold text-slate-800 text-base leading-tight">{data.label}</span>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 border-2 border-white bg-slate-400" />
    </div>
  );
};

const initialNodes = [
  {
    id: '1',
    type: 'journeyNode',
    position: { x: 400, y: 50 },
    data: { 
      label: 'Core Python Internals', 
      category: 'Foundation',
      icon: <Terminal className="w-4 h-4" />,
      color: 'bg-red-100 text-red-600',
      description: 'The absolute fundamentals of the CPython Engine.',
      details: 'Understanding how bytecode executes under the hood, how the Garbage Collector specifically hunts Reference Cycles, and the devastating impact of the GIL on CPU bounds.',
      codeSnippet: 'import sys\n# Size tracking overhead bypass\nclass Node:\n    __slots__ = ["val"]\n    def __init__(self, v): self.val = v\nprint(sys.getsizeof(Node(1)))'
    }
  },
  {
    id: '2',
    type: 'journeyNode',
    position: { x: 400, y: 250 },
    data: { 
      label: 'Advanced Execution Hooks', 
      category: 'Runtime Overrides',
      icon: <Code className="w-4 h-4" />,
      color: 'bg-amber-100 text-amber-600',
      description: 'Intercepting and bypassing standard behavior dynamically.',
      details: 'Utilizing Metaclasses for framework building, Decorators for standardized execution metrics, and Generators to yield memory iteratively preventing system OOM exceptions.',
      codeSnippet: 'from functools import wraps\ndef timer(f):\n    @wraps(f)\n    def _wrap(*a, **kw):\n        return f(*a, **kw)\n    return _wrap'
    }
  },
  {
    id: '3',
    type: 'journeyNode',
    position: { x: 200, y: 450 },
    data: { 
      label: 'The AsyncIO Event Loop', 
      category: 'Concurrency',
      icon: <Terminal className="w-4 h-4" />,
      color: 'bg-emerald-100 text-emerald-600',
      description: 'Multiplexing heavy I/O network operations.',
      details: 'Bypassing OS thread-switching latency completely by utilizing a single-thread cooperative execution loop for millions of concurrent WebSocket or HTTP handshakes.',
      codeSnippet: 'import asyncio\nasync def fetch():\n    await asyncio.sleep(1) # Unblocks Loop\nasyncio.run(fetch())'
    }
  },
  {
    id: '4',
    type: 'journeyNode',
    position: { x: 600, y: 450 },
    data: { 
      label: 'Multiprocessing Pools', 
      category: 'Performance',
      icon: <Code className="w-4 h-4" />,
      color: 'bg-blue-100 text-blue-600',
      description: 'Shattering the Global Interpreter Lock entirely.',
      details: 'Forking out independent OS-level instances equipped with their own dedicated isolated GIL to process extremely heavy mathematical or CPU-bound bounds natively.',
      codeSnippet: 'from multiprocessing import Pool\ndef heavy(x): return x**2\nwith Pool(4) as p:\n    p.map(heavy, [1,2,3])'
    }
  },
  {
    id: '5',
    type: 'journeyNode',
    position: { x: 400, y: 650 },
    data: { 
      label: 'Scalable System Architecture', 
      category: 'Distributed Design',
      icon: <Info className="w-4 h-4" />,
      color: 'bg-purple-100 text-purple-600',
      description: 'Tying it all together into an Enterprise Microservice.',
      details: 'Routing ingress via NGINX/ALB into ASGI Gunicorn worker nodes. Pushing slow execution tasks out of the request/response cycle into an SQS/Rabbit queue backed by Celery clusters.',
      codeSnippet: '# Zero Code: Pure Architectural Mastery.\n# ALB -> FastAPI -> SQS -> Celery Worker'
    }
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' }, style: { stroke: '#cbd5e1', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' }, style: { stroke: '#cbd5e1', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' }, style: { stroke: '#cbd5e1', strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' }, style: { stroke: '#cbd5e1', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', animated: true, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' }, style: { stroke: '#cbd5e1', strokeWidth: 2 } }
];

export default function SyllabusMapPrototype() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  const nodeTypes = useMemo(() => ({ journeyNode: JourneyNode }), []);

  const onNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="w-full h-screen flex bg-slate-50 font-sans">
      
      {/* Visual Workspace */}
      <div className="flex-1 relative border-r border-slate-200">
        <div className="absolute top-4 left-6 z-10">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">The Senior Architecture Journey</h1>
          <p className="text-slate-500 font-medium">Interactive Flow. Click nodes for code definitions.</p>
        </div>
        
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Background color="#cbd5e1" gap={16} />
          <Controls />
        </ReactFlow>
      </div>

      {/* Slide-out Help / Details Panel */}
      <div className={`w-[450px] bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${selectedNode ? 'translate-x-0' : 'translate-x-full absolute right-0'}`}>
        {selectedNode && (
          <>
            <div className={`h-2 w-full ${selectedNode.data.color.split(' ')[0]} bg-opacity-100`} />
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 block">
                  {selectedNode.data.category}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  {selectedNode.data.label}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedNode(null)} 
                className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Detailed Explanation */}
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-500" /> Executive Summary
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {selectedNode.data.details}
                </p>
              </div>

              {/* Code Demonstration Tooltip */}
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-indigo-500" /> Implementation Core
                </h3>
                <div className="bg-[#1e1e1e] p-4 rounded-xl border border-slate-700 shadow-inner overflow-hidden">
                  <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">
                    {selectedNode.data.codeSnippet}
                  </pre>
                </div>
              </div>

            </div>
          </>
        )}
      </div>

    </div>
  );
}
