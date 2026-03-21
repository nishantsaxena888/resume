import { useResume } from '../../context/resumeBuilder/ResumeContext';
import { Download, LayoutTemplate } from 'lucide-react';

export default function TopBar() {
  const { data, updateMetadata } = useResume();

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-50 print:hidden">
      
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-black text-indigo-600 tracking-tight flex items-center gap-2">
          <LayoutTemplate className="w-6 h-6" /> Resume Builder
        </h1>
        
        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Template:</span>
          <select 
            value={data.metadata.template}
            onChange={(e) => updateMetadata({ template: e.target.value })}
            className="text-sm border border-gray-300 rounded-md bg-gray-50 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-gray-800 cursor-pointer"
          >
            <option value="classic">Classic A4</option>
            <option value="modern">Modern Minimalist</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => window.print()} className="flex items-center gap-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

    </div>
  );
}
