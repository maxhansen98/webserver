#!/usr/bin/python3
import json
import sys
import subprocess
import re
import cgi


def execute_subprocess(acnumbers_b):    
    command = ["python3", "/home/h/hummelj/propra/acsearch/acsearch.py", "--ac"]
    acnumbers = re.findall(r'"([^"]*)"', acnumbers_b)
    for acnumber in acnumbers:
        command.append(acnumber)
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
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
        acnumbers = form.getvalue('ac')
        if acnumbers is not None:
            # Process the form data or execute subprocess here
            result = {'data': execute_subprocess(acnumbers)}
        else:
            result = {'error': 'Missing organism_patterns'}
    except Exception as e:
        result = {'error': str(e)}

    # Print JSON response
    print(json.dumps(result))


if __name__ == "__main__":
    main()