from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS module
import google.generativeai as genai
import cv2
from PIL import Image
import io

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for localhost:3000
CORS(app, origins="http://localhost:3000")

# Initialize the generative AI model
genai.configure(api_key="AIzaSyB_wNX9a-mJ2B-U26k9S4b11Tsuq4ZE4C0")
model_name = "gemini-1.5-flash"  # Check that this is the correct model name
model = genai.GenerativeModel(model_name=model_name)

# Start the chat model
chat = model.start_chat(history=[])

# Define the route to handle the POST request
@app.route('/ask', methods=['POST'])
def ask_model():
    data = request.get_json()
    location = data.get('location') 
    if not location:
        return jsonify({"error": "Location not provided"}), 400

    # Construct the question
    ques = f"tell me the top 3 trees to plant in {location}, only names of the trees"
    try:
        # Send the message to the model and get the response
        res = chat.send_message(ques)
        return jsonify({"response": res.text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to capture and process image
@app.route('/capture', methods=['POST'])
def capture_image():
    try:
        img_data = request.files['image'].read()
        image = Image.open(io.BytesIO(img_data))
        image.save("saved_img.jpg")

        # Preprocess the image (grayscale, resize)
        img_ = cv2.imread("saved_img.jpg", cv2.IMREAD_GRAYSCALE)
        img_resized = cv2.resize(img_, (28, 28))

        # Save the processed image
        cv2.imwrite("saved_img-final.jpg", img_resized)

        # Generate response using the model
        query = "What is the percentage of forest cover in the"
        response = model.generate_content([query, image])

        return jsonify({'response': response.text})

    except Exception as e:
        return jsonify({'error': str(e)})

# Route to serve the index page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
