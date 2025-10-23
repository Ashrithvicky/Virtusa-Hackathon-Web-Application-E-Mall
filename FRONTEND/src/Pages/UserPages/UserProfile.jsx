import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../UserCssPages/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('User ID not found. Please login again.');
    return;
  }

  axios.get(`http://localhost:8080/api/user/${userId}`)
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.error('❌ Failed to fetch user profile:', err);
      alert('Could not load profile');
    });
};


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
  const userId = localStorage.getItem('userId');

  axios.put(`http://localhost:8080/api/user/${userId}`, user)
    .then(() => {
      alert('✅ Profile updated successfully');
      setEditing(false);
    })
    .catch(err => {
      console.error('❌ Error updating profile:', err);
      alert('Failed to update profile');
    });
};


  return (
    <div className="user-profile">
      <h2>Your Profile</h2>
      <div className="profile-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          disabled={!editing}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          disabled={!editing}
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          disabled={!editing}
        />

        {!editing ? (
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        ) : (
          <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
