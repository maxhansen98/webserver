#!/usr/bin/python3
import json
import subprocess
import re
import cgi


def execute_subprocess(pdbs):    
    command = ["python3", "/home/h/hummelj/propra/homstrad/homstrad/get_alignments.py", "--pdb"]
    pdbs = re.findall(r'"([^"]*)"', pdbs)
    for pdb in pdbs:
        command.append(pdb)
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
        pdbs = form.getvalue('pdb')
        if pdbs is not None:
            result = {'data': execute_subprocess(pdbs)}

        else:
            result = {'error': 'Missing pdb'}
    except Exception as e:
        result = {'error': str(e)}

    # Print JSON response
    print(json.dumps(result))


if __name__ == "__main__":
    main()