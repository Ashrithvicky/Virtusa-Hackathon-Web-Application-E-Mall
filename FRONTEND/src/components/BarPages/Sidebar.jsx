import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // ✅ Add useNavigate
import '../BarCssPages/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate(); // ✅ Hook to navigate programmatically

  const handleLogout = () => {
    // Optional: Clear auth tokens or localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Navigate to login/signup (home) page
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Owner Panel</h2>
      <nav className="sidebar-nav">
        <NavLink to="/owner/dashboard" className="nav-link">Dashboard</NavLink>
        <NavLink to="/owner/spaces" className="nav-link">Space Allocation</NavLink>
        <NavLink to="/owner/complaints" className="nav-link">Complaints</NavLink>
        <NavLink to="/owner/reports" className="nav-link">Reports</NavLink>

        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
    </div>
  );
};

export default Sidebar;
