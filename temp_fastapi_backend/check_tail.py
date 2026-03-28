from docx import Document
doc = Document("/Users/nishantsaxena/workspace/resume/update/NISHANT SAXENA___fsg_updated.docx")
text = [p.text for p in doc.paragraphs if p.text.strip()]
for i, line in enumerate(text[-20:]):
    print(f"{i}: {line}")
