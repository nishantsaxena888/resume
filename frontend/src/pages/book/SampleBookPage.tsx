import { BookViewer } from '../../components/book/BookViewer';
import { MonacoWidget } from '../../components/book/widgets/MonacoWidget';
import { TopologyWidget } from '../../components/book/widgets/TopologyWidget';

export default function SampleBookPage() {
  const sidebar = [
    { id: '1', title: '1. The Python Global Interpreter Lock', active: false },
    { id: '2', title: '2. FastAPI & Async Architectures', active: false },
    { id: '3', title: '3. Interactive AWS Provisioning', active: true },
    { id: '4', title: '4. Mongo Aggregation Pipelines', active: false },
  ];

  const pyCode = `import boto3
import asyncio

# The Book provides live executable sandboxes
async def trigger_async_provisioning():
    print("Initiating cross-region VPC deployment...")
    await asyncio.sleep(1)
    
    # We can connect this editor directly to FastAPI later
    ec2 = boto3.client('ec2', region_name='us-east-1')
    print("Deployment triggered successfully.")

asyncio.run(trigger_async_provisioning())
`;

  // Sample React Flow AWS diagram data
  const archNodes = [
    { id: 'api', type: 'awsNode', position: { x: 0, y: 150 }, data: { label: 'API Gateway', type: 'REST Endpoint', color: 'purple' } },
    { id: 'lambda', type: 'awsNode', position: { x: 250, y: 150 }, data: { label: 'FastAPI Backend', type: 'AWS Lambda (Python)', color: 'orange' } },
    { id: 'mongo', type: 'awsNode', position: { x: 500, y: 50 }, data: { label: 'User Data', type: 'MongoDB Atlas', color: 'emerald' } },
    { id: 's3', type: 'awsNode', position: { x: 500, y: 250 }, data: { label: 'Document Storage', type: 'AWS S3 Bucket', color: 'red' } },
  ];

  const archEdges = [
    { id: 'e1', source: 'api', target: 'lambda' },
    { id: 'e2', source: 'lambda', target: 'mongo' },
    { id: 'e3', source: 'lambda', target: 's3' },
  ];

  return (
    <BookViewer 
      title="O'Reilly: Python Cloud Engineering"
      chapterNumber={3}
      chapterTitle="Interactive AWS Provisioning"
      sidebarModules={sidebar}
    >
      <p>
        In modern cloud engineering, reading static text about infrastructure is insufficient. 
        As an Architect, you define infrastructure as code (Terraform) and deploy it via serverless runners (Python/Boto3).
      </p>

      <h2>The Target Architecture</h2>
      <p>
        Before we write any code, interact with the architectural diagram below to understand the flow. 
        <strong>Try dragging the nodes around.</strong> Notice how the AWS API Gateway routes directly into our Python Lambda execution environment.
      </p>
      <TopologyWidget 
        initialNodes={archNodes} 
        initialEdges={archEdges} 
        height="400px" 
        editable={true} 
      />

      <h2>Executing the Deployment</h2>
      <p>
        Now that we understand the topology mapped out above, we can write the Python controller sequence to trigger the async deployment. 
        Use the <strong>Monaco Editor</strong> sandbox below. This is the exact identical editor engine that powers Visual Studio Code, running natively in your browser.
      </p>

      <MonacoWidget 
        language="python" 
        defaultCode={pyCode} 
        height="280px"
        readOnly={false}
      />

      <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-xl mt-8">
        <h3 className="text-emerald-400 mt-0">Instructor Notes</h3>
        <p className="text-emerald-100/70 text-sm m-0">
          In Phase 2 of this rollout, we will connect the Monaco Box directly to your FastAPI backend. 
          When a student clicks "Run", the Python engine will safely execute their code securely inside a Docker sandbox and return the live terminal output natively!
        </p>
      </div>
    </BookViewer>
  );
}
