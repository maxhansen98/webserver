#!/usr/bin/python3
import json
import sys
import subprocess
import re
import cgi
import cgitb

cgitb.enable()

def execute_subprocess(alignment_data):
    
    
    command = ["java", "-jar", "/home/h/hummelj/propra/alignment_v2/out/artifacts/alignment_jar/alignment.jar"]
    if alignment_data['go']:
        command.append("--go")
        command.append(alignment_data['go'])
    if alignment_data['ge']:
        command.append("--ge")
        command.append(alignment_data['ge'])

    mat = alignment_data['mx_content']
    if mat:
        with open('temp_mx.mat', 'w') as f:
            f.write(mat.decode('utf-8'))
        command.append("-m")
        command.append('temp_mx.mat')
    command.append("--mode")
    if alignment_data['global_align']:
        command.append("global")
    elif alignment_data['local_align']:
        command.append("local")
    elif alignment_data['freeshift_align']:
        command.append("freeshift")
    command.append("--format")
    command.append("json")
    if alignment_data['nw']:
        command.append("--nw")
    if alignment_data['seq_1']:
        # command.append("--seq_1")
        print(alignment_data['seq_1'])
    elif alignment_data['seq_1_f']:
        with open('temp_seq_1.seqlib', 'w') as f:
            f.write(alignment_data['seq_1_f'].decode('utf-8'))
        command.append("--seqlib")
        command.append('temp_seq_1.seqlib')
    
    if alignment_data['seq_2']:
        # command.append("--seq_2")
        print(alignment_data['seq_2'])
    elif alignment_data['seq_2_f']:
        with open('temp_seq_2.pairs', 'w') as f:
            f.write(alignment_data['seq_2_f'].decode('utf-8'))
        command.append("--pairs")
        command.append('temp_seq_2.pairs')


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
        if form.getvalue('pdbId'):
            seq_1 = form.getvalue('pdbId')
        elif form.getvalue('pdbId_f'):
            seq_1_f = form['pdbId_f'].file.read()
        
        if form.getvalue('pdbId2'):
            seq_2 = form.getvalue('pdbId2')
        elif form.getvalue('pdbId2_f'):
            seq_2_f = form['pdbId2_f'].file.read()

        go = form.getvalue('go')
        ge = form.getvalue('ge')
        global_align = form.getvalue('global') == 'on'
        local_align = form.getvalue('local') == 'on'
        freeshift_align = form.getvalue('freeshift') == 'on'
        nw = form.getvalue('nw') == 'on'
        gt = form.getvalue('gt') == 'on'
        mx_file = form['mat'].file
        mx_content = mx_file.read()
    
        alignment_data = {
        'seq_1': seq_1,
        'seq_2': seq_2,
        'seq_1_f': seq_1_f,
        'seq_2_f': seq_2_f,
        'go': go,
        'ge': ge,
        'global_align': global_align,
        'local_align': local_align,
        'freeshift_align': freeshift_align,
        'nw': nw,
        'gt': gt,
        'scoring_matrix': mx_content 
        }

        result = {'data': execute_subprocess(alignment_data)}
    except Exception as e:
        result = {'error': str(e)}

    # Print JSON response
    print(json.dumps(result))

if __name__ == "__main__":
    main()


"""
def eecute_subprocess(swissprot_content, keywords_b):
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

"""