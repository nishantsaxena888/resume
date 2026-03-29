import { Terminal, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_DataTypesPage() {
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
                {/* Python: Memory Primitives */}
                Python: Memory Primitives
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                Strings, Byte Encodings, Numbers, and Bitwise Logic
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 print:gap-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Strings</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Integers</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Floats</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Decimals</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Bytes</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Bitwise Operators</span>
          </div>
        </div>

{/* --- SECTION 0.5: INTERVIEW CORE --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             0. Interview Mechanics: Memory & Truth
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Senior interviewers relentlessly test your understanding of Python's underlying C-memory model, pointer comparisons, and strict mutability rules.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Pointers (<code>is</code>) vs Values (<code>==</code>)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# == checks if the mathematical VALUES match
# 'is' checks if they are the exact same RAM address natively in C (id(a) == id(b))

a = [1, 2, 3]
b = [1, 2, 3]
c = a          # c simply points to a's memory address

a == b         # True (They look the same)
a is b         # False (Different arrays in memory)
a is c         # True (Same exact memory pointer)`}</code>
            </div>
            
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Mutability Architecture</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# IMMUTABLE: (Integers, Floats, Strings, Tuples, Booleans)
# They NEVER change. Attempting to modify them creates a completely new memory object.
text = "AWS"
text[0] = "X"      # CRASH! TypeError: 'str' does not support item assignment

# MUTABLE: (Lists, Dicts, Sets)
# They change directly in RAM.
config = {"env": "prod"}
copy = config
copy["env"] = "dev"
print(config["env"]) # 'dev' -> Modifying the copy permanently infected the original!

# THE FIX: Deep or Shallow Copies
import copy
shallow_copy = config.copy()   # Only copies the top layer (nested lists are still shared pointer traps!)
deep = copy.deepcopy(config)   # Completely recursive memory clone`}</code>
            </div>

            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">3. Strict Falsiness</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# In Python, you do NOT type: if len(arr) == 0:
# Senior engineers rely on native C-level False evaluations.

# The ONLY officially False evaluated objects naturally:
# 1. False, None
# 2. 0, 0.0, Decimal("0.0")
# 3. Empty sequences: "", [], (), {}, set()

arr = []
if not arr:    # PERFECT. Instantly checks if empty.`}</code>
            </div>

            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">4. Stack Memory vs Heap Memory</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# THE HEAP (Dynamic Objects)
# Python stores ALL actual objects (Lists, Dicts, Classes, even Integers in Python!) in Private Heap Memory.
# Heap memory is massive, slow, and managed entirely by the Python Memory Manager / Garbage Collector.

# THE STACK (Execution References)
# When you define a variable, Python ONLY stores a POINTER (a memory reference id) on the Execution Stack.
# The variable name itself is just a label pointing into the Private Heap.

x = [1, 2, 3] # The Array is on the HEAP. The label 'x' holding its memory address is on the STACK.

# When a function finishes running, its STACK frame is instantly destroyed.
# The objects in the HEAP remain until their Reference Count hits 0.`}</code>
            </div>
          </div>
        </div>

{/* --- SECTION 1: STRING & BYTE ENGINEERING METHODS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             1. String & Byte Engineering (Exhaustive Methods)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Strings are immutable C-arrays. Staff engineers manipulate strings completely without loops using standard library methods.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`raw = "   U98004266-A   "

# --- Extraction & Cleaning ---
raw.strip()        # "U98004266-A" (Removes leading/trailing space)
raw.lstrip()       # Removes ONLY left spaces
raw.rstrip()       # Removes ONLY right spaces
raw.removeprefix("U") # "98004266-A" (Python 3.9+)
raw.removesuffix("-A") # "U98004266" (Python 3.9+)

# --- Crucial Parsing (.split & .join) ---
"A,B,C".split(",")     # Returns an Array natively: ["A", "B", "C"]
"A B\\nC".split()       # Splits by ALL whitespace (spaces, tabs, newlines): ["A", "B", "C"]
"-".join(["A", "B"])   # Re-combines Array back into String: "A-B"
"100".replace("0", "X")# Performs global find & replace inline: "1XX"

# --- Search & Identification ---
raw.startswith(" ")   # True (Fast O(1) character check)
raw.endswith("A")     # False (Because there are trailing spaces)
raw.find("980")       # Returns index natively in C (returns -1 if not found)
raw.rfind("0")        # Searches from the Right side backwards
raw.count("0")        # Returns 2 (O(N) character count)
raw.isalnum()         # False (Checks if purely alphanumeric, no spaces/hyphens)
raw.isdigit()         # False (Checks if perfectly numeric)
raw.isalpha()         # False (Checks if perfectly alphabetic)
raw.isascii()         # True (Checks for valid ASCII)

# --- Case Modulations ---
"aws".upper()         # "AWS"
"AWS".lower()         # "aws"
"aws cloud".title()   # "Aws Cloud"
"aws cloud".capitalize() # "Aws cloud"

# --- advanced C-Level translation ---
# Instant character swapping without regex or loops
translation_map = str.maketrans("UA", "XB")
"U98004266-A".translate(translation_map) # "X98004266-B"

# --- Transformation & Padding (Data Engineering) ---
"42".zfill(5)          # "00042" (Crucial for normalizing DB IDs)
"text".ljust(10, "-")  # "text------" (Padding physical fixed-width files)
"text".rjust(10, "*")  # "******text"
"text".center(10, "=") # "===text==="

# --- Cryptographic Encoding ---
raw.encode("utf-8")    # b'   U98004266-A   ' (Required for Boto3/S3 transfers)
b"data".decode("utf-8")# Converts raw network bytes back to Python strings`}</code>
            </div>
          </div>
        </div>
        
        {/* --- SECTION 1.5: FORMATTING & TYPE CASTING --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             1.5 Type Casting & String Interpolation
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Python is dynamically but strongly typed. You must explicitly cast objects. Modern Python heavily leverages <code>f-strings</code> for zero-overhead string formatting.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Explicit Type Casting</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# Casting does not mutate, it generates a fresh object in memory.
val = "42"

# Primitives
int_val = int(val)           # 42
float_val = float(val)       # 42.0
bool_val = bool(val)         # True (Any non-empty string is True)
str_val = str(100)           # "100"

# Collection Casting (Crucial for instant deduplication)
raw_ids = [1, 2, 2, 3]
unique_ids = list(set(raw_ids))  # Casts to Set (deduplicates), then back to List! -> [1, 2, 3]`}</code>
            </div>
            
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. String Formatting (f-strings vs .format)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`user = "Nishant"
id = 98004266

# --- f-Strings (Python 3.6+) ---
# FASTEST method. Evaluates instantly at runtime in C.
log = f"User {user} has ID {id}."

# Inline Math/Functions inside f-strings
metrics = f"Score: {id / 1000:.2f}"   # Formats to 2 decimal places instantly!

# --- .format() (Python 3.0+) ---
# Used when the format string is defined elsewhere (like a DB template)
template = "Welcome {0}, your role is {1}."
template.format("Nishant", "Admin")

# --- %s (Legacy Python 2) ---
# DO NOT USE THIS ANYMORE unless maintaining extreme legacy code.
"Welcome %s" % user`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: NUMERICS AND PRECISION --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             2. Numeric Algorithms & Bitwise Calculus
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Senior engineers must account for floating-point IEEE-754 bleeds, exact financial rounding, memory-safe fractions, and low-level AWS bitwise subnet masking.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import math
from decimal import Decimal, ROUND_HALF_UP
from fractions import Fraction

# --- Financial Engineering ---
# NEVER use Floats (0.1 + 0.2 equals 0.30000000000000004)
val = Decimal("450.55") - Decimal("100.20")
val.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP) # Exact 350.35

# --- Pure Fractions ---
Fraction(1, 3) + Fraction(1, 6) # Exactly Fraction(1, 2)

# --- Mathematical Calculus ---
divmod(10, 3)          # Returns (3, 1) -> (Quotient, Remainder) natively in C
math.isclose(3.0, 3.0) # The ONLY safe way to check if two floats are "equal"
math.ceil(4.1)         # 5 (Forces roundup, useful for Pagination)
math.floor(4.9)        # 4 (Forces rounddown)
math.trunc(-4.9)       # -4 (Truncates toward zero)

# --- Base Conversions ---
hex(255)               # '0xff'
oct(8)                 # '0o10'
bin(10)                # '0b1010'

# --- Bitwise Engineering (AWS CIDR / Security Groups) ---
mask_a = 0b1010        # Binary 10
mask_b = 0b1100        # Binary 12
mask_a & mask_b        # Bitwise AND -> 0b1000 (8)
mask_a | mask_b        # Bitwise OR  -> 0b1110 (14)
mask_a ^ mask_b        # Bitwise XOR -> 0b0110 (6)
~mask_a                # Bitwise NOT (Inverts all bits)
mask_a << 1            # Bitshift Left (Fastest way to multiply by 2)`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
