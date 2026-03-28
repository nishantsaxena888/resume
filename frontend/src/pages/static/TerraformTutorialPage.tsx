import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Database, Network, ShieldCheck, FolderTree, Cpu, History, Cloud, Globe, Box, Server, Zap, HardDrive, ArrowRight } from 'lucide-react';

export default function TerraformTutorialPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-sm pb-24">

      {/* Non-Printable Header */}
      <div className="w-full bg-white border-b border-slate-300 p-4 flex items-center justify-between sticky top-0 z-50 print:hidden shadow-sm">
        <button onClick={() => navigate('/static-notes')} className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-bold px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </button>
        <div className="flex items-center gap-6">
          <span className="text-slate-600 font-bold border-r border-slate-300 pr-6 tracking-wide">Enterprise Terraform Masterclass</span>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-lg shadow-md transition-colors">
            <Download className="w-4 h-4" /> Print PDF (Native B&W)
          </button>
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto p-8 print:px-0 print:py-4 mt-8 print:mt-0">

        {/* Document Header */}
        <div className="mb-8 print:mb-4 border-b-4 print:border-b-2 border-slate-900 pb-4 print:pb-2">
          <div className="flex items-center gap-3 print:gap-2">
            <Database className="w-8 h-8 print:w-6 print:h-6 text-slate-900" />
            <h1 className="text-3xl print:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Enterprise Terraform Architecture
            </h1>
          </div>
        </div>

        {/* Phase 1 */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
            <FolderTree className="w-6 h-6 print:w-5 print:h-5" /> Phase 1: Multi-Environment Repository Layout
          </h2>
          <p className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4 print:mb-2">
            Never hardcode <code>prod</code> values into the root module. You construct <strong>one reusable application module</strong> and pass distinct variable definitions per environment.
          </p>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`infrastructure/
├── modules/
│   └── eks-cluster/          # Reusable module
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
│
├── environments/
│   ├── dev/
│   │   ├── main.tf           # Calls ../../modules/eks-cluster
│   │   └── terraform.tfvars  # var.environment = "dev"
│   │
│   └── prod/
│       ├── main.tf           # IDENTICAL structure to dev/main.tf
│       └── terraform.tfvars  # var.environment = "prod"
│
└── .github/
    └── workflows/
        └── deploy.yml        # CI/CD pipeline`}</code>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 print:w-5 print:h-5" /> Phase 2: Immutable State & DynamoDB Locking
          </h2>
          <p className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4 print:mb-2">
            <strong>The Solution:</strong> You must configure strong S3 backend locking via <strong>DynamoDB</strong> to prevent pipeline race conditions destroying the infrastructure state.
          </p>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`# environments/prod/backend.tf
terraform {
  required_version = ">= 1.5.0"
  
  backend "s3" {
    bucket         = "tf-state-production"
    key            = "core/prod.tfstate"
    region         = "us-east-1"
    encrypt        = true
    
    # CRITICAL: Strict locking prevents race conditions
    dynamodb_table = "terraform-state-lock" 
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}`}</code>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
            <Network className="w-6 h-6 print:w-5 print:h-5" /> Phase 3: Multi-AZ Network Topology
          </h2>
          <p className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4 print:mb-2">
            Avoid raw <code>aws_vpc</code> resources. Utilize the official HashiCorp <code>terraform-aws-modules/vpc</code> registry to cleanly orchestrate complex topologies, NAT Gateways, and automatic Kubernetes subnet tagging.
          </p>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`# modules/vpc/main.tf
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.5.0"

  name = "production-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = false 
  one_nat_gateway_per_az = true # Removes Single Point of Failure

  # Mandatory EKS Load Balancer tags
  public_subnet_tags  = { "kubernetes.io/role/elb" = "1" }
  private_subnet_tags = { "kubernetes.io/role/internal-elb" = "1" }
}`}</code>
          </div>
        </div>

        {/* Phase 4 */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
            <Cpu className="w-6 h-6 print:w-5 print:h-5" /> Phase 4: EKS & Least-Privilege OIDC
          </h2>
          <p className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4 print:mb-2">
            To enforce Least Privilege in Kubernetes, you bootstrap the EKS cluster with an <strong>OIDC Identity Provider</strong>, mapping IAM Roles exclusively to Kubernetes Service Accounts (IRSA).
          </p>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`# modules/eks-cluster/main.tf
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "prod-cluster"
  cluster_version = "1.28"
  vpc_id          = var.vpc_id
  subnet_ids      = var.private_subnet_ids

  # Enable OpenID Connect (OIDC) - VITAL FOR SECURE PODS
  enable_irsa = true

  # Managed Node Groups targeting Spot capacity
  eks_managed_node_groups = {
    compute_nodes = {
      min_size       = 5
      desired_size   = 10
      instance_types = ["c5.2xlarge"]
      capacity_type  = "SPOT"
    }
  }
}

# Bind Native IAM Role to K8s ServiceAccount via OIDC
module "iam_role_for_service_accounts" {
  source    = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  role_name = "FastAPI-Pod-S3-Role"

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["production:fastapi-service-account"]
    }
  }
}`}</code>
          </div>
        </div>

        {/* Phase 5 */}
        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300 flex items-center gap-3">
            <History className="w-6 h-6 print:w-5 print:h-5" /> Phase 5: GitHub Actions CI/CD Protocol
          </h2>
          <p className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4 print:mb-2">
            Pipelines securely authenticate avoiding hardcoded secrets by leveraging OIDC Federation. Pull Requests trigger <code>terraform plan</code>, main branch merges trigger <code>terraform apply</code>.
          </p>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`# .github/workflows/deploy.yml
name: "Terraform Production Deployment"

on: { push: { branches: ["main"] }, pull_request: {} }

permissions:
  id-token: write   # Requires writing OIDC tokens to AWS
  contents: read

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS Credentials natively via OIDC
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::1234567890:role/GitHub-Actions-Terraform-Role
          aws-region: us-east-1

      - run: terraform init
      
      - run: terraform plan -no-color
        if: github.event_name == 'pull_request'

      - run: terraform apply -auto-approve
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'`}</code>
          </div>
        </div>

        {/* --- APPENDIX: GROUND-UP THEORY --- */}
        <div className="mb-8 print:mb-4 border-b-4 print:border-b-2 border-slate-900 pb-4 print:pb-2 print:break-before-page mt-12 print:mt-0">
          <div className="flex items-center gap-3 print:gap-2">
            <h1 className="text-3xl print:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Appendix: Terraform From Scratch
            </h1>
          </div>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            A. What is Infrastructure as Code (IaC)?
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Before Terraform, engineers manually clicked through the AWS console to create servers. This was slow, unrepeatable, and prone to human error. <strong>IaC</strong> means writing code that defines your infrastructure. Terraform reads this code and makes the API calls to AWS for you.
            <br /><br />
            <strong>Declarative vs Imperative:</strong> Bash scripts are imperative ("Do X, then do Y"). Terraform is declarative ("Make sure 3 servers exist"). If 2 already exist, Terraform only creates the 1 missing server.
          </p>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            B. Providers, Resources, and Data Sources
          </h2>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 mb-4 space-y-2">
            <li><strong>Provider:</strong> The plugin that talks to the Cloud (e.g., AWS, GCP, Azure).</li>
            <li><strong>Resource:</strong> A physical thing you are creating (e.g., an EC2 instance, a VPC).</li>
            <li><strong>Data Source:</strong> A read-only query to fetch existing data from the Cloud (e.g., "Find the latest Ubuntu AMI ID").</li>
          </ul>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`# 1. Provider
provider "aws" { region = "us-east-1" }

# 2. Data Source (Read Only Query)
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
}

# 3. Resource (Creation)
resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
}`}</code>
          </div>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            C. The Core Command Lifecycle
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            You will use these 4 commands every single day:
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3">
            <li><code className="bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-slate-900">terraform init</code>: Downloads the AWS provider plugins defined in your code. Run this first.</li>
            <li><code className="bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-slate-900">terraform plan</code>: The "Dry Run". Shows you exactly what it will build, change, or destroy without actually doing it.</li>
            <li><code className="bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-slate-900">terraform apply</code>: Executes the plan and mutates the physical cloud infrastructure.</li>
            <li><code className="bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-slate-900">terraform destroy</code>: Nukes everything defined in the state file.</li>
          </ul>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            D. Amazon VPC Deep Dive (Networking from scratch)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            A <strong>VPC (Virtual Private Cloud)</strong> is your private, isolated slice of AWS. Understanding its components is the absolute foundation of cloud architecture:
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3 mb-4">
            <li><strong>Subnets:</strong> Segmenting the VPC. <em>Public Subnets</em> can route to the open internet. <em>Private Subnets</em> cannot. Servers with sensitive data (Databases, EKS Nodes) must ALWAYS live in Private subnets.</li>
            <li><strong>Internet Gateway (IGW):</strong> The door attached to the VPC that allows Public Subnets to connect to the outside world.</li>
            <li><strong>NAT Gateway:</strong> Allows instances in Private Subnets to download patches from the internet (outbound) WITHOUT allowing the internet to connect to them (inbound).</li>
          </ul>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`# Raw VPC Creation Example (Not using modules)
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true # This makes it "Public"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}`}</code>
          </div>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            E. Amazon S3 (Simple Storage Service)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            <strong>S3</strong> is object storage (not block storage like a hard drive). You store files (objects) into folders (Buckets). It is infinitely scalable, extremely cheap, and serverless.
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3 mb-4">
            <li><strong>Versioning:</strong> Keeps every version of a file. If someone overwrites or deletes a file, you can restore the old version instantly.</li>
            <li><strong>Block Public Access:</strong> At an enterprise level, you <em>must</em> block public access on 99% of buckets to prevent catastrophic data leaks.</li>
          </ul>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`resource "aws_s3_bucket" "secure_docs" {
  bucket = "company-secure-documents-2026"
}

# 1. Enable Versioning
resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.secure_docs.id
  versioning_configuration { status = "Enabled" }
}

# 2. Block all public access (Enterprise Standard)
resource "aws_s3_bucket_public_access_block" "block" {
  bucket                  = aws_s3_bucket.secure_docs.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`}</code>
          </div>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            F. Amazon DynamoDB (NoSQL Mastery)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            <strong>DynamoDB</strong> is Amazon's flagship serverless NoSQL database. It provides single-digit millisecond latency at any scale. It has no tables or joins in the SQL sense. You must unlearn relational modeling (PostgreSQL) and adopt <strong>Single-Table Design</strong>, where all entities (Users, Orders, Tickets) live in the exact same table.
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3 mb-4">
            <li><strong>Partition Key (PK):</strong> The hash used to distribute data across physical servers. Crucial for scaling.</li>
            <li><strong>Sort Key (SK):</strong> Optional. Used to sort data grouped by the Partition Key natively.</li>
            <li><strong>Global Secondary Index (GSI):</strong> Because NoSQL only lets you query by the Primary Key, a GSI is a replicated shadow-table that allows you to query your data backwards using different attributes.</li>
          </ul>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Infrastructure Definition (Terraform)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm mb-6">
              <code>{`resource "aws_dynamodb_table" "app_data" {
  name         = "EnterpriseSingleTable"
  billing_mode = "PAY_PER_REQUEST" # On-Demand (Zero cost when idle)
  
  hash_key     = "PK"              # Primary Partition Key
  range_key    = "SK"              # Primary Sort Key

  attribute { name = "PK"; type = "S" }
  attribute { name = "SK"; type = "S" }
  attribute { name = "GSI1PK"; type = "S" }
  attribute { name = "GSI1SK"; type = "S" }

  # Global Secondary Index for Reverse Querying
  global_secondary_index {
    name               = "GSI1"
    hash_key           = "GSI1PK"
    range_key          = "GSI1SK"
    projection_type    = "ALL"
  }
}`}</code>
            </div>
          </div>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Execution Logic (Python Boto3)</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              Here is the exact Python code to execute an incredibly fast, localized query against the GSI to find all "Orders" for a specific "User":
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('EnterpriseSingleTable')

