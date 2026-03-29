import { Terminal, Database, Code, Shield, Cpu, Shuffle, Bug, Link2, ArrowLeft, Layers, Server, Globe, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasicsPage() {
  const modules = [
    {
      title: 'Memory Primitives & Numerics',
      subtitle: 'Byte Encoding, IEEE-754 Decimals, Bitwise Calculus',
      path: '/static-notes/python-basics/data-types',
      color: 'bg-blue-600',
      icon: <Cpu className="w-8 h-8 text-white" />
    },
    {
      title: 'Collections Architecture',
      subtitle: 'O(1) Queues, Heaps, Sets, and Hash Maps',
      path: '/static-notes/python-basics/data-structures',
      color: 'bg-emerald-600',
      icon: <Database className="w-8 h-8 text-white" />
    },
    {
      title: 'Advanced Iterators',
      subtitle: 'For-Else, Generators, Chaining, Switch Patterns',
      path: '/static-notes/python-basics/control-flow',
      color: 'bg-purple-600',
      icon: <Shuffle className="w-8 h-8 text-white" />
    },
    {
      title: 'Regex & Introspection',
      subtitle: 'Lookaheads, Pattern Matching, dir(), __dict__',
      path: '/static-notes/python-basics/regex',
      color: 'bg-orange-600',
      icon: <Code className="w-8 h-8 text-white" />
    },
    {
      title: 'Object-Oriented Architecture',
      subtitle: 'Classes, Dunder Methods, MRO, Dataclasses',
      path: '/static-notes/python-basics/oop',
      color: 'bg-indigo-600',
      icon: <Layers className="w-8 h-8 text-white" />
    },
    {
      title: 'Data Engineering & Pandas',
      subtitle: 'DataFrames, GroupBy, Vectorized Math, Joins',
      path: '/static-notes/python-basics/pandas',
      color: 'bg-teal-600',
      icon: <Server className="w-8 h-8 text-white" />
    },
    {
      title: 'Exception Engineering',
      subtitle: 'Try/Except/Else/Finally and Domain Errors',
      path: '/static-notes/python-basics/exceptions',
      color: 'bg-red-600',
      icon: <Bug className="w-8 h-8 text-white" />
    },
    {
      title: 'Tooling Ecosystem',
      subtitle: 'PyTest, Black, Flake8, Virtual Environments',
      path: '/static-notes/python-basics/ecosystem',
      color: 'bg-slate-800',
      icon: <Terminal className="w-8 h-8 text-white" />
    },
    {
      title: 'Django Backend',
      subtitle: 'Models, Views, N+1 Optimization, DRF API',
      path: '/static-notes/python-basics/django',
      color: 'bg-green-700',
      icon: <Globe className="w-8 h-8 text-white" />
    },
    {
      title: 'Advanced Web Frameworks',
      subtitle: 'FastAPI (Pydantic), Flask, SQLAlchemy ORM',
      path: '/static-notes/python-basics/web',
      color: 'bg-blue-600',
      icon: <Layout className="w-8 h-8 text-white" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
          <Link to="/static-notes" className="print:hidden flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Architect Hub
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center transform -rotate-3">
              <Terminal className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900">Python 101: Native Engineering</h1>
              <p className="text-xl font-medium text-slate-500 mt-2">Modular Reference Playbooks (18-Year Staff Level)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2">
          {modules.map((mod, idx) => (
            <Link key={idx} to={mod.path} className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full pointer-events-auto print:break-inside-avoid">
              <div className={`w-14 h-14 ${mod.color} rounded-xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                {mod.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                {mod.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6 flex-grow">
                {mod.subtitle}
              </p>
              <div className="mt-auto flex items-center text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                READ MODULE <Link2 className="w-4 h-4 ml-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
