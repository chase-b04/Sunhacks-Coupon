import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGeolocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {
            reject('Geolocation not enabled');
          }
        );
      } else {
        reject('Browser does not support Geolocation');
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const location = await handleGeolocation();
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });

      if (response.ok) {
        navigate('/dietary-restrictions');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      alert(error);
    }
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
