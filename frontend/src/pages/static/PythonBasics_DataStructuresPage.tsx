import { Terminal, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PythonBasics_DataStructuresPage() {
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
                Python: Collections Architecture
              </h1>
              <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                Native Arrays, Queues, Hash Maps, and Sets
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 print:gap-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Lists</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Tuples</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Dictionaries</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Sets</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Deques</span>\n            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Heaps</span>
          </div>
        </div>

{/* --- SECTION 2.8: INTERVIEW MEMORY THEORY --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             2.8 Interview Mechanics: Garbage Collection & Reference Traps
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Interviewers frequently test if you understand <strong>Reference Counting</strong> and the notoriously dangerous <strong>Mutable Default Argument</strong> trap.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Pass-By-Object-Reference Trap</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# NEVER use a mutable object as a default argument.
# Default arguments are evaluated ONLY ONCE when the function is defined, NOT every time it runs!

# --- THE TRAP ---
def bad_append(item, arr=[]):
    arr.append(item)
    return arr

bad_append(1) # [1]
bad_append(2) # [1, 2] -> IT REMEMBERED THE STATE FROM THE PREVIOUS CALL!

# --- THE FIX ---
# Always use None, then instantiate the Mutable object inside the function block.
def good_append(item, arr=None):
    if arr is None:
        arr = []
    arr.append(item)
    return arr`}</code>
            </div>
            
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Automatic Garbage Collection (Reference Counting)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import sys

# Python deletes objects from RAM automatically when their "Reference Count" hits 0.
x = [1, 2, 3]                  # Array is created. Ref Count = 1
sys.getrefcount(x)             # Returns 2 (Because getrefcount itself creates a temporary reference)

y = x                          # 'y' points to the same array. Ref Count = 2
del x                          # 'x' is deleted. Ref Count = 1 (Array survives because 'y' still points to it)

y = "Changed"                  # 'y' now points to a string. 
# The Array's Ref Count drops to 0. It is INSTANTLY deleted from RAM.

# Note: Python's true Garbage Collector (GC) runs periodically in the background specifically to hunt down "Cyclic References" (e.g. Node A points to Node B, and Node B points to Node A).`}</code>
            </div>
          </div>
        </div>

{/* --- SECTION 2.5: FOUNDATIONAL COLLECTIONS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             3. Foundational Memory Collections
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Before advancing to high-performance C-extensions, you must master every native method available on standard Lists, Tuples, Dictionaries, and Sets.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Native Arrays (Lists)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`arr = [10, 20, 30]

# --- Appending & Expanding ---
arr.append(40)         # Adds 1 item to the absolute end. (Fast O(1))
arr.extend([50, 60])   # Merges another iterable directly to the end.
arr.insert(1, 15)      # Inserts '15' at index 1. (Slow O(N), pushes everything right)

# --- Removing & Destroying ---
arr.pop()              # Removes & returns the LAST item (Fast O(1))
arr.pop(0)             # Removes & returns the FIRST item (Slow O(N))
arr.remove(20)         # Deletes the FIRST occurrence of '20' (Throws ValueError if missing)
arr.clear()            # Wipes the array empty perfectly: []

# --- Sorting & Metrics ---
arr.index(30)          # Finds the index of '30'. (Throws ValueError if missing)
arr.count(10)          # Counts how many times '10' exists in the array.
arr.sort(reverse=True) # Sorts NATURALLY in-place (Modifies the native array)
arr.reverse()          # Reverses array in-place`}</code>
            </div>
            
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Immutable Records (Tuples)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`# Tuples are completely locked in memory. They cannot be modified, making them extremely fast and Hashable (can be used as Dictionary Keys).
record = (1, 2, 2, 3)

record.count(2)        # 2
record.index(3)        # 3

# Fast Unpacking
x, y, *rest = record   # x=1, y=2, rest=[2,3]`}</code>
            </div>

            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">3. Native Hash Maps (Dictionaries)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`maps = {"id": 1, "role": "admin"}

# --- Data Extraction ---
maps.keys()            # dict_keys(['id', 'role'])
maps.values()          # dict_values([1, 'admin'])
maps.items()           # dict_items([('id', 1), ('role', 'admin')])

# --- Dictionary Mutations ---
maps.update({"status": "active"}) # Batch overrides multiple keys
maps.pop("role")       # Removes and returns 'admin'
maps.clear()           # Wipes the dictionary`}</code>
            </div>

            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">4. Isolated Mathematical Sets</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`unique = {10, 20, 30}

unique.add(40)         # Adds safely. Does nothing if it already exists.
unique.remove(20)      # Removes 20. (Throws KeyError if missing)
unique.discard(99)     # SAFE Remove. Does NOT throw an error if missing!
unique.pop()           # Removes and returns a completely RANDOM item!`}</code>
            </div>
          </div>
        </div>

{/* --- SECTION 3: ARRAYS & MEMORY QUEUES --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             3. Array Mechanics, Heaps, and Fast Queues
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            The standard Python <code>List</code> is a dynamic array. Removing items from the front is <code>O(N)</code> (fatal for queues). Senior engineers use <code>collections.deque</code> for queues, <code>heapq</code> for priority scheduling, and <code>bisect</code> for binary search insertions.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import collections
import heapq
import bisect

# --- Advanced List Algorithms ---
arr = [10, 20, 30]
arr.insert(0, 5)       # O(N) Slow! Shifts entire array right in memory.
arr.pop()              # O(1) Fast! Removes from end dynamically.
arr.remove(20)         # O(N) Slow! Scans for value, then shifts array.
arr.extend([40, 50])   # O(K) Fast! Appends multiple items directly in C.
arr.index(30)          # O(N) Finds index of first occurrence.

# --- True Queues (collections.deque) ---
# Always use Deques when processing async SQS Events iteratively!
queue = collections.deque([1, 2, 3])
queue.appendleft(0)    # O(1) Fast! Prepends without shifting array.
queue.popleft()        # O(1) Fast! Removes from front instantly.
queue.rotate(1)        # Shifts array circularly by N steps in O(N).

# --- Priority Queues (heapq) ---
# O(log N) Priority scheduling. Perfect for executing High-Priority APIs first.
priority_queue = []
heapq.heappush(priority_queue, (1, "CRITICAL_ERROR"))
heapq.heappush(priority_queue, (3, "INFO_LOG"))
heapq.heappop(priority_queue) # Instantly pops "CRITICAL_ERROR" (lowest int)

# --- Binary Search Insertions (bisect) ---
# Keeps an already-sorted array sorted WITHOUT resorting O(N log N)
sorted_arr = [10, 20, 30]
bisect.insort(sorted_arr, 25) # O(N) insertion, O(log N) search. -> [10, 20, 25, 30]`}</code>
            </div>
          </div>
        </div>
        
        {/* --- SECTION 4: HASH MAPS & SETS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             4. Hash Maps, Contexts, and Sets
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Dictionaries provide <code>O(1)</code> lookups. The <code>collections</code> module expands this into extremely powerful frequency counters and default-value allocators. Sets are leveraged exclusively for instantaneous `O(1)` deduplication and intersection calculus.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`from collections import defaultdict, Counter, OrderedDict
from contextlib import suppress

# --- Advanced Dictionary Algorithms ---
payload = {"id": 100}

# The Trapdoor. Returns "OK" if key is missing, avoids KeyError.
payload.get("status", "OK")        

# Returns "OK" AND literally sets the key into the dictionary.
payload.setdefault("status", "OK") 

# Merges another dictionary in C-layer instantly. (Python 3.9+)
merged = payload | {"id": 200, "role": "admin"} 

# Removes and returns mapping.
payload.pop("status", None)        

# Removes and returns LIFO key-value pair as a Tuple.
payload.popitem()

# --- Collections: Dictionary Wrappers ---
logs = ["500", "404", "500", "403", "500"]

# Counter: Frequency mapping
error_counts = Counter(logs)
error_counts.most_common(1) # [('500', 3)]

# DefaultDict: Prevents KeyErrors explicitly
grouped_policies = defaultdict(list)
grouped_policies["ACTIVE"].append("U98004266") # Creates List atomically!

# --- Set Engineering (O(1) Hash Operations) ---
sf_ids = {"U1", "U2", "U3"}
nova_ids = {"U2", "U3", "U4"}

nova_ids - sf_ids               # O(N) Hash Difference -> {"U4"}
sf_ids.intersection(nova_ids)   # O(N) Hash Match -> {"U2", "U3"}
sf_ids.symmetric_difference(nova_ids) # {"U1", "U4"} (Items in exactly one set)
sf_ids.issubset(nova_ids)       # False

# --- Context Managers (Pythonic Exceptions) ---
# Cleanest way to ignore a predictable error without ugly try/except blocks
with suppress(KeyError):
    del payload["non_existent_key"]`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
