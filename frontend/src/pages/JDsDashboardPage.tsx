import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, Loader2, ArrowRight } from 'lucide-react';

export default function JDsDashboardPage() {
  const navigate = useNavigate();
  const [jds, setJds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/jds')
      .then(res => res.json())
      .then(data => {
        setJds(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch JDs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-transparent w-full font-sans pb-24">
      <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Job Descriptions Hub</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-20 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <>
              {jds.map((jd) => (
                <div 
                  key={jd.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col"
                  onClick={() => navigate(`/jds/${jd.id}`)}
                >
                  <div className="p-6 border-b border-slate-50 relative overflow-hidden flex-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                    
                    <div className="absolute top-5 right-5 z-20">
                      <div className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wide border shadow-sm ${jd.payload?.status === 'Closed' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                         {jd.payload?.status === 'Closed' ? 'Closed' : 'Active'}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                        <BriefcaseBusiness className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1 relative z-10 group-hover:text-emerald-600 transition-colors">
                      {jd.payload?.role || jd.payload?.title || jd.title || 'Untitled Role'}
                    </h3>
                    <p className="text-slate-500 font-medium relative z-10 line-clamp-2">
                      {jd.payload?.company || jd.company || 'Company Unspecified'}
                    </p>
                  </div>

                  <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 group-hover:gap-2 transition-all">
                      Open Document <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}

              <div 
                className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col items-center justify-center p-8 text-center cursor-not-allowed min-h-[220px] group"
                title="Upload via backend to generate a new entry."
              >
                <div className="opacity-50 text-slate-400">
                  <h3 className="text-lg font-bold">New JD Builder</h3>
                  <p className="text-sm font-medium">Coming soon...</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
