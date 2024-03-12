#!/usr/bin/python3
import json
import sys
import subprocess
import re
import cgi
import cgitb
import os
import datetime 


cgitb.enable()
def clean_json(data):
  return re.sub(r'^[^\"]*\"', '"', data)

def execute_train_subprocess(train_gor_data):
    command = ["java", "-jar", "/home/h/hummelj/propra/gor/train.jar"]
    if train_gor_data['train_f']:
        with open('temp_train.fasta', 'w') as f:
            f.write(train_gor_data['train_f'].decode('utf-8'))
        train = 'temp_train.fasta'
    else:
        train = '/home/h/hummelj/propra/gor/training/train_1.txt'
    command.append("--db")
    command.append(train)
    
    if train_gor_data['gor_1']:
        version = "gor1"
    elif train_gor_data['gor_3']:
        version = "gor3"
    elif train_gor_data['gor_4']:
        version = "gor4"
    command.append("--method")
    command.append(version)
    
    
    dt = datetime.datetime.now()
    seq = int(dt.strftime("%Y%m%d%H%M%S"))
    outpath = f'{seq}-{version}.mod'
    command.append("--model")
    command.append(outpath)
    subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
  
    if train_gor_data['train_f']:
        os.remove('temp_train.fasta')

    outpath = f'../cgi-bin/api/{outpath}'
    return {
        'success': True,
        'output': outpath
    }
    
    


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
                train_f = None
            gor_data = {
                'train_f': train_f,
                'gor_1': form.getvalue('gor_1'),
                'gor_3': form.getvalue('gor_3'),
                'gor_4': form.getvalue('gor_4'),
            }
            result = {'data': execute_train_subprocess(gor_data)}
        elif mode == 'clean':
            mod_name = form.getvalue('mod_name')
            if mod_name:
                mod_name = mod_name.split('/')[-1].strip()
                os.remove(f'{mod_name}')
                result = {'cleaned up'}
            else:
                result = {'error': 'No mod_name provided'}
    except Exception as e:
        result = {'error': str(e)}

    # Print JSON response
    print(json.dumps(result))

if __name__ == "__main__":
    main()