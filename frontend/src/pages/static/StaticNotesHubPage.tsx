import { FileText, ArrowRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StaticNotesHubPage() {
  const navigate = useNavigate();

  // As you create more static pages, just add them to this array!
  const staticPages = [
    {
      title: 'AWS Application Architect',
      subtitle: 'Client Round Guide • Node.js, Python, EKS, Legacy Migrations',
      path: '/static-notes/aws-architect',
      color: 'bg-indigo-500'
    },
    {
      title: 'Terraform Masterclass',
      subtitle: 'Zero-To-Hero • IaC, State Locking, VPC Modules, CI/CD Design',
      path: '/static-notes/terraform',
      color: 'bg-emerald-500'
    },
    {
      title: 'Python 101: Zero to Hero',
      subtitle: 'Native Memory Primitives, Iteration, Subroutines, Scope',
      path: '/static-notes/python-basics',
      color: 'bg-blue-500'
    },
    {
      title: 'Python: Advanced Architecture',
      subtitle: 'FastAPI Microservices, Recon SQL Syncs, Asyncio, The GIL',
      path: '/static-notes/python-advanced',
      color: 'bg-yellow-500'
    },
    {
      title: 'Awesome System Design',
      subtitle: 'Curated Holy Grail Engineering Articles (Meta, Netflix, Stripe)',
      path: '/static-notes/system-design',
      color: 'bg-rose-500'
    },
    {
      title: 'Algomaster Selection',
      subtitle: 'DSA Patterns, System Design Fundamentals, Low Level Design',
      path: '/static-notes/algomaster',
      color: 'bg-cyan-600'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 w-full font-sans pb-24">
      <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Static Notes Directory</h2>
            <p className="text-slate-500 font-medium mt-1">Your collection of hardcoded, database-free interview playbooks.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticPages.map((page, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
              onClick={() => navigate(page.path)}
            >
              <div className="p-6 border-b border-slate-50 relative overflow-hidden flex-1">
                <div className={`absolute top-0 right-0 w-32 h-32 ${page.color} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
                
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl text-white ${page.color} flex items-center justify-center shadow-sm`}>
                    <FileText className="w-6 h-6" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 relative z-10 group-hover:text-indigo-600 transition-colors">
                  {page.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium relative z-10">
                  {page.subtitle}
                </p>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto group-hover:bg-indigo-50 transition-colors">
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 group-hover:gap-3 transition-all">
                  Read Playbook <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}

          {/* Developer Instruction Card */}
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-transparent flex flex-col items-center justify-center p-8 text-center min-h-[220px]">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex flex-col items-center justify-center text-slate-500 mb-4">
               <Plus className="w-5 h-5" />
            </div>
            <h3 className="text-slate-700 font-bold mb-1">Add Another Page</h3>
            <p className="text-slate-500 text-sm font-medium max-w-[200px]">
              Copy <code className="bg-slate-200 px-1 py-0.5 rounded text-xs text-rose-500">StaticNotesPage.tsx</code>, map it in <code className="bg-slate-200 px-1 py-0.5 rounded text-xs text-rose-500">App.tsx</code>, and add it to this array!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
