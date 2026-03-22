import React, { useState } from 'react';
import { Layers, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthLoginSchema } from '../types/resumeBuilder/resume';
import { UniversalSchemaForm } from '../components/common/UniversalSchemaForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [sessionActive, setSessionActive] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem('skillom_auth') === 'true') {
      setSessionActive(true);
    }
  }, []);

  const handleLoginSubmit = (data: Record<string, any>) => {
    const { username, password } = data;
    
    // In future this calls the FastAPI backend to receive a real JWT Token
    if (username === 'nishant' && password === 'nishu') {
      setError('');
      localStorage.setItem('skillom_auth', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid username or password. Access Denied.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Left Side: Branding Plaque */}
        <div className="md:w-5/12 bg-slate-900 p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <img src="/skillom-logo.png" alt="Skillom Ai" className="w-16 h-16 mb-8 drop-shadow-2xl" />
            <h1 className="text-4xl font-bold mb-4 leading-tight tracking-tight">Future of<br/>Learning.</h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Building immersive learning labs through AI and imagination.
            </p>
          </div>
          
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-16 w-64 h-64 bg-rose-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        {/* Right Side: Auth Gateway */}
        <div className="md:w-7/12 p-12 md:p-16 flex items-center justify-center bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-sm text-slate-500 mb-6">Enter your credentials to access the Skillom Ai Gateway.</p>

            {sessionActive ? (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center shadow-inner mt-4">
                <div className="w-16 h-16 rounded-full bg-white shadow-md mx-auto mb-4 overflow-hidden border-4 border-indigo-100">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nishant" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black text-slate-800 text-lg mb-1">Active Session Detected</h3>
                <p className="text-xs font-semibold text-slate-500 mb-6">You are already authenticated.</p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => { localStorage.removeItem('skillom_auth'); setSessionActive(false); }} className="w-full py-3 mt-3 text-slate-400 hover:text-rose-500 font-bold text-xs transition-colors underline">
                  Terminate Session
                </button>
              </div>
            ) : (
              <>
                <UniversalSchemaForm 
                  schema={AuthLoginSchema} 
                  onSubmit={handleLoginSubmit} 
                  submitLabel="Enter Dashboard" 
                  error={error}
                  clearError={() => setError('')}
                />

                <div className="mt-8 pt-8 border-t border-slate-100">
                  <button type="button" onClick={() => navigate('/courses')} className="w-full py-3 cursor-pointer bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-3">
                    <Github className="w-5 h-5" /> Continue with GitHub
                  </button>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
