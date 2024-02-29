#!/usr/bin/python3
import json
import sys
import subprocess
import re
import cgi
import cgitb

cgitb.enable()

def execute_subprocess(swissprot_content, keywords_b):
    with open('temp_swissprot.dat', 'w') as f:
        f.write(swissprot_content.decode('utf-8'))
    
    command = ["python3", "/home/h/hummelj/propra/spksearch/spkeyword.py", "--keyword"]
    keywords = re.findall(r'"([^"]*)"', keywords_b)
    for keyword in keywords:
        command.append(keyword)
    command.append("--swissprot")
    command.append('temp_swissprot.dat')  # Pass the path to the temporary file

    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)

    if result.returncode == 0:
        return {
            'success': True,
            'output': result.stdout,
        }
    else:
        return {
            'success': False,
            'error': result.stderr
        }

def main():
    print("Content-Type: application/json\n")
    form = cgi.FieldStorage()
    
    try:
        swissprot_file = form['swissprot'].file
        swissprot_content = swissprot_file.read()  # Read the file content
        keyword = form.getvalue('keyword')
        if swissprot_content and keyword:
            result = {'data': execute_subprocess(swissprot_content, keyword)}
        else:
            result = {'error': 'Missing swissprot file or keyword'}
    except Exception as e:
        result = {'error': str(e)}

    # Print JSON response
    print(json.dumps(result))

if __name__ == "__main__":
    main()