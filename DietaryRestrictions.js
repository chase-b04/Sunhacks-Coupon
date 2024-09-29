import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DietaryRestrictions() {
  const [restrictions, setRestrictions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setRestrictions((prev) => checked ? [...prev, value] : prev.filter((r) => r !== value));
  };

  const handleNext = () => {
    // Save the user's dietary restrictions.
    navigate('/recipes');
  };

  return (
    <div>
      <h2>Select Dietary Restrictions</h2>
      <form>
        <label>
          <input type="checkbox" value="Vegetarian" onChange={handleChange} />
          Vegetarian
        </label>
        <label>
          <input type="checkbox" value="Vegan" onChange={handleChange} />
          Vegan
        </label>
        <label>
          <input type="checkbox" value="Gluten-Free" onChange={handleChange} />
          Gluten-Free
        </label>
        {/* Add more dietary options as needed */}
      </form>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default DietaryRestrictions;
