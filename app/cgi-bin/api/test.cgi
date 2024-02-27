#!/usr/bin/python3
import cgi
import json
import os

print("Content-Type: application/json")
print()

form = cgi.FieldStorage()

if form.length > 0 and form.file is not None:
    # Read and parse the JSON body
    post_data = json.loads(form.file.read())
    
    # Check if the JSON contains a 'name' key
    if "name" in post_data:
        name = post_data["name"]
        response = {"message": f"Hello, {name}!"}
    else:
        response = {"message": "Hello, World!"}
else:
    response = {"error": "No JSON body found in the POST request."}
# Print the JSON response
print(json.dumps({"test":"test"}))
