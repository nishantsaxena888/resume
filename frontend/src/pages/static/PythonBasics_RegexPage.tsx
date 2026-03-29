import { Terminal, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_RegexPage() {
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
                Python: Regex & Introspection
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                Pattern Compilers, Capture Groups, and Memory Inspection
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 print:gap-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">re.compile</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Capture Groups</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">type()</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">dir()</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">getattr</span>
          </div>
        </div>

{/* --- SECTION 6: REGEX ENGINEERING --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             6. Regex Engineering (re)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Staff engineers do not use slow, chained Python `.replace()` methods for complex logs. They compile Regex patterns universally. Mastering Lookaheads, Capture Groups, and native memory sub-routines is mandatory.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Pattern Matching & Catch Groups</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import re

# 1. Compilation (O(1) Memory Caching)
# Always compile regex if used inside a loop. It stores the C-state machine in memory.
PATTERN = re.compile(r"U\\d{8}(?=-[A-Z])") # Matches "U12345678" ONLY IF followed by "-A"

# 2. Match vs Search vs FindAll
log = "ERROR: User U98004266-A failed Auth, followed by U99001122-B"

# match() checks strictly from the very beginning of the string (Returns None here)
re.match(r"U\\d{8}", log) 

# search() scans until it finds the FIRST occurrence (Returns Match Object)
first_match = re.search(r"U\\d{8}", log)
print(first_match.group()) # "U98004266"

# findall() extracts ALL matches into a List
re.findall(r"U\\d{8}", log) # ['U98004266', 'U99001122']

# 3. Named Capture Groups (?P<name>...)
regex = re.compile(r"(?P<prefix>U)(?P<id>\\d{8})")
match_obj = regex.search("U98004266")
match_obj.group("id") # Extracts exactly "98004266" without ugly array indices!

# 4. Regex Substitution (.sub)
clean = re.sub(r"\\d{8}", "REDACTED", log)
# "ERROR: User UREDACTED-A failed Auth, followed by UREDACTED-B"`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 7: TYPE INTROSPECTION --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             7. Type & Memory Introspection
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Python objects are strictly memory structures wrapping C-pointers. You must know how to natively inspect the exact methods, memory address, and class properties of any variable (<code>str</code>, <code>int</code>, custom classes) at runtime.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Peeking into the Python C-Layer</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# 1. Type and Memory ID
val = "Enterprise"
type(val)              # <class 'str'>
id(val)                # 4390142320 (The literal RAM memory address pointer)

# 2. Directory Inspection (dir)
# Prints EVERY native method available on the string object.
dir(val)               
# ['__add__', '__class__', '__contains__', ..., 'lower', 'split', 'zfill']

# 3. Dynamic Attribute Binding (getattr / hasattr)
# Safely check if an object has a method at runtime without crashing
if hasattr(val, "lower"):
    func = getattr(val, "lower")
    func() # "enterprise"

# 4. Dictionary Introspection (__dict__)
# Classes store their attributes in a raw dictionary mapping in memory.
class Policy:
    def __init__(self):
        self.id = "U98004266"
        self.active = True

p = Policy()
print(p.__dict__)      # {'id': 'U98004266', 'active': True}
print(vars(p))         # Identical to __dict__

# 5. Type Assertions (isinstance)
# the 'type(val) == int' check fails if val is a subclass of int. 
# ALWAYS use isinstance() in Production APIs.
isinstance("Text", (str, int)) # True`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
