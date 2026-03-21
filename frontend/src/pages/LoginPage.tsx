import React, { useState } from 'react';
import { Layers, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const u = formData.get('username');
    const p = formData.get('password');
    
    if (u === 'nishant' && p === 'nishu') {
      setError('');
      navigate('/courses');
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

            {error && (
              <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="username" className="text-xs font-bold text-slate-700 uppercase tracking-widest">Username</label>
                <input 
                  id="username"
                  name="username"
                  type="text" 
                  defaultValue=""
                  autoComplete="username"
                  placeholder="e.g. nishant"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-bold text-slate-700 uppercase tracking-widest">Password</label>
                  <a href="#" className="text-xs font-medium text-rose-600 hover:text-rose-700">Forgot password?</a>
                </div>
                <input 
                  id="password"
                  name="password"
                  type="text" 
                  defaultValue=""
                  autoComplete="off"
                  placeholder="Enter 'nishu'"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <button type="submit" className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group mt-6">
                Enter Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <button type="button" onClick={() => navigate('/courses')} className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-3">
                <Github className="w-5 h-5" /> Continue with GitHub
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
