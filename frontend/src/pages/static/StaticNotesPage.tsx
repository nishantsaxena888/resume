import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Layers } from 'lucide-react';

export default function StaticNotesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-sm pb-24">
      
      {/* Non-Printable Navigation Bar */}
      <div className="w-full bg-white border-b border-slate-300 p-4 flex items-center justify-between sticky top-0 z-50 print:hidden shadow-sm">
        <button 
          onClick={() => navigate('/static-notes')}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors text-sm font-bold border border-slate-300 bg-slate-50 px-4 py-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </button>
        <div className="flex items-center gap-6">
          <span className="text-slate-600 font-bold border-r border-slate-300 pr-6 tracking-wide">Enterprise EKS/Lambda Masterclass</span>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white transition-colors text-sm font-bold px-6 py-2 rounded-lg shadow-md"
          >
            <Download className="w-4 h-4" />
            Print PDF (Native B&W)
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="max-w-5xl w-full mx-auto p-8 print:px-0 print:py-4 mt-8 print:mt-0">
        
        {/* Document Header */}
        <div className="mb-8 print:mb-4 border-b-4 print:border-b-2 border-slate-900 pb-4 print:pb-2">
          <div className="flex items-center gap-3 print:gap-2">
            <Layers className="w-8 h-8 print:w-6 print:h-6 text-slate-900" />
            <h1 className="text-3xl print:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Zero-to-Hero: EKS, Terraform & Lambda
            </h1>
          </div>
        </div>

        {/* Module 1: Terraform IaC */}
        <div className="mb-12 print:mb-8 print:break-inside-avoid print:break-after-page">
          <h2 className="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-300 flex items-center gap-3">
            <span className="text-slate-400 font-mono text-xl">01</span> 
            Terraform Infrastructure as Code (IaC)
          </h2>
          
          <div className="prose prose-slate max-w-none text-[17px] leading-8 text-slate-800 [&>p]:mb-5 [&_ul]:mb-6 [&_li]:mb-2">
            <p><strong>Terraform</strong> is an infrastructure-as-code automation tool. Unlike older imperative tools (like Bash or Ansible), Terraform is <em>declarative</em>. You write the exact end-state you desire (e.g., "I want a VPC with 3 private subnets"), and Terraform's Graph Engine calculates the precise AWS API calls required to achieve it without you writing the execution steps.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Core Concepts & Best Practices</h3>
            <ul className="list-disc pl-6 marker:text-slate-900 font-medium">
              <li><strong>State File (`terraform.tfstate`):</strong> The heart of Terraform. It safely maps your source code to real-world deployed AWS resources. For enterprise teams, the state file <em>must</em> be stored remotely (AWS S3) and locked via DynamoDB to prevent concurrent pipeline overwrites.</li>
              <li><strong>Modules:</strong> Reusable blocks of Terraform configurations that can be instantiated multiple times. Think of them as infrastructure functions.</li>
              <li><strong>Execution Graph:</strong> Run <code className="bg-slate-100 border border-slate-300 text-slate-900 px-2 py-0.5 rounded text-sm">terraform plan</code> first to see exactly what will execute before <code className="bg-slate-100 border border-slate-300 text-slate-900 px-2 py-0.5 rounded text-sm">terraform apply</code> mutates production.</li>
            </ul>
          </div>
        </div>

        {/* Module 2: Amazon EKS */}
        <div className="mb-12 print:mb-8 print:break-inside-avoid print:break-after-page">
          <h2 className="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-300 flex items-center gap-3">
            <span className="text-slate-400 font-mono text-xl">02</span> 
            Amazon Elastic Kubernetes Service (EKS)
          </h2>
          
          <div className="prose prose-slate max-w-none text-[17px] leading-8 text-slate-800 [&>p]:mb-5 [&_ul]:mb-6 [&_li]:mb-2">
            <p><strong>Amazon EKS</strong> is highly-managed Kubernetes. In EKS, AWS fully obscures and manages the Kubernetes "Control Plane" (the master nodes, API Server, etcd state database). Your only responsibility is securing and scaling the "Data Plane" (the EC2 Worker Nodes executing your Docker containers).</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Mastering Autoscaling in EKS</h3>
            <p className="font-medium">Scaling in Kubernetes happens across two independent dimensions: The Pod level, and the physical Hardware level.</p>
            <ul className="list-disc pl-6 marker:text-slate-900 font-medium">
              <li><strong>Horizontal Pod Autoscaler (HPA):</strong> Analyzes container CPU/Memory. When usage spikes &gt;70%, it duplicates your FastAPI/Node.js application pods.</li>
              <li><strong>Karpenter (Next-Gen Scaling):</strong> When HPA asks for 100 new pods, you will run out of physical server capacity. Instead of legacy Auto Scaling Groups (CA), use <strong>Karpenter</strong>. It calculates the exact CPU/RAM required, bypasses ASGs, and directly provisions matching Spot/On-Demand EC2 instances just-in-time natively via EC2 Fleet APIs.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">EKS Security: IAM Roles for Service Accounts (IRSA)</h3>
            <p><strong>Crucial Concept:</strong> You never assign an AWS IAM Role to an entire EC2 Worker Node. If you do, <em>every</em> pod on that node inherits those permissions (violating Least Privilege). Instead, establish an OIDC Identity Provider on the EKS cluster, and bind specific AWS IAM Roles directly to individual Kubernetes <code className="bg-slate-100 border border-slate-300 text-slate-900 px-2 py-0.5 rounded text-sm">ServiceAccounts</code>. This ensures your Python OCR pod can read S3, but your Node.js pod cannot.</p>
          </div>
        </div>

        {/* Module 3: AWS Lambda & Ecosystem */}
        <div className="mb-12 print:mb-8 print:break-inside-avoid print:break-after-page">
          <h2 className="text-2xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-300 flex items-center gap-3">
            <span className="text-slate-400 font-mono text-xl">03</span> 
            Decoupling with AWS Lambda & Step Functions
          </h2>
          
          <div className="prose prose-slate max-w-none text-[17px] leading-8 text-slate-800 [&>p]:mb-5 [&_ul]:mb-6 [&_li]:mb-2">
            <p><strong>AWS Lambda</strong> is the ultimate manifestation of serverless compute. It scales from zero to 10,000 parallel executions in seconds with absolutely zero container orchestration overhead required. However, Lambda functions are fundamentally <em>stateless</em> and strictly limited to a 15-minute maximum runtime execution timeout.</p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Orchestration vs Choreography</h3>
            <p>Microservices often require complex, multi-step transaction lifecycles (e.g., Extract &rarr; Validate &rarr; Sync &rarr; Notify). Managing state sequentially across dozens of Lambdas is an anti-pattern. The solution is <strong>AWS Step Functions</strong>—a visual state machine that governs exact execution flow, handling complex retry logic, error-catching, and parallel branching seamlessly outside of the code block.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Event-Driven Summary Pipeline</h3>
            <p>If you need an API, wrap Lambda tightly behind an <strong>AWS API Gateway</strong>. If you are handling millions of async events, utilize <strong>Amazon SQS</strong> (Queues) or <strong>MSK/Kafka</strong> (Message Streaming) to fan-out events to your Lambda consumers.</p>
          </div>
        </div>

        {/* --- APPENDIX: GROUND-UP THEORY --- */}
        <div className="mb-8 print:mb-4 border-b-4 print:border-b-2 border-slate-900 pb-4 print:pb-2 print:break-after-page mt-12 print:mt-0">
          <div className="flex items-center gap-3 print:gap-2">
            <h1 className="text-3xl print:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Appendix: EKS & Kubernetes From Scratch
            </h1>
          </div>
        </div>

        <div className="mb-12 print:mb-6 print:break-inside-avoid print:break-after-page">
          <h2 className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            A. Containers & Docker 101
          </h2>
          <p className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Before Kubernetes, you must understand Docker. A <strong>Container</strong> is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, system libraries and settings. It guarantees that software will always run the exact same way, regardless of the environment (laptop vs production).
          </p>
        </div>

        <div className="mb-12 print:mb-6 print:break-inside-avoid print:break-after-page">
          <h2 className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            B. What is Kubernetes (K8s)?
          </h2>
          <p className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            If you have 1 Docker container, you can run it on your MacBook. If you have 5,000 Docker containers running banking software across 100 EC2 instances, you need a highly intelligent orchestrator to manage them, restart them if they crash, and network them together. <strong>That is Kubernetes.</strong>
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-2">
            <li><strong>Pod:</strong> The smallest deployable unit. Usually contains 1 Docker container.</li>
            <li><strong>Deployment:</strong> Defines how many replicas of a Pod should be running. If one dies, it instantly spawns a new one.</li>
            <li><strong>Service:</strong> The networking layer. Gives a permanent, static internal IP address to a shifting, dynamic group of Pods.</li>
          </ul>
        </div>

        <div className="mb-12 print:mb-6 print:break-inside-avoid">
          <h2 className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            C. Control Plane vs Data Plane
          </h2>
          <p className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            A Kubernetes cluster is fundamentally split into two halves:
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3">
            <li><strong>Control Plane (The Brain):</strong> Contains the API Server, Scheduler, and etcd (the state database). It makes all the scheduling decisions. In Amazon EKS, AWS completely hides and manages this for you. You never see these servers.</li>
            <li><strong>Data Plane (The Muscle):</strong> The actual EC2 Worker Nodes where your Pods/Containers consume RAM and CPU. This is the only part of the architecture that you are responsible for scaling and securing.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