def get_user_orders(user_id):
    # Querying the GSI instead of the main table
    response = table.query(
        IndexName='GSI1',
        KeyConditionExpression=Key('GSI1PK').eq(f"USER#{user_id}") & Key('GSI1SK').begins_with("ORDER#")
    )
    return response.get('Items', [])`}</code>
            </div>
          </div>
        </div>

        <div className="mb-12 print:mb-6">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            G. AWS Lambda (Serverless Compute)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            <strong>Lambda</strong> allows you to run stateless code (Python, Node.js, Go) without provisioning any EC2 servers. It is strictly event-driven. If an S3 file is uploaded or an API Gateway endpoint is hit, AWS instantly spins up a micro-container, runs your code, and destroys it.
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3 mb-4">
            <li><strong>Cold Starts vs Warm Starts:</strong> The first API request after inactivity takes longer (Cold Start) while AWS downloads your code. Subsequent requests to that container are instantaneous (Warm Start).</li>
            <li><strong>Lambda Layers:</strong> Instead of packing massive libraries (like <code>Pandas</code> or <code>Boto3</code>) into every single Lambda ZIP file, you deploy them once as a "Layer" that thousands of Lambdas can share concurrently.</li>
            <li><strong>Execution Role:</strong> A Lambda function is completely isolated and powerless. You must explicitly attach an IAM Role granting it permission to interact with other AWS services.</li>
          </ul>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Infrastructure Definition (Terraform)</h3>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm mb-6">
              <code>{`resource "aws_lambda_function" "api_handler" {
  function_name    = "OrderProcessorAPI"
  runtime          = "python3.10"
  handler          = "main.lambda_handler"
  memory_size      = 512  # RAM directly controls CPU power in Lambda
  timeout          = 30   # Max allowed is 15 minutes (900 seconds)
  
  filename         = "api_payload.zip"
  source_code_hash = filebase64sha256("api_payload.zip")
  
  # Binding the IAM Role
  role             = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      DYNAMO_TABLE = aws_dynamodb_table.app_data.name
    }
  }
}

