import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import DietaryRestrictions from './DietaryRestrictions';
import RecipePlanning from './RecipePlanning';
import ShoppingList from './ShoppingList';
import MealPlanner from './MealPlanner';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dietary-restrictions" element={<DietaryRestrictions />} />
          <Route path="/recipes" element={<RecipePlanning />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
