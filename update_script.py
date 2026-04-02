from docx import Document
doc = Document("/Users/nishantsaxena/Downloads/bak/NISHANT SAXENA___fsg.docx")
for i, p in enumerate(doc.paragraphs):
    if "KKR" in p.text or "Charter" in p.text or "Mind Master" in p.text or "Highiq" in p.text:
        print(f"[{i}] {p.text}")
