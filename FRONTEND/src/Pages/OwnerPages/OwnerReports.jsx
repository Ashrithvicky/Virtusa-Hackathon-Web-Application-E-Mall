// File: src/pages/Owner/Reports.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../OwnerCssPages/OwnerReports.css';

const Reports = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [revenue, setRevenue] = useState(0);
  const [spaceStatus, setSpaceStatus] = useState([]);

  // Fetch space allocation summary on load
  useEffect(() => {
    axios.get('/api/owner/space-status')
      .then(res => setSpaceStatus(res.data))
      .catch(err => console.error('Error fetching space status:', err));
  }, []);

  // Fetch revenue for selected date range
  const handleRevenueFetch = () => {
    if (fromDate && toDate) {
      axios.get(`/api/owner/revenue?from=${fromDate}&to=${toDate}`)
        .then(res => setRevenue(res.data.total))
        .catch(err => console.error('Error fetching revenue:', err));
    }
  };

  return (
    <div className="reports-container">
      <h1>Reports</h1>

      {/* Revenue Section */}
      <div className="revenue-section">
        <h2>Revenue Overview</h2>
        <div className="date-inputs">
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <button onClick={handleRevenueFetch}>Get Revenue</button>
        </div>
        <p className="revenue-display">Total Revenue: ₹{revenue}</p>
      </div>

      {/* Space Allocation Status Table */}
      <div className="space-status-section">
        <h2>Space Usage Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Space Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Occupied By</th>
            </tr>
          </thead>
          <tbody>
            {spaceStatus.map(space => (
              <tr key={space.id}>
                <td>{space.name}</td>
                <td>{space.type}</td>
                <td className={space.allocated ? 'status allocated' : 'status free'}>
                  {space.allocated ? 'Occupied' : 'Available'}
                </td>
                <td>{space.allocated ? space.occupiedBy : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
