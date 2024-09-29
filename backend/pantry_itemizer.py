from flask import Flask, request, jsonify
import requests
import base64
from dotenv import load_dotenv
import os

# Load the .env file
load_dotenv()
# Set up OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

def encode_image_to_base64(image):
    """ Encodes an image file to base64. """
    return base64.b64encode(image.read()).decode('utf-8')

@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image']
    base64_image = encode_image_to_base64(image)
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }
    
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What food items are in this image and their quantities?"},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                ]
            }
        ],
        "max_tokens": 300
    }
    
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to process image', 'status_code': response.status_code}), 500

if __name__ == '__main__':
    app.run(debug=True)
