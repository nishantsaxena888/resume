import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Terminal, Lightbulb, ChevronRight,
  Code2, Cpu, Zap, Shield, Database, TestTube, Cloud, BookOpen
} from 'lucide-react';
import mermaid from 'mermaid';

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────
interface CodeBlock { language: string; code: string; }

interface Step {
  number: number;
  title: string;
  body: string;
  code?: CodeBlock;
}

interface FAQItem {
  id: string;
  number: number;
  category: string;
  icon: React.ReactNode;
  question: string;
  intro: string;
  steps: Step[];
  mermaidChart?: string;
  tip?: string;
  tags: string[];
}

// ─────────────────────────────────────────────────────────
// MERMAID COMPONENT
// ─────────────────────────────────────────────────────────
function MermaidChart({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    if (ref.current) {
      const id = 'mermaid-faq-' + Math.random().toString(36).substring(7);
      mermaid.render(id, chart)
        .then(({ svg }) => { if (ref.current) ref.current.innerHTML = svg; })
        .catch((e) => { if (ref.current) ref.current.innerHTML = `<p class="text-rose-400 font-mono text-xs">Diagram error: ${e.message}</p>`; });
    }
  }, [chart]);
  return (
    <div className="my-6 rounded-xl bg-slate-800/50 border border-slate-700/50 p-6 flex justify-center items-center overflow-x-auto">
      <div ref={ref} className="w-full flex justify-center" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// CODE BLOCK COMPONENT
// ─────────────────────────────────────────────────────────
function CodeBlock({ language, code }: CodeBlock) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-700/50 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{language}</span>
        </div>
        <button
          onClick={copy}
          className="text-[10px] font-bold text-slate-500 hover:text-slate-200 transition-colors uppercase tracking-widest px-2 py-1 rounded hover:bg-slate-700"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-[13px] font-mono text-emerald-400 leading-relaxed bg-[#0d1117]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// FAQ DATA — add new items here as user provides them
// ─────────────────────────────────────────────────────────
const FAQ_DATA: FAQItem[] = [
  // ── Q1 ──────────────────────────────────────────────────
  {
    id: 'python-script-execution',
    number: 1,
    category: '🧠 Core Python Internals',
    icon: <Cpu className="w-4 h-4" />,
    question: 'What happens under the hood when you run a Python script?',
    intro:
      "When you run python myscript.py, multiple staged pipeline steps execute in sequence — from raw text parsing to virtual machine execution. Here's the complete internal flow that every senior engineer must know:",
    tags: ['CPython', 'Bytecode', 'AST', 'PVM', 'Tokenizer', 'GC'],
    steps: [
      {
        number: 1,
        title: 'Python Interpreter Starts',
        body: "Your system launches the Python interpreter (CPython in most production cases). The interpreter is a C program that reads and executes Python code. It sets up the entire runtime environment: memory allocation, import paths sys.path, and built-in objects like print and len.",
      },
      {
        number: 2,
        title: 'Script File is Read',
        body: "Python opens myscript.py and reads its source code as plain text. If a compiled .pyc file already exists in __pycache__ and is up-to-date (matching timestamp + Python version), Python skips re-compilation entirely, loading the cached bytecode directly for a faster startup.",
      },
      {
        number: 3,
        title: 'Lexical Analysis (Tokenization)',
        body: "The Python lexer scans the source code character by character and breaks it into tokens — the atomic building blocks: keywords (def, for, if), identifiers (variable names), operators (+, ==), and literals (numbers, strings).",
        code: {
          language: 'python',
          code: `# Source code
x = 5

# Tokenized into low-level tokens:
# NAME(x)    EQUALS(=)    NUMBER(5)    NEWLINE    ENDMARKER`,
        },
      },
      {
        number: 4,
        title: 'Parsing → Abstract Syntax Tree (AST)',
        body: "The token stream is passed to the parser which validates Python syntax rules and builds an Abstract Syntax Tree (AST). The AST is a hierarchical data structure representing the logical structure and intent of your code. Any SyntaxError is raised and the process stops here.",
      },
      {
        number: 5,
        title: 'Compilation to Bytecode',
        body: "The AST is then compiled into bytecode — a lower-level, platform-independent set of instructions for Python's Virtual Machine. This bytecode is saved as a .pyc file inside __pycache__ for faster future loads. You can inspect it using the dis module.",
        code: {
          language: 'python',
          code: `# Source
x = 5
print(x)

# Compiled to bytecode instructions (dis.dis output):
#   LOAD_CONST    5         # Push literal 5 onto the stack
#   STORE_NAME    x         # Pop and assign to variable 'x'
#   LOAD_NAME     print     # Push the print function
#   LOAD_NAME     x         # Push value of x
#   CALL_FUNCTION 1         # Call with 1 argument
#   POP_TOP                 # Discard return value (None)

# You can inspect this yourself:
import dis
dis.dis("x = 5; print(x)")`,
        },
      },
      {
        number: 6,
        title: 'Execution by the Python Virtual Machine (PVM)',
        body: "The PVM executes bytecode instruction by instruction using a stack-based evaluation model. It maintains an execution stack, manages function call frames, handles loops and conditionals, and manages memory via reference counting + cyclic garbage collection (gc module).",
      },
      {
        number: 7,
        title: 'Runtime Environment & Module Imports',
        body: "During execution, Python lazily imports modules on demand, initializes objects on the heap, executes function calls, and stores all global variables in the __main__ namespace dictionary. The sys.modules cache prevents reimporting already-loaded modules.",
      },
      {
        number: 8,
        title: 'System-Level Interaction',
        body: "Python makes OS system calls to read/write files, allocate heap memory, spawn threads or processes, interact with sockets and hardware. print() ultimately goes through C-level printf calls to display output on stdout.",
      },
      {
        number: 9,
        title: 'Cleanup & Exit',
        body: "After the script finishes, Python decrements reference counts to zero, triggers __del__ destructors, flushes I/O buffers, and exits the interpreter. Background daemon threads are killed. Non-daemon threads block exit until they complete.",
      },
    ],
    mermaidChart: `flowchart TD
    A["🐍 Python Script (.py)"]
    B["🔍 Lexical Analysis → Tokens"]
    C["🌳 Parsing → Abstract Syntax Tree"]
    D["⚙️ Compilation → Bytecode (.pyc)"]
    E["🖥️ Python Virtual Machine (PVM)"]
    F["🌐 System Calls & I/O Output"]
    G["🧹 Cleanup & Exit"]
    A --> B --> C --> D --> E --> F --> G
    style A fill:#1e3a5f,color:#93c5fd,stroke:#3b82f6,stroke-width:2px
    style B fill:#1a2a3a,color:#a5f3fc,stroke:#06b6d4,stroke-width:1px
    style C fill:#2a1a3a,color:#c4b5fd,stroke:#8b5cf6,stroke-width:1px
    style D fill:#1a3a2a,color:#6ee7b7,stroke:#10b981,stroke-width:2px
    style E fill:#3a1a2a,color:#fda4af,stroke:#f43f5e,stroke-width:2px
    style F fill:#2a2a1a,color:#fde68a,stroke:#f59e0b,stroke-width:1px
    style G fill:#1a1a2a,color:#94a3b8,stroke:#475569,stroke-width:1px`,
    tip: "CPython compiles to bytecode first — that's exactly why .pyc files exist. PyPy uses JIT (Just-In-Time) compilation instead, making it 5–10× faster for CPU-bound workloads. When you type python, you're running CPython (the reference implementation written in C).",
  },

  // ── MORE Q&As WILL BE ADDED HERE ────────────────────────
];

// ─────────────────────────────────────────────────────────
// SIDEBAR QUESTION LIST
// ─────────────────────────────────────────────────────────
function Sidebar({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  // Group by category
  const categories = FAQ_DATA.reduce<Record<string, FAQItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <aside className="w-80 shrink-0 bg-slate-900 border-r border-slate-800 min-h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-slate-800">
        <Link
          to="/static-notes/python-basics"
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 font-bold text-sm mb-4 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Python Hub
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-900/50">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-black text-white text-sm leading-tight">Python Interview</p>
            <p className="text-indigo-400 text-xs font-bold">16 Years Experience Level</p>
          </div>
        </div>
        <div className="mt-4 text-xs text-slate-500 font-medium">
          {FAQ_DATA.length} questions loaded
        </div>
      </div>

      {/* Question List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {Object.entries(categories).map(([cat, items]) => (
          <div key={cat}>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-2">{cat}</p>
            <div className="space-y-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm font-medium flex items-start gap-2 group
                    ${activeId === item.id
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
                    }`}
                >
                  <span className={`shrink-0 mt-0.5 w-5 h-5 rounded text-[10px] font-black flex items-center justify-center
                    ${activeId === item.id ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'}`}>
                    {item.number}
                  </span>
                  <span className="leading-snug">{item.question}</span>
                  {activeId === item.id && <ChevronRight className="w-3 h-3 ml-auto shrink-0 mt-0.5 text-indigo-400" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Coming Soon */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <p className="text-xs font-bold text-slate-400">📚 More questions coming</p>
          <p className="text-[11px] text-slate-600 mt-1">GIL, Memory Mgmt, Decorators, AsyncIO, System Design...</p>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────
// ANSWER CONTENT PANE
// ─────────────────────────────────────────────────────────
function AnswerPane({ item }: { item: FAQItem }) {
  return (
    <main className="flex-1 overflow-y-auto p-8 max-w-4xl">

      {/* Question Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-black text-indigo-400 uppercase tracking-widest px-2 py-1 bg-indigo-600/10 rounded-md border border-indigo-500/20">
            Q{item.number}
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.category}</span>
        </div>
        <h1 className="text-2xl font-black text-white leading-tight mb-4">{item.question}</h1>
        <p className="text-slate-400 text-base leading-relaxed">{item.intro}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[11px] font-bold px-2.5 py-1 bg-slate-800 text-slate-400 rounded-md border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {item.steps.map((step) => (
          <div
            key={step.number}
            className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-colors"
          >
            {/* Step Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-700/30 bg-slate-800/50">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-indigo-900/50 shrink-0">
                {step.number}
              </div>
              <h2 className="text-base font-bold text-white">{step.title}</h2>
            </div>

            {/* Step Body */}
            <div className="px-5 py-4">
              <p className="text-slate-400 text-[15px] leading-relaxed">{step.body}</p>
              {step.code && (
                <CodeBlock language={step.code.language} code={step.code.code} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mermaid Flow Diagram */}
      {item.mermaidChart && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-indigo-500 rounded-full" />
            <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest">Execution Flow</h3>
          </div>
          <MermaidChart chart={item.mermaidChart} />
        </div>
      )}

      {/* Pro Tip */}
      {item.tip && (
        <div className="mt-6 flex gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">Senior Insight</p>
            <p className="text-slate-400 text-sm leading-relaxed">{item.tip}</p>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      <div className="mt-10 pt-6 border-t border-slate-800 flex justify-between items-center text-sm">
        <span className="text-slate-600 italic">
          {FAQ_DATA.findIndex(f => f.id === item.id) + 1} of {FAQ_DATA.length} questions
        </span>
        <div className="flex items-center gap-1 text-slate-600 text-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>More answers loading as you share them</span>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────
export default function PythonInterviewFAQPage() {
  const [activeId, setActiveId] = useState(FAQ_DATA[0].id);
  const activeItem = FAQ_DATA.find((f) => f.id === activeId)!;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-black text-sm tracking-tight">Python Interview Masterclass</span>
          <span className="hidden md:block text-slate-600 text-xs">·</span>
          <span className="hidden md:block text-slate-500 text-xs font-medium">16 Years Experience · Senior / Staff Level</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
            ● Live
          </span>
        </div>
      </header>

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeId={activeId} onSelect={setActiveId} />
        <AnswerPane item={activeItem} />
      </div>
    </div>
  );
}
