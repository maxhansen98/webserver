#!/usr/bin/python3
import json
import sys
import subprocess
import re
import cgi


def execute_subprocess(organism_patterns):    
    command = ["python3", "/home/h/hummelj/propra/8_genome_report/genome_length.py", "--organism"]
    organisms = re.findall(r'"([^"]*)"', organism_patterns)
    for organism in organisms:
        command.append(organism)
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
        organism_patterns = form.getvalue('organism')
        if organism_patterns is not None:
            # Process the form data or execute subprocess here
            result = {'data': execute_subprocess(organism_patterns)}
        else:
            result = {'error': 'Missing organism_patterns'}
    except Exception as e:
        result = {'error': str(e)}

    # Print JSON response
    print(json.dumps(result))


if __name__ == "__main__":
    main()