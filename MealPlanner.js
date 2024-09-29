import React, { useState, useEffect } from 'react';
import { getMealPlan, updateMealPlan } from './Api'; // Ensure the path matches your project structure

const MealPlanner = () => {
    const [mealPlan, setMealPlan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch meal plan on component mount
    useEffect(() => {
        const fetchMealPlan = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await getMealPlan();
                setMealPlan(data);
            } catch (err) {
                setError('Failed to fetch meal plan');
                console.error(err);
            }
            setLoading(false);
        };

        fetchMealPlan();
    }, []);

    // Handle form submission to update meal plan
    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(event.target);
        const newMealPlan = {
            breakfast: formData.get('breakfast'),
            lunch: formData.get('lunch'),
            dinner: formData.get('dinner')
        };

        try {
            await updateMealPlan(newMealPlan);
            setMealPlan(newMealPlan);
            alert('Meal plan updated successfully!');
        } catch (err) {
            setError('Failed to update meal plan');
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Meal Planner</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleUpdate}>
                <label>
                    Breakfast:
                    <input type="text" name="breakfast" defaultValue={mealPlan.breakfast || ''} required />
                </label>
                <br />
                <label>
                    Lunch:
                    <input type="text" name="lunch" defaultValue={mealPlan.lunch || ''} required />
                </label>
                <br />
                <label>
                    Dinner:
                    <input type="text" name="dinner" defaultValue={mealPlan.dinner || ''} required />
                </label>
                <br />
                <button type="submit" disabled={loading}>Update Meal Plan</button>
            </form>
        </div>
    );
};

export default MealPlanner;
