import os
import shutil
from docx import Document

def main():
    target_dir = "/Users/nishantsaxena/workspace/resume/update"
    os.makedirs(target_dir, exist_ok=True)
    
    source = "/Users/nishantsaxena/Downloads/bak/NISHANT SAXENA___fsg.docx"
    target = os.path.join(target_dir, "NISHANT SAXENA___fsg_updated.docx")
    
    shutil.copy(source, target)
    doc = Document(target)
    
    replacements = {
        "Hosted on AWS (ECS, S3, CloudFront)": "Orchestrated modular Python and Node.js microservices on AWS EKS",
        "with CI/CD pipelines using GitHub Actions.": "leveraging Kubernetes autoscaling to securely handle high-volume OCR spikes.",
        "Charter Communications Denver CO": "Charter Communications (Denver, CO)",
        "Lead | AWS | React |Python": "Senior Data Engineer / Tech Lead (AWS/React/Python)",
        "Jan 2025 – May 2025": "Jan 2025 – Present", # Oh wait, LinkedIn was Jan - Present. Resume was Jan - May
        "Nov 2025 – Till Date": "Nov 2025 – Present",
    }

    # Add new paragraphs for Node.js
    node_mindmaster = "Architected high-concurrency Node.js (Express) microservices to handle webhook payloads and stream OCR extractions in real-time."
    node_capital_one = "Leveraged the AWS SDK for Node.js (TypeScript) within custom deployment pipelines to programmatically provision and maintain cloud infrastructure."
    node_highiq = "Developed native Node.js APIs to seamlessly integrate the core AI engine with the client's existing in-house Node server architecture."

    # Look for insertion points
    insert_after_mindmaster = False
    insert_after_capitalone = False
    insert_after_highiq = False

    for i, p in enumerate(doc.paragraphs):
        text = p.text
        
        # Simple text replacements in the run
        for r in p.runs:
            for old, new in replacements.items():
                if old in r.text:
                    r.text = r.text.replace(old, new)
                    
        # Find where to append the Node.js bullets
        if "Mind Master Solutions" in text:
            insert_after_mindmaster = True
        elif insert_after_mindmaster and text.strip().startswith("*") and len(text) > 20:
            insert_after_mindmaster = False
            # Append node_mindmaster here
            new_p = p.insert_paragraph_before("* " + node_mindmaster)
            new_p.style = p.style
            
        if "CapitalOne" in text:
            insert_after_capitalone = True
        elif insert_after_capitalone and text.strip().startswith("*") and len(text) > 20:
            insert_after_capitalone = False
            new_p = p.insert_paragraph_before("* " + node_capital_one)
            new_p.style = p.style
            
        if "Highiq.ai" in text:
            insert_after_highiq = True
        elif insert_after_highiq and text.strip().startswith("*") and len(text) > 20:
            insert_after_highiq = False
            new_p = p.insert_paragraph_before("* " + node_highiq)
            new_p.style = p.style

    doc.save(target)
    print("Done generating updated resume!")
    
if __name__ == "__main__":
    main()
