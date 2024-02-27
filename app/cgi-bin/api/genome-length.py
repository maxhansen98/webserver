#!/usr/bin/python3
import json
def execute_subprocess():
    return {
        'success': True,
        'output': '123TEST'
    }
 

def main():
    # Set content type to JSON
    print("Content-Type: application/json\n")

    # Execute subprocess
    result = execute_subprocess()

    # Print JSON response
    print(json.dumps(result))

if __name__ == "__main__":
    main()