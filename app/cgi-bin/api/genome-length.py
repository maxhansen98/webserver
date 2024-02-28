#!/usr/bin/python3
import json
import sys
import subprocess
import re


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
    body = json.loads(sys.stdin.read())
    try:
        organism_patterns = body.get('organism')
        result = {'data':execute_subprocess(organism_patterns)}
    except KeyError:
        result = {'error': 'Missing organism_patterns'}
    

    


    # Print JSON response
    print(json.dumps(result))

if __name__ == "__main__":
    main()