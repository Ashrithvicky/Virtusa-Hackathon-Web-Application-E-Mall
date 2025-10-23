import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../UserCssPages/UserViewSpaces.css';

const UserViewSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate(); // ✅ use navigate instead of window.location.href

  useEffect(() => {
    axios.get('/api/user/available-spaces')
      .then((res) => setSpaces(res.data))
      .catch((err) => {
        console.error('❌ Error fetching spaces:', err);
        alert('Failed to load available spaces.');
      });
  }, []);

  const handleBook = (space) => {
    navigate(`/user/book-space/${space.id}`); // ✅ react-router correct way
  };

  return (
    <div className="user-view-spaces">
      <h2>Available Spaces</h2>
      {spaces.length === 0 ? (
        <p className="empty">No available spaces at the moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {spaces.map((space) => (
              <tr key={space.id}>
                <td>{space.id}</td>
                <td>{space.type}</td>
                <td>{space.name}</td>
                <td>
                  <button onClick={() => handleBook(space)}>Book Now</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserViewSpaces;
