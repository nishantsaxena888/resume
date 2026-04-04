import sys
import copy
sys.path.append('/Users/nishantsaxena/workspace/resume/temp_fastapi_backend')
from database import SessionLocal
from models import User, Resume

db = SessionLocal()
u = db.query(User).first()

# Find the resume we just created
target_resume = db.query(Resume).filter(Resume.title == 'AI / ML (GCP)').first()
if not target_resume:
    raise Exception("Resume 'AI / ML (GCP)' not found to update")

new_payload = {
    "personalInfo": {
        "fullName": "NISHANT SAXENA",
        "email": "nishant.saxena.varad@gmail.com",
        "phone": "(848)-345-0433",
        "linkedin": "https://www.linkedin.com/in/nishantasaxena/"
    },
    "summary": "17+ years of experience in software development and delivery across web and client/server applications. Expertise in Python (Django, Flask, FastAPI), React.js (19, Next.js),Node JS delivering full-stack, scalable, and maintainable systems. Strong foundation in system analysis, architecture, design, development, testing, and implementation. Proven ability to simplify complex systems via clean architecture, code optimization, and automation. Hands-on in frontend & backend development, building responsive UIs, REST/GraphQL APIs, and microservices. Skilled in authentication & security (JWT, OAuth2, Keycloak), async execution (Celery, RQ), and real-time features (WebSockets). Experienced with databases (PostgreSQL, MySQL, MongoDB,Aurora, Redis) including schema design, indexing, and optimization. Hands-on experience with OCR + Document AI workflows using AWS Textract, Tesseract, docTR, Mindee, and Azure Vision for structured data extraction. Practical familiarity with LLM APIs (OpenAI/HuggingFace) for summarization, text refinement, and structured extraction assistance inside document automation pipelines. Experience using embeddings and Elasticsearch dense vectors for semantic search, similarity-based retrieval, and RAG-style lookups. Worked on ML-driven validation workflows, rule engines, and classification logic integrated with Python microservices. Well-versed in DevOps & Cloud: Docker, AWS (Lambda, Step Functions, ECS, S3, DynamoDB), Terraform, GitHub Actions, CI/CD. Strong background in Elasticsearch & Kafka for search, messaging, and event-driven systems. Collaborative team player with experience in Agile/Scrum environments across US, Singapore, and India.",
    "skills": [
        {"category": "Languages & Frameworks", "items": ["Python", "JavaScript (ES6+)", "TypeScript", "ReactJS (React 19, Next.js)", "Django", "Flask", "FastAPI", "Flask-RESTful", "GraphQL", "Celery", "Selenium"]},
        {"category": "Frontend", "items": ["React.js (hooks, context, Redux)", "Next.js", "Tailwind CSS", "Bootstrap", "Responsive Design", "Performance Optimization"]},
        {"category": "Backend", "items": ["Django/Flask/FastAPI", "RESTful APIs", "GraphQL", "Authentication & Security (JWT/OAuth2/Keycloak)", "WebSockets", "Async Background Tasks (Celery/RQ)", "Microservices Architecture"]},
        {"category": "Cloud & DevOps", "items": ["AWS (Step Functions, Lambda, DynamoDB, S3, SNS, SQS, ECS, MSK)", "Docker", "Docker Compose", "Terraform", "GitHub Actions", "LocalStack", "CI/CD Pipelines", "Nginx/Apache"]},
        {"category": "Database Technologies", "items": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB", "SQL Server"]},
        {"category": "Search & Messaging", "items": ["Elasticsearch", "Kafka", "RabbitMQ"]},
        {"category": "Document & Data Processing", "items": ["Pandas", "SQLAlchemy", "AWS Textract", "Tesseract OCR", "docTR", "Mindee", "OpenERP", "APScheduler", "Label Studio"]},
        {"category": "Testing, Monitoring & Automation", "items": ["PyTest", "Jest", "React Testing Library", "Locust", "New Relic", "TDD", "CI/CD Test Automation"]},
        {"category": "Authentication & Access Control", "items": ["JWT", "OAuth2", "Keycloak", "IAM (AWS)"]},
        {"category": "Project Delivery & Methodologies", "items": ["Agile/Scrum", "SaaS Delivery", "Multi-Tenant Architecture", "Technical Documentation"]},
        {"category": "AI / ML & LLM Technologies", "items": ["Embeddings", "Semantic Search", "LLM API Integration (OpenAI, HuggingFace)", "Vector Search (Elasticsearch Dense Vectors)", "Prompt Engineering (basic)", "RAG Fundamentals", "Document AI Workflows", "Text Classification & Validation Pipelines"]},
        {"category": "Others", "items": ["Serverless Architecture", "Event-Driven Systems", "API Gateway", "Low-Code/No-Code Platforms"]}
    ],
    "experience": [
        {
            "id": "centene",
            "company": "Centene, NJ",
            "role": "Senior Software Architect",
            "duration": "Nov 2025 – Till Date",
            "achievements": [
                "Architecting backend services in Python (Django/FastAPI) and designing scalable React-based UIs for internal insurance workflows.",
                "Defining and stabilizing production architecture, including async consumers, Celery workers, and integrations with Salesforce, payment, and broker systems.",
                "Driving platform modernization, leading the decommissioning of legacy Novasys components and migration strategy to Salesforce.",
                "Overseeing data architecture and governance, including cleanup, reconciliation (DMR execution), and validation cycles ahead of system migration.",
                "Refactoring and standardizing Python services for long-term maintainability, modularity, and operational resilience during the transition phase."
            ]
        },
        {
            "id": "kkr",
            "company": "KKR, New York, NY",
            "role": "Solution Architect – Valuation",
            "duration": "May 2025 – Nov 2025",
            "achievements": [
                "Architected and delivered a scalable valuation data platform with Python FastAPI backend and React + Redux frontend, ensuring maintainability and modularity across services.",
                "Designed RESTful APIs and data workflows for ingestion, validation, and replication across SharePoint, Excel, and external systems, enabling automated, reliable data processing.",
                "Defined platform observability and reliability standards, implementing pipeline monitoring, exception handling, audit trails, and automated alerts.",
                "Led migration of complex Excel valuation models into web-native, API-driven workflows, enhancing transparency, investor-ready reporting, and maintainability.",
                "Oversaw storage and search architecture across PostgreSQL and Elasticsearch, integrating Docker and AWS ECS for containerized deployment.",
                "Integrated LLM-assisted utilities to generate concise exception summaries and enable structured data validation within workflows.",
                "Implemented semantic search using Elasticsearch embeddings for anomaly detection and cross-sheet verification.",
                "Developed orchestration modules in Python to coordinate Excel parsing, DB lookups, and end-to-end validation flows.",
                "Directed deployment and orchestration of the platform on AWS EKS (Kubernetes), ensuring scalability, reliability, and cloud-native best practices."
            ]
        },
        {
            "id": "charter",
            "company": "Charter Communications Denver CO",
            "role": "Architect | AWS | React |Python",
            "duration": "Jan 2025 – May 2025",
            "achievements": [
                "Architected a dynamic reporting platform with React.js frontend and Django REST Framework backend, supporting multiple departmental workflows.",
                "Designed and optimized REST APIs for real-time reporting, analytics integration, and cross-system data interactions.",
                "Directed ingestion and transformation pipelines using Apache NiFi into PostgreSQL, ensuring scalable, reliable, and maintainable data flows.",
                "Defined search and analytics architecture leveraging Elasticsearch, enabling fast, flexible queries and dashboards across large datasets.",
                "Implemented platform observability and monitoring standards, including operational alerts and sync tracking via AWS SNS and Lambda.",
                "Led the creation of reusable React components based on schema-driven APIs, ensuring scalable and maintainable UI integration across departments."
            ]
        },
        {
            "id": "capitalone",
            "company": "CapitalOne, NYC",
            "role": "Project Architect – Architect (Python/AWS)",
            "duration": "Apr 2024- September 2024",
            "achievements": [
                "Architected and implemented a transaction orchestration platform using AWS Step Functions, coordinating multiple microservices to represent the full lifecycle of client transactions and ensuring seamless service interactions.",
                "Converted legacy Java utilities to Python with Test-Driven Development (TDD), standardizing utility services and improving maintainability.",
                "Designed and developed AWS Lambda functions for generic API calls with robust retry logic, structured exception handling, and fallback mechanisms to improve system reliability.",
                "Managed transaction metadata in DynamoDB, enabling orchestration tracking, auditing, and end-to-end visibility across the pipeline.",
                "Built end-to-end testing frameworks with pytest and leveraged LocalStack to simulate and validate Step Functions, Lambda, and DynamoDB interactions locally.",
                "Maintained automated AWS deployment pipelines using Node.js (TypeScript) SDK and CDK, enabling scalable, reproducible infrastructure provisioning.",
                "Enhanced operational observability by creating internal debugging utilities to trace transaction steps and improve visibility during integration and UAT testing.",
                "Developed Angular-based enterprise dashboards with RxJS and RESTful backend integration for real-time monitoring, analytics, and reporting.",
                "Collaborated with client stakeholders to gather requirements, define architecture, and deliver robust, production-ready solutions."
            ]
        },
        {
            "id": "mindmaster",
            "company": "Mind Master Solutions Pte Ltd, Singapore",
            "role": "Chief Architect ( Python/ React/ Cloud/ AI-ML/Gen AI)",
            "duration": "June-2022 – May 2024",
            "achievements": [
                "Extended Django REST Framework (DRF) for low-code/no-code CRUD APIs based on database schemas.",
                "Created several microservices using FastAPI.",
                "Entity-based Identity and Access Management (IAM) with dynamic menu access control.",
                "Developed and validated AI/ML pipelines for text recognition, entity extraction, and contextual analysis using GenAI models.",
                "Integrated Generative AI with OCR tools (AWS Textract, Tesseract) for enhanced document processing and accuracy improvement.",
                "Developed scalable WebSocket servers using Node.js to broadcast live document processing updates to the ReactJS frontend, reducing database polling overhead.",
                "Engineered cloud-deployed AI workflows, ensuring high model accuracy through robust validation techniques.",
                "Created custom AI wrappers and connectors to streamline data extraction from documents.",
                "Enhanced OCR capabilities with a FITZ OCR connector using Pytesseract for image data extraction.",
                "Implemented AWS Textract connector using Boto3 for document processing.",
                "Integrated Mindee API and docTR connectors for advanced data extraction and document recognition.",
                "Created a rule-based classification system for document type detection.",
                "Designed heuristic rule engines for intelligent data extraction.",
                "Automated pipeline execution with Python threading and schedulers.",
                "Orchestrated data processing workflows with AWS Step Functions for classification, processing, and ERP integration.",
                "Developed Python-based email modules using IMAP and SMTP for automated email handling.",
                "SaaS-ready implementation for customizable client interaction and scalability.",
                "Developed dynamic ReactJS interfaces configured via low-code API outputs.",
                "Orchestrated modular Python and Node.js microservices on AWS EKS, leveraging Kubernetes autoscaling to handle high-volume OCR document extraction spikes securely.",
                "Built unified monitoring and retry mechanisms across WebMethods → Kafka → AWS Lambda pipeline using Python and Step Functions.",
                "Built validation frameworks for ML/AI pipelines using Python, Terraform, and Robot Framework, embedding resilience checks and observability into cloud-native workflows.",
                "Built end-to-end workflows using API Gateway, AWS Lambda, Step Functions, and Amazon MSK (Managed Streaming for Apache Kafka) for SSO and secure, scalable microservices orchestration.",
                "Leveraged Kafka topics for event-driven architecture for real-time processing and ensuring seamless integration across services."
            ]
        },
        {
            "id": "highiq",
            "company": "Highiq.ai",
            "role": "Senior Python Architect( Python/ Angular/ Cloud)",
            "duration": "March-2021 - 10 April 2022",
            "achievements": [
                "Developed backend APIs using Django REST Framework to automate contract analysis and invoice workflows.",
                "Maintained legacy .NET modules for core business rule validation and PO compliance, ensuring backward compatibility with existing ERP workflows.",
                "Integrated Python services with .NET-based validation layers to preserve business-critical logic while modernizing data pipelines.",
                "Supported hybrid environments where .NET legacy logic handled complex regulatory validations before document ingestion.",
                "Leveraged AWS SageMaker to train and deploy lightweight ML models for document classification and validation within OCR-based extraction pipelines",
                "Designed and optimized databases with SQL Server and PostgreSQL for efficient data storage and retrieval.",
                "Integrated secure authentication and authorization mechanisms using SSO, JWT, and Azure Identity.",
                "Created schedulers using Python APScheduler for interval-based job execution and file processing pipelines.",
                "Replaced UI Path with open-source RPA tools to reduce costs and improve automation efficiency.",
                "Designed real-time data pipelines integrating AWS Textract with Snowflake for scalable invoice analytics",
                "Created wrapper functionalities for CRUD operations on PostgreSQL using Python SQLAlchemy for database interactions.",
                "Extracted data from documents using AWS Textract API with Boto3 for automation of invoice pre-processing.",
                "Implemented a SaaS solution on AWS Marketplace for cloud-based, scalable deployment of the application.",
                "Supported ERP system integrations through APIs and utilities, enabling seamless multi-step validation workflows.",
                "Developed heuristic rule engines and AI/ML models for intelligent invoice processing and error validation workflows.",
                "Automated data annotation using Label Studio, enabling efficient model training and accuracy improvements.",
                "Developed monitoring dashboards using Databricks and ELK to visualize extraction accuracy and processing KPIs",
                "Integrated AWS Textract and Python-based ML pipelines for data extraction, entity recognition"
            ]
        }
    ]
}

target_resume.payload = new_payload
from sqlalchemy.orm.attributes import flag_modified
flag_modified(target_resume, 'payload')
db.commit()

print('SUCCESS')
