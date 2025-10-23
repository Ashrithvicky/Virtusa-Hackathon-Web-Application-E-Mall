import React from 'react';
import { Link } from 'react-router-dom';
import '../Pages/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>🏢 Welcome to eMall Property Management</h1>
      <p>Manage spaces, bookings, and more — all in one place.</p>
      <div className="auth-buttons">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
