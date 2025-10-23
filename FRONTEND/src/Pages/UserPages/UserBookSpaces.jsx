import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../UserCssPages/UserBookSpaces.css';

const UserBookSpace = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);
  const [bookingDate, setBookingDate] = useState('');

  // ✅ Get userId from localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!spaceId) {
      console.error('❌ No spaceId provided');
      return;
    }

    axios.get(`/api/user/space/${spaceId}`)
      .then((res) => setSpace(res.data))
      .catch((err) => {
        console.error('❌ Error fetching space:', err);
        alert('Failed to load space details');
      });
  }, [spaceId]);

  const handleBooking = (e) => {
    e.preventDefault();

    if (!bookingDate) {
      alert('Please select a booking date');
      return;
    }

    if (!userId) {
      alert('User not logged in');
      navigate('/login');
      return;
    }

    axios.post('/api/user/book', {
      userId: parseInt(userId),
      spaceId: parseInt(spaceId),
      date: bookingDate,
    })
      .then(() => {
        alert('✅ Space booked successfully!');
        navigate('/user/bookings');
      })
      .catch((err) => {
        console.error('❌ Booking failed:', err);
        alert('Booking failed. Please try again.');
      });
  };

  return (
    <div className="user-book-space">
      <h2>Book Space</h2>
      {space ? (
        <form onSubmit={handleBooking}>
          <div className="space-details">
            <p><strong>ID:</strong> {space.id}</p>
            <p><strong>Name:</strong> {space.name}</p>
            <p><strong>Type:</strong> {space.type}</p>
          </div>

          <div className="booking-form">
            <label>Select Booking Date:</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
            <button type="submit">Confirm Booking</button>
          </div>
        </form>
      ) : (
        <p className="loading">Loading space info...</p>
      )}
    </div>
  );
};

export default UserBookSpace;
