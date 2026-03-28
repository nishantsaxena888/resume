from database import SessionLocal
from models import CourseWidget, CourseModule
from routes import capture_youtube_frame
import sys

db = SessionLocal()
latest_module = db.query(CourseModule).order_by(CourseModule.id.desc()).first()

if not latest_module:
    print("No Module exists. Cannot inject widgets.")
    sys.exit(1)

# Inject YouTube Widget
url = "https://www.youtube.com/watch?v=GVpmVu8vcNQ"
video_id = "GVpmVu8vcNQ"

new_yt = CourseWidget(
    module_id=latest_module.id,
    widget_type="youtube",
    payload={"url": url, "title": "AWS Step Functions vs AWS Lambda"},
    position=90
)
db.add(new_yt)
db.commit()
db.refresh(new_yt)

print("Capturing Frame 1: 40.5s ...")
res1 = capture_youtube_frame(video_id, 40.5)
img1 = res1["image"] if res1.get("success") else ""

print("Capturing Frame 2: 95.2s ...")
res2 = capture_youtube_frame(video_id, 95.2)
img2 = res2["image"] if res2.get("success") else ""

markdown = f"""# 🧠 Gemini Note: AWS Step Functions Workflow

## 1. Introduction to Step Functions Orchestration
While AWS Lambda executes isolated computational tasks, **AWS Step Functions** acts as the high-level state machine orchestrator tying dozens of Lambdas together. It provides native workflow visualization, built-in retry mechanisms, and state tracking so your underlying Lambdas remain 100% stateless and perfectly decoupled.

## 2. The Choice State Router
The most highly utilized node in a Step Function is the **Choice State**. Instead of writing `if/else` monoliths inside a single giant Lambda, you physically separate execution branches on the infrastructure graph.

By evaluating the incoming JSON parameters (e.g. `type: "purchase"` vs `type: "refund"`), the Choice State natively routes execution to completely different Lambda functions instantly across your VPC.

![Choice State Architecture Diagram]({img1})

## 3. Visual Workflow Studio Editor
AWS directly supports a visual **Studio Style Editor** in the console. You can drag and drop discrete Lambda ARNs onto a blank canvas, connecting them seamlessly through conditional workflows. The editor automatically generates the underlying Amazon States Language (ASL) JSON definition for you, which fundamentally reduces coding errors during orchestration deployments.

![Studio Style Editor]({img2})
"""

new_w = CourseWidget(
    module_id=latest_module.id,
    widget_type="markdown",
    payload={"content": markdown},
    position=100
)
db.add(new_w)
db.commit()
print("Success! Gemini Canvas injected for Step Functions.")
