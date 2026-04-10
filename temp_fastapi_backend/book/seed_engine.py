import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from book.models import Book, BookChapter, BookWidget
from models import Preparation

def seed_python_cloud_engineering_book():
    print("Connecting to local database...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        print("Scrubbing previous book entries...")
        db.query(BookWidget).delete()
        db.query(BookChapter).delete()
        db.query(Book).delete()
        db.commit()

        # Step 1: Create the dedicated "Python Experience Preparation"
        target_prep_id = "prep-python-exp-1"
        prep = db.query(Preparation).filter(Preparation.id == target_prep_id).first()
        if not prep:
            prep = Preparation(
                id=target_prep_id, 
                title="Python Experience Preparation", 
                subtitle="Senior Architect Verification",
                status="Active",
                progress=0,
                user_id=1
            )
            db.add(prep)
            db.commit()

        print("Building Skillom: The Ultimate Expert Python Reference Guide...")
        
        # Instantiate Book
        py_book = Book(
            preparation_id=prep.id,
            title="Skillom: Expert Python Reference Guide",
            author="Nishant Saxena"
        )
        db.add(py_book)
        db.commit()
        db.refresh(py_book)

        # ---------------------------------------------------------
        # CHAPTER 1: Core Python Internals (Basics to Expert)
        # ---------------------------------------------------------
        ch1 = BookChapter(book_id=py_book.id, position=1, chapter_number=1, title="🧠 Core Python Internals")
        db.add(ch1)
        db.commit()
        db.refresh(ch1)
        
        # NOTE: Intro text (c1w1) removed as per user request to directly start with the diagram.

        c1w_diagram = BookWidget(
            chapter_id=ch1.id, position=1, widget_type="topology",
            payload={
                "height": "650px",
                "nodes": [
                    # Row 1 (Left to Right)
                    {"id": "n1", "type": "awsNode", "position": {"x": 0, "y": 0}, "data": {"label": "1. Python Interpreter Starts", "color": "purple", "tooltip": "Python wakes up and sets up memory to run your code."}},
                    {"id": "n2", "type": "awsNode", "position": {"x": 400, "y": 0}, "data": {"label": "2. Script File is Read", "color": "slate", "tooltip": "Python opens your .py file and translates the text into words."}},
                    {"id": "n3", "type": "awsNode", "position": {"x": 800, "y": 0}, "data": {"label": "3. Lexical Analysis", "color": "amber", "tooltip": "Breaks your code into basic words (tokens)."}},
                    {"id": "n4", "type": "awsNode", "position": {"x": 1200, "y": 0}, "data": {"label": "4. Parsing (AST)", "color": "amber", "tooltip": "Checks grammar rules and builds a logic tree."}},
                    
                    # Row 2 (Right to Left)
                    {"id": "n5", "type": "awsNode", "position": {"x": 1200, "y": 250}, "data": {"label": "5. Code Compilation", "color": "indigo", "tooltip": "Converts logic tree to bytecode for the machine."}},
                    {"id": "n6", "type": "awsNode", "position": {"x": 800, "y": 250}, "data": {"label": "6. PVM Execution", "color": "red", "tooltip": "Virtual Machine executes the bytecode sequentially."}},
                    {"id": "n7", "type": "awsNode", "position": {"x": 400, "y": 250}, "data": {"label": "7. Memory & Data", "color": "emerald", "tooltip": "Handles runtime memory via Garbage Collection."}},
                    {"id": "n8", "type": "awsNode", "position": {"x": 0, "y": 250}, "data": {"label": "8. System I/O", "color": "emerald", "tooltip": "Talks to the operating system to print/read files."}},
                    
                    # Row 3 (Stop Sign)
                    {"id": "n9", "type": "awsNode", "position": {"x": 0, "y": 480}, "data": {"label": "9. Script Exit", "color": "slate", "tooltip": "Code finishes. Python cleans up all memory."}},
                ],
                "edges": [
                    {"id": "e1", "source": "n1", "target": "n2", "animated": True},
                    {"id": "e2", "source": "n2", "target": "n3", "animated": True},
                    {"id": "e3", "source": "n3", "target": "n4", "animated": True},
                    {"id": "e4", "source": "n4", "target": "n5", "animated": True},
                    {"id": "e5", "source": "n5", "target": "n6", "animated": True},
                    {"id": "e6", "source": "n6", "target": "n7", "animated": True},
                    {"id": "e7", "source": "n7", "target": "n8", "animated": True},
                    {"id": "e8", "source": "n8", "target": "n9", "animated": True}
                ]
            }
        )
        db.add(c1w_diagram)

        # Step Details: Map the 9 steps into beautiful HTML scroll targets
        step_descriptions = [
            ("1. Python Interpreter Starts", "Python wakes up and sets up memory to run your code.", "purple"),
            ("2. Script File is Read", "Python opens your .py file and translates the text into words.", "slate"),
            ("3. Lexical Analysis", "Breaks your code into basic words (tokens).", "amber"),
            ("4. Parsing (AST)", "Checks grammar rules and builds a logic tree.", "amber"),
            ("5. Code Compilation", "Converts logic tree to bytecode for the machine.", "indigo"),
            ("6. PVM Execution", "Virtual Machine executes the bytecode sequentially.", "red"),
            ("7. Memory & Data", "Handles runtime memory via Garbage Collection.", "emerald"),
            ("8. System I/O", "Talks to the operating system to print/read files.", "emerald"),
            ("9. Script Exit", "Code finishes. Python cleans up all memory.", "slate")
        ]

        pos = 3
        for idx, (title, desc, color) in enumerate(step_descriptions, 1):
            s_widget = BookWidget(
                chapter_id=ch1.id, position=pos, widget_type="step_details",
                payload={
                    "idx": idx,
                    "title": title,
                    "desc": desc
                }
            )
            db.add(s_widget)
            pos += 1

        c1w3 = BookWidget(
            chapter_id=ch1.id, position=pos, widget_type="markdown",
            payload={
                "content": "<div class='bg-amber-50 p-6 rounded-xl border border-amber-200 mt-12'><h3>💡 Expert Note for PyPy & JVM</h3><p>This strict 9-step pipeline represents <strong>CPython</strong>, the standard interpreter. Other engines like PyPy bypass strict VM compilation by utilizing JIT (Just-In-Time) compilation directly to machine code natively, skipping structural overheads for long-running processes.</p></div><h3 class='mt-12'>Actionable Interview Question: Deep vs Shallow Copy</h3><p>Verify your understanding of memory allocation below.</p>"
            }
        )
        db.add(c1w3)
        pos += 1

        c1w4 = BookWidget(
            chapter_id=ch1.id, position=pos, widget_type="monaco_lab",
            payload={
                "language": "python",
                "height": "250px",
                "defaultCode": "import copy\n\noriginal = [[1, 2], [3, 4]]\nshallow = copy.copy(original)\ndeep = copy.deepcopy(original)\n\n# Mutate nested list\noriginal[0][0] = 'MUTATED'\n\nprint(f\"Original: {original}\")\nprint(f\"Shallow (Suffers mutation leak): {shallow}\")\nprint(f\"Deep (Completely isolated): {deep}\")\n"
            }
        )
        db.add(c1w4)

        # ---------------------------------------------------------
        # CHAPTER 2: Foundational Data Structures & Memory Optimization
        # ---------------------------------------------------------
        ch2 = BookChapter(book_id=py_book.id, position=2, chapter_number=2, title="📊 Data Structures & Memory")
        db.add(ch2)
        db.commit()
        db.refresh(ch2)

        c2w1 = BookWidget(
            chapter_id=ch2.id, position=1, widget_type="markdown",
            payload={
                "content": "<p>Understanding internal C-backed performance properties of Python data structures is critical for scaling.</p><ul><li><strong>Lists:</strong> Dynamic arrays. Ideal for ordered iteration but $O(N)$ lookup.</li><li><strong>Sets:</strong> Hash maps lacking assigned values. Pure $O(1)$ lookup mapping. Required for array deduplication.</li><li><strong>Dictionaries:</strong> Hash maps with Key-Value pairings. Ordered naturally in Python 3.7+.</li></ul><h3>The __slots__ Memory Trick</h3><p>Interviewers ask: <em>\"How do you reduce object memory overhead by 60% if you are spawning 5 million class instances?\"</em></p><p>By default, every Python class instance maintains an internal <code>__dict__</code> to dynamically store attributes. This is incredibly memory intensive for massive data schemas. Defining <code>__slots__</code> explicitly strips the dict allocation, forcing objects to hold fixed properties.</p>"
            }
        )
        db.add(c2w1)

        c2w2 = BookWidget(
            chapter_id=ch2.id, position=2, widget_type="monaco_lab",
            payload={
                "language": "python",
                "height": "250px",
                "defaultCode": "import sys\n\nclass StandardNode:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nclass SlottedNode:\n    __slots__ = ['x', 'y'] # Bypasses __dict__ creation\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\nstandard = StandardNode(1, 1)\nslotted = SlottedNode(1, 1)\n\nprint(f\"Standard Memory Overhead: {sys.getsizeof(standard) + sys.getsizeof(standard.__dict__)} bytes\")\nprint(f\"Slotted Memory Overhead: {sys.getsizeof(slotted)} bytes\")\n"
            }
        )
        db.add(c2w2)

        # ---------------------------------------------------------
        # CHAPTER 3: Advanced Concepts
        # ---------------------------------------------------------
        ch3 = BookChapter(book_id=py_book.id, position=3, chapter_number=3, title="⚙️ Advanced Concepts & Architecture")
        db.add(ch3)
        db.commit()
        db.refresh(ch3)
        
        c3w1 = BookWidget(
            chapter_id=ch3.id, position=1, widget_type="markdown",
            payload={
                "content": "<p>Senior Devs must demonstrate absolute mastery over dynamic Python overrides.</p><ul><li><strong>Generators vs Iterators:</strong> Iterators pull memory sequentially; Generators strictly `yield` mathematical state iteratively. Both prevent memory buffering during massive data processing.</li><li><strong>Metaclasses:</strong> The \"classes of classes\". Intercept class creation natively.</li><li><strong>Duck Typing vs Protocol:</strong> While Python is dynamically typed ('Duck Typing'), large codebases utilize <code>typing.Protocol</code> to enforce static structural analysis via `mypy` without rigid inheritance.</li><li><strong>Context Managers (with):</strong> Internally calls `__enter__` and `__exit__`. Absolutely required for handling unmanaged DB connections and I/O file locks.</li><li><strong>Monkey Patching:</strong> Modifying class properties at runtime. Highly dangerous as it ruins deterministic testing.</li><li><strong>Descriptors:</strong> (`__get__`/`__set__`) Override variable-binding properties (this is how `@property` exists internally).</li><li><strong>Decorators:</strong> High-order functions wrapping behavior dynamically.</li></ul><h3>Real-World Decorator Implementation</h3>"
            }
        )
        db.add(c3w1)

        c3w2 = BookWidget(
            chapter_id=ch3.id, position=2, widget_type="monaco_lab",
            payload={
                "language": "python",
                "height": "300px",
                "defaultCode": "import time\nfrom functools import wraps\n\n# Standard production utility for performance profiling\ndef timer_decorator(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        end = time.perf_counter()\n        print(f\"{func.__name__} executed in {end - start:.5f}s\")\n        return result\n    return wrapper\n\n@timer_decorator\ndef heavy_computation():\n    return sum([i**2 for i in range(1000000)])\n\nprint(f\"Result: {heavy_computation()}\")\n"
            }
        )
        db.add(c3w2)

        # ---------------------------------------------------------
        # CHAPTER 4: Concurrency & Performance
        # ---------------------------------------------------------
        ch4 = BookChapter(book_id=py_book.id, position=4, chapter_number=4, title="🚀 Concurrency & Performance")
        db.add(ch4)
        db.commit()
        db.refresh(ch4)
        
        c4w1 = BookWidget(
            chapter_id=ch4.id, position=1, widget_type="markdown",
            payload={
                "content": "<h2>Scaling Execution Bottlenecks</h2><p>When engineering API loads across massive server farms, concurrency scaling matters. To scale apps, leverage specific boundaries:</p><ul><li><strong>Multithreading:</strong> Deploys pseudo-parallel threads. Highly optimal strictly for <strong>I/O Bounds</strong> (e.g. File saves, AWS S3 downloads) where the internal OS releases the GIL during sleep loops. Useless for CPU tasks.</li><li><strong>Multiprocessing:</strong> Bypasses GIL by spinning up entirely separate OS processes. Huge memory overhead. Excellent for pure <strong>CPU bounds</strong>.</li><li><strong>Async/Await (AsyncIO):</strong> Single-thread event loop multiplexing millions of lightweight connections dynamically without OS thread switching overhead. Chosen strictly when socket handling is the main application bottleneck (WebSockets, DB Drivers).</li><li><strong>Race Conditions:</strong> Happen when two threads mutate the identical memory pointer concurrently. Prevent via <code>threading.Lock()</code> implementation.</li></ul>"
            }
        )
        db.add(c4w1)

        c4w2 = BookWidget(
            chapter_id=ch4.id, position=2, widget_type="monaco_lab",
            payload={
                "language": "python",
                "height": "250px",
                "defaultCode": "import asyncio\n\n# Internally mapping an Event Loop operation natively\nasync def microservice_call(svc_id):\n    print(f\"Calling dependency: {svc_id}\")\n    await asyncio.sleep(1) # Releasing Event Loop for I/O latency natively\n    return f\"Dependency {svc_id} Resolved\"\n\nasync def main():\n    tasks = [microservice_call(i) for i in range(1, 4)]\n    results = await asyncio.gather(*tasks)\n    print(f\"All services responded concurrently: {results}\")\n\nasyncio.run(main())\n"
            }
        )
        db.add(c4w2)

        # ---------------------------------------------------------
        # CHAPTER 5: System Design (Python-Focused)
        # ---------------------------------------------------------
        ch5 = BookChapter(book_id=py_book.id, position=5, chapter_number=5, title="🧩 System Design (Python-Focused)")
        db.add(ch5)
        db.commit()
        db.refresh(ch5)
        
        c5w1 = BookWidget(
            chapter_id=ch5.id, position=1, widget_type="markdown",
            payload={
                "content": "<p><strong>How would you design a high-throughput API service handling millions of requests with Python?</strong></p><p>As an Architect, utilizing raw FastAPI is insufficient. You deploy ASGI servers like Uvicorn running multiple worker threads managed by Gunicorn. Furthermore, expensive API requests are offloaded immediately to sidecar queues (Amazon SQS / Kafka) running Celery or native Async workers to prevent request timeouts. A Circuit Breaker acts as a reverse proxy shield checking downstream API health to prevent gridlock cascading failures.</p><h3>WSGI vs ASGI: The Gateway Protocols</h3><ul><li><strong>WSGI (e.g., Flask/Django):</strong> Web Server Gateway Interface. Completely synchronous. Every incoming HTTP request strictly holds 1 thread hostage until the response is synthesized. Massive traffic creates thread saturation.</li><li><strong>ASGI (e.g., FastAPI):</strong> Asynchronous Server Gateway Interface. Connections are kept open non-blockingly via internal C-layer events, allowing 1 single worker thread to juggle 10,000 WebSocket connections simultaneously without blocking.</li></ul><ul><li><strong>Rate Limiter Implementation:</strong> Typically utilizes the Token Bucket algorithm backed strictly via Redis atomic transactions.</li><li><strong>Log Processing (ELK):</strong> Python's built-in `logging` module writes purely non-blocking JSON locally via FileBeat, preventing network drops.</li></ul>"
            }
        )
        db.add(c5w1)

        c5w2 = BookWidget(
            chapter_id=ch5.id, position=2, widget_type="topology",
            payload={
                "height": "400px",
                "nodes": [
                    {"id": "lb", "type": "awsNode", "position": {"x": 50, "y": 150}, "data": {"label": "ALB Load Balancer", "color": "purple"}},
                    {"id": "api", "type": "awsNode", "position": {"x": 300, "y": 150}, "data": {"label": "FastAPI (Gunicorn)", "color": "emerald"}},
                    {"id": "redis", "type": "awsNode", "position": {"x": 300, "y": 300}, "data": {"label": "Redis Rate Limiter", "color": "red"}},
                    {"id": "sqs", "type": "awsNode", "position": {"x": 600, "y": 150}, "data": {"label": "Amazon SQS Queue", "color": "amber"}},
                    {"id": "celery", "type": "awsNode", "position": {"x": 850, "y": 150}, "data": {"label": "Celery Worker", "color": "slate"}}
                ],
                "edges": [
                    {"id": "e1", "source": "lb", "target": "api", "animated": True},
                    {"id": "e2", "source": "api", "target": "redis", "animated": False},
                    {"id": "e3", "source": "api", "target": "sqs", "animated": True},
                    {"id": "e4", "source": "sqs", "target": "celery", "animated": True}
                ]
            }
        )
        db.add(c5w2)

        # ---------------------------------------------------------
        # CHAPTER 6: Database & Optimization
        # ---------------------------------------------------------
        ch6 = BookChapter(book_id=py_book.id, position=6, chapter_number=6, title="🗄️ Database & Optimization")
        db.add(ch6)
        db.commit()
        db.refresh(ch6)
        
        c6w1 = BookWidget(
            chapter_id=ch6.id, position=1, widget_type="markdown",
            payload={
                "content": "<h2>Mastering Postgres and ORM Overheads</h2><p><strong>N+1 Query Problem:</strong> Firing nested ORM calls during a loop generates millions of isolated `SELECT` queries across network bounds. Resolve strictly by executing `joinedload()` (SQLAlchemy) or `select_related()` (Django).</p><p><strong>Connection Pooling:</strong> Establishing raw TLS DB connections involves huge handshake latency. External pools (PgBouncer) or engine pools (SQLAlchemy Engine Pool) maintain persistent socket states spanning queries securely.</p><p><strong>ORM vs Raw SQL:</strong> ORMs streamline mapping object logic safely blocking injection constraints. You only drop to pure RAW SQL specifically during highly complex metric-aggregations (Windowing/CTE) or when the ORM translates intent poorly.</p><p><strong>Postgres vs Mongo Tradeoffs:</strong> Postgres rules enforced relational strict ACID environments inherently preventing dirty reads. MongoDB excels precisely in Document/JSON payloads lacking uniform structuring schema, trading relational consistency for pure isolated horizontal scaling elasticity.</p>"
            }
        )
        db.add(c6w1)

        # ---------------------------------------------------------
        # CHAPTER 7: Security & DevOps / CI-CD
        # ---------------------------------------------------------
        ch7 = BookChapter(book_id=py_book.id, position=7, chapter_number=7, title="🔐 Security & Real-World DevOps")
        db.add(ch7)
        db.commit()
        db.refresh(ch7)
        
        c7w1 = BookWidget(
            chapter_id=ch7.id, position=1, widget_type="markdown",
            payload={
                "content": "<h2>Deploying Secure Architecture</h2><ul><li><strong>SQL Injection:</strong> Thwarted by ORM parameterization intrinsically blocking string concatenation execution.</li><li><strong>XSS & CSRF:</strong> Thwarted natively via CORS origin validation headers, coupled explicitly with HttpOnly Cookie configurations avoiding LocalStorage drops.</li><li><strong>JWT Auth:</strong> JWTs hold mathematically signed cryptographs ensuring token manipulation triggers decoding failure instantly without relying perpetually on database lookup checks.</li></ul><h3>Real-World App Deployment</h3><ul><li><strong>Docker Execution:</strong> Decouples the Python environment entirely. Employs lightweight Alpine images exposing pure Gunicorn runtimes securely via port bounding mapping.</li><li><strong>CI/CD Pipelines:</strong> Incorporate static analysis (Black, Flake8), PyTest coverage, and finally immutable AWS ECR image promotion hooks.</li><li><strong>Monitoring (New Relic / Datadog):</strong> Traces execution path bottlenecks deep into the APM logic layer utilizing custom agent instrumentation packages mapping request spans.</li></ul>"
            }
        )
        db.add(c7w1)

        # ---------------------------------------------------------
        # CHAPTER 8: Testing & Code Quality
        # ---------------------------------------------------------
        ch8 = BookChapter(book_id=py_book.id, position=8, chapter_number=8, title="🧪 Testing & Code Quality")
        db.add(ch8)
        db.commit()
        db.refresh(ch8)
        
        c8w1 = BookWidget(
            chapter_id=ch8.id, position=1, widget_type="markdown",
            payload={
                "content": "<p>Robust enterprise systems delineate test configurations strictly.</p><ul><li><strong>Unit Tests:</strong> Test explicitly one singular isolated function decoupled entirely from network inputs.</li><li><strong>Integration Tests:</strong> Validates database hook interactions bridging distinct functional classes precisely.</li><li><strong>E2E Tests:</strong> Spins a virtual browser (Playwright/Selenium) orchestrating full application topology manipulation.</li></ul><p><strong>Mocking natively (unittest.mock):</strong> Patches third-party HTTP components seamlessly inside execution namespaces, yielding dummy payloads returning status code overrides eliminating API rate limits dynamically.</p>"
            }
        )
        db.add(c8w1)

        # ---------------------------------------------------------
        # CHAPTER 9: Practical Coding Questions (Senior Level)
        # ---------------------------------------------------------
        ch9 = BookChapter(book_id=py_book.id, position=9, chapter_number=9, title="💡 Practical Coding (Senior Level)")
        db.add(ch9)
        db.commit()
        db.refresh(ch9)
        
        c9w1 = BookWidget(
            chapter_id=ch9.id, position=1, widget_type="markdown",
            payload={
                "content": "<p><strong>Implement an LRU Cache without using functools.lru_cache.</strong></p><p>An LRU cache in constant time `$O(1)$` specifically requires the intersection of a Hash Map (Dictionary) and a Doubly Linked List (or Python's Ordered Dictionary which acts as a linked state natively).</p>"
            }
        )
        db.add(c9w1)

        c9w2 = BookWidget(
            chapter_id=ch9.id, position=2, widget_type="monaco_lab",
            payload={
                "language": "python",
                "height": "350px",
                "defaultCode": "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False) # Expels the LRU item natively\n\nlru = LRUCache(2)\nlru.put(1, 10)\nlru.put(2, 20)\nlru.get(1)\nlru.put(3, 30) # Evicts key 2\nprint(f\"Key 2 Cache Response: {lru.get(2)}\") # Expect -1\n"
            }
        )
        db.add(c9w2)

        c9w3 = BookWidget(
            chapter_id=ch9.id, position=3, widget_type="markdown",
            payload={
                "content": "<p><strong>Optimize this sequence loop natively:</strong></p>"
            }
        )
        db.add(c9w3)

        c9w4 = BookWidget(
            chapter_id=ch9.id, position=4, widget_type="monaco_lab",
            payload={
                "language": "python",
                "height": "250px",
                "defaultCode": "import time\n\n# The slow array concatenation approach\ndef slow_array_processing():\n    result = []\n    for i in range(20000): # Dropped from 1M to prevent browser freeze\n        result = result + [i] # Horribly unoptimized memory recreation loop\n    return len(result)\n\n# The optimized generator evaluation \ndef fast_generator_evaluation():\n    return len([i for i in range(20000)]) # C-level optimization mapping\n\nprint(f\"Slower loops evaluate carefully...\")\n"
            }
        )
        db.add(c9w4)

        # ---------------------------------------------------------
        # CHAPTER 10: Deep Traps & Edge Cases
        # ---------------------------------------------------------
        ch10 = BookChapter(book_id=py_book.id, position=10, chapter_number=10, title="🧨 Trick & Deep Traps")
        db.add(ch10)
        db.commit()
        db.refresh(ch10)
        
        c10w1 = BookWidget(
            chapter_id=ch10.id, position=1, widget_type="markdown",
            payload={
                "content": "<p>Senior roles test your understanding of abstract execution logic flow tricks.</p><h3>Why are default mutable arguments dangerous?</h3><p>When a function evaluates default parameters (like an empty array `x=[]`), that array is instantiated exactly ONCE in memory during module load natively. Every subsequent call points to that identical block of mutated memory.</p>"
            }
        )
        db.add(c10w1)

        c10w2 = BookWidget(
            chapter_id=ch10.id, position=2, widget_type="monaco_lab",
            payload={
                "language": "python",
                "height": "250px",
                "defaultCode": "# Why is this dangerous in production? Evaluate it!\ndef append_to_cache(item, cache=[]):\n    cache.append(item)\n    return cache\n\nprint(append_to_cache(1)) # Safe initially\nprint(append_to_cache(2)) # Notice how it carries the ghost of the past\nprint(append_to_cache(3)) # Pure Disaster\n\n# The Correct Enterprise Approach:\ndef safe_append(item, cache=None):\n    if cache is None:\n        cache = []\n    cache.append(item)\n    return cache\n"
            }
        )
        db.add(c10w2)
        
        c10w3 = BookWidget(
            chapter_id=ch10.id, position=3, widget_type="markdown",
            payload={
                "content": "<h3>The Try/Finally Override Edge Case</h3><p>Interviewers heavily query flow control manipulation tricks. If `try` returns a value, but `finally` also contains a `return` statement, Python's runtime guarantees `finally` possesses ultimate execution authority over standard returns.</p>"
            }
        )
        db.add(c10w3)

        c10w4 = BookWidget(
            chapter_id=ch10.id, position=4, widget_type="monaco_lab",
            payload={
                "language": "python",
                "height": "160px",
                "defaultCode": "def exception_state_test():\n    try:\n        return \"Critical Try Resolution\"\n    finally:\n        return \"Silent Finally Override\"\n\nprint(exception_state_test())\n"
            }
        )
        db.add(c10w4)

        db.commit()
        print(f"Successfully generated dynamic Book ID: {py_book.id} in Postgres!")
        print("The book is fully complete with the Comprehensive 10-Chapter Expert Reference!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding book: {e}")

if __name__ == "__main__":
    seed_python_cloud_engineering_book()
