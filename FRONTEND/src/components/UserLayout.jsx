import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/BarPages/UserSidebar'; // Import here
import './UserLayout.css';

const UserLayout = () => {
  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
