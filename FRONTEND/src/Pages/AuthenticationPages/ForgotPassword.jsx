import React, { useState } from 'react';
import axios from 'axios';
import '../AuthenticationCssPages/ForgotPassword.css';

import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Check if passwords match
    if (form.newPassword !== form.confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }

    // ✅ Call your backend reset endpoint
    axios.post('http://localhost:8080/api/auth/reset-password', {
      email: form.email,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword
    })
      .then(() => {
        alert('✅ Password successfully reset!');
        setSubmitted(true);
      })
      .catch((err) => {
        console.error('❌ Error resetting password:', err);
        alert('Failed to reset password. Check email and try again.');
      });
  };

  return (
    <div className="forgot-container">
      <h2>Reset Password</h2>
      <form className="forgot-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Registered Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      {submitted && <p className="success-msg">✅ Password updated successfully!</p>}


      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>

    </div>
  );
};

export default ForgotPassword;
