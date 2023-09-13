import './Login.css'
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
  
    const handleLogin = () => {
   
        if (username === 'admin' && password === 'admin') {
          // Redirect to the dashboard page
          history.push('/dashboard');
        } else {
          // Handle login error (e.g., show an error message)
          alert('Login failed. Please check your username and password.');
        }
      };
  return (
    <div className="container">
    <h2>Login</h2>
    <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        className="input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button className="login-button" onClick={handleLogin}>
      Login
    </button>
  </div>
  )
}
