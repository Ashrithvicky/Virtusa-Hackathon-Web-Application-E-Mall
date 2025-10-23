// src/pages/Logout.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear authentication tokens / roles
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // or any other key you're using
    localStorage.removeItem('email'); // optional

    // ✅ Redirect to home page (login/signup)
    navigate('/');
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
