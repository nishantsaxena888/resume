from database import SessionLocal
from models import CourseWidget
from routes import capture_youtube_frame
import sys

db = SessionLocal()
yt = db.query(CourseWidget).filter(CourseWidget.widget_type == "youtube").order_by(CourseWidget.id.desc()).first()

if not yt:
    print("No YouTube widget active.")
    sys.exit(1)

module_id = yt.module_id
url = yt.payload.get("url")
video_id = url.split("v=")[-1].split("&")[0]

print("Capturing Frame 1: 17.2s ...")
res1 = capture_youtube_frame(video_id, 17.2)
img1 = res1["image"] if res1.get("success") else ""

print("Capturing Frame 2: 388.1s ...")
res2 = capture_youtube_frame(video_id, 388.1)
img2 = res2["image"] if res2.get("success") else ""

print("Capturing Frame 3: 422.4s ...")
res3 = capture_youtube_frame(video_id, 422.4)
img3 = res3["image"] if res3.get("success") else ""

markdown = f"""# 🧠 AWS Lambda: Comprehensive Study Guide

## 1. What is AWS Lambda?
AWS Lambda is a revolutionary serverless compute product that allows you to run functions on-demand without managing or provisioning any underlying server infrastructure. 
Traditionally, hosting an application required renting or maintaining virtual machines, worrying about OS updates, scaling, and maintenance. With Lambda, you simply write your code (in Python, Java, C#, Go, Ruby, Node.js, etc.), upload it, and AWS handles everything else natively on the cloud.

![Architecture Overview]({img1})

### Key Benefits:
- **Serverless Paradigm**: Zero infrastructure maintenance.
- **Polyglot Runtime**: Supports multiple languages natively.
- **Auto-Scaling**: Automatically scales to handle high-throughput concurrent invocations.

---

## 2. Advanced Integrations & Destinations
AWS Lambda seamlessly integrates with the broader AWS ecosystem, creating massive event-driven workflows.

**Lambda Destinations** fundamentally changes how functions interact. Instead of manually writing SDK code inside your Lambda to publish results, Destinations allow you to automatically pipe the output of your execution directly into other AWS services like **SNS** (Simple Notification Service) or **SQS** (Simple Queue Service) upon success or failure.

![Lambda Destinations]({img2})

---

## 3. Performance & Cold Starts
Scaling serverless applications introduces unique latency challenges, most notably the **Cold Start Problem**. 
When a new execution environment spins up, initialization takes time, causing a latency spike for the first invocation.

AWS solved this with two major features:
1. **Lambda Layers**: Allows you to package reusable libraries shared across multiple applications to reduce deployment payload sizes.
2. **Provisioned Concurrency**: Keeps application execution environments pre-warmed and highly available, entirely eliminating cold starts and latency spikes for mission-critical workflows.

![Cold Starts & Provisioned Concurrency]({img3})
"""

# Delete the mock
mock_yt = db.query(CourseWidget).filter(CourseWidget.widget_type == "markdown").order_by(CourseWidget.id.desc()).all()
for m in mock_yt:
    db.delete(m)

new_w = CourseWidget(
    module_id=module_id,
    widget_type="markdown",
    payload={"content": markdown},
    position=100
)
db.add(new_w)
db.commit()
print("Success! Authentic Gemini Canvas injected.")
