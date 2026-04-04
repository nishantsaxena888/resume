import sys
import copy
sys.path.append('/Users/nishantsaxena/workspace/resume/temp_fastapi_backend')
from database import SessionLocal
from models import Resume
from sqlalchemy.orm.attributes import flag_modified

db = SessionLocal()

# Find the resume we want to update
target_resume = db.query(Resume).filter(Resume.title == 'AI / ML (GCP)').first()
if not target_resume:
    raise Exception("Resume 'AI / ML (GCP)' not found to update")

payload = copy.deepcopy(target_resume.payload)

new_mindmaster_achievements = [
    "Built a cloud-agnostic Document Extraction system (simplyflow.ai) using Python, Django, and PostgreSQL, seamlessly distributing intensive OCR workloads across AWS (Textract), Azure (Vision), and GCP (Vertex AI).",
    "Architected end-to-end agentic workflows using LangChain and LlamaIndex to orchestrate multi-step document reasoning, enabling GenAI models (Gemini, Claude, Copilot) to independently classify and validate data streams.",
    "Leveraged Google AppScript to build custom workflow automations, effortlessly bridging internal G-Suite tools (Google Drive/Docs) with our core Python AI engine for seamless enterprise document ingestion.",
    "Championed AI-augmented engineering practices within the team, heavily utilizing Gemini and GitHub Copilot to accelerate Python API development, test generation, and complex debugging cycles.",
    "Extended Django REST Framework (DRF) for low-code/no-code CRUD APIs based on database schemas, facilitating agile microservices development using FastAPI.",
    "Developed scalable WebSocket servers using Node.js to broadcast live document processing updates to the ReactJS frontend, reducing database polling overhead.",
    "Orchestrated modular Python and Node.js microservices on AWS EKS and GCP, leveraging Kubernetes autoscaling to handle unpredictable high-volume OCR document extraction spikes securely.",
    "Built unified monitoring and retry mechanisms across WebMethods -> Kafka -> AWS Lambda pipelines using Python and Step Functions."
]

for exp in payload.get('experience', []):
    if exp.get('id') == 'mindmaster':
        exp['achievements'] = new_mindmaster_achievements
        break

target_resume.payload = payload
flag_modified(target_resume, 'payload')
db.commit()

print('SUCCESS')
