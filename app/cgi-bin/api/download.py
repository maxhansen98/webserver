#!/usr/bin/python3
import json
from http import HTTPStatus
import os

def download_model(form):
  try:
    model_id = form.getvalue('model_id')
    if not model_id:
      return create_error_response("Missing model identifier")

    # Define the path to the model file based on the identifier
    model_path = f"{model_id}.mod"

    # Check if the model file exists
    if not os.path.exists(model_path):
      return create_error_response("Model not found")

    # Open the model file and read its content
    with open(model_path, "rb") as f:
      model_data = f.read()

  except Exception as e:
    return create_error_response(f"Error retrieving model: {str(e)}")

  # Success response (model data)
  response = {'data': model_data.decode('utf-8')}
  return json.dumps(response)

def create_error_response(message):
  """
  Creates a JSON-formatted error response object with a specific message.

  Args:
      message: The error message to include in the response.

  Returns:
      A JSON-formatted response object with the error message 
      and appropriate status code.
  """
  error_data = {'error': message}
  response = json.dumps(error_data)
  return response(status=HTTPStatus.NOT_FOUND)

# Main execution (assuming CGI framework handles form parsing)
print("Content-Type: application/json\n")
print(download_model(os.environ))
