# Recipe Chooser and Coupon Finder

Flask Setup: This script defines a simple Flask server with two routes:

/get_recipes: Returns four randomly selected recipes.
/select_recipe: Takes a POST request with a recipe ID, finds that recipe, queries the OpenAI API for coupon suggestions based on the recipe's ingredients, and returns those suggestions.
OpenAI API Integration: The query_openai function sends a prompt to the OpenAI API to get coupon suggestions based on the recipe ingredients. It uses dummy logic for processing the API's response, which should be replaced with your own logic to match the response structure and your coupon data schema.

Coupon Data: Assumes there is a CSV file named full_coupon_list.csv that contains coupon data which the script reads to check against the ingredients.


### API Documentation for Recipe and Coupon Selection Service
Base URL
The base URL for all API endpoints is dependent on the deployment setup. For local testing, it is usually:

arduino
Copy code
http://localhost:5000
Endpoints
1. Get Random Recipes
Returns a list of four randomly selected recipes.

URL /get_recipes

Method: GET

URL Params None

Data Params None

Success Response:

Code: 200 <br /> Content:
json
Copy code
[
    {
        "id": 1,
        "title": "Spaghetti Carbonara",
        "ingredients_processed": "Spaghetti, eggs, parmesan cheese, bacon",
        "directions": "Boil pasta, fry bacon, mix eggs and cheese, combine all.",
        "NER": "...",
        "link": "http://example.com/recipe1",
        "vegetarian": "no",
        "gluten_free": "no",
        "nut_free": "yes",
        "shellfish_free": "yes"
    },
    ...
]
Error Response:

Code: 500 INTERNAL SERVER ERROR <br /> Content: { error : "Failed to fetch recipes" }
Sample Call:

javascript
Copy code
fetch('http://localhost:5000/get_recipes')
  .then(response => response.json())
  .then(data => console.log(data));
2. Select Recipe and Get Coupon Suggestions
Accepts a selected recipe ID, fetches the corresponding recipe's ingredients, and returns applicable coupon suggestions.

URL /select_recipe

Method: POST

URL Params None

Data Params

json
Copy code
{
  "recipe_id": 1
}
Success Response:

Code: 200 <br /> Content:
json
Copy code
{
    "coupons": [
        {
            "coupon_id": "123",
            "description": "10% off on spaghetti",
            "savings": 2.50
        },
        ...
    ],
    "total_savings": 5.75
}
Error Response:

Code: 500 INTERNAL SERVER ERROR <br /> Content: { error : "Error querying OpenAI" }
Sample Call:

javascript
Copy code
fetch('http://localhost:5000/select_recipe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ recipe_id: 1 })
})
.then(response => response.json())
.then(data => console.log(data));
Notes
Make sure to handle network errors and provide appropriate user feedback on the front-end.
Adjust the base URL according to the deployment configuration when moving from development to production.





# Pantry Itemizer

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
