import React from 'react';

function MealPlanner() {
  const meals = [
    { day: 'Monday', meal: 'Pasta' },
    { day: 'Tuesday', meal: 'Salad' },
    { day: 'Wednesday', meal: 'Soup' },
    { day: 'Thursday', meal: 'Stir Fry' },
    { day: 'Friday', meal: 'Tacos' },
  ];

  return (
    <div>
      <h2>Meal Planner</h2>
      <div className="calendar">
        <p>Weekly Meal Planner</p>
        <ul>
          {meals.map((meal, index) => (
            <li key={index}>
              {meal.day}: {meal.meal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MealPlanner;
