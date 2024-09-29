import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { startCoupons, stopCoupons, getRecipes, selectRecipe, getMealPlan, updateMealPlan, getShoppingList, updateShoppingList } from './Api';

// Importing other components
import Recipes from './Recipes';
import MealPlanner from './MealPlanner';
import ShoppingList from './ShoppingList';
import Coupons from './Coupons';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/recipes">Recipes</Link></li>
                        <li><Link to="/meal-planner">Meal Planner</Link></li>
                        <li><Link to="/shopping-list">Shopping List</Link></li>
                        <li><Link to="/coupons">Coupons</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/recipes">
                        <Recipes />
                    </Route>
                    <Route path="/meal-planner">
                        <MealPlanner />
                    </Route>
                    <Route path="/shopping-list">
                        <ShoppingList />
                    </Route>
                    <Route path="/coupons">
                        <Coupons />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

const Home = () => {
    return <h1>Welcome to the Recipe and Coupon Application</h1>;
};

export default App;
