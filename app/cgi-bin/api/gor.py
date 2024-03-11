#!/usr/bin/python3
import json
import sys
import subprocess
import re
import cgi
import cgitb
import os

cgitb.enable()
def clean_json(data):
  return re.sub(r'^[^\"]*\"', '"', data)

def execute_train_subprocess(train_gor_data):
    command = ["java", "-jar", "/home/h/hummelj/propra/gor/train.jar"]


def execute_prediction_subprocess(gor_data):
    command = ["java", "-jar", "/home/h/hummelj/propra/gor/predict.jar"]
    if gor_data['mod_f']:
        with open('temp_mod.mod', 'w') as f:
            f.write(gor_data['mod_f'].decode('utf-8'))
        
        model = 'temp_mod.mod'
    else:
        model = '/home/h/hummelj/propra/gor/gor1cb513dssp.mod'
    command.append("--model")
    command.append(model)

    with open('temp_pred.fasta', 'w') as f:
        f.write(gor_data['pred_f'].decode('utf-8'))
    command.append("--seq")
    command.append('temp_pred.fasta')
    command.append("--format")
    command.append("txt")
    command.append("--probabilities")
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)  
    os.remove('temp_pred.fasta')
    if gor_data['mod_f']:
        os.remove('temp_mod.mod')
    
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
        mode = form.getvalue('mode')
        if mode == 'predict':
            default_model = form.getvalue('default_model')
            if not default_model:
                mod_f = form['mod_f'].file.read()
            else:
                mod_f = None
            gor_data = {
                'pred_f': form['pred_f'].file.read(),
                'mod_f': mod_f
            }
            result = {'data': execute_prediction_subprocess(gor_data)}
        elif mode == 'train':
            default_data = form.getvalue('default_data')
            if not default_data:
                train_f = form['train_f'].file.read()
            else:
                train_gor_data = None
            result = {'error': 'Training mode not implemented yet'}
        #result = {'data': {'mode': mode}}
    except Exception as e:
        result = {'error': str(e)}

    # Print JSON response
    print(json.dumps(result))

if __name__ == "__main__":
    main()