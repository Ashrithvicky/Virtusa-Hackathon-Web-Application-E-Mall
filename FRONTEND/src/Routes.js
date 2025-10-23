import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Home from '../src/Pages/Home';
import Signup from '../src/Pages/AuthenticationPages/Signup';
import Login from '../src/Pages/AuthenticationPages/Login';
import ForgotPassword from '../src/Pages/AuthenticationPages/ForgotPassword';
import ResetPassword from '../src/Pages/AuthenticationPages/ResetPassword';

// In your App.js or Routes.js
import Logout from '../src/Pages/AuthenticationPages/Logout';

// Owner Pages
import OwnerLayout from './components/OwnerLayout';
import Dashboard from './Pages/OwnerPages/OwnerDasboard';
import SpaceAllocation from './Pages/OwnerPages/OwnerSpaceAllocation';
import Complaints from './Pages/OwnerPages/OwnerComplaints';
import Reports from './Pages/OwnerPages/OwnerReports';

// User Pages
import UserLayout from './components/UserLayout';
import UserDashboard from './Pages/UserPages/UserDashboard';
import UserProfile from './Pages/UserPages/UserProfile';
import UserBookSpace from './Pages/UserPages/UserBookSpaces';
import UserViewSpaces from './Pages/UserPages/UserViewSpaces';
import UserBooking from './Pages/UserPages/UserBooking';
import UserRaiseComplaint from './Pages/UserPages/UserRaiseComplaint';




// 🔐 Protected Route
const ProtectedRoute = ({ children, role }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const userRole = (localStorage.getItem('role') || '').toLowerCase();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
};

const RoutesIndex = () => {
  return (
    <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />
  <Route path="/logout" element={<Logout />} /> {/* ✅ Keep only this! */}

  {/* Owner Routes */}
  <Route
    path="/owner"
    element={
      <ProtectedRoute role="owner">
        <OwnerLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="spaces" element={<SpaceAllocation />} />
    <Route path="complaints" element={<Complaints />} />
    <Route path="reports" element={<Reports />} />
    {/* ❌ DELETE this line: <Route path="/logout" element={<Logout />} /> */}
  </Route>

  {/* User Routes */}
  <Route
    path="/user"
    element={
      <ProtectedRoute role="user">
        <UserLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="profile" element={<UserProfile />} />
    <Route path="book-spaces" element={<UserBookSpace />} />
    <Route path="view-spaces" element={<UserViewSpaces />} />
    <Route path="book-space/:spaceId" element={<UserBookSpace />} />
    <Route path="booking" element={<UserBooking />} />
    <Route path="raise-complaint" element={<UserRaiseComplaint />} />
  </Route>

  {/* Fallback */}
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>

  );
};

export default RoutesIndex;
