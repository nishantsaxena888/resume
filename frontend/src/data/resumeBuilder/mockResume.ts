import type { ResumeModel } from '../../types/resumeBuilder/resume';

export const mockResume: ResumeModel = {
  metadata: {
    template: 'modern',
    theme: {
      primaryColor: '#0f172a',
      fontFamily: 'Inter',
    },
  },
  personalInfo: {
    fullName: 'Nishant Saxena',
    title: 'Senior Software Engineer / Architect',
    email: 'nishant.saxena.varad@gmail.com',
    phone: '(848)-345-0433',
    location: '',
    linkedin: 'linkedin.com/in/nishantasaxena/',
  },
  summary: '17+ years of experience in software development and delivery across web and client/server applications. Expertise in Python (Django, Flask, FastAPI) and React.js, delivering scalable architectures. Strong foundation in system analysis, architecture, design, and automation. Hands-on experience with OCR + Document AI workflows using AWS Textract, Tesseract, docTR, Mindee, and Azure Vision for structured data extraction. Practical familiarity with LLM APIs (OpenAI/HuggingFace) for summarization and structured extraction assistance inside document automation pipelines. Experience using embeddings and Elasticsearch dense vectors for semantic search, similarity-based retrieval, and RAG-style lookups. Worked on ML-driven validation workflows, rule engines, and classification logic integrated with Python microservices. Collaborative team player with experience in Agile/Scrum environments across US, Singapore, and India.',
  skills: [
    { category: 'Languages', items: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'React 19', 'Next.js', 'Django', 'Flask', 'FastAPI', 'GraphQL', 'Celery'] },
    { category: 'Frameworks', items: ['React.js', 'Redux', 'RESTful APIs', 'JWT/OAuth2/Keycloak', 'WebSockets', 'Serverless'] },
    { category: 'Cloud & Tools', items: ['AWS (Step Functions, Lambda, DynamoDB, ECS, MSK)', 'Docker', 'Terraform', 'GitHub Actions', 'PostgreSQL', 'Elasticsearch', 'Kafka'] }
  ],
  experience: [
    {
      id: 'centene',
      company: 'Centene Corporation',
      role: 'Senior Software Lead',
      duration: 'Nov 2025 – Till Date',
      achievements: [
        'Leading backend services in Python (Django/FastAPI) and supporting React-based UIs for internal insurance workflows.',
        'Stabilizing production systems including async consumers, Celery workers, and external integrations (Salesforce, payment & broker systems).',
        'Driving project sunset strategy by decommissioning legacy Novasys components and migrating workflows to Salesforce.',
        'Supporting data cleanup, reconciliation (DMR execution), and validation cycles prior to Salesforce transition.',
        'Refactoring and simplifying Python services for long-term maintainability during transition phase.',
        'Providing ongoing Salesforce integration support and resolving production issues during migration.',
        'Improving logging, PII compliance, monitoring, and deterministic recovery processes.',
        'Collaborating with business and Salesforce teams to ensure smooth handoff and operational continuity.'
      ]
    },
    {
      id: 'kkr',
      company: 'KKR',
      role: 'Solution Lead – Valuation',
      duration: 'May 2025 – Nov 2025',
      achievements: [
        'Built and delivered a valuation data platform with Python FastAPI backend and React + Redux frontend, ensuring scalable and maintainable architecture.',
        'Developed RESTful APIs for data ingestion, validation, and replication across SharePoint, Excel, and external systems.',
        'Implemented pipeline monitoring, exception handling, and audit trail tracking with automated alerts for reliability.',
        'Designed and deployed a React-based admin dashboard for pipeline observability, exception management, and reporting.',
        'Migrated complex Excel valuation models into web-native, API-driven workflows, improving transparency and investor-ready reporting.',
        'Worked across PostgreSQL + Elasticsearch layers for storage and search, with Docker + AWS ECS for deployment.',
        'Added LLM-assisted utility functions to generate concise exception summaries and support structured data validation within the valuation workflow.',
        'Implemented semantic search using Elasticsearch embeddings to improve anomaly detection and cross-sheet data verification.',
        'Developed lightweight Python orchestration modules to coordinate Excel parsing, DB lookups, and validation flows end-to-end.'
      ]
    },
    {
      id: 'charter',
      company: 'Charter Communications',
      role: 'Lead | AWS | React | Python',
      duration: 'Jan 2025 – May 2025',
      achievements: [
        'Built a dynamic reporting dashboard with React.js frontend and Django REST Framework backend, supporting multiple departmental reporting needs.',
        'Developed and optimized REST APIs for real-time reporting and analytics integration.',
        'Integrated Apache NiFi pipelines for ingesting and transforming multi-source data into PostgreSQL.',
        'Leveraged Elasticsearch to power fast, flexible queries and dashboards across large datasets.',
        'Implemented operational alerts and sync monitoring using AWS SNS and Lambda for system visibility.',
        'Designed and delivered reusable React components generated from schema-driven APIs for scalable UI integration.'
      ]
    },
    {
      id: 'capitalone',
      company: 'CapitalOne',
      role: 'Project Lead – Architect (Python/AWS)',
      duration: 'Apr 2024 - September 2024',
      achievements: [
        'Developed a transaction pipeline using AWS Step Functions as a coordinator service, representing the complete lifecycle of a transaction.',
        'Contributed implementation of transaction processing pipeline using AWS Step Functions to orchestrate various microservices in the transaction lifecycle.',
        'Convert Java Code to Python for the utility services, using TDD.',
        'Created aws lambda function, to call the API generically, including retries exception handling etc.',
        'Used DynamoDB to store transaction metadata for orchestration.',
        'Worked closely with client stakeholders to gather requirements and deliver technical solutions.',
        'Developed end-to-end tests with pytest.',
        'Used LocalStack to validate AWS Step Functions, Lambda, and DynamoDB interactions.',
        'Improved reliability of the transaction pipeline by adding retry logic, fallback handlers, and structured exception flows within Step Functions.',
        'Optimized Lambda invocations and API execution patterns, reducing latency and making the orchestration more predictable under load.',
        'Built internal debugging utilities to trace each transaction step, improving visibility during integration and UAT testing.',
        'Developed and maintained Angular-based enterprise UI components using services, routing, and RxJS.',
        'Integrated Angular dashboards with RESTful backend APIs for real-time data visualization and reporting.'
      ]
    },
    {
      id: 'mindmaster',
      company: 'Mind Master Solutions Pte Ltd',
      role: 'Chief Architect (Python/React/Cloud/AI-ML/Gen AI)',
      duration: 'June 2022 – May 2024',
      achievements: [
        'Built Document Extraction system (simplyflow.ai) using Python, Django, PostgreSQL, and OCRs (AWS Textract, Azure, Fitz, Tesseract).',
        'Extended Django REST Framework (DRF) for low-code/no-code CRUD APIs based on database schemas.',
        'Developed and validated AI/ML pipelines for text recognition, entity extraction, and contextual analysis using GenAI models.',
        'Integrated Generative AI with OCR tools (AWS Textract, Tesseract) for enhanced document processing and accuracy improvement.',
        'Leveraged AWS SageMaker to train and deploy lightweight ML models for document classification and validation within large-scale OCR and document extraction pipelines.',
        'Engineered cloud-deployed AI workflows, ensuring high model accuracy through robust validation techniques.',
        'Orchestrated data processing workflows with AWS Step Functions for classification, processing, and ERP integration.',
        'Developed dynamic ReactJS interfaces configured via low-code API outputs.',
        'Dockerized backend and frontend for scalability and consistent deployment. Hosted on AWS (ECS, S3, CloudFront) with CI/CD pipelines using GitHub Actions.',
        'Built unified monitoring and retry mechanisms across WebMethods -> Kafka -> AWS Lambda pipeline using Python and Step Functions.',
        'Built end-to-end workflows using API Gateway, AWS Lambda, Step Functions, and Amazon MSK for SSO and secure microservices orchestration.'
      ]
    },
    {
      id: 'highiq',
      company: 'Highiq.ai',
      role: 'Senior Python Product developer',
      duration: 'March 2021 - April 2022',
      achievements: [
        'Contract analysis automation (Bumi) and Intelligent Accounts Payable automation (Oscar).',
        'Developed backend APIs using Django REST Framework to automate contract analysis and invoice workflows.',
        'Maintained legacy .NET modules for core business rule validation and PO compliance, ensuring backward compatibility with existing ERP workflows.',
        'Leveraged AWS SageMaker to train and deploy lightweight ML models for document classification and validation within OCR-based extraction pipelines.',
        'Designed and optimized databases with SQL Server and PostgreSQL for efficient data storage and retrieval.',
        'Replaced UI Path with open-source RPA tools to reduce costs and improve automation efficiency.',
        'Designed real-time data pipelines integrating AWS Textract with Snowflake for scalable invoice analytics.',
        'Developed heuristic rule engines and AI/ML models for intelligent invoice processing and error validation workflows.',
        'Automated data annotation using Label Studio, enabling efficient model training and accuracy improvements.'
      ]
    },
    {
      id: 'infomagnus',
      company: 'Infomagnus (Advantage Solutions)',
      role: 'Development Director / Architect',
      duration: 'April 2019 - March 2021',
      achievements: [
        'Delivered Retail Suite of tools merging legacy systems and built Risk Mitigation features for Walmart.',
        'Developed a suite of tools using Flask to integrate legacy systems from Advantage Solutions and Daymon, ensuring seamless collaboration.',
        'Used PostgreSQL and Elasticsearch to implement efficient data storage, retrieval, and advanced search capabilities.',
        'Built and maintained APIs to support Angular-based front-end applications, enabling user-friendly interfaces for the tools.',
        'Enhanced a Django-based legacy system (SAS) to handle three times the current load, ensuring scalability and performance improvements.',
        'Performed load testing with Locust and analyzed logs using New Relic to identify performance bottlenecks.',
        'Designed a generic framework using the Locust module to dynamically add test cases and load options for performance testing.',
        'Conducted sprint planning, combining metrics from testing and log analysis to prioritize code enhancements.'
      ]
    },
    {
      id: 'exponential',
      company: 'Exponential Machines',
      role: 'Senior Python Platform Architect',
      duration: 'Jan 2017 - March 2019',
      achievements: [
        'Built Pulse Decision Intelligence dashboard and Enso Decision Intelligence ML/AI orchestration platform.',
        'Developed microservices and APIs using Flask for dashboards, analytics, and event-trigger systems.',
        'Created reusable wrappers for Elasticsearch and Splunk to streamline integration and improve code efficiency.',
        'Migrated data from Splunk to Elasticsearch, optimizing system performance and search capabilities.',
        'Built a connector for UI Path to extract metadata about RPA bots, enabling better monitoring and insights.',
        'Managed high-concurrency asynchronous tasks using Tornado to ensure real-time decision-making capabilities.',
        'Used Kafka and RabbitMQ for real-time messaging, event streaming, and asynchronous communication between components.',
        'Integrated Neo4j to model the graph of decision agents, their dependencies, and interactions with other agents, policies, and events.',
        'Automated data orchestration and integration using Apache NiFi to streamline data flows between different services.'
      ]
    },
    {
      id: 'pramati',
      company: 'Pramati Technologies (Castlight Health)',
      role: 'Principal Engineer',
      duration: 'Dec 2013 – Jan 2017',
      achievements: [
        'Analytics legacy system enhancement and deployment of In-house Test automation framework.',
        'Migrated a legacy system from Java processes and Excel macros to a Django-based web portal, implementing complex business rules and logic.',
        'Designed and implemented a Highcharts framework to enable dynamic report generation through configuration.',
        'Migrated databases from MySQL to Greenplum, enhancing the Django portal to accommodate the changes.',
        'Created and maintained APIs using Django and Django REST Framework (DRF) for automated workflows and seamless data handling.',
        'Designed and developed an in-house test automation framework using Django, Selenium, and Celery to streamline testing operations.',
        'Automated repetitive tasks for customer support by identifying patterns in bug tracker requests and database queries using Python and Django.'
      ]
    },
    {
      id: 'htmedia',
      company: 'HTmedia (Shine.com)',
      role: 'Product Lead',
      duration: 'Aug 2011 - Dec 2013',
      achievements: [
        'Led a team of developers at Shine.com, managing real-time data indexing for millions of users.',
        'Led a development team to manage Shine.com, using Python and Django to handle millions of users, ensuring high performance and scalability.',
        'Designed and managed MongoDB for efficient storage and retrieval of data, handling thousands of concurrent requests.',
        'Implemented a near real-time data indexing pipeline with Solr to enhance search functionality and reduce latency.',
        'Reduced technical debt by refactoring legacy Python and Django code, improving maintainability and performance.',
        'Delivered a high-performance content management system (CMS) using Django, enabling efficient management of platform content.'
      ]
    },
    {
      id: 'innovektor',
      company: 'Innovektor Consultancy Pvt. Ltd',
      role: 'Lead Technology',
      duration: 'Dec 2009 - July 2011',
      achievements: [
        'Developed Group Buying and Alumni Networking platforms.',
        'Developed web platforms using PHP Symfony framework for Groffr (real estate group buying) and Verkko (alumni networking).',
        'Managed MySQL databases for user authentication, data storage, and API integrations, ensuring efficient backend operations.',
        'Designed and optimized user interfaces using JQuery for an intuitive and seamless user experience.',
        'Utilized Python for scripting and backend automation tasks to support platform functionalities.'
      ]
    },
    {
      id: 'silverline',
      company: 'Silverline IT Private Ltd',
      role: 'Senior Software Engineer',
      duration: 'Jul 2008 - Dec 2009',
      achievements: [
        'Supported PHP projects using Typo3, Smarty, and MVC frameworks to deliver customized client solutions.',
        'Managed MySQL5 databases for efficient data storage, retrieval, and backend support.',
        'Implemented automation projects using Turbogears and Python, streamlining workflows and improving efficiency.',
        'Provided server management on Linux, including configuring Apache servers and managing deployments.',
        'Integrated and supported OpenERP for client-specific requirements, optimizing operational processes.'
      ]
    },
    {
      id: 'ozas',
      company: 'Ozas Technologies (Currenex)',
      role: 'Software Developer',
      duration: 'Mar 2007 - June 2008',
      achievements: [
        'Developed backend functionalities using Java to support tasks within the financial trading platform.',
        'Created user interfaces using Swing for interactive and responsive desktop applications.',
        'Designed and implemented workflows and business logic using the Struts2 framework for web application development.',
        'Built front-end components and layouts using HTML and CSS to meet specific client design requirements.',
        'Generated detailed financial reports using Jasper Reports for analytics and insights.',
        'Managed and optimized database operations with Oracle 9i for secure and efficient data storage and retrieval.'
      ]
    }
  ],
  education: [
    {
      institution: 'Sharda University (UPTU)',
      degree: 'B-Tech Information Technology',
      year: '2006 - 2007'
    }
  ],
  certifications: []
};
