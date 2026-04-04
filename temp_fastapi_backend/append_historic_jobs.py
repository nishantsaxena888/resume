import sys
import copy
sys.path.append('/Users/nishantsaxena/workspace/resume/temp_fastapi_backend')
from database import SessionLocal
from models import Resume
from sqlalchemy.orm.attributes import flag_modified

db = SessionLocal()

target_resume = db.query(Resume).filter(Resume.title == 'AI / ML (GCP)').first()
if not target_resume:
    raise Exception("Resume not found")

payload = copy.deepcopy(target_resume.payload)

old_jobs = [
    {
        "id": "infomagnus",
        "company": "Infomagnus (Advantage Solutions/Walmart)",
        "role": "Development Director / Architect",
        "duration": "April 2019 - March 2021",
        "achievements": [
            "Developed a suite of tools using Flask to integrate legacy systems from Advantage Solutions and Daymon, ensuring seamless collaboration between systems and workforce.",
            "Used PostgreSQL and Elasticsearch to implement efficient data storage, retrieval, and advanced search capabilities.",
            "Built and maintained APIs to support Angular-based front-end applications, enabling user-friendly interfaces for the tools.",
            "Deployed the tools on AWS, leveraging its cloud infrastructure for scalability and reliability.",
            "Enhanced a Django-based legacy system (SAS) to handle three times the current load, ensuring scalability and performance improvements.",
            "Performed load testing with Locust and analyzed logs using New Relic to identify performance bottlenecks.",
            "Developed native Node.js APIs to seamlessly integrate the core AI engine with the client's existing in-house Node server architecture."
        ]
    },
    {
        "id": "exponential",
        "company": "Exponential Machines",
        "role": "Senior Python Platform Architect",
        "duration": "Jan 2017 - March 2019",
        "achievements": [
            "Developed microservices and APIs using Flask for dashboards, analytics, and event-trigger systems.",
            "Created reusable wrappers for Elasticsearch and Splunk to streamline integration and improve code efficiency.",
            "Built a connector for UI Path to extract metadata about RPA bots, enabling better monitoring and insights.",
            "Developed APIs for Angular-based dashboards to display real-time decision insights and analytics graphs.",
            "Managed high-concurrency asynchronous tasks using Tornado to ensure real-time decision-making capabilities.",
            "Used Kafka and RabbitMQ for real-time messaging, event streaming, and asynchronous communication between components.",
            "Integrated Neo4j to model the graph of decision agents, their dependencies, and interactions with other agents, policies, and events."
        ]
    },
    {
        "id": "pramati",
        "company": "Pramati Technologies",
        "role": "Principal Engineer",
        "duration": "Dec 2013 – Jan 2017",
        "achievements": [
            "Migrated a legacy system from Java processes and Excel macros to a Django-based web portal, implementing complex business rules and logic.",
            "Migrated databases from MySQL to Greenplum, enhancing the Django portal to accommodate the changes.",
            "Designed and developed an in-house test automation framework using Django, Selenium, and Celery to streamline testing operations.",
            "Automated repetitive tasks for customer support by identifying patterns in bug tracker requests and database queries using Python and Django."
        ]
    },
    {
        "id": "htmedia",
        "company": "HTmedia (Shine.com)",
        "role": "Product Lead",
        "duration": "Aug 2011 - Dec 2013",
        "achievements": [
            "Led a development team to manage Shine.com, using Python and Django to handle millions of users, ensuring high performance and scalability.",
            "Designed and managed MongoDB for efficient storage and retrieval of data, handling thousands of concurrent requests.",
            "Implemented a near real-time data indexing pipeline with Solr to enhance search functionality and reduce latency.",
            "Managed user authentication and authorization using Keycloak for secure access control."
        ]
    },
    {
        "id": "innovektor",
        "company": "Innovektor Consultancy Pvt. Ltd.",
        "role": "Lead Technology",
        "duration": "Dec 2009 - July 2011",
        "achievements": [
            "Developed web platforms using PHP Symfony framework for Groffr (real estate group buying) and Verkko (alumni networking).",
            "Managed MySQL databases for user authentication, data storage, and API integrations, ensuring efficient backend operations.",
            "Designed and optimized user interfaces using JQuery for an intuitive and seamless user experience."
        ]
    },
    {
        "id": "silverline",
        "company": "Silverline IT Private. Ltd.",
        "role": "Senior Software Engineer",
        "duration": "Jul 2008 - Dec 2009",
        "achievements": [
            "Supported PHP projects using Typo3, Smarty, and other MVC frameworks to deliver customized client solutions.",
            "Implemented automation projects using Turbogears and Python, streamlining workflows and improving efficiency."
        ]
    },
    {
        "id": "ozas",
        "company": "Ozas Technologies",
        "role": "Software Developer",
        "duration": "Mar 2007 - June 2008",
        "achievements": [
            "Developed backend functionalities using Java to support tasks within the financial trading platform.",
            "Designed and implemented workflows and business logic using the Struts2 framework for web application development."
        ]
    }
]

# Ensure we don't duplicate them
existing_ids = [e.get('id') for e in payload.get('experience', [])]

for job in old_jobs:
    if job['id'] not in existing_ids:
        payload['experience'].append(job)

target_resume.payload = payload
flag_modified(target_resume, 'payload')
db.commit()

print('SUCCESS')
