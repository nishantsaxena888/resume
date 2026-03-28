from database import SessionLocal
from models import CourseWidget
import sys

db = SessionLocal()
yt = db.query(CourseWidget).filter(CourseWidget.widget_type == "youtube").order_by(CourseWidget.id.desc()).first()

if not yt:
    print("No YouTube widget active.")
    sys.exit(1)

module_id = yt.module_id

mock_markdown = """# 🧠 Gemini Intelligence Canvas: AWS Lambda Mastery

## 1. Severless Architecture Overview
AWS Lambda is a cutting-edge serverless, event-driven compute service that lets you run operational code for virtually any type of application or backend service without ever provisioning hardware.

* **Fully Event-Driven**: Triggers instantly derived from S3, DynamoDB, or pure API Gateway events.
* **Stateless Scaling**: Each execution environment is wiped clean securely.
* **Auto-Scaling Matrix**: Seamlessly scales from zero to tens of thousands of concurrent requests perfectly tracking memory consumption.

> **Crucial Timestamp Extraction:** [04:15s]

![AWS Architecture Diagram Viewer](https://miro.medium.com/max/1400/1*I0A2VvD-wDBFEvzUeP2CGA.png)

## 2. Secure VPC Integration & Cold Starts
When a generic Lambda function is invoked for the first time, or exactly after a long period of inactivity, AWS physically provisions a completely new execution environment. If the function is forcefully attached to an isolated Virtual Private Cloud (VPC), this historically caused massive **Cold Start** latency because elastic network interfaces (ENIs) had to be dynamically synthesized.

![Latency Profiling Snapshot](https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2019/12/30/serverless-prescriptive-architecture.png)

### Technical Mitigation Strategies:
1. **Provisioned Concurrency**: Instructs underlying hardware to keep computational environments pre-initialized and warm permanently.
2. **Hyperplane Execution**: AWS inherently reworked the networking execution stack so generic ENIs are natively shared across multi-thread concurrent execution instances.
"""

new_w = CourseWidget(
    module_id=module_id,
    widget_type="markdown",
    payload={"content": mock_markdown},
    position=100
)
db.add(new_w)
db.commit()
print("Success! Gemini Canvas Mock injected.")
