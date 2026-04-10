import React, { useMemo, useState, useEffect } from 'react';
import { 
  ReactFlow, 
  MarkerType,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Terminal, Database, Globe, Network, Cpu, Info, Play, RotateCcw } from 'lucide-react';

/* 
  SLEEK INTERACTIVE NODE
  "Makkhan" UI: No borders, beautiful shadows, integrated tooltips
*/
const SleekNode = ({ data }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  // Map colors to clean, muted pastel accents
  const colorMap: any = {
    purple: 'border-l-purple-500 bg-purple-50/30 text-purple-600',
    slate: 'border-l-slate-500 bg-slate-50/30 text-slate-600',
    amber: 'border-l-amber-500 bg-amber-50/30 text-amber-600',
    indigo: 'border-l-indigo-500 bg-indigo-50/30 text-indigo-600',
    red: 'border-l-rose-500 bg-rose-50/30 text-rose-600',
    emerald: 'border-l-emerald-500 bg-emerald-50/30 text-emerald-600'
  };

  const accentStyles = colorMap[data.color] || colorMap.slate;
  const iconColorClass = accentStyles.split(' ')[2]; // gets the text-color part for the icon

  const isCurrent = data.isCurrent;
  const isPast = data.isPast;
  const isSimulating = data.isSimulating;
  
  // Extract step number (e.g., "1" from "1. Python Interpreter Starts")
  const stepNumber = data.label.match(/^\d+/)?.[0];

  const handleScroll = () => {
    if (stepNumber) {
      const el = document.getElementById(`step-${stepNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-indigo-500', 'ring-offset-8', 'transition-all', 'duration-500');
        setTimeout(() => el.classList.remove('ring-4', 'ring-indigo-500', 'ring-offset-8'), 1500);
      }
    }
  };

  // If we are simulating, dim nodes that aren't active yet.
  const opacityClass = isSimulating && !isCurrent && !isPast ? 'opacity-30 grayscale blur-[1px]' : 'opacity-100';
  const pulseClass = isCurrent ? 'ring-2 ring-indigo-400 ring-offset-4 scale-105 shadow-2xl shadow-indigo-500/30' : '';

  return (
    <div onClick={handleScroll} className={`group/card pointer-events-auto relative px-4 py-4 rounded-3xl shadow-sm bg-white font-sans w-[320px] border border-slate-200 border-l-[8px] ${accentStyles.split(' ')[0]} transition-all duration-300 ${opacityClass} ${pulseClass} z-10 hover:!z-[99999] cursor-pointer`}>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      
      {/* BASE DEFAULT STATE (Compact Grid View) */}
      <div className={`flex gap-4 items-center`}>
        <div className="shrink-0 relative">
          {stepNumber ? (
             <div className={`w-20 h-20 rounded-[1.25rem] bg-gradient-to-br ${accentStyles.split(' ')[1]} flex items-center justify-center shadow-inner border border-slate-100/50`}>
               <img src={`/assets/steps/step_${stepNumber}.png`} alt={`Step ${stepNumber}`} className="w-full h-full object-cover scale-110 mix-blend-multiply" />
             </div>
          ) : (
            <div className={`p-3 rounded-xl ${accentStyles.split(' ')[1]} ${iconColorClass}`}>
               <Info className="w-6 h-6" />
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 justify-center py-1 pr-2">
          <span className={`font-bold text-[16px] tracking-tight transition-colors duration-500 ${isCurrent ? 'text-indigo-700' : 'text-slate-900'}`}>{data.label}</span>
          {data.tooltip && (
            <p className="text-[13px] leading-relaxed m-0 mt-1 font-medium whitespace-pre-wrap text-slate-600 line-clamp-2">
              {data.tooltip}
            </p>
          )}
        </div>
      </div>

      {/* MASSIVE IMMERSIVE "BADA DIV" HOVER STATE */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] bg-white rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-slate-100 p-6 flex flex-col gap-5 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-75 opacity-0 group-hover/card:scale-100 group-hover/card:opacity-100 !z-[99999] pointer-events-none group-hover/card:pointer-events-auto shadow-2xl ring-1 ring-slate-900/5`}
      >
        {/* 1. Upar Heading (Heading at Top) */}
        <h3 className={`text-[20px] font-black tracking-tight leading-tight ${iconColorClass}`}>
          {data.label}
        </h3>

        {/* 2. Then Image */}
        {stepNumber && (
          <div className={`w-full h-56 rounded-2xl bg-gradient-to-br ${accentStyles.split(' ')[1]} flex items-center justify-center p-4 shadow-inner ring-1 ring-black/5 relative`}>
            <img src={`/assets/steps/step_${stepNumber}.png`} alt={`Expanded ${stepNumber}`} className="w-full h-full object-contain scale-[1.15] mix-blend-multiply" />
          </div>
        )}

        {/* 3. Then Text */}
        {data.tooltip && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-[15px] leading-relaxed font-semibold whitespace-pre-wrap text-slate-700">
              {data.tooltip}
            </p>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
};

export interface TopologyWidgetProps {
  initialNodes: any[];
  initialEdges: any[];
  height?: string;
  editable?: boolean;
}

export function TopologyWidget({ initialNodes, initialEdges, height = "500px" }: TopologyWidgetProps) {


  // Inject simulation data into nodes
  const nodes = useMemo(() => {
    return initialNodes.map(n => {
      return {
        ...n,
        data: {
          ...n.data,
          isSimulating: false,
          isCurrent: false,
          isPast: false
        }
      };
    });
  }, [initialNodes]);

  // Make edges static
  const edges = useMemo(() => {
    return initialEdges.map(edge => {
      return {
        ...edge,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: '#cbd5e1', 
          strokeWidth: 2.5,
          transition: 'all 0.5s ease'
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
      };
    });
  }, [initialEdges]);

  // Use our hyper-sleek node
  const nodeTypes = useMemo(() => ({ awsNode: SleekNode, sleekNode: SleekNode }), []);

  return (
    <div className="relative w-[98vw] 2xl:w-[90vw] left-1/2 -translate-x-1/2 my-12">


      <div className="react-flow-wrapper relative w-full flex items-center justify-center rounded-2xl bg-[#fbfafe] border border-slate-200/60 shadow-inner" style={{ height }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          preventScrolling={false}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
        />
      </div>
    </div>
  );
}