# Authorizing API Gateway to trigger the Lambda natively
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_handler.function_name
  principal     = "apigateway.amazonaws.com"
}`}</code>
            </div>
          </div>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Execution Logic (Python API Handler)</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              This is the raw Python code expected inside <code>main.py</code>. It natively receives an API Gateway proxy event, executes business logic, and returns a strict HTTP response payload.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import os
import json

def lambda_handler(event, context):
    try:
        # Extract HTTP Context securely natively provided by API Gateway
        http_method = event.get('httpMethod')
        path_parameters = event.get('pathParameters', {})
        user_id = path_parameters.get('user_id')
        
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing user_id parameter'})
            }
            
        print(f"Processing Order Request for User: {user_id}")
        table_name = os.environ['DYNAMO_TABLE']
        
        # ... Execute robust Boto3 logic here ...
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'status': 'SUCCESS'})
        }
        
    except Exception as e:
        # Standardize 500 error reporting
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
`}</code>
            </div>
          </div>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            H. Enterprise Architecture Diagram (Mapped to Your Resume)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Based on your direct experience building REST APIs, Python UIs, and backend Reconciliation Engines, here is how those components map into a highly scalable, event-driven AWS Cloud Architecture.
          </p>

          {/* NATIVE JSX/CSS DIAGRAM */}
          <div className="border-[3px] border-slate-900 bg-white rounded-xl p-8 print:p-6 relative mt-12 print:mt-8">
            <div className="absolute top-0 left-8 -translate-y-1/2 bg-white px-4 border-l-[3px] border-r-[3px] border-t-[3px] border-slate-900 rounded-t-lg shadow-sm">
              <span className="font-black text-slate-900 tracking-widest text-sm flex items-center gap-2 pt-1"><Cloud className="w-5 h-5" /> AWS CLOUD (us-east-1)</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 justify-between mt-4">

              {/* Client Network */}
              <div className="flex flex-col items-center gap-2">
                <Globe className="w-12 h-12 text-slate-700" />
                <span className="font-bold text-slate-800 text-center leading-tight">Public<br />Internet</span>
              </div>

              <div className="hidden md:flex flex-col items-center text-slate-400">
                <ArrowRight className="w-8 h-8" />
                <span className="font-mono text-xs">HTTPS</span>
              </div>

              {/* API Gateway */}
              <div className="border-2 border-slate-600 border-dashed rounded-lg p-4 bg-slate-50 flex flex-col items-center w-36 text-center shadow-sm">
                <Server className="w-8 h-8 text-slate-800 mb-2" />
                <span className="font-black text-slate-900 text-xs">API Gateway</span>
                <span className="text-[10px] font-mono text-slate-500 mt-1">Route53 DNS</span>
              </div>

              <div className="hidden md:flex flex-col items-center text-slate-400">
                <ArrowRight className="w-8 h-8" />
                <span className="font-mono text-xs">VPC Link</span>
              </div>

              {/* VPC Wrap */}
              <div className="border-[3px] border-slate-800 rounded-xl p-6 bg-slate-100 relative flex-1 w-full shadow-inner">
                <div className="absolute top-0 right-4 -translate-y-1/2 bg-slate-100 px-2 text-xs font-bold text-slate-600 tracking-wider">PRIVATE VPC</div>

                <div className="flex flex-col gap-6">
                  {/* EKS */}
                  <div className="bg-white border-2 border-slate-400 rounded-lg p-3 flex items-center gap-3 shadow-md">
                    <Box className="w-8 h-8 text-slate-900 flex-shrink-0" />
                    <div>
                      <h4 className="font-black text-slate-900 text-xs">Amazon EKS (Kubernetes)</h4>
                      <p className="text-[10px] text-slate-600 font-medium leading-tight mt-1">Python/Node.js Microservices</p>
                    </div>
                  </div>

                  {/* SQS to Lambda */}
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200 border-2 border-slate-400 rounded-lg p-2 flex-1 flex flex-col items-center justify-center shadow-inner">
                      <span className="font-black text-slate-800 text-[10px] text-center leading-tight">Amazon SQS</span>
                      <span className="text-[8px] text-slate-500 uppercase font-bold mt-1">Event Queue</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    <div className="bg-white border-2 border-slate-400 rounded-lg p-2 flex-[1.5] flex items-center gap-2 shadow-md">
                      <Zap className="w-6 h-6 text-slate-900 flex-shrink-0" />
                      <div>
                        <h4 className="font-black text-slate-900 text-[11px] leading-tight">AWS Lambda</h4>
                        <p className="text-[9px] text-slate-600 font-medium leading-tight mt-0.5" title="Reconciliation Engine">Recon Engine</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Storage Tier */}
            <div className="mt-8 border-t-[3px] border-slate-900 pt-8 flex items-center justify-center gap-16 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 border-[3px] border-slate-900 rounded-full">
                <span className="text-[10px] font-bold text-slate-600 tracking-widest leading-none block py-1">PERSISTENCE TIER</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Database className="w-8 h-8 text-slate-800" />
                <span className="font-bold text-slate-800 text-center text-xs">DynamoDB<br /><span className="text-[10px] text-slate-500 font-mono">NoSQL State</span></span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <HardDrive className="w-8 h-8 text-slate-800" />
                <span className="font-bold text-slate-800 text-center text-xs">Amazon S3<br /><span className="text-[10px] text-slate-500 font-mono">Object Store</span></span>
              </div>
            </div>

          </div>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page mt-12 print:mt-12">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            I. EKS Autoscaling for OCR Systems (Resume Deep Dive)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            In your resume, you note: <em>"leveraging Kubernetes autoscaling to handle high-volume OCR document extraction spikes"</em>. Here is the exact enterprise architecture and code behind this statement.
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3 mb-6">
            <li><strong>The Problem:</strong> OCR (Optical Character Recognition) is extremely CPU-intensive. If 5,000 PDFs are uploaded at once, a static pool of 3 Python pods will choke, run out of memory (OOMKilled), and drop connections.</li>
            <li><strong>The HPA Solution:</strong> You map a <strong>Horizontal Pod Autoscaler (HPA)</strong> to the deployment. It aggressively polls the CPU metric. If average CPU &gt; 70%, it instructs the EKS Control Plane to instantly spawn 20 more pods.</li>
            <li><strong>The Cluster Autoscaler:</strong> What if the physical EC2 nodes run out of room for the 20 new pods? The EKS Cluster Autoscaler detects "Pending" pods and explicitly orders AWS to boot up fresh EC2 instances to expand the cluster capacity dynamically.</li>
          </ul>

          <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Kubernetes HPA Definition (YAML)</h3>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ocr-extraction-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ocr-python-worker
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70`}</code>
          </div>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            J. Broker Portal API Decoupling (Resume Deep Dive)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            In your resume, you decoupled massive data migrations. In the cloud, this is achieved by shifting from <strong>Synchronous</strong> to <strong>Asynchronous Event-Driven Architectures</strong> using Amazon SQS.
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3 mb-6">
            <li><strong>Synchronous Risk:</strong> If your web portal API directly calls an external 3rd-party database (like Novasys) during a user request, and Novasys is slow, the user's browser hangs. The API times out via 504 Gateway Error. Data is lost.</li>
            <li><strong>Asynchronous Safety:</strong> Your API immediately accepts the user's request, saves the JSON payload to an SQS Queue, and instantly returns a HTTP 202 (Accepted) to the user. The browser NEVER hangs.</li>
            <li><strong>Worker Polling:</strong> A background Lambda (or EKS Pod) polls the SQS queue, pulling the payload, and takes its time executing the heavy database migration in the background securely.</li>
          </ul>

          <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Infrastructure Definition (Terraform)</h3>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`resource "aws_sqs_queue" "migration_events" {
  name                        = "broker-migration-events.fifo"
  fifo_queue                  = true
  content_based_deduplication = true
  
  # How long a worker has to process the event before it becomes visible to other workers again
  visibility_timeout_seconds  = 120 
  message_retention_seconds   = 345600 # Retain unread events for 4 days
}`}</code>
          </div>
        </div>

        <div className="mb-12 print:mb-6">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-2xl print:text-lg font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            K. Dead Letter Queues (DLQ) for Data Integrity (Resume Deep Dive)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
            Building on the SQS architecture above, what happens if the payload data was malformed, or the background database throws a 500 error, and the worker script crashes while trying to process the SQS message?
          </p>
          <ul className="list-disc pl-6 marker:text-slate-900 font-medium text-lg print:text-base text-slate-800 space-y-3 mb-6">
            <li><strong>The Infinite Loop:</strong> Without a DLQ, the worker crashes, the visibility timeout expires, and the message returns to the queue. Another worker grabs it, crashes again. This loop runs infinitely, wasting AWS compute budget.</li>
            <li><strong>The Redrive Protocol:</strong> You attach a Redrive Policy stating: "If this message is received 3 times and fails, explicitly move it to a completely different queue (The DLQ)."</li>
            <li><strong>Manual Intervention:</strong> Engineers can setup CloudWatch alarms to alert them if the DLQ receives a message. They can then manually inspect the broken JSON payload without losing the customer's data.</li>
          </ul>

          <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">DLQ Infrastructure Binding (Terraform)</h3>
          <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
            <code>{`resource "aws_sqs_queue" "migration_dlq" {
  name = "broker-migration-dlq.fifo"
  fifo_queue = true
}

