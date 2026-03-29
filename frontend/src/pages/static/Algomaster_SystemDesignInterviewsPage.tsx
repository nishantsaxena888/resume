import { ArrowLeft, Server, Database, GitCommit, SplitSquareHorizontal, DatabaseZap, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Algomaster_SystemDesignInterviewsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 font-sans w-full pb-24 print:bg-white print:pb-0">
      
      {/* Header Area */}
      <div className="bg-indigo-900 border-b border-indigo-950 p-8 text-white print:bg-transparent print:text-black print:p-0 print:mb-8">
        <div className="max-w-5xl mx-auto w-full">
          <Link to="/static-notes/algomaster" className="print:hidden flex items-center gap-2 text-indigo-300 hover:text-white font-bold mb-6 transition-colors w-max">
            <ArrowLeft className="w-5 h-5" /> Back to Algomaster Curriculum
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="bg-indigo-800 p-3 rounded-xl print:hidden shadow-sm">
              <Server className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl print:text-3xl font-black tracking-tight leading-tight flex items-center gap-3">
                System Design Interviews <span className="bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full print:border print:border-black print:text-black print:bg-transparent tracking-widest uppercase">Synthesized</span>
              </h1>
              <p className="text-indigo-200 print:text-slate-600 mt-2 text-lg font-medium">
                The Master Syllabus: Estimations, Caching, Databases, Proxies, and Asynchrony
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto p-8 print:p-0 bg-white shadow-xl min-h-screen border-x border-slate-200">
        
        {/* SECTION 1: REQUIREMENTS & ESTIMATION */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             <Clock className="w-6 h-6 text-indigo-500" /> 1. Back-of-the-Envelope Estimation (Math)
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <p className="text-slate-700 font-medium leading-relaxed mb-4">
              Before sketching any boxes or lines, you must define the scale. The difference between <span className="font-bold underline">100 Daily Active Users (DAU)</span> and <span className="font-bold underline">100 Million DAU</span> completely shifts the architecture from a single Postgres SQL node to a massive, partitioned Cassandra NoSQL cluster with Distributed Redis caching.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`// The Holy Grail Estimation Constants 
// Memorize these for every System Design behavioral whiteboard

1 Byte (B)
1 Kilobyte (KB) = 1,000 B
1 Megabyte (MB) = 1,000 KB
1 Gigabyte (GB) = 1,000 MB
1 Terabyte (TB) = 1,000 GB
1 Petabyte (PB) = 1,000 TB

Time / Requests Computations:
1 Day = ~86,400 Seconds (Estimate at 100,000 seconds for easy math)

EXAMPLE: IF YOU HAVE 100 MILLION DAU (Daily Active Users)
- Assume each user makes 10 requests per day
- Total Requests = 1 Billion requests per day
- Queries Per Second (QPS) = 1 Billion / 100,000 seconds = ~10,000 QPS

Bandwidth Estimation:
- Assume each request payload is ~10 KB
- 10,000 QPS * 10 KB = 100,000 KB/second = ~100 MB/s network ingress

Storage Estimation (Over 5 Years):
- Assume 100M users write a 1MB photo daily
- Daily storage = 100,000,000 MB = 100 TB / day
- 1 Year = 100 TB * 365 = 36.5 PB (Petabytes)
- 5 Years = 182.5 PB 
=> RESULT: You CANNOT use a standard relational database for this storage scale. You must use an Object Store (Amazon S3) with a CDN.`}</code>
            </div>
          </div>
        </div>

        {/* SECTION 2: PROXY & LOAD BALANCING */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             <SplitSquareHorizontal className="w-6 h-6 text-indigo-500" /> 2. Load Balancing & API Gateways
          </h2>
          <div className="print:break-inside-avoid mb-8">
             <p className="text-slate-700 font-medium leading-relaxed mb-4">
              A single application server typically handles between <span className="font-bold underline">1,000 to 5,000 QPS</span> max (depending on workload compute). To scale horizontally to 100,000 QPS, you deploy many application servers and put a <strong>Load Balancer</strong> in front of them to distribute the traffic securely.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`LOAD BALANCING ALGORITHMS
1. Round Robin: Send request to Server 1, then Server 2, then Server 3... loops continuously.
   -> Flaw: Doesn't care if Server 1 is overloaded or dead.
   
2. Least Connections: Sends the request to the server with the fewest ACTIVE open connections.
   -> Perfect for WebSocket engines (Chat apps, multiplayer games) where connections are long-lived.
   
3. IP Hash (Sticky Sessions): Hashes the user's IP Address (e.g., hash(IP) % N) so the SAME user ALWAYS hits the SAME server.
   -> Use Case: Useful if that server has localized caching (in-memory) for that specific user's session data.
   -> Flaw: Can lead to hot-spotting (e.g. Justin Bieber logs in, his server gets a million requests, crashes).

L4 (Layer 4) Vs L7 (Layer 7) Routing:
- L4 Load Balancer (TCP/UDP level): Extremely fast, doesn't decrypt HTTPS payload. Routes purely based on IP and Port.
- L7 Load Balancer (HTTP/WebSocket level): Slower, but can read the inner HTTP request! E.g. If the user hits /api/video, route them to the Video Server Pool. If they hit /api/checkout, route them to the Billing Server Pool.

API GATEWAY: (Usually sits right behind or merged with the L7 LB)
- Terminates SSL/TLS certificates securely.
- Enforces Rate Limiting (Token Bucket Algorithm) to prevent DDoS.
- Acts as auth proxy (Validates the JWT token before passing to internal microservices).`}</code>
            </div>
          </div>
        </div>

        {/* SECTION 3: DATABASES */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             <Database className="w-6 h-6 text-indigo-500" /> 3. Databases & Partitioning
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <p className="text-slate-700 font-medium leading-relaxed mb-4">
              At interview scale, a single relational Database is often the <strong className="text-rose-600">Single Point of Failure (SPOF)</strong>. You must memorize when to use SQL vs NoSQL, and how to physically partition data across multiple machines using Consistent Hashing.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`SQL VS NOSQL

1. SQL / Relational (PostgreSQL, MySQL, Oracle)
- Perfect For: Highly structured data with strict relations (Billing, Financial ledgers, E-commerce transactions, Inventory tracking).
- Paradigm: ACID Properties (Atomicity, Consistency, Isolation, Durability)
- Fatal Flaw: Exceptionally difficult to scale horizontally (Sharding a SQL DB breaks foreign keys and JOIN operations). Therefore, it relies heavily on VERTICAL scaling (buying more powerful, expensive RAM/CPU servers).

2. NoSQL / Wide-Column or Document (Cassandra, DynamoDB, MongoDB)
- Perfect For: Massive scale, unstructured/semi-structured, extreme Write-heavy workloads (Logging, Telemetry, News feed generation, Chat messages).
- Paradigm: BASE Properties (Basically Available, Soft-state, Eventual Consistency). Follows the CAP Theorem (Usually sacrifices Consistency for Availability and Partition Tolerance).
- Superpower: Horizontally scales infinitely (add more commodity servers, data automatically partitions seamlessly).

DATABASE REPLICATION (Master-Slave / Primary-Replica)
- Architecture: 1 Primary Write Node, Multiple Read Replica Nodes.
- Why? 90% of web apps are completely Read-heavy. Funnel all Write operations to the Primary, and duplicate the data asynchronously to the Replicas. All Read requests go to the Replicas, entirely shedding the load from the Primary database.

SHARDING (Horizontal Partitioning)
- Splitting one giant 10TB table into 10 smaller 1TB databases spanning ten separate machines.
- Logical Sharding: E.g., Database 1 holds User IDs 0-1000. Database 2 holds 1001-2000.
- Consistent Hashing: The algorithm used to distribute data across the shard ring evenly, avoiding massive data movements when a server crashes or a new server is added.`}</code>
            </div>
          </div>
        </div>

        {/* SECTION 4: CACHING */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             <DatabaseZap className="w-6 h-6 text-indigo-500" /> 4. Caching Architectures
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <p className="text-slate-700 font-medium leading-relaxed mb-4">
              Caching (Redis, Memcached) stores extremely frequently accessed data directly in memory (RAM). Memory is fundamentally hundreds of times faster than spinning disk SSD Database lookups.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`CACHING STRATEGIES

1. Cache-Aside (Lazy Loading)  <-- THE MOST COMMON
- App checks Cache first. If hit, return data. If MISS, App queries the primary Database, returns data, AND secretly copies that data to the Cache for the next person.
- Tradeoff: The very first user to request new data always suffers a "cache miss" latency penalty. 

2. Write-Through Cache
- App writes NEW data directly to the Cache, and the Cache synchronously writes it to the Database. Both must succeed before responding to the user.
- Tradeoff: Slower writes (two operations). But ensures 100% data consistency.

3. Write-Behind (Write-Back) Cache
- App writes NEW data directly to the Cache. The Cache instantly replies "SUCCESS" to the user. Then, asynchronously in the backgound, the Cache eventually flushes the data to the hard Database.
- Perfect For: Extreme high-throughput writes (Like counts, Video View counters). 
- Fatal Flaw: If the Cache server crashes before it flushes, that data is permanently lost.

THUNDERING HERD PROBLEM
- Scenario: Imagine Taylor Swift tweets. Millions of fans request the Tweet simultaneously. The Cache expires at that exact microsecond (Cache Miss). 
- Result: 10 million concurrent requests immediately bypass the Cache and slam the Database instantly. The Database completely dies.
- Solution 1 (Leases): The Cache gives a "lease" ticket to the FIRST request to go query the DB. All other 9,999,999 requests are forced to wait for 10ms until the first request populates the Cache.
- Solution 2 (Jitter): Instead of having caches expire at exactly 12:00:00 (TTL), add random jitter so they expire staggered (12:00:01, 12:00:04) preventing simultaneous massive expiration storms.`}</code>
            </div>
          </div>
        </div>

        {/* SECTION 5: MESSAGING & PUB/SUB */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
             <GitCommit className="w-6 h-6 text-indigo-500" /> 5. Messaging Queues & Asynchrony
          </h2>
          <div className="print:break-inside-avoid mb-8">
            <p className="text-slate-700 font-medium leading-relaxed mb-4">
              Synchronous API calls block client threads. If a user uploads a video, you cannot force their browser to wait 30 minutes for the video to transcode. You must ingest the request to a Queue and process it Asynchronously.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`MESSAGE BROKERS (Kafka, RabbitMQ, SQS)

1. The Point-to-Point Queue (RabbitMQ / AWS SQS)
- A Producer pushes a message onto the Queue ("Transcode this video!").
- Multiple Consumer Worker Servers pull off the Queue. 
- Once Worker A successfully finishes transcoding the video, it sends an Acknowledgement (ACK) to the Queue, and the message is DELETED forever. Worker B will never see it.
- Excellent for task distribution and load leveling.

2. Pub/Sub Streaming (Apache Kafka)
- A Producer publishes a stream of events into a "Topic" (e.g., "User_Clicks_Log").
- In Kafka, messages are NOT deleted when read. It acts as an immutable, sequential append-only log on disk.
- Thousands of entirely different Consumer Groups (The Analytics Team, the Fraud Detection Team, the Recommendation ML Team) can ALL read the exact same message independently, at their own pacing speed.
- It requires the Consumer to track their own "Offset" (what line of the log they are currently reading).

IDEMPOTENCY IN DISTRIBUTED QUEUES
- The "Two Generals Problem" dictates that network unreliability will inevitably cause a Consumer to read a message, process it, but the network crashes before they can send the "ACK" reply. The Queue assumes failure and re-delivers the exact same message to someone else!
- Result: You charged the customer's credit card twice.
- Fix: Every message MUST contain a unique "Idempotency Key" (Transaction ID). The Consumer must hit a fast Cache Database (Redis) to say "Have I seen Transaction ID 99912 before? Yes? Then silently drop it."`}</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
