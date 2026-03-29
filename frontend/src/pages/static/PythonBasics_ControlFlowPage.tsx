import { Terminal, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_ControlFlowPage() {
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
                Python: Advanced Iterators
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                For-Else Algorithms, Switch Cases, and Generators
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 print:gap-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">For-Else</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Match-Case</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Generators</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Itertools</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Tuple Unpacking</span>
          </div>
        </div>

{/* --- SECTION 4.5: FOUNDATIONAL ITERATION & SLICING --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             4. Looping Mechanics & Array Slicing
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Mastering the exact syntax of standard iteration loops and memory-safe Array Slicing <code>[start:stop:step]</code>.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Foundational Iterators</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# --- Range ---
list(range(5))         # [0, 1, 2, 3, 4]
list(range(2, 6))      # [2, 3, 4, 5]
list(range(0, 10, 2))  # [0, 2, 4, 6, 8] (Step of 2)

# --- Index Tracking (enumerate) ---
# ALWAYS use enumerate instead of tracking an index variable manually!
for idx, val in enumerate(["A", "B", "C"]):
    print(f"{idx}: {val}") # Prints 0: A, 1: B, 2: C 

# --- Parallel Iteration (zip) ---
# Safely combines two arrays based on the SHORTEST length.
names = ["Nishant", "John"]
roles = ["Admin", "User", "GHOST"]
for name, role in zip(names, roles):
    print(name, role) # GHOST is safely ignored!`}</code>
            </div>
            
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Array Slicing (Memory Copies)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# Slicing syntax: arr[start:stop:step]
# NOTE: stop is EXCLUSIVE.
arr = [0, 1, 2, 3, 4, 5]

arr[1:4]               # [1, 2, 3] (Extracts elements from index 1 up to index 3)
arr[:3]                # [0, 1, 2] (Everything up to index 3)
arr[3:]                # [3, 4, 5] (Everything from index 3 onwards)

# --- Step Mechanics ---
arr[::2]               # [0, 2, 4] (Takes every 2nd element)
arr[::-1]              # [5, 4, 3, 2, 1, 0] (O(N) Instant Memory Reversal)`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 4.8: SLIDING WINDOW --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             4.5 The Sliding Window Algorithm
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            A critical parsing algorithm that transforms nested <code>O(N²)</code> loops into flat <code>O(N)</code> execution by maintaining a subset "window" of the array.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# Calculate the maximum sum of exactly K consecutive elements in an array
def max_sliding_sum(arr, k):
    if len(arr) < k: return 0

    # 1. Initialize the first "window" (sum of first K elements)
    window_sum = sum(arr[:k])
    max_sum = window_sum

    # 2. Slide the window exactly 1 element to the right
    # To shift, simply ADD the new element, and SUBTRACT the element left behind!
    # No need to recalculate the inner elements (O(N) instead of O(N*K))
    for i in range(len(arr) - k):
        window_sum = window_sum - arr[i] + arr[i + k]
        max_sum = max(max_sum, window_sum)
        
    return max_sum

# Output: 18 (sum of [5, 4, 9])
max_sliding_sum([1, 4, 2, 10, 2, 3, 1, 0, 20], 4)`}</code>
            </div>
          </div>
        </div>

{/* --- SECTION 5: ADVANCED CONTROL FLOW --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             5. Advanced Control Flow & Packing
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Mastering <code>*args</code> packing, standard library iterators, and the notoriously misunderstood <code>for-else</code> algorithm.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import itertools

# --- The For-Else Algorithm ---
# The 'else' block ONLY executes if the loop completed perfectly WITHOUT hitting a 'break'
for worker in ["web-1", "web-2"]:
    if worker == "CRASHED":
        break
else:
    print("All workers healthy! Executing deployment.")

# --- Tuple Unpacking & Python 3.10+ Pattern Matching ---
user = ("Nishant", "Admin", 18)
name, role, _ = user               # Drops the '18' into a throwaway variable

# Python 3.10+ Switch Statements (Match-Case)
match user:
    case ("Nishant", "Admin", exp) if exp > 10:
        print("Super User Granted")
    case _:
        print("Fallback")

# --- Generators & Itertools (O(1) Memory Usage) ---
# A Generator (Yield) pauses execution, emitting 1 value at a time, using zero RAM.
def stream_logs():
    for i in range(1000000):
        yield f"Log {i}"

# Chains two generators together instantly without copying to RAM
chained = itertools.chain([1, 2], [3, 4]) 

# Groups consecutive identical keys
grouped = itertools.groupby("AAAABBBCCDAABBB")`}</code>
            </div>
          </div>
        </div>

{/* --- SECTION 6: COMPREHENSIONS & LAMBDAS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             6. Comprehensions & Functional Pipelines
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Senior developers never use generic <code>for</code> loops to build arrays. <strong>List Comprehensions</strong> execute at the C-level and are drastically faster. <code>lambda</code> equations perform inline, anonymized math.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. List & Dictionary Comprehensions</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# [expression for item in iterable if condition]

# --- List Comprehension ---
# Find all even numbers multiplied by 10
evens = [x * 10 for x in range(10) if x % 2 == 0]
# [0, 20, 40, 60, 80]

# --- Set Comprehension ---
# Instant deduplication while processing
unique_lengths = {len(name) for name in ["Nishant", "John", "Nishant"]}
# {4, 7}

# --- Dictionary Comprehension ---
# Invert a dictionary's keys and values instantly
hash_map = {"uid": 1, "role": 2}
inverted = {v: k for k, v in hash_map.items()}
# {1: 'uid', 2: 'role'}`}</code>
            </div>

            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Lambda Calculus (Map & Filter)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# Lambdas are anonymous, 1-line functions.
adder = lambda x, y: x + y
adder(5, 10) # 15

# --- Map ---
# Applies a function to every element natively in C
nums = [1, 2, 3]
doubled = list(map(lambda x: x * 2, nums)) # [2, 4, 6]

# --- Filter ---
# Extracts elements that return True
active_users = list(filter(lambda u: u["active"], users_array))`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 7: VARIADIC PACKING --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             7. Network Payloads (*args & **kwargs)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Building extensible wrapper functions requires capturing infinite unknown parameters instantly. 
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# *args packs infinite positional arguments into a Tuple
# **kwargs packs infinite keyword arguments into a Dictionary

def generic_api_handler(endpoint, *args, **kwargs):
    print(f"Routing to: {endpoint}")
    
    if args:
        print(f"Positional Payload (Tuple): {args}")
        
    if kwargs:
        print(f"Keyword Payload (Dict): {kwargs}")

# Execution:
generic_api_handler("/user", "Nishant", "Admin", retries=3, fail_silent=True)

# Output:
# Routing to: /user
# Positional Payload (Tuple): ('Nishant', 'Admin')
# Keyword Payload (Dict): {'retries': 3, 'fail_silent': True}`}</code>
            </div>
          </div>
        </div>

      {/* --- SECTION 8: ITERATORS & GENERATORS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             8. Standard Snippets: Iterators & Lazy Generators
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Generators use Lazy Evaluation (processing one item at a time) instead of Eager Evaluation (allocating millions of items into RAM).
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. The Iterator Protocol (<code>__iter__</code> / <code>__next__</code>)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# EXACT INTERVIEW SNIPPET: Building a manual Iterator object
class Counter:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0

    def __iter__(self):
        return self         # Must return 'self' to expose the next() hook

    def __next__(self):
        if self.current < self.limit:
            value = self.current
            self.current += 1
            return value
        raise StopIteration # Required trap to explicitly terminate the loops

# Execution
c = Counter(3)
for num in c:
    pass # 0, 1, 2`}</code>
            </div>

            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Generator Functions (`yield`)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# Instead of building the class above, you use 'yield'
# 'yield' freezes the entire frame in RAM, returns the value, and waits for next()
def fast_counter(limit):
    current = 0
    while current < limit:
        yield current
        current += 1

gen = fast_counter(3)
print(next(gen)) # 0
print(next(gen)) # 1
print(next(gen)) # 2
# print(next(gen)) # CRASH: StopIteration Exception`}</code>
            </div>
           </div>
        </div>
        
        {/* --- SECTION 9: INTERVIEW THEORY --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             9. Interview Mechanics: Decorators & The GIL
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Interviewers will ALWAYS ask about the Global Interpreter Lock (GIL) to verify you understand why Python cannot achieve true Multithreading, and they will test your understanding of Function Wrappers (Decorators).
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. The Global Interpreter Lock (GIL)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# Python (CPython) has a Mutex lock called the GIL.
# It prevents multiple native threads from executing Python bytecodes at EXACTLY the same time.

# THE RULE:
# 1. Multithreading in Python is FAKE for CPU-bound tasks.
# If you run 4 Thread-workers doing heavy math, they will run SLOWER than 1 worker because they constantly fight over the single GIL.

# 2. Multithreading is FAST for I/O-bound tasks.
# If you run 4 threads downloading APIs across the network, it works perfectly, because threads manually release the GIL while waiting for HTTP responses.

# TRUE CONCURRENCY:
# To bypass the GIL and use 100% of the host CPU, you MUST use 'multiprocessing'. 
# This spawns entirely independent Python processes, each with their own isolated memory and their own personal GIL.`}</code>
            </div>
            
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Function Decorators (First Class Memory)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# Functions are 'First Class Objects' -> They can be passed into arrays and other functions.
import time
from functools import wraps

# --- 1. Standard Decorator ---
def timer_decorator(func):
    """Wraps a function to measure exact execution time."""
    @wraps(func) # Preserves the original function's name and docstring (CRITICAL!)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} executed in {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

@timer_decorator
def heavy_math():
    return sum(range(100000))

# --- 2. Parametrized Decorator (The 3-Level Closure) ---
# Interviewers WILL ask you to build a decorator that accepts arguments!
# This requires a factory function that RETURNS a decorator.
def retry(max_retries=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception:
                    print(f"Failed. Retrying {attempt+1}/{max_retries}...")
            # Final attempt
            return func(*args, **kwargs)
        return wrapper
    return decorator

@retry(max_retries=5)
def unstable_network_call():
    raise ConnectionError("Dropped!")

# --- 3. Built-In OOP Decorators ---
class Employee:
    company = "TechCorp"
    
    def __init__(self, name):
        self._name = name
        
    @property               # Makes a method accessible like a standard attribute (e.g. emp.name)
    def name(self):
        return self._name.upper()
        
    @classmethod            # Modifies the CLASS itself, not the instance. Useful for Factory methods.
    def change_company(cls, new_name):
        cls.company = new_name
        
    @staticmethod           # A normal utility function that simply lives inside the class namespace.
    def is_workday(day):
        return day.weekday() < 5`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
