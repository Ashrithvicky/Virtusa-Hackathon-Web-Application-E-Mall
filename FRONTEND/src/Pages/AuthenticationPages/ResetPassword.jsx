import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../AuthenticationCssPages/ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams(); // Assuming the reset token is passed in the URL
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    axios.post('/api/auth/reset-password', { token, password })
      .then(() => {
        alert('✅ Password reset successfully. Please login.');
        navigate('/login');
      })
      .catch((err) => {
        console.error('❌ Error resetting password:', err);
        alert('Reset failed. Token might be invalid or expired.');
      });
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form className="reset-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
