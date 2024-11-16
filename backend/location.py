import google.generativeai as genai
from flask import Flask, request, jsonify
# Initialize Flask app
app = Flask(_name_)
genai.configure(api_key="AIzaSyB_wNX9a-mJ2B-U26k9S4b11Tsuq4ZE4C0")
# Initialize the model (ensure the model name is correct, e.g., "gemini-1.5-flash")
model_name = "gemini-1.5-flash"  # Check that this is the correct model name
model = genai.GenerativeModel(model_name=model_name)
# Start the chat model
chat = model.start_chat(history=[])
# Define the route to handle the POST request
@app.route('/ask', methods=['POST'])
def ask_model():
    # Get the data from the incoming POST request (JSON format)
    data = request.get_json()
    # Extract the location from the request data
    location = data.get('location') 
    if not location:
        return jsonify({"error": "Location not provided"}), 400
    # Construct the question
    ques = f"tell me the top 3 trees to plant in {location}, only names of the trees"
    try:
        # Send the message to the model and get the response
        res = chat.send_message(ques)
        # Return the response in JSON format
        return jsonify({"response": res.text}), 200
    except Exception as e:
        # Handle any errors that might occur during the API call
        return jsonify({"error": str(e)}), 500
# Start the Flask web server (you can set debug=True during development)
if _name_ == '_main_':
    app.run(debug=True)