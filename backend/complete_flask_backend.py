from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import random
import json

app = Flask(__name__)
CORS(app)  # Handles cross-origin requests

# Load recipes and coupons data
recipes_df = pd.read_csv('short_recipes.csv')
coupons_df = pd.read_csv('full_coupon_list.csv')

@app.route('/start-coupons', methods=['POST'])
def start_coupons():
    # Logic to initiate coupon collection or session
    return jsonify({'status': 'Coupon session started'})

@app.route('/stop-coupons', methods=['POST'])
def stop_coupons():
    # Logic to stop coupon collection or session
    return jsonify({'status': 'Coupon session stopped'})

@app.route('/get-recipes', methods=['GET'])
def get_recipes():
    # Fetch 4 random recipes
    sample_recipes = recipes_df.sample(4).to_dict(orient='records')
    return jsonify(sample_recipes)

@app.route('/select-recipe', methods=['POST'])
def select_recipe():
    # Selects a recipe based on ID provided by the frontend
    recipe_id = request.json.get('recipe_id')
    selected_recipe = recipes_df.loc[recipes_df['id'] == recipe_id].to_dict(orient='records')
    return jsonify(selected_recipe)

@app.route('/meal-plan', methods=['GET', 'POST'])
def meal_plan():
    # Endpoint to manage meal plans
    if request.method == 'POST':
        # Update or create a meal plan based on the input
        meal_plan_data = request.json
        with open('meal_plan.json', 'w') as f:
            json.dump(meal_plan_data, f)
        return jsonify({'status': 'Meal plan updated'})
    else:
        # Return the current meal plan
        try:
            with open('meal_plan.json', 'r') as f:
                meal_plan_data = json.load(f)
            return jsonify(meal_plan_data)
        except FileNotFoundError:
            return jsonify({'error': 'Meal plan not found'}), 404

@app.route('/shopping-list', methods=['GET', 'POST'])
def shopping_list():
    # Endpoint to manage shopping lists
    if request.method == 'POST':
        # Update or create a shopping list based on the input
        shopping_list_data = request.json
        with open('shopping_list.json', 'w') as f:
            json.dump(shopping_list_data, f)
        return jsonify({'status': 'Shopping list updated'})
    else:
        # Return the current shopping list
        try:
            with open('shopping_list.json', 'r') as f:
                shopping_list_data = json.load(f)
            return jsonify(shopping_list_data)
        except FileNotFoundError:
            return jsonify({'error': 'Shopping list not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
