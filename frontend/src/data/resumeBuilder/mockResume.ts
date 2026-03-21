import type { ResumeModel } from '../../types/resumeBuilder/resume';

export const mockResume: ResumeModel = {
  metadata: {
    template: 'classic', 
    theme: {
      primaryColor: '#1f2937', // gray-800
    }
  },
  personalInfo: {
    fullName: "Nishant Saxena",
    title: "Senior Full Stack Software Engineer",
    email: "nishant.saxena.varad@gmail.com",
    phone: "(848)-345-0433",
    linkedin: "https://www.linkedin.com/in/nishant-saxena-74aa04a2/",
    location: "United States"
  },
  summary: [
    "17+ years of experience in software development and delivery across web and client/server applications.",
    "Expertise in Python (Django, Flask, FastAPI) and React.js (19, Next.js), delivering full-stack, scalable, and maintainable systems.",
    "Strong foundation in system analysis, architecture, design, development, testing, and implementation.",
    "Proven ability to simplify complex systems via clean architecture, code optimization, and automation.",
    "Hands-on in frontend & backend development, building responsive UIs, REST/GraphQL APIs, and microservices.",
    "Skilled in authentication & security (JWT, OAuth2, Keycloak), async execution (Celery, RQ), and real-time features (WebSockets).",
    "Experienced with databases (PostgreSQL, MySQL, MongoDB, Aurora, Redis) including schema design, indexing, and optimization.",
    "Hands-on experience with OCR + Document AI workflows using AWS Textract, Tesseract, docTR, Mindee, and Azure Vision for structured data extraction.",
    "Practical familiarity with LLM APIs (OpenAI/HuggingFace) for summarization, text refinement, and structured extraction assistance inside document automation pipelines.",
    "Experience using embeddings and Elasticsearch dense vectors for semantic search, similarity-based retrieval, and RAG-style lookups.",
    "Worked on ML-driven validation workflows, rule engines, and classification logic integrated with Python microservices.",
    "Well-versed in DevOps & Cloud: Docker, AWS (Lambda, Step Functions, ECS, S3, DynamoDB), Terraform, GitHub Actions, CI/CD.",
    "Strong background in Elasticsearch & Kafka for search, messaging, and event-driven systems.",
    "Collaborative team player with experience in Agile/Scrum environments across US, Singapore, and India."
  ],
  skills: [
    { category: "Languages & Frameworks", items: "Python, JavaScript (ES6+), TypeScript, ReactJS (React 19, Next.js), Django, Flask, FastAPI, Flask-RESTful, GraphQL, Celery, Selenium" },
    { category: "Frontend", items: "React.js (hooks, context, Redux), Next.js, Tailwind CSS, Bootstrap, Responsive Design, Performance Optimization" },
    { category: "Backend", items: "Django/Flask/FastAPI, RESTful APIs, GraphQL, Authentication & Security (JWT/OAuth2/Keycloak), WebSockets, Async Background Tasks (Celery/RQ), Microservices Architecture" },
    { category: "Cloud & DevOps", items: "AWS (Step Functions, Lambda, DynamoDB, S3, SNS, SQS, ECS, MSK), Docker, Docker Compose, Terraform, GitHub Actions, Kubernetes, LocalStack, CI/CD Pipelines, Nginx/Apache" },
    { category: "Database Technologies", items: "PostgreSQL, MySQL, MongoDB, Redis, DynamoDB, SQL Server" },
    { category: "Search & Messaging", items: "Elasticsearch, Kafka, RabbitMQ" },
    { category: "Document & Data Processing", items: "Pandas, SQLAlchemy, AWS Textract, Tesseract OCR, docTR, Mindee, OpenERP, APScheduler, Label Studio" },
    { category: "Testing, Monitoring & Automation", items: "PyTest, Jest, React Testing Library, Locust, New Relic, TDD, CI/CD Test Automation" },
    { category: "Authentication & Access Control", items: "JWT, OAuth2, Keycloak, IAM (AWS)" },
    { category: "Project Delivery & Methodologies", items: "Agile/Scrum, SaaS Delivery, Multi-Tenant Architecture, Technical Documentation" },
    { category: "AI / ML & LLM Technologies", items: "Embeddings, Semantic Search, LLM API Integration (OpenAI, HuggingFace), Vector Search (Elasticsearch Dense Vectors), Prompt Engineering (basic), RAG Fundamentals, Document AI Workflows, Text Classification & Validation Pipelines" },
    { category: "Others", items: "Serverless Architecture, Event-Driven Systems, API Gateway, Low-Code/No-Code Platforms" }
  ],
  experience: [
    {
      company: "Centene, Remote",
      role: "Senior Software Lead",
      dates: "Nov 2025 – Till Date",
      points: [
        "Leading backend services in Python (Django/FastAPI) and supporting React-based UIs for internal insurance workflows.",
        "Stabilizing production systems including async consumers, Celery workers, and external integrations (Salesforce, payment & broker systems).",
        "Driving project sunset strategy by decommissioning legacy Novasys components and migrating workflows to Salesforce.",
        "Supporting data cleanup, reconciliation (DMR execution), and validation cycles prior to Salesforce transition.",
        "Refactoring and simplifying Python services for long-term maintainability during transition phase.",
        "Providing ongoing Salesforce integration support and resolving production issues during migration.",
        "Improving logging, PII compliance, monitoring, and deterministic recovery processes.",
        "Collaborating with business and Salesforce teams to ensure smooth handoff and operational continuity."
      ]
    },
    {
      company: "KKR, New York, NY",
      role: "Solution Lead – Valuation",
      dates: "May 2025 – Nov 2025",
      points: [
        "Built and delivered a valuation data platform with Python FastAPI backend and React + Redux frontend, ensuring scalable and maintainable architecture.",
        "Developed RESTful APIs for data ingestion, validation, and replication across SharePoint, Excel, and external systems.",
        "Containerized backend services using Docker and supported deployments on Kubernetes-based environments for scalable microservices orchestration.",
        "Implemented pipeline monitoring, exception handling, and audit trail tracking with automated alerts for reliability.",
        "Designed and deployed a React-based admin dashboard for pipeline observability, exception management, and reporting.",
        "Migrated complex Excel valuation models into web-native, API-driven workflows, improving transparency and investor-ready reporting.",
        "Worked across PostgreSQL + Elasticsearch layers for storage and search, with Docker + AWS ECS for deployment.",
        "Added LLM-assisted utility functions to generate concise exception summaries and support structured data validation within the valuation workflow.",
        "Implemented semantic search using Elasticsearch embeddings to improve anomaly detection and cross-sheet data verification.",
        "Developed lightweight Python orchestration modules to coordinate Excel parsing, DB lookups, and validation flows end-to-end."
      ]
    },
    {
      company: "Charter Communications Denver CO",
      role: "Lead | AWS | React | Python",
      dates: "Jan 2025 – May 2025",
      points: [
        "Built a dynamic reporting dashboard with React.js frontend and Django REST Framework backend, supporting multiple departmental reporting needs.",
        "Developed and optimized REST APIs for real-time reporting and analytics integration.",
        "Integrated Apache NiFi pipelines for ingesting and transforming multi-source data into PostgreSQL.",
        "Leveraged Elasticsearch to power fast, flexible queries and dashboards across large datasets.",
        "Implemented operational alerts and sync monitoring using AWS SNS and Lambda for system visibility.",
        "Designed and delivered reusable React components generated from schema-driven APIs for scalable UI integration."
      ]
    },
    {
      company: "CapitalOne, NYC",
      role: "Project Lead – Architect (Python/AWS)",
      dates: "Apr 2024 - Sep 2024",
      points: [
        "Developed a transaction pipeline using AWS Step Functions as a coordinator service, representing the complete lifecycle of a transaction.",
        "Convert Java Code to Python for the utility services, using TDD.",
        "Created aws lambda function, to call the API generically, including retries exception handling erc.",
        "Used DynamoDB to store transaction metadata for orchestration.",
        "Worked closely with client stakeholders to gather requirements and deliver technical solutions.",
        "Developed end-to-end tests with pytest.",
        "Used LocalStack to validate AWS Step Functions, Lambda, and DynamoDB interactions.",
        "Improved reliability of the transaction pipeline by adding retry logic, fallback handlers, and structured exception flows within Step Functions.",
        "Optimized Lambda invocations and API execution patterns, reducing latency and making the orchestration more predictable under load.",
        "Built internal debugging utilities to trace each transaction step, improving visibility during integration and UAT testing.",
        "Developed and maintained Angular-based enterprise UI components using services, routing, and RxJS.",
        "Integrated Angular dashboards with RESTful backend APIs for real-time data visualization and reporting."
      ]
    },
    {
      company: "Mind Master Solutions Pte Ltd, Singapore (Hyderabad India)",
      role: "Chief Architect (Python/ React/ Cloud/ AI-ML/Gen AI)",
      dates: "June 2022 – May 2024",
      points: [
        "Extended Django REST Framework (DRF) for low-code/no-code CRUD APIs based on database schemas.",
        "Created several microservices using FastAPI and Entity-based Identity and Access Management (IAM) with dynamic menu access control.",
        "Developed and validated AI/ML pipelines for text recognition, entity extraction, and contextual analysis using GenAI models.",
        "Integrated Generative AI with OCR tools (AWS Textract, Tesseract) for enhanced document processing and accuracy improvement.",
        "Leveraged AWS SageMaker to train and deploy lightweight ML models for document classification and validation within large-scale OCR and document extraction pipelines.",
        "Engineered cloud-deployed AI workflows, ensuring high model accuracy through robust validation techniques.",
        "Created custom AI wrappers and connectors to streamline data extraction from documents.",
        "Orchestrated data processing workflows with AWS Step Functions for classification, processing, and ERP integration.",
        "SaaS-ready implementation for customizable client interaction and scalability.",
        "Dockerized backend and frontend for scalability and consistent deployment.",
        "Built end-to-end workflows using API Gateway, AWS Lambda, Step Functions, and Amazon MSK (Managed Streaming for Apache Kafka) for SSO and secure, scalable microservices orchestration."
      ]
    },
    {
      company: "Highiq.ai, Hyderabad India",
      role: "Senior Python Product developer",
      dates: "March 2021 - April 2022",
      points: [
        "Developed backend APIs using Django REST Framework to automate contract analysis and invoice workflows.",
        "Maintained legacy .NET modules for core business rule validation and PO compliance, ensuring backward compatibility with existing ERP workflows.",
        "Leveraged AWS SageMaker to train and deploy lightweight ML models for document classification and validation within OCR-based extraction pipelines.",
        "Designed and optimized databases with SQL Server and PostgreSQL for efficient data storage and retrieval.",
        "Replaced UI Path with open-source RPA tools to reduce costs and improve automation efficiency.",
        "Designed real-time data pipelines integrating AWS Textract with Snowflake for scalable invoice analytics.",
        "Implemented a SaaS solution on AWS Marketplace for cloud-based, scalable deployment of the application.",
        "Automated data annotation using Label Studio, enabling efficient model training and accuracy improvements."
      ]
    },
    {
      company: "Development Director /Architect, Infomagnus",
      role: "Retail Suite of tools / Risk Mitigation",
      dates: "April 2019 - March 2021",
      points: [
        "Developed a suite of tools using Flask to integrate legacy systems from Advantage Solutions and Daymon, ensuring seamless collaboration.",
        "Used PostgreSQL and Elasticsearch to implement efficient data storage, retrieval, and advanced search capabilities.",
        "Built and maintained APIs to support Angular-based front-end applications, enabling user-friendly interfaces for the tools.",
        "Deployed the tools on AWS, leveraging its cloud infrastructure for scalability and reliability.",
        "Enhanced a Django-based legacy system (SAS) to handle three times the current load, ensuring scalability and performance improvements.",
        "Performed load testing with Locust and analyzed logs using New Relic to identify performance bottlenecks."
      ]
    },
    {
      company: "Exponential Machines, Hyderabad India",
      role: "Senior Python Platform Architect",
      dates: "Jan 2017 - March 2019",
      points: [
        "Developed microservices and APIs using Flask for dashboards, analytics, and event-trigger systems.",
        "Created reusable wrappers for Elasticsearch and Splunk to streamline integration and improve code efficiency.",
        "Migrated data from Splunk to Elasticsearch, optimizing system performance and search capabilities.",
        "Built a connector for UI Path to extract metadata about RPA bots, enabling better monitoring and insights.",
        "Designed APIs for event-trigger systems to handle various operational events and analytics scenarios.",
        "Managed high-concurrency asynchronous tasks using Tornado to ensure real-time decision-making capabilities.",
        "Used Kafka and RabbitMQ for real-time messaging, event streaming, and asynchronous communication between components.",
        "Automated data orchestration and integration using Apache NiFi to streamline data flows between different services."
      ]
    },
    {
      company: "Pramati Technologies, Hyderabad India",
      role: "Principal Engineer",
      dates: "Dec 2013 – Jan 2017",
      points: [
        "Migrated a legacy system from Java processes and Excel macros to a Django-based web portal, implementing complex business rules and logic.",
        "Designed and implemented a Highcharts framework to enable dynamic report generation through configuration.",
        "Migrated databases from MySQL to Greenplum, enhancing the Django portal to accommodate the changes.",
        "Designed and developed an in-house test automation framework using Django, Selenium, and Celery to streamline testing operations.",
        "Built a UI-based dashboard using Django to configure and execute test cases, monitor historical reports, and analyze trends.",
        "Automated repetitive tasks for customer support by identifying patterns in bug tracker requests and database queries using Python and Django.",
        "Reduced regression suite runtime by enabling API-based test case configurations within the test automation framework."
      ]
    },
    {
      company: "HTmedia (Product Shine.com), Gurugram, India",
      role: "Product Lead",
      dates: "Aug 2011 - Dec 2013",
      points: [
        "Led a development team to manage Shine.com, using Python and Django to handle millions of users, ensuring high performance and scalability.",
        "Designed and managed MongoDB for efficient storage and retrieval of data, handling thousands of concurrent requests.",
        "Implemented a near real-time data indexing pipeline with Solr to enhance search functionality and reduce latency.",
        "Reduced technical debt by refactoring legacy Python and Django code, improving maintainability and performance.",
        "Delivered a high-performance content management system (CMS) using Django, enabling efficient management of platform content.",
        "Managed user authentication and authorization using Keycloak for secure access control."
      ]
    },
    {
      company: "Innovektor Consultancy pvt. Ltd, Mumbai",
      role: "Lead Technology",
      dates: "Dec 2009 - July 2011",
      points: [
        "Developed web platforms using PHP Symfony framework for Groffr (real estate group buying) and Verkko (alumni networking).",
        "Managed MySQL databases for user authentication, data storage, and API integrations, ensuring efficient backend operations.",
        "Designed and optimized user interfaces using JQuery for an intuitive and seamless user experience.",
        "Utilized Python for scripting and backend automation tasks to support platform functionalities."
      ]
    },
    {
      company: "Silverline IT Private. Ltd, Noida",
      role: "Senior Software Engineer",
      dates: "Jul 2008 - Dec 2009",
      points: [
        "Supported PHP projects using Typo3, Smarty, and other MVC frameworks to deliver customized client solutions.",
        "Managed MySQL5 databases for efficient data storage, retrieval, and backend support.",
        "Implemented automation projects using Turbogears and Python, streamlining workflows and improving efficiency.",
        "Provided server management on Linux, including configuring Apache servers and managing deployments."
      ]
    },
    {
      company: "Ozas Technologies",
      role: "Software Developer",
      dates: "Mar 2007 - June 2008",
      points: [
        "Developed backend functionalities using Java to support tasks within the financial trading platform (Currenex).",
        "Created user interfaces using Swing for interactive and responsive desktop applications.",
        "Designed and implemented workflows and business logic using the Struts2 framework for web application development.",
        "Generated detailed financial reports using Jasper Reports for analytics and insights."
      ]
    }
  ],
  education: [
    {
      degree: "B-Tech Information Technology",
      institution: "Hindustan College Of Science and Technology. (Sharda University) / UPTU",
      dates: "2006-2007"
    }
  ]
};
