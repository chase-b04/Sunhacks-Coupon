import React, { useState, useEffect } from 'react';
import { getRecipes, selectRecipe } from './Api'; // Ensure Api.js is in the same directory or adjust the import path accordingly

const RecipePlanning = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [error, setError] = useState('');

    // Fetch recipes when the component mounts
    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const data = await getRecipes();
            setRecipes(data);
            setError('');
        } catch (err) {
            console.error('Failed to fetch recipes:', err);
            setError('Failed to load recipes. Please try again.');
        }
    };

    const handleSelectRecipe = async (recipeId) => {
        try {
            const data = await selectRecipe(recipeId);
            setSelectedRecipe(data);
            setError('');
            alert('Recipe selected successfully!');
        } catch (err) {
            console.error('Failed to select recipe:', err);
            setError('Failed to select recipe. Please try again.');
        }
    };

    return (
        <div>
            <h1>Recipe Planning</h1>
            {error && <p className="error">{error}</p>}
            <h2>Available Recipes</h2>
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            {recipe.title}
                            <button onClick={() => handleSelectRecipe(recipe.id)}>Select</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recipes available. Try reloading the page.</p>
            )}
            {selectedRecipe && (
                <div>
                    <h3>Selected Recipe</h3>
                    <p>Title: {selectedRecipe.title}</p>
                    <p>Ingredients: {selectedRecipe.ingredients_processed}</p>
                    <p>Directions: {selectedRecipe.directions}</p>
                </div>
            )}
        </div>
    );
};

export default RecipePlanning;
