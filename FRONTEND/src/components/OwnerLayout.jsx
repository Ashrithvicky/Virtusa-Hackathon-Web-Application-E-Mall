import React from 'react';
import Sidebar from '../components/BarPages/Sidebar';
import '../components/OwnerLayout.css';
import { Outlet } from 'react-router-dom';

const OwnerLayout = () => {
  return (
    <div className="owner-layout">
      <Sidebar />
      <main className="owner-main">
        <Outlet />  {/* ✅ Correct usage for nested routing */}
      </main>
    </div>
  );
};

export default OwnerLayout;
