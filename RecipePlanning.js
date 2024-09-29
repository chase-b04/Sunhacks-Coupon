import React from 'react';
import { useNavigate } from 'react-router-dom';

function RecipePlanning() {
  const recipes = [
    { id: 1, name: 'Pasta', description: 'Delicious pasta recipe' },
    { id: 2, name: 'Salad', description: 'Healthy green salad' },
  ];

  const navigate = useNavigate();

  const handleAddToShoppingList = (recipe) => {
    // Add recipe ingredients to shopping list.
  };

  return (
    <div>
      <h2>Recipe Planning</h2>
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <button onClick={() => handleAddToShoppingList(recipe)}>Add to Shopping List</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/shopping-list')}>View Shopping List</button>
    </div>
  );
}

export default RecipePlanning;
