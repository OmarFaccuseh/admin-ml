import fitz

name_doc = "ferrecsa1.pdf"
doc = fitz.open(name_doc)
print('num pags. : ', doc.page_count)
print('metadatos: ', doc.metadata)

text = chr(12).join([page.get_text() for page in doc])

print('all text : ', text)