resource "aws_sqs_queue" "migration_events" {
  name       = "broker-migration-events.fifo"
  fifo_queue = true

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.migration_dlq.arn
    maxReceiveCount     = 3 # Route to DLQ after 3 failures
  })
}`}</code>
          </div>
        </div>

        <div className="mb-12 print:mb-6 print:break-after-page mt-12 print:mt-12 border-t-[4px] border-slate-900 pt-12">
          <h2 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-3xl print:text-xl font-black text-slate-900 mb-4 print:mb-2 pb-2 border-b border-slate-300">
            L. Connecting All The Dots (End-to-End Microservice Workflow)
          </h2>
          <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-8 print:mb-4">
            If you want to absolutely dominate a technical interview, you must be able to securely wire all these isolated AWS components together into a single, cohesive workflow. Here is a complete, event-driven architecture bridging Amazon EKS, S3 Storage, Serverless Compute, and Non-Relational Database persistence.
          </p>
          
          {/* NATIVE JSX/CSS DIAGRAM */}
          <div className="border-[3px] border-slate-900 bg-slate-50 rounded-xl p-8 print:p-6 mb-8 shadow-sm">
            <div className="flex flex-col gap-6">
              
              <div className="flex items-center justify-between gap-4">
                {/* 1. EKS Upload */}
                <div className="bg-white border-2 border-slate-400 rounded-lg p-4 flex-1 flex flex-col items-center justify-center shadow-sm relative">
                  <div className="absolute -top-3 left-4 bg-slate-900 text-white font-black text-xs px-2 py-0.5 rounded-sm">STEP 1</div>
                  <Box className="w-8 h-8 text-slate-800 mb-2" />
                  <span className="font-black text-slate-900 text-sm text-center leading-tight">FastAPI Pod<br/>(Amazon EKS)</span>
                  <span className="text-[10px] text-slate-500 font-bold mt-1 text-center">Uploads raw OCR PDF</span>
                </div>
                
                <div className="flex flex-col items-center flex-shrink-0 text-slate-400 hidden md:flex">
                  <span className="text-[10px] font-mono font-bold mb-1 tracking-tighter">boto3.upload_file()</span>
                  <ArrowRight className="w-6 h-6" />
                </div>

                {/* 2. S3 Bucket */}
                <div className="bg-white border-2 border-blue-400 rounded-lg p-4 flex-1 flex flex-col items-center justify-center shadow-sm relative">
                  <div className="absolute -top-3 left-4 bg-blue-600 text-white font-black text-xs px-2 py-0.5 rounded-sm">STEP 2</div>
                  <HardDrive className="w-8 h-8 text-blue-700 mb-2" />
                  <span className="font-black text-slate-900 text-sm">Amazon S3</span>
                  <span className="text-[10px] text-slate-500 font-bold mt-1 text-center">Fires 'Created' Event</span>
                </div>

                <div className="flex flex-col items-center flex-shrink-0 text-slate-400 hidden md:flex">
                  <span className="text-[10px] font-mono font-bold mb-1 tracking-tighter">Async Invoke</span>
                  <ArrowRight className="w-6 h-6" />
                </div>

                {/* 3. AWS Lambda */}
                <div className="bg-white border-2 border-orange-400 rounded-lg p-4 flex-1 flex flex-col items-center justify-center shadow-sm relative">
                  <div className="absolute -top-3 left-4 bg-orange-500 text-white font-black text-xs px-2 py-0.5 rounded-sm">STEP 3</div>
                  <Zap className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="font-black text-slate-900 text-sm">AWS Lambda</span>
                  <span className="text-[10px] text-slate-500 font-bold mt-1 text-center">Extracts Text (Python)</span>
                </div>
                
                <div className="flex flex-col items-center flex-shrink-0 text-slate-400 hidden md:flex">
                  <span className="text-[10px] font-mono font-bold mb-1 tracking-tighter">table.put_item()</span>
                  <ArrowRight className="w-6 h-6" />
                </div>

                {/* 4. DynamoDB */}
                <div className="bg-slate-800 border-2 border-slate-900 rounded-lg p-4 flex-1 flex flex-col items-center justify-center shadow-sm relative">
                  <div className="absolute -top-3 left-4 bg-white text-slate-900 font-black text-xs px-2 py-0.5 rounded-sm border border-slate-900">STEP 4</div>
                  <Database className="w-8 h-8 text-white mb-2" />
                  <span className="font-black text-white text-sm">DynamoDB</span>
                  <span className="text-[10px] text-slate-300 font-bold mt-1 text-center">Saves parsed state</span>
                </div>
              </div>

            </div>
          </div>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Step 1: The EKS Microservice (Python FastAPI)</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              Your web backend (running on Kubernetes) receives a PDF from a user. Instead of processing it synchronously, it simply dumps it into an Amazon S3 bucket and immediately responds HTTP 200 OK.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import boto3
from fastapi import FastAPI, UploadFile

app = FastAPI()
s3_client = boto3.client('s3')
BUCKET_NAME = "enterprise-raw-uploads-2026"

@app.post("/api/v1/upload")
async def handle_document_upload(file: UploadFile, user_id: str):
    # EKS Pod writes the file directly to S3 via native IAM Role Mapping
    filePath = f"inbox/{user_id}/{file.filename}"
    
    s3_client.upload_fileobj(file.file, BUCKET_NAME, filePath)
    
    # HTTP 200 OK returned in milliseconds. The user's UI is lightning fast.
    return {"status": "Accepted", "path": filePath}`}</code>
            </div>
          </div>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Step 2: The Event Glue (Terraform)</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              You use Terraform to securely architect the Event Pipeline. You explicitly authorize the S3 bucket to trigger the Python Lambda whenever a new <code>.pdf</code> drops into the <code>inbox/</code> path.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`resource "aws_s3_bucket_notification" "trigger" {
  bucket = aws_s3_bucket.raw_uploads.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.ocr_processor.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "inbox/"
    filter_suffix       = ".pdf"
  }
}

# Explicitly grant S3 native permission to wake up the Lambda
resource "aws_lambda_permission" "allow_s3" {
  statement_id  = "AllowS3Invoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ocr_processor.function_name
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.raw_uploads.arn
}`}</code>
            </div>
          </div>

          <div className="print:break-inside-avoid mb-8">
            <h3 style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-xl font-bold text-slate-900 mt-6 mb-3">Step 3 & 4: The Event Processor (Lambda to DynamoDB)</h3>
            <p style={{ pageBreakAfter: "avoid", breakAfter: "avoid" }} className="text-slate-800 font-medium text-lg print:text-base leading-relaxed mb-4">
              The AWS Lambda spins up instantly in response to the S3 event. It downloads the target file, processes it, and persists the extracted result directly to DynamoDB so the frontend UI can query the finished state.
            </p>
            <div className="bg-slate-50 border border-slate-400 p-6 print:p-4 rounded-lg font-mono text-sm print:text-xs text-slate-900 whitespace-pre-wrap shadow-sm">
              <code>{`import os
import boto3

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMO_TABLE_NAME'])

def ocr_lambda_handler(event, context):
    # The 'event' object natively contains the S3 file metadata
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        user_id = key.split('/')[1] # parsed from "inbox/USER_ID/file.pdf"
        
        # 1. Download file to Lambda's temporary storage limit (/tmp/)
        local_path = f"/tmp/{os.path.basename(key)}"
        s3.download_file(bucket, key, local_path)
        
        # 2. Run Heavy Architecture Logic (e.g. PyTesseract OCR extraction)
        extracted_text = "MOCK_OCR_DATA_FROM_PDF"
        
        # 3. Save processed state to DynamoDB NoSQL Table
        table.put_item(
            Item={
                'PK': f"USER#{user_id}",
                'SK': f"DOC#{key}",
                'ExtractedText': extracted_text,
                'Status': 'COMPLETED'
            }
        )
        print(f"Successfully processed {key} for User {user_id}")`}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
