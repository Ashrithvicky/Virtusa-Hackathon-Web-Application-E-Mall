import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../UserCssPages/UserBooking.css';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get(`/api/user/bookings/1`) // ✅ Corrected endpoint
      .then((res) => {
        setBookings(res.data);
        console.log('✅ Bookings fetched:', res.data);
      })
      .catch((err) => {
        console.error('❌ Error fetching bookings:', err);
        alert('Failed to fetch bookings');
      });
  };

  const handleCancel = (bookingId) => {
    axios.delete(`/api/user/bookings/${bookingId}`) // ✅ Use DELETE as defined in controller
      .then(() => {
        alert('✅ Booking canceled');
        fetchBookings();
      })
      .catch((err) => {
        console.error('❌ Cancel failed:', err);
        alert('Failed to cancel booking');
      });
  };

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="empty">No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Space Name</th>
              <th>Type</th>
              <th>Booking Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.space.name}</td>
                <td>{b.space.type}</td>
                <td>{b.bookingDate}</td>
                <td>{b.active ? 'Booked' : 'Cancelled'}</td>
                <td>
                  {b.active ? (
                    <button className="cancel" onClick={() => handleCancel(b.id)}>
                      Cancel
                    </button>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserBookings;
