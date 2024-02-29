#!/usr/bin/python3
import json
import sys
import subprocess
import re
import cgi
import cgitb

cgitb.enable()

def execute_subprocess_3(fasta_content):
    with open('mrna_output.fasta', 'w') as f:
        f.write(fasta_content)
    
    
    command = ["python3", "/home/h/hummelj/propra/dna2rna/mrna2aa.py"]
    command.append("--fasta")
    command.append('mrna_output.fasta')

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

def execute_subprocess_2(fasta_content):
    with open('orf_output.fasta', 'w') as f:
        f.write(fasta_content)
    
    
    command = ["python3", "/home/h/hummelj/propra/dna2rna/dna2mrna.py"]
    command.append("--fasta")
    command.append('orf_output.fasta')

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
def execute_subprocess(organism_file, features_file):
    with open('temp_org.fa', 'w') as f:
        f.write(organism_file.decode('utf-8'))
    with open('temp_feat.tsv', 'w') as f:
        f.write(features_file.decode('utf-8'))
    
    
    command = ["python3", "/home/h/hummelj/propra/dna2rna/genome2orf.py"]
    command.append("--organism")
    command.append('temp_org.fa')
    command.append("--features")
    command.append('temp_feat.tsv')

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
        organism_file = form['organism'].file
        features_file = form['features'].file
        organism_content = organism_file.read()
        features_content = features_file.read()
     
        if organism_content and features_content:
            orf = execute_subprocess(organism_content, features_content)  
            if orf['success']:
                fasta_1 = orf['output']
                mrna = execute_subprocess_2(fasta_1)
                if mrna['success']:
                    fasta_2 = mrna['output']
                    aa = execute_subprocess_3(fasta_2)
                    result = {'data': aa}
                else:
                    result = {'error': 'Error in the mrna subprocess'}
            else:
                result = {'error': 'Error in the orf subprocess'}
        else:
            result = {'error': 'Missing swissprot file or keyword'}
    except Exception as e:
        result = {'error': str(e)}

    # Print JSON response
    print(json.dumps(result))

if __name__ == "__main__":
    main()