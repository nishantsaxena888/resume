import sys
import copy
sys.path.append('/Users/nishantsaxena/workspace/resume/temp_fastapi_backend')
from database import SessionLocal
from models import User, Resume
from sqlalchemy import func

db = SessionLocal()
u = db.query(User).first()

master_resume = db.query(Resume).filter(Resume.id == 1).first()
if not master_resume:
    raise Exception("Master resume not found")

new_payload = copy.deepcopy(master_resume.payload)

new_payload['personalInfo'] = {
    'fullName': 'Nishant Saxena',
    'title': 'Senior Software Architect / Cloud & AI Implementation Lead',
    'email': 'nishant.saxena.varad@gmail.com',
    'phone': '(848)-345-0433',
    'location': '',
    'linkedin': 'linkedin.com/in/nishantasaxena/',
}

new_payload['summary'] = '17+ years of experience in software development and delivery across web and client/server applications. Expertise in Python (Django, Flask, FastAPI), React.js (19, Next.js),Node JS delivering full-stack, scalable, and maintainable systems. Strong foundation in system analysis, architecture, design, development, testing, and implementation. Proven ability to simplify complex systems via clean architecture, code optimization, and automation. Experienced with databases (PostgreSQL, MySQL, MongoDB, Aurora, Redis). Hands-on experience with OCR + Document AI workflows using AWS Textract, Tesseract, docTR, Mindee, and Azure Vision. Well-versed in DevOps & Cloud: Docker, AWS (Lambda, Step Functions, ECS, EKS, S3, DynamoDB), Terraform, GitHub Actions, CI/CD.'

new_payload['skills'] = [
    {'category': 'Languages & Frameworks', 'items': ['Python', 'JavaScript (ES6+)', 'TypeScript', 'ReactJS', 'Next.js', 'Django', 'Flask', 'FastAPI', 'Node JS', 'Celery']},
    {'category': 'Cloud & DevOps', 'items': ['AWS (Step Functions, Lambda, DynamoDB, ECS, EKS, S3, MSK)', 'Docker', 'Terraform', 'GitHub Actions', 'CI/CD']},
    {'category': 'Database Technologies', 'items': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DynamoDB', 'SQL Server']},
    {'category': 'Search & Messaging', 'items': ['Elasticsearch', 'Kafka', 'RabbitMQ']}
]

new_payload['experience'] = [
    {
        'id': 'centene',
        'company': 'Centene, NJ',
        'role': 'Senior Software Architect',
        'duration': 'Nov 2025 – Till Date',
        'achievements': [
            'Architecting backend services in Python (Django/FastAPI) and designing scalable React-based UIs for internal insurance workflows.',
            'Defining and stabilizing production architecture, including async consumers, Celery workers, and integrations with Salesforce, payment, and broker systems.',
            'Driving platform modernization, leading the decommissioning of legacy Novasys components and migration strategy to Salesforce.',
            'Overseeing data architecture and governance, including cleanup, reconciliation (DMR execution), and validation cycles ahead of system migration.',
            'Refactoring and standardizing Python services for long-term maintainability, modularity, and operational resilience.'
        ]
    },
    {
        'id': 'kkr',
        'company': 'KKR, New York, NY',
        'role': 'Solution Architect – Valuation',
        'duration': 'May 2025 – Nov 2025',
        'achievements': [
            'Architected and delivered a scalable valuation data platform with Python FastAPI backend and React + Redux frontend, ensuring maintainability and modularity.',
            'Designed RESTful APIs and data workflows for ingestion, validation, and replication across SharePoint, Excel, and external systems.',
            'Defined platform observability and reliability standards, implementing pipeline monitoring, exception handling, audit trails, and automated alerts.',
            'Led migration of complex Excel valuation models into web-native, API-driven workflows, enhancing transparency and investor-ready reporting.',
            'Oversaw storage and search architecture across PostgreSQL and Elasticsearch, integrating Docker and AWS ECS for containerized deployment.',
            'Integrated LLM-assisted utilities to generate concise exception summaries and enable structured data validation within workflows.',
            'Implemented semantic search using Elasticsearch embeddings for anomaly detection and cross-sheet verification.',
            'Developed orchestration modules in Python to coordinate Excel parsing, DB lookups, and end-to-end validation flows.',
            'Directed deployment and orchestration of the platform on AWS EKS (Kubernetes), ensuring scalability, reliability, and cloud-native best practices.'
        ]
    },
    {
        'id': 'charter',
        'company': 'Charter Communications (Denver, CO)',
        'role': 'Architect | AWS | React | Python',
        'duration': 'Jan 2025 – May 2025',
        'achievements': [
            'Architected a dynamic reporting platform with React.js frontend and Django REST Framework backend, supporting multiple departmental workflows.',
            'Designed and optimized REST APIs for real-time reporting, analytics integration, and cross-system data interactions.',
            'Directed ingestion and transformation pipelines using Apache NiFi into PostgreSQL, ensuring scalable, reliable, and maintainable data flows.',
            'Defined search and analytics architecture leveraging Elasticsearch, enabling fast, flexible queries and dashboards across large datasets.',
            'Implemented platform observability and monitoring standards, including operational alerts and sync tracking via AWS SNS and Lambda.',
            'Led the creation of reusable React components based on schema-driven APIs, ensuring scalable UI integration.'
        ]
    },
    {
        'id': 'capitalone',
        'company': 'CapitalOne, NYC',
        'role': 'Project Architect (Python/AWS/NodeJS)',
        'duration': 'Apr 2024 - September 2024',
        'achievements': [
            'Architected and implemented a transaction orchestration platform using AWS Step Functions, coordinating multiple microservices to represent the full lifecycle of client transactions.',
            'Converted legacy Java utilities to Python with Test-Driven Development (TDD), standardizing utility services and improving maintainability.',
            'Designed and developed AWS Lambda functions for generic API calls with robust retry logic, structured exception handling, and fallback mechanisms.',
            'Maintained automated AWS deployment pipelines using Node.js (TypeScript) SDK and CDK, enabling scalable, reproducible infrastructure provisioning.',
            'Managed transaction metadata in DynamoDB, enabling orchestration tracking, auditing, and end-to-end visibility.',
            'Built end-to-end testing frameworks with pytest and leveraged LocalStack to simulate and validate Step Functions, Lambda, and DynamoDB interactions locally.',
            'Enhanced operational observability by creating internal debugging utilities to trace transaction steps and improve visibility during UAT testing.',
            'Developed Angular-based enterprise dashboards with RxJS and RESTful backend integration for real-time monitoring and reporting.'
        ]
    },
    {
        'id': 'mindmaster',
        'company': 'Mind Master Solutions Pte Ltd, Singapore',
        'role': 'Chief Architect (Python/React/Cloud/EKS/Gen AI)',
        'duration': 'June 2022 – May 2024',
        'achievements': [
            'Built Document Extraction system (simplyflow.ai) using Python, Django, PostgreSQL, and OCRs (AWS Textract, Azure, Fitz, Tesseract).',
            'Extended Django REST Framework (DRF) for low-code/no-code CRUD APIs based on database schemas.',
            'Developed and validated AI/ML pipelines for text recognition, entity extraction, and contextual analysis using GenAI models.',
            'Developed scalable WebSocket servers using Node.js to broadcast live document processing updates to the ReactJS frontend, reducing database polling overhead.',
            'Engineered cloud-deployed AI workflows, ensuring high model accuracy through robust validation techniques.',
            'Orchestrated modular Python and Node.js microservices on AWS EKS, leveraging Kubernetes autoscaling to handle high-volume OCR document extraction spikes securely.',
            'Created versatile Python-based connector classes for CRUD consistency across modules.',
            'Orchestrated data processing workflows with AWS Step Functions for classification, processing, and ERP integration.',
            'Dockerized backend and frontend for scalability and consistent deployment on AWS with CI/CD pipelines using GitHub Actions.',
            'Built unified monitoring and retry mechanisms across WebMethods -> Kafka -> AWS Lambda pipeline using Python and Step Functions.',
            'Built end-to-end workflows using API Gateway, AWS Lambda, Step Functions, and Amazon MSK for SSO and secure microservices orchestration.'
        ]
    },
    {
        'id': 'highiq',
        'company': 'Highiq.ai',
        'role': 'Senior Python Architect (Python/NodeJS/AWS)',
        'duration': 'March 2021 - April 2022',
        'achievements': [
            'Developed backend APIs using Django REST Framework to automate contract analysis and intelligent accounts payable workflows.',
            'Maintained legacy .NET modules for core business rule validation and PO compliance, ensuring backward compatibility with existing ERP workflows.',
            'Developed native Node.js APIs to seamlessly integrate the core AI engine with the client\'s existing in-house Node server architecture.',
            'Leveraged AWS SageMaker to train and deploy lightweight ML models for document classification and validation within OCR-based extraction pipelines.',
            'Designed and optimized databases with SQL Server and PostgreSQL for efficient data storage and retrieval.',
            'Replaced UI Path with open-source RPA tools to reduce costs and improve automation efficiency.',
            'Designed real-time data pipelines integrating AWS Textract with Snowflake for scalable invoice analytics.',
            'Automated data annotation using Label Studio, enabling efficient model training and accuracy improvements.'
        ]
    }
]

max_id = db.query(func.max(Resume.id)).scalar() or 0
new_id = max_id + 1

new_resume_db = Resume(
    id=new_id,
    user_id=u.id, 
    title='Nishant Saxena - Resume Latest (AWS EKS, Node.js)', 
    payload=new_payload
)

db.add(new_resume_db)
db.commit()

print('SUCCESS: Parsed complete resume_latest.txt JSON and safely persisted to Postgres.')
