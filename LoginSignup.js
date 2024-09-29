import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        username: email,
        password: password,
        latitude: latitude,
        longitude: longitude
      });
      if (response.status === 200) {
        console.log('Registration successful');
        navigate('/login');  // Redirect to login
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would authenticate the user.
    navigate('/dietary-restrictions');
  };

  return (
    <div>
      <h2>Login or Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/dietary-restrictions')}>Continue without Login</button>
    </div>
  );
}

export default LoginSignup;
