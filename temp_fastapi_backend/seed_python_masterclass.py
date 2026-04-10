import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Preparation, Course, CourseModule, CourseWidget

load_dotenv(".env")
db_url = os.getenv("DATABASE_URL")
if db_url and db_url.startswith("postgres://"): 
    db_url = db_url.replace("postgres://", "postgresql://", 1)

if not db_url:
    print("WARNING: No DATABASE_URL found. Using local SQLite.")
    db_url = "sqlite:///./interview_prep.db"

engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

try:
    # 1. Ensure Preparation Exists
    prep = db.query(Preparation).first()
    if not prep:
        raise Exception("No Preparation workspace found. Please log in or create one via the UI first.")

    # 2. Setup the Python Architect Course
    c_target = Course(title="Python Masterclass: Staff/Principal Architect", user_id=prep.user_id)
    db.add(c_target)
    db.commit()
    db.refresh(c_target)
    
    prep.courses.append(c_target)
    db.commit()

    modules_data = [
        {
            "title": "Module 1: The CPython Engine & Memory Architecture",
            "content": """# 1. The CPython Engine & Memory Architecture

Senior interviewers relentlessly test your understanding of Python's underlying C-memory model, pointer comparisons, and strict mutability rules.

## Pointers (`is`) vs Values (`==`)
```python
# == checks if the mathematical VALUES match
# 'is' checks if they are the exact same RAM address natively in C (id(a) == id(b))

a = [1, 2, 3]
b = [1, 2, 3]
c = a          # c simply points to a's memory address

a == b         # True (They look the same)
a is b         # False (Different arrays in memory)
a is c         # True (Same exact memory pointer)
```

## Stack Memory vs Heap Memory
```python
# THE HEAP (Dynamic Objects)
# Python stores ALL actual objects (Lists, Dicts, Classes, even Integers in Python!) in Private Heap Memory.
# Heap memory is massive, slow, and managed entirely by the Python Memory Manager / Garbage Collector.

# THE STACK (Execution References)
# When you define a variable, Python ONLY stores a POINTER (a memory reference id) on the Execution Stack.

x = [1, 2, 3] # The Array is on the HEAP. The label 'x' holding its memory address is on the STACK.
```

## String & Byte Engineering (Exhaustive Methods)
Strings are immutable C-arrays. Staff engineers manipulate strings completely without loops using standard library methods.
```python
raw = "   U98004266-A   "

# --- Extraction & Cleaning ---
raw.strip()        # "U98004266-A"
raw.removeprefix("U") # "98004266-A" (Python 3.9+)

# --- advanced C-Level translation ---
# Instant character swapping without regex or loops
translation_map = str.maketrans("UA", "XB")
"U98004266-A".translate(translation_map) # "X98004266-B"

# --- Cryptographic Encoding ---
raw.encode("utf-8")    # b'   U98004266-A   ' (Required for Boto3/S3 transfers)
```"""
        },
        {
            "title": "Module 2: Advanced Object-Oriented Architecture",
            "content": """# 2. Advanced Object-Oriented Architecture

Classes, Inheritance, MRO, Dunder Methods, and Dataclasses.

## Inheritance & Multiple Order Resolution (MRO)
Children aggressively inherit logic from Parent classes. When inheriting from multiple parents, Python uses the **C3 Linearization Algorithm (MRO)** to determine mathematically who gets priority.

```python
class Database:
    def execute(self):
        print("Executing standard query.")

class PostgresDB(Database):
    def execute(self):
        super().execute()  
        print("Executing Postgres extension.")

class AWSCloud:
    def host(self):
        print("Hosting on AWS.")

class ManagedRDS(PostgresDB, AWSCloud):
    pass

# --- The Interview Trap: MRO ---
print(ManagedRDS.mro())
# [<class 'ManagedRDS'>, <class 'PostgresDB'>, <class 'Database'>, <class 'AWSCloud'>, <class 'object'>]
```

## Dunder (Magic) Methods
Dunder (Double Underscore) methods allow your custom objects to hook natively into Python's underlying syntax.

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Automatically called when viewed in a REPL/Debugger
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    # Allows you to use the exact native math syntax: v1 + v2
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    # Allows len(obj) to work natively!
    def __len__(self):
        return max(self.x, self.y)

v1 = Vector(2, 4)
v2 = Vector(3, 1)
v3 = v1 + v2     # Natively triggers __add__
```

## Modern Dataclasses (Python 3.7+)
```python
from dataclasses import dataclass, field
from typing import List

# Automatically builds __init__ and strict Type-Hinting bounds
@dataclass
class PolicyRecord:
    id: str
    status: str = "ACTIVE"
    tags: List[str] = field(default_factory=list) 

p1 = PolicyRecord(id="U98004266")
p2 = PolicyRecord(id="U98004266")

# Dataclasses auto-generate memory equality checks!
print(p1 == p2) # True (Normally in standard Classes this compares Memory IDs and returns False!)
```"""
        },
        {
            "title": "Module 3: Concurrency, GIL & Asynchronous Microservices",
            "content": """# 3. Concurrency, GIL & Asynchronous Microservices

## Python Architecture & The GIL
Python (specifically CPython) is interpreted, extremely dynamic, and memory-safe. However, it is fundamentally constrained by the **Global Interpreter Lock (GIL)**, which prevents multiple native threads from executing Python bytecodes at once.

- **The GIL Problem:** Multi-threading in Python does NOT give you true parallel processing for CPU-bound tasks.
- **The Solution:** For heavy lifting (like transforming 5GB CSVs), you must use `multiprocessing`, which bypasses the GIL by spawning entirely separate Python processes.

```python
import multiprocessing
import time

def process_heavy_chunk(data_chunk):
    return sum(x*x for x in data_chunk)

if __name__ == '__main__':
    massive_dataset = [range(1000000) for _ in range(8)]
    
    # Bypasses the GIL perfectly by allocating tasks to all CPU Cores
    with multiprocessing.Pool(processes=multiprocessing.cpu_count()) as pool:
        results = pool.map(process_heavy_chunk, massive_dataset)
```

## Asynchronous I/O (FastAPI Paradigm)
While Multi-processing solves CPU bottlenecks, **Asyncio** solves I/O bottlenecks.

```python
import asyncio
from fastapi import FastAPI
import httpx # Async HTTP client

app = FastAPI(title="Broker Portal Modernization")

@app.get("/api/v1/policies/{policy_id}")
async def fetch_policy_data(policy_id: str):
    # NEVER USE: requests.get() here! It halts the entire Event Loop.
    # USE: httpx.AsyncClient() paired with the 'await' keyword.
    
    async with httpx.AsyncClient() as client:
        # Puts the thread to sleep, allows the server to handle 10,000 other 
        # API requests while we wait for the Database to respond!
        response = await client.get(f"https://novasys.internal/db/{policy_id}")
        
        return response.json()
```"""
        },
        {
            "title": "Module 4: High-Scale Data Engineering (Pandas)",
            "content": """# 4. High-Scale Data Engineering (Pandas)

When building engines that reconcile legacy databases against modern warehouses, you use **Pandas**. It converts Python objects into contiguous C-Arrays in memory (Vectors), executing multi-million row SQL-like operations in milliseconds.

## Memory-Safe CSV Chunking
A naive developer throws a 10GB CSV into Pandas and crashes the server via Memory OOM (Out of Memory) kills. An Architect uses "Chunks" to cleanly stream the file across the RAM layer.

```python
import pandas as pd

def safe_database_reconciliation(file_path):
    mismatched_policies = []
    
    # Read absolutely massive files 50,000 rows at a time
    chunk_iterator = pd.read_csv(file_path, chunksize=50000)
    
    for chunk in chunk_iterator:
        # C-Level Vectorized math occurs here (Extremely fast)
        chunk['Discrepancy'] = chunk['Salesforce_Premium'] - chunk['Novasys_Premium']
        
        # Filter for rows where Discrepancy mathematically exists
        errors = chunk[chunk['Discrepancy'] != 0.0]
        mismatched_policies.append(errors)
        
    final_report = pd.concat(mismatched_policies)
    return final_report.to_json(orient="records")
```"""
        },
        {
            "title": "Module 5: AWS Integration (Boto3 SDK)",
            "content": """# 5. AWS Integration (Boto3 SDK)

## Resource vs Client Interfaces
Boto3 has two interfaces. `Client` is a strict, low-level mapping of the AWS JSON API. `Resource` is a high-level Object-Oriented wrapper.

```python
import boto3
from boto3.dynamodb.conditions import Key

# HIGH-LEVEL RESOURCE (Pythonic and implicitly pages data)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PolicyReconciliationTable')

# Object Oriented Data Fetching
items = table.query(
    KeyConditionExpression=Key('PolicyID').eq('U98004266')
)
```

## Generating Presigned Upload URLs
Never let users upload PDFs directly through your Python web server. Instead, use Boto3 to generate a Cryptographic "Presigned URL", allowing the user's React frontend to upload securely *directly into the S3 Bucket*.

```python
import boto3

def get_direct_upload_ticket(user_id, filename):
    s3_client = boto3.client('s3')
    
    presigned_post = s3_client.generate_presigned_post(
        Bucket='enterprise-upload-zone',
        Key=f"inbox/{user_id}/{filename}",
        Fields={"acl": "private"},
        Conditions=[
            {"acl": "private"},
            ["content-length-range", 10, 10485760] # Limit strict 10MB upload
        ],
        ExpiresIn=900
    )
    
    return presigned_post
```"""
        },
        {
            "title": "Module 6: Senior Systems Q&A",
            "content": """# 6. Senior Level FAQ

Based on rigorous 16+ years experience level interviews.

## What happens under the hood when you run a Python script?

```mermaid
flowchart TD
    A["🐍 Python Script (.py)"]
    B["🔍 Lexical Analysis → Tokens"]
    C["🌳 Parsing → Abstract Syntax Tree"]
    D["⚙️ Compilation → Bytecode (.pyc)"]
    E["🖥️ Python Virtual Machine (PVM)"]
    F["🌐 System Calls & I/O Output"]
    G["🧹 Cleanup & Exit"]
    A --> B --> C --> D --> E --> F --> G
    style A fill:#1e3a5f,color:#93c5fd,stroke:#3b82f6,stroke-width:2px
    style C fill:#2a1a3a,color:#c4b5fd,stroke:#8b5cf6,stroke-width:1px
    style E fill:#3a1a2a,color:#fda4af,stroke:#f43f5e,stroke-width:2px
```

1. **Interpreter Starts**: CPython runtime environment initialized.
2. **Lexical Analysis (Tokenization)**: Code broken into tokens (Keywords, Identifiers).
3. **Parsing**: Tokens converted to AST (Abstract Syntax Tree).
4. **Bytecode Compilation**: AST converted to `.pyc` files for Python Virtual Machine. 
5. **Execution**: PVM executes the bytecode loop iteratively, allocating to Heap.
6. **Cleanup**: Garbage Collector (GC) drops reference counts and flushes remaining frames.

## Explain decorators. Implement a real-world example.
Decorators are higher-order functions that take a function and return a new function, injecting behavior.

```python
import time
from functools import wraps

def timeit_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        duration = time.time() - start
        print(f"[{func.__name__}] execution took {duration:.4f}s")
        return result
    return wrapper

@timeit_decorator
def process_data(records):
    time.sleep(1) # Fake workload
    return len(records)
```

## Why are default mutable arguments dangerous?
```python
# BAD
def func(x=[]):
    x.append(1)
    return x

# What happens? Default arguments are evaluated ONLY ONCE when the function is defined, not every time it's called.
print(func()) # [1]
print(func()) # [1, 1] <- Memory trap!

# GOOD
def safe_func(x=None):
    if x is None:
        x = []
    x.append(1)
    return x
```

## Explain generators vs iterators. When would you use each?
Generators use `yield` instead of `return`. They compute exactly one item at a time, suspending their local execution state, making them fundamentally O(1) in memory instead of loading massive lists into RAM.

```python
def stream_large_file(file_path):
    with open(file_path, 'r') as f:
        for line in f:
            yield line.strip() # Pauses execution here until next() is called
```"""
        }
    ]

    for i, m_data in enumerate(modules_data):
        mod = CourseModule(course_id=c_target.id, title=m_data["title"], position=i)
        db.add(mod)
        db.commit()
        db.refresh(mod)
        
        # Injects the Markdown into the DB natively
        w = CourseWidget(
            module_id=mod.id,
            widget_type="markdown",
            position=0,
            payload={
                "title": m_data["title"],
                "content": m_data["content"]
            }
        )
        db.add(w)
        db.commit()

    print(f"SUCCESS: Synthesized the complete Python Masterclass Course with {len(modules_data)} exact sub-modules into the Live PostgreSQL Database!")

except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
