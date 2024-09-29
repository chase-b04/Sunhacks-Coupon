import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
