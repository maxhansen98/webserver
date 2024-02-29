#!/usr/bin/python3
import os
import cgi, cgitb, jinja2, subprocess
import urllib.request
cgitb.enable()
print("Content-type:text/html\r\n\r\n")
HTML = """
<html>
<head>
<title></title>
</head>
<body>

  <h1>Upload tha Fasta File</h1>
  <form action="compute_cg_content.py" method="POST" enctype="multipart/form-data">
    File: <input name="file" type="file">
    <input name="submit" type="submit">
</form>
<p>Computed CG Content:</p>
{% if filedata %}

<blockquote>

{{filedata}}

</blockquote>

{% endif %}  

</body>
</html>
"""

inFileData = None
form = cgi.FieldStorage()
UPLOAD_DIR='uploads'
result = ""
if "file" in form:
    form_file = form['file']
    if form_file.filename:
        uploaded_file_path = os.path.join(UPLOAD_DIR, os.path.basename(form_file.filename))
        with open(uploaded_file_path, 'wb') as fout:
            while True:
                chunk = form_file.file.read(100000)
                if not chunk:
                    break
                fout.write(chunk)       
        with open(uploaded_file_path, 'r') as fin:
            inFileData = ""
            for line in fin:
                inFileData += line
        command = ["python3", "/home/h/hummelj/propra/gc_content.py", "--file", uploaded_file_path]
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True).stdout       
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0'}
print(jinja2.Environment().from_string(HTML).render(filedata=result))