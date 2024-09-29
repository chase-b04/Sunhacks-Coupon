import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Change this according to your actual backend URL

// Function to start coupon session
export const startCoupons = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/start-coupons`);
        return response.data;
    } catch (error) {
        console.error('Error starting coupons:', error);
        throw error;
    }
};

// Function to stop coupon session
export const stopCoupons = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/stop-coupons`);
        return response.data;
    } catch (error) {
        console.error('Error stopping coupons:', error);
        throw error;
    }
};

// Function to fetch recipes
export const getRecipes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-recipes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

// Function to select a recipe
export const selectRecipe = async (recipeId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/select-recipe`, { recipe_id: recipeId });
        return response.data;
    } catch (error) {
        console.error('Error selecting recipe:', error);
        throw error;
    }
};

// Function to get the meal plan
export const getMealPlan = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/meal-plan`);
        return response.data;
    } catch (error) {
        console.error('Error getting meal plan:', error);
        throw error;
    }
};

// Function to update the meal plan
export const updateMealPlan = async (mealPlanData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/meal-plan`, mealPlanData);
        return response.data;
    } catch (error) {
        console.error('Error updating meal plan:', error);
        throw error;
    }
};

// Function to get the shopping list
export const getShoppingList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/shopping-list`);
        return response.data;
    } catch (error) {
        console.error('Error getting shopping list:', error);
        throw error;
    }
};

// Function to update the shopping list
export const updateShoppingList = async (shoppingListData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/shopping-list`, shoppingListData);
        return response.data;
    } catch (error) {
        console.error('Error updating shopping list:', error);
        throw error;
    }
};
