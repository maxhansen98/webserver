#!/usr/bin/python3
import json
import sys
import subprocess
import re
import cgi
import cgitb

cgitb.enable()

def execute_subprocess(fasta_content):
    with open('temp_seq.fasta', 'w') as f:
        f.write(fasta_content.decode('utf-8'))
    
    command = ["python3", "/home/h/hummelj/propra/orf/orf_finder_db.py"]
 
    command.append("--fasta")
    command.append('temp_seq.fasta')

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
        fasta_file = form['fasta'].file
        fasta_content = fasta_file.read() 
        if fasta_content:
            result = {'data': execute_subprocess(fasta_content)}
        else:
            result = {'error': 'Missing fasta file'}
    except Exception as e:
        result = {'error': str(e)}

    # Print JSON response
    print(json.dumps(result))

if __name__ == "__main__":
    main()