import React, { useState } from 'react';
import axios from 'axios';
import '../UserCssPages/UserRaiseComplaint.css';

const UserRaiseComplaint = () => {
  const [complaint, setComplaint] = useState({
    user: 'user1', // 🔁 Replace this with actual session/auth username
    text: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint({ ...complaint, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!complaint.text) {
      alert('Please enter a complaint description.');
      return;
    }

    // Optional: Add current date
    const complaintToSend = {
      ...complaint,
      date: new Date().toISOString().split('T')[0], // yyyy-mm-dd
    };

    axios.post('/api/user/complaints', complaintToSend)
      .then(() => {
        alert('✅ Complaint submitted successfully!');
        setComplaint({ user: 'user1', text: '', category: '' });
      })
      .catch((err) => {
        console.error('❌ Failed to submit complaint:', err);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="complaint-form-container">
      <h2>Raise a Complaint</h2>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <label>Description *</label>
        <textarea
          name="text"
          rows="4"
          value={complaint.text}
          onChange={handleChange}
          required
        ></textarea>

        <label>Category (optional)</label>
        <select name="category" value={complaint.category} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Space Issue">Space Issue</option>
          <option value="Booking Issue">Booking Issue</option>
          <option value="Service">Service</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

export default UserRaiseComplaint;
