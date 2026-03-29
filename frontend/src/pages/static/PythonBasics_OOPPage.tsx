import { Terminal, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_OOPPage() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white print:m-0 print:p-0">
      <div className="max-w-5xl w-full mx-auto p-8 print:px-0 print:py-4 bg-white shadow-xl print:shadow-none min-h-screen relative border border-slate-200 print:border-none">
        
        <div className="mb-4">
          <Link to="/static-notes/python-basics" className="print:hidden flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold mb-8 transition-colors z-50 relative">
            <ArrowLeft className="w-5 h-5" /> Back to Python 101 Hub
          </Link>
        </div>

        <div className="mb-12 print:mb-8 border-b-4 border-slate-900 pb-8 print:pb-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 print:w-12 print:h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 print:rotate-0">
              <Terminal className="w-10 h-10 print:w-8 print:h-8 text-blue-400" />
            </div>
            <div>
              <h1 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-5xl print:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Python: Object-Oriented Architecture
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                Classes, Inheritance, MRO, Dunder Methods, and Dataclasses
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 print:gap-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Classes</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Inheritance</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">MRO</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Dunder Methods</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">@dataclass</span>
          </div>
        </div>

        {/* --- SECTION 1: CLASSES & INSTANCES --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             1. Foundational Classes & Encapsulation
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Python classes map real-world objects into isolated memory boundaries. Python does not have strict <code>private</code> variables, but uses the <code>_</code> prefix as a gentleman's agreement.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`class Server:
    # 1. CLASS ATTRIBUTE (Shared across ALL instances in memory)
    active_connections = 0  

    # 2. THE CONSTRUCTOR (Called instantly upon instantiation)
    def __init__(self, ip_address):
        # 'self' is the distinct Memory Pointer for exactly this instance.
        self.ip = ip_address            # Public attribute
        self._key = "secret_123"        # Protected (Gentleman's agreement not to touch)
        self.__password = "root"        # Private (Name Mangled by Python compiler to '_Server__password')
        
        Server.active_connections += 1

    # 3. INSTANCE METHOD
    def connect(self):
        print(f"Connected to {self.ip}")
        
    # 4. DESTRUCTOR
    def __del__(self):
        Server.active_connections -= 1

# --- Execution ---
s1 = Server("192.168.1.1")
s1.connect()
print(Server.active_connections) # 1`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: INHERITANCE & MRO --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             2. Inheritance & Multiple Order Resolution (MRO)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Children aggressively inherit logic from Parent classes. When inheriting from multiple parents, Python uses the <strong>C3 Linearization Algorithm (MRO)</strong> to determine mathematically who gets priority.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`class Database:
    def execute(self):
        print("Executing standard query.")

# --- Single Inheritance ---
class PostgresDB(Database):
    def execute(self):
        # super() instantly jumps to the Parent class to run its exact method first!
        super().execute()  
        print("Executing Postgres extension.")

# --- Multiple Inheritance ---
class AWSCloud:
    def host(self):
        print("Hosting on AWS.")

class ManagedRDS(PostgresDB, AWSCloud):
    pass

rds = ManagedRDS()
rds.execute() # Pulled from PostgresDB
rds.host()    # Pulled from AWSCloud

# --- The Interview Trap: MRO ---
print(ManagedRDS.mro())
# [<class 'ManagedRDS'>, <class 'PostgresDB'>, <class 'Database'>, <class 'AWSCloud'>, <class 'object'>]
# This defines EXACTLY what order Python checks classes when you call a method.`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: DUNDER / MAGIC METHODS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             3. Dunder (Magic) Methods
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Dunder (Double Underscore) methods allow your custom objects to hook natively into Python's underlying syntax (like <code>+</code>, <code>len()</code>, string printing, and instantiation hooks).
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Automatically called when someone runs str(obj) or print(obj)
    def __str__(self):
        return f"User-friendly: ({self.x}, {self.y})"
        
    # Automatically called when viewed in a REPL/Debugger (Must be exact code to rebuild it)
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    # Allows you to use the exact native math syntax: v1 + v2
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
        
    # Allows len(obj) to work natively!
    def __len__(self):
        return max(self.x, self.y)

    # Allows you to execute the INSTANCE itself as a function: v1()!
    def __call__(self):
        print("The vector is executing...")

v1 = Vector(2, 4)
v2 = Vector(3, 1)

print(v1)        # User-friendly: (2, 4)
v3 = v1 + v2     # Natively triggers __add__
print(len(v3))   # 5`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: DATACLASSES --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             4. Modern Dataclasses (Python 3.7+)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Writing <code>__init__</code>, <code>__repr__</code>, and <code>__eq__</code> manually is legacy engineering. Dataclasses auto-generate the entire backend architecture instantly.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`from dataclasses import dataclass, field
from typing import List

# Automatically builds __init__ and strict Type-Hinting bounds
@dataclass
class PolicyRecord:
    id: str
    status: str = "ACTIVE"
    
    # Defaulting a mutable list requires a 'field' hook to prevent the Mutable Default Trap!
    tags: List[str] = field(default_factory=list) 

p1 = PolicyRecord(id="U98004266")
p2 = PolicyRecord(id="U98004266")

# Dataclasses auto-generate memory equality checks!
print(p1 == p2) # True (Normally in standard Classes this compares Memory IDs and returns False!)

print(p1) # Auto-generates print view! -> PolicyRecord(id='U98004266', status='ACTIVE', tags=[])`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
