import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file
import logo from "../assests/logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("username", username);
        navigate("/home");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-bg">
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-logo-wrap">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Login</h2>
        </div>
        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          Login
        </button>
        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="login-links">
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  );
}
