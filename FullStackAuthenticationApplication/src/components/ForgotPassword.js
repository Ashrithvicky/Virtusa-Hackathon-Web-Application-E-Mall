import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./ForgotPassword.css"; // Import the CSS file

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%])[A-Za-z\d@*%]{8,}$/;

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!passwordRegex.test(newPassword)) {
      alert("Password must be strong.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/auth/forgot", { username, newPassword });
      alert("Password reset successful");
      navigate("/");
    } catch (error) {
      alert("Reset failed");
    }
  };

  return (
    <div className="forgot-bg">
      <form className="forgot-form" onSubmit={handleReset}>
        <h2>
          Forgot <span className="highlight">Password</span>
        </h2>
        <p className="subtitle">Enter your username and a new strong password.</p>
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
