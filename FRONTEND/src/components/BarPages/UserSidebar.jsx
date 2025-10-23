import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../BarCssPages/UserSidebar.css'; // Optional: separate styling

const UserSidebar = () => {
  const navigate = useNavigate(); // ✅ Fix: Declare the navigate function

  return (
    <aside className="user-sidebar">
      <h2>User Panel</h2>
      <nav className="user-nav">
        <NavLink to="/user/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
        <NavLink to="/user/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
        <NavLink to="/user/view-spaces" className={({ isActive }) => isActive ? 'active' : ''}>View Spaces</NavLink>
        <NavLink to="/user/book-spaces" className={({ isActive }) => isActive ? 'active' : ''}>Book Space</NavLink>
        <NavLink to="/user/booking" className={({ isActive }) => isActive ? 'active' : ''}>My Bookings</NavLink>
        <NavLink to="/user/raise-complaint" className={({ isActive }) => isActive ? 'active' : ''}>Raise Complaint</NavLink>

        <button onClick={() => {
          localStorage.clear(); // or remove specific items if you prefer
          navigate('/logout');
        }} className="logout-button">
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default UserSidebar;
