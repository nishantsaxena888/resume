import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, FileText, GraduationCap } from 'lucide-react';
import ResumeViewer from './components/ResumeViewer';
import CourseModule from './components/CourseModule';

// Define the available modes
type Mode = 'resume' | 'course';

function App() {
  const [mode, setMode] = useState<Mode>('resume');
  const [variants, setVariants] = useState<{id: string, name: string}[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  useEffect(() => {
    // Fetch available variants from the FastAPI backend
    fetch('http://127.0.0.1:8000/api/resume/variants')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setVariants(data);
          setSelectedVariant(data[0].id);
        }
      })
      .catch(err => {
        console.error("Error fetching variants: ", err);
        // Fallback for UI visualization if backend is disconnected
        const fallback = [
          {"id": "full-stack", "name": "Full Stack Lead"},
          {"id": "backend", "name": "Backend Python Architect"},
          {"id": "ai-ml", "name": "AI/ML & Document AI Specialist"}
        ];
        setVariants(fallback);
        setSelectedVariant(fallback[0].id);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col font-sans">
      {/* Navbar segment */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Preparation
          </h1>
        </div>
        <nav className="flex space-x-2 bg-surface p-1 rounded-lg border border-white/5">
          <button 
            onClick={() => setMode('resume')}
            className={`px-4 py-2 rounded-md transition-all text-sm font-medium flex items-center space-x-2 ${mode === 'resume' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-textSecondary hover:text-white'}`}
          >
            <FileText className="w-4 h-4" />
            <span>Resume Vault</span>
          </button>
          <button 
            onClick={() => setMode('course')}
            className={`px-4 py-2 rounded-md transition-all text-sm font-medium flex items-center space-x-2 ${mode === 'course' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-textSecondary hover:text-white'}`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Learning Modules</span>
          </button>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-10 flex flex-col">
        <AnimatePresence mode="wait">
          {mode === 'resume' ? (
            <motion.div 
              key="resume"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col"
            >
               {/* Resume Header & Variant selector */}
               <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Resume Variants</h2>
                    <p className="text-textSecondary">Select a tailored profile variant extracted from the primary resume.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {variants.map(v => (
                      <button 
                        key={v.id}
                        onClick={() => setSelectedVariant(v.id)}
                        className={`px-4 py-2 rounded-lg text-sm border transition-all ${selectedVariant === v.id ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-white/10 text-textSecondary hover:border-white/30 hover:text-white'}`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
               </div>

               {/* Viewer */}
               <div className="glass flex-1 rounded-2xl p-6 overflow-hidden flex flex-col min-h-[500px]">
                 <ResumeViewer variantId={selectedVariant} />
               </div>
            </motion.div>
          ) : (
            <motion.div 
              key="course"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex"
            >
              <CourseModule />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
