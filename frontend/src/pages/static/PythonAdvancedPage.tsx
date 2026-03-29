import { Code, Terminal, Server, Zap, HardDrive, Cpu, ArrowRight, Database, Coffee } from 'lucide-react';

export default function PythonAdvancedPage() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans print:bg-white print:m-0 print:p-0">
      <div className="max-w-5xl w-full mx-auto p-8 print:px-0 print:py-4 bg-white shadow-xl print:shadow-none min-h-screen relative border border-slate-200 print:border-none">
        
        {/* DECORATIVE HEADER */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-5 rounded-bl-[100px] pointer-events-none print:hidden" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 opacity-5 rounded-full pointer-events-none print:hidden blur-2xl" />

        {/* --- HEADER TITLE --- */}
        <div className="mb-12 print:mb-8 border-b-4 border-slate-900 pb-8 print:pb-4 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 print:w-12 print:h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 print:rotate-0">
              <Code className="w-10 h-10 print:w-8 print:h-8 text-yellow-400" />
            </div>
            <div>
              <h1 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-5xl print:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Python: Advanced Architecture
              </h1>
              <p className="text-xl print:text-lg font-bold text-slate-500 mt-2">
                FastAPI, Boto3, Memory Engineering, and Asynchronous Microservices
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 print:gap-1">
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">FastAPI</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Asyncio</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Pandas Data Engineering</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">Boto3 AWS Integration</span>
            <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-md text-sm border border-slate-300">GIL Mechanics</span>
          </div>
        </div>

        {/* --- SECTION 1: SYSTEM INTERNALS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
            <Cpu className="w-6 h-6 text-indigo-600" /> 1. Python Architecture & The GIL
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Python (specifically CPython) is interpreted, extremely dynamic, and memory-safe. However, it is fundamentally constrained by the <strong>Global Interpreter Lock (GIL)</strong>, which prevents multiple native threads from executing Python bytecodes at once.
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3 mb-6">
            <li><strong>The GIL Problem:</strong> Multi-threading in Python does NOT give you true parallel processing for CPU-bound tasks (like heavy math or parsing). The GIL forces threads to take turns.</li>
            <li><strong>The Solution:</strong> For heavy lifting (like transforming 5GB CSVs), you must use <code>multiprocessing</code>, which bypasses the GIL by spawning entirely separate Python processes with their own memory spaces.</li>
            <li><strong>Garbage Collection:</strong> Python frees memory primarily through Reference Counting. When an object's reference count drops to zero, memory is instantly reclaimed.</li>
          </ul>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Multiprocessing for CPU-Bound Tasks</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              If you build a Reconciliation Engine that compares 500,000 policy records, ordinary loops will crawl. Multiprocessing unleashes all cores on your server.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import multiprocessing
import time

def process_heavy_chunk(data_chunk):
    # Simulating massive CPU-bound data parsing
    result = sum(x*x for x in data_chunk)
    return result

if __name__ == '__main__':
    massive_dataset = [range(1000000) for _ in range(8)]
    
    start = time.time()
    
    # Bypasses the GIL perfectly by allocating tasks to all 8 CPU Cores
    with multiprocessing.Pool(processes=multiprocessing.cpu_count()) as pool:
        results = pool.map(process_heavy_chunk, massive_dataset)
        
    print(f"Computed massive workload in {time.time() - start} seconds")`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: ASYNCHRONOUS MICROSERVICES --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-500" /> 2. Asynchronous I/O (FastAPI Paradigm)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            While Multi-processing solves CPU bottlenecks, <strong>Asyncio</strong> solves I/O bottlenecks (waiting on databases, APIs, or S3). FastAPI revolutionized Python backend engineering by embedding the async event-loop natively.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">The Blocking vs Non-Blocking Trap</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              Never use synchronous tools (like the standard <code>requests</code> library or <code>time.sleep</code>) inside a modern <code>async def</code> FastAPI route. It will freeze the entire server.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import asyncio
from fastapi import FastAPI
import httpx # Async HTTP client

app = FastAPI(title="Broker Portal Modernization")

@app.get("/api/v1/policies/{policy_id}")
async def fetch_policy_data(policy_id: str):
    # NEVER USE: requests.get() here! It halts the entire Event Loop.
    # USE: httpx.AsyncClient() paired with the 'await' keyword.
    
    async with httpx.AsyncClient() as client:
        # Puts the thread to sleep, allows the server to handle 10,000 other 
        # API requests while we wait for the Novasys Database to respond!
        response = await client.get(f"https://novasys.internal/db/{policy_id}")
        
        return response.json()`}</code>
            </div>
          </div>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Pydantic Schema Validation</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              FastAPI uses Pydantic to strictly serialize and validate JSON payloads. If a frontend sends malformed data, Pydantic kills the request with a strict 422 Error before it ever touches your Python logic.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`from pydantic import BaseModel, Field
from typing import Optional

class PolicyUpdatePayload(BaseModel):
    policy_id: str = Field(..., min_length=5, description="Exact policy UUID")
    premium_amount: float = Field(..., gt=0.0, description="Cannot be negative")
    is_active: bool = True
    aptc_credit: Optional[float] = 0.0

@app.put("/api/v1/policies")
async def update_policy(payload: PolicyUpdatePayload):
    # Guaranteed safe execution. 'payload.premium_amount' is legally a float.
    responsibility = payload.premium_amount - payload.aptc_credit
    return {"status": "Updated", "new_responsibility": responsibility}`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: RECONCILIATION & DATA ENGINEERING --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
            <HardDrive className="w-6 h-6 text-rose-500" /> 3. High-Scale Data Engineering (Pandas)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            When building engines that reconcile legacy Salesforce databases against modern PostgreSQL warehouses, you use <strong>Pandas</strong>. It converts Python objects into contiguous C-Arrays in memory (Vectors), executing multi-million row SQL-like operations in milliseconds.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Memory-Safe CSV Chunking</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              A naive developer throws a 10GB CSV into Pandas and crashes the server via Memory OOM (Out of Memory) kills. An Architect uses "Chunks" to cleanly stream the file across the RAM layer.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import pandas as pd

def safe_database_reconciliation(file_path):
    mismatched_policies = []
    
    # Read absolutely massive files 50,000 rows at a time
    chunk_iterator = pd.read_csv(file_path, chunksize=50000)
    
    for chunk in chunk_iterator:
        # C-Level Vectorized math occurs here (Extremely fast)
        chunk['Discrepancy'] = chunk['Salesforce_Premium'] - chunk['Novasys_Premium']
        
        # Filter for rows where Discrepancy mathematically exists (Not equal to 0)
        errors = chunk[chunk['Discrepancy'] != 0.0]
        mismatched_policies.append(errors)
        
    # Reassemble only the failed records for the UI Dashboard
    final_report = pd.concat(mismatched_policies)
    return final_report.to_json(orient="records")`}</code>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: AWS INTEGRATION --- */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
            <Database className="w-6 h-6 text-orange-500" /> 4. AWS Integration (Boto3 SDK)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            <strong>Boto3</strong> is the official AWS SDK for Python. Whether you are running inside a Lambda, an EKS Pod, or simply testing locally, Boto3 dynamically negotiates your IAM Role automatically and executes infrastructural state changes via native REST API calls to the AWS boundary.
          </p>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Resource vs Client Interfaces</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              Boto3 has two interfaces. <code>Client</code> is a strict, low-level mapping of the AWS JSON API. <code>Resource</code> is a high-level Object-Oriented wrapper favored by Python developers.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import boto3
from boto3.dynamodb.conditions import Key

# LOW-LEVEL CLIENT (Always available, but verbose)
s3_client = boto3.client('s3')

# Extremely verbose Pagination required for standard Client
response = s3_client.list_objects_v2(Bucket='enterprise-secure-docs')
for obj in response.get('Contents', []):
    print(obj['Key'])

# HIGH-LEVEL RESOURCE (Pythonic and implicitly pages data)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PolicyReconciliationTable')

# Object Oriented Data Fetching
items = table.query(
    KeyConditionExpression=Key('PolicyID').eq('U98004266')
)
print(items['Items'])`}</code>
            </div>
          </div>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Generating Presigned Upload URLs</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              Never let users upload PDFs directly through your Python web server (it creates severe memory/bandwidth bottlenecks). Instead, use Boto3 to generate a Cryptographic "Presigned URL", allowing the user's React frontend to upload securely <em>directly into the S3 Bucket</em>.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import boto3

def get_direct_upload_ticket(user_id, filename):
    s3_client = boto3.client('s3')
    
    # Python securely asks AWS for a cryptographic 15-minute token
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
    
    # We return this map to the React frontend. The frontend performs an
    # HTTP POST using these exact fields, bypassing our Python server completely.
    return presigned_post`}</code>
            </div>
          </div>
        </div>

        {/* --- APPENDIX: EVENT-DRIVEN DOTS --- */}
        <div className="mb-12 print:mb-6 print:break-after-page mt-12 print:mt-12 border-t-[4px] border-slate-900 pt-12">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-3xl print:text-xl font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            Appendix: Event-Driven Python Workflow
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-8 print:mb-4">
            This encapsulates an entire professional queueing architecture. A web application accepts an HTTP payload, rapidly deposits it into a Dead-Letter protected SQS Queue, and a background worker function natively polls and processes the data without blocking the UI.
          </p>
          
          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. The Asynchronous SQS Submitter</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              Your FastAPI web server instantly validates the payload, pushes a JSON message to Amazon SQS, and terminates the HTTP connection in single-digit milliseconds. 
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import json
import boto3
from fastapi import FastAPI, BackgroundTasks

app = FastAPI()
sqs = boto3.client('sqs')
QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/123/broker-migration.fifo"

@app.post("/api/v1/trigger-migration")
async def trigger_heavy_migration(policy_id: str):
    
    # Constructing a strictly defined Event message
    event_payload = {
        "action": "EXECUTE_MIGRATION",
        "target_policy": policy_id,
        "metadata": {"source": "BrokerUI"}
    }
    
    # Dispatch to SQS Queue. Must include MessageGroupId for FIFO ordered execution
    sqs.send_message(
        QueueUrl=QUEUE_URL,
        MessageBody=json.dumps(event_payload),
        MessageGroupId="MIGRATION_GROUP" 
    )
    
    # Browser doesn't hang. HTTP 202 instantly acknowledges receipt.
    return {"status": "Accepted", "message": "Migration Queued Successfully"}`}</code>
            </div>
          </div>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. The Lambda SQS Consumer</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              An isolated Lambda Function aggressively polls the Queue. If an unhandled exception violently crashes the Python script during processing, AWS catches the error and enforces the SQS Visibility Timeout protocol.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import json

def sqs_worker_handler(event, context):
    # AWS Lambda receives up to 10 batched SQS messages simultaneously
    for record in event['Records']:
        
        # Parse the raw String payload sent by FastAPI
        body = json.loads(record['body'])
        policy_id = body.get("target_policy")
        
        try:
            print(f"Executing Deep Database Migration for Policy {policy_id}")
            # ... perform massive data engineering sync here ...
            
        except Exception as e:
            print(f"FATAL ERROR on Policy {policy_id}: {str(e)}")
            # By explicitly raising the exception here, we tell AWS that SQS 
            # failed. AWS will NOT delete the message, and will wait 
            # for the Visibility-Timeout to expire before trying again.
            raise Exception("Migration Worker Failed")`}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
