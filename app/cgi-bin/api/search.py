#!/usr/bin/python3
import json
import sys
import subprocess
import re
import cgi

def execute_subprocess(query):    
    command = ["python3", "/home/h/hummelj/propra/search/run.py", "--query", query]
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True, encoding='utf-8')
    if result.returncode == 0:
        return {
            'success': True,
            'output': result.stdout
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
        query = form.getvalue('query')
        if query is not None:
            result = {'data': execute_subprocess(query)}
        else:
            result = {'error': 'Missing query'}
    except Exception as e:
        result = {'error': str(e)}
    print(json.dumps(result))


if __name__ == "__main__":
    main()