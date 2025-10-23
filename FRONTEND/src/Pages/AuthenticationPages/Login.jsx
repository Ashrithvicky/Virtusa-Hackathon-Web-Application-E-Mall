import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../AuthenticationCssPages/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'user', // default role
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  axios.post('http://localhost:8080/api/user/login', credentials)
    .then((res) => {
      const user = res.data; // ✅ FIXED: get actual user from response

      alert('✅ Login successful!');

      localStorage.setItem('userId', user.id); // ✅ Now this works
      localStorage.setItem('role', user.role);
      localStorage.setItem('token', user.token || 'dummy-token');

      // ✅ Navigate based on actual user role (from DB, not dropdown)
      if (user.role.toLowerCase() === 'owner') {
        navigate('/owner/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    })
    .catch((err) => {
      console.error('❌ Login failed:', err);
      alert('Invalid email or password.');
    });
};


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={credentials.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="owner">Owner</option>
        </select>

        <button type="submit">Login</button>
        <p className="forgot-link" onClick={() => navigate('/forgot-password')}>Forgot Password?</p>
      </form>
    </div>
  );
};

export default Login;
