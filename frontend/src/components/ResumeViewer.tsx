import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumeViewer({ variantId }: { variantId: string }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!variantId) return;
    setLoading(true);
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [variantId]);

  if (!variantId) {
    return <div className="h-full flex items-center justify-center text-textSecondary">Select a variant to begin.</div>;
  }

  return (
    <div className="h-full overflow-y-auto relative flex flex-col">
      {loading ? (
        <div className="absolute inset-0 z-10 bg-surface/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
           <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : null}

      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        <motion.div layoutId="header" className="border-b border-white/10 pb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Nishant Saxena</h1>
          <p className="text-xl text-primary font-medium capitalize">
            {variantId === 'full-stack' ? 'Full Stack Developer & Architect' : 
             variantId === 'backend' ? 'Backend Python Architect' : 
             'AI/ML & Document AI Specialist'}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
          <div className="col-span-2 space-y-8">
            <section>
              <h3 className="text-lg font-semibold text-white/90 mb-4 flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Experience Highlight</h3>
              <div className="space-y-4">
                 <div className="bg-surface/50 p-4 rounded-xl border border-white/5 transition-all hover:border-primary/50">
                   <h4 className="font-semibold text-white text-lg">Senior Software Lead</h4>
                   <p className="text-sm text-primary mb-2">Centene | Nov 2025 - Present</p>
                   <p className="text-textSecondary text-sm leading-relaxed">
                     Leading backend services in Python (Django/FastAPI) and supporting React-based UIs for internal insurance workflows. Stabilizing production systems including async consumers, Celery workers. Decommissioning legacy Novasys components.
                   </p>
                 </div>
                 <div className="bg-surface/50 p-4 rounded-xl border border-white/5 transition-all hover:border-primary/50 opacity-90">
                   <h4 className="font-semibold text-white text-lg">Solution Lead - Valuation</h4>
                   <p className="text-sm text-primary mb-2">KKR | May 2025 - Nov 2025</p>
                   <p className="text-textSecondary text-sm leading-relaxed">
                     Built and delivered a valuation data platform with Python FastAPI backend and React/Redux frontend. Migrated complex Excel valuation models into web-native, API-driven workflows. Added LLM-assisted utility functions.
                   </p>
                 </div>
              </div>
            </section>
          </div>
          
          <div className="space-y-8">
             <section>
              <h3 className="text-lg font-semibold text-white/90 mb-4 flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span> Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'React.js', 'FastAPI', 'Django', 'AWS', 'Docker', 'PostgreSQL', 'Tailwind CSS'].map(s => (
                  <span key={s} className="px-3 py-1 bg-surface border border-white/10 rounded-full text-xs text-textSecondary">{s}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
