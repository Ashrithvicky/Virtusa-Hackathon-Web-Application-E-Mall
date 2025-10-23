import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../OwnerCssPages/OwnerDashboard.css';

const Dashboard = () => {
  const [salesData, setSalesData] = useState({ monthly: 0, weekly: 0 });
  const [bookedDates, setBookedDates] = useState([]);

  // Fetch sales and booking data when the component mounts
  useEffect(() => {
    axios.get('/api/owner/sales')
      .then(res => setSalesData(res.data))
      .catch(err => console.error('Sales fetch error:', err));

    axios.get('/api/owner/booked-dates')
      .then(res => setBookedDates(res.data))
      .catch(err => console.error('Booking fetch error:', err));
  }, []);

  // Style calendar tiles: mark booked days as red and others as green
  const tileClassName = ({ date }) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookedDates.includes(dateStr) ? 'booked' : 'available';
  };

  return (
    <div className="dashboard-container">
      <h1>Owner Dashboard</h1>

      {/* Sales Overview Cards */}
      <div className="sales-cards">
        <div className="card">
          <h3>Monthly Sales</h3>
          <p>₹{salesData.monthly}</p>
        </div>
        <div className="card">
          <h3>Weekly Sales</h3>
          <p>₹{salesData.weekly}</p>
        </div>
      </div>

      {/* Calendar Section for Bookings */}
      <div className="calendar-section">
        <h2>Space Booking Overview</h2>
        <Calendar tileClassName={tileClassName} />
        <div className="legend">
          <span className="booked"></span> Booked
          <span className="available"></span> Available
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
