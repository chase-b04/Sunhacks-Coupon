Pantry Itemizer

API Documentation for Frontend Engineers
Endpoint: POST /analyze-image

Purpose: Analyzes an image to detect and list food items and their quantities.
Request:
Headers:
Content-Type: multipart/form-data
Body:
image: The image file to be analyzed.
Response:
Success (200 OK):
Body: JSON containing the detected food items and their quantities.
json
Copy code
{
  "data": {
    "items": [
      {"name": "Apples", "quantity": "2"},
      {"name": "Bananas", "quantity": "5"}
    ]
  }
}
Failure (400 Bad Request):
Body: Error message indicating what was wrong with the request.
json
Copy code
{
  "error": "No image provided"
}
Failure (500 Internal Server Error):
Body: Error message indicating problems with server or external services.
json
Copy code
{
  "error": "Failed to process image",
  "status_code": 500
}
Usage Notes
Frontend developers will need to ensure that the image file is properly encoded and uploaded as part of a multipart/form-data POST request.
Error handling on the frontend should gracefully manage different types of failures, providing appropriate user feedback.
The API endpoint URL will be provided once the backend is successfully deployed and its environment URL is known.
