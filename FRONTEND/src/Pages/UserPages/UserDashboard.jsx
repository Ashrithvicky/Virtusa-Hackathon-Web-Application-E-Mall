import React from 'react';
import '../UserCssPages/UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h2>Welcome Back, User!</h2>
      <div className="stats">
        <div className="card">
          <h3>Total Bookings</h3>
          <p>5</p>
        </div>
        <div className="card">
          <h3>Active Bookings</h3>
          <p>2</p>
        </div>
      </div>

      <div className="actions">
        <button onClick={() => window.location.href = '/user/view-spaces'}>View Available Spaces</button>
        <button onClick={() => window.location.href = '/user/bookings'}>My Bookings</button>
        <button onClick={() => window.location.href = '/user/profile'}>Profile</button>
      </div>
    </div>
  );
};

export default UserDashboard;
