from flask import Flask, request, jsonify
import pandas as pd
import random
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables and set up OpenAI API key
load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=api_key)

app = Flask(__name__)

@app.route('/get_recipes', methods=['GET'])
def get_recipes():
    # Load recipes from the CSV file
    df = pd.read_csv('mock_recip_db.csv.csv')
    # Select 4 random recipes
    sample_recipes = df.sample(4).to_dict(orient='records')
    return jsonify(sample_recipes)

@app.route('/select_recipe', methods=['POST'])
def select_recipe():
    data = request.json
    selected_recipe_id = data['recipe_id']
    
    # Load recipes again to find the selected one
    df = pd.read_csv('mock_recip_db.csv.csv')
    selected_recipe = df.loc[df['id'] == selected_recipe_id].iloc[0]
    
    # Load coupon data
    coupon_df = pd.read_csv('mock_coupon_list.csv.csv')
    
    # Query OpenAI for coupon suggestions based on ingredients
    coupon_suggestions = query_openai(selected_recipe['ingredients_processed'], coupon_df)
    
    return jsonify(coupon_suggestions)

def query_openai(ingredients, coupon_df):
    print(f"Querying OpenAI for coupons related to: {ingredients}")
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "List coupons compatible with these ingredients."},
                {"role": "user", "content": f"Cross-reference these ingredients: {ingredients} with available coupons and return a shortlist of applicable coupons and the total sum saved."}
            ]
        )
        # Process response to extract coupons
        coupons_info = process_coupon_response(response.choices[0].message['content'], coupon_df)
        return coupons_info
    except Exception as e:
        print(f"Error querying OpenAI: {e}")
        return {'error': str(e)}

def process_coupon_response(coupon_text, coupon_df):
    # Dummy implementation: Parse the text and filter the coupon_df based on some criteria
    # For simplicity, assuming coupon_text is a list of coupon IDs
    coupon_ids = eval(coupon_text)
    applicable_coupons = coupon_df[coupon_df['coupon_id'].isin(coupon_ids)]
    total_savings = applicable_coupons['savings'].sum()
    return {'coupons': applicable_coupons.to_dict(orient='records'), 'total_savings': total_savings}

if __name__ == '__main__':
    app.run(debug=True)
