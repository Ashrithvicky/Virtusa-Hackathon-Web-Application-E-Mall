import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../AuthenticationCssPages/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // default role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/user/register', form)
      .then(() => {
        alert('✅ Signup successful! Please login.');
        navigate('/login');
      })
      .catch((err) => {
        console.error('❌ Signup failed:', err);
        alert('Signup failed. Please try again.');
      });
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="owner">Owner</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
