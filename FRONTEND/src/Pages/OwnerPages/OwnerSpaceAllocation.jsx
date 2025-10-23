import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../OwnerCssPages/OwnerSpaceAllocation.css';

const SpaceAllocation = () => {
  const [spaces, setSpaces] = useState([]);
  const [newSpace, setNewSpace] = useState({ name: '', type: '', allocated: false });

  // Fetch space data when component mounts
  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = () => {
    axios.get('/api/owner/spaces')
      .then(res => {
        setSpaces(res.data);
        console.log('✅ Spaces fetched:', res.data);
      })
      .catch(err => {
        console.error('❌ Error fetching spaces:', err);
        alert('Failed to fetch spaces.');
      });
  };

  // Handle allocation or deallocation
  const handleAllocation = (spaceId, action) => {
    const url = action === 'allocate' ? '/api/owner/allocate' : '/api/owner/deallocate';
    axios.post(url, { spaceId })
      .then(() => {
        console.log(`✅ Space ${action}d successfully`);
        fetchSpaces();
      })
      .catch(err => {
        console.error(`❌ Error during ${action}:`, err);
        alert(`Failed to ${action} space.`);
      });
  };

  // Handle add new space
  const handleAddSpace = (e) => {
    e.preventDefault();
    if (!newSpace.name || !newSpace.type) {
      alert('Please enter valid space name and type.');
      return;
    }

    axios.post('/api/owner/spaces', newSpace)
      .then(() => {
        console.log('✅ Space added successfully');
        setNewSpace({ name: '', type: '', allocated: false });
        fetchSpaces();
      })
      .catch(err => {
        console.error('❌ Error adding space:', err);
        alert('Failed to add space. Check backend API.');
      });
  };

  // Handle delete space
  const handleDelete = (id) => {
    axios.delete(`/api/owner/spaces/${id}`)
      .then(() => {
        console.log('✅ Space deleted successfully');
        fetchSpaces();
      })
      .catch(err => {
        console.error('❌ Error deleting space:', err);
        alert('Failed to delete space.');
      });
  };

  return (
    <div className="space-allocation-container">
      <h1>Space Allocation</h1>

      {/* Add New Space Form */}
      <form className="add-space-form" onSubmit={handleAddSpace}>
        <input
          type="text"
          placeholder="Space Name"
          value={newSpace.name}
          onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
          required
        />
        <select
          value={newSpace.type}
          onChange={(e) => setNewSpace({ ...newSpace, type: e.target.value })}
          required
        >
          <option value="">Select Type</option>
          <option value="Small Shop">Small Shop</option>
          <option value="Medium Shop">Medium Shop</option>
          <option value="Large Shop">Large Shop</option>
          <option value="Atrium Part 1">Atrium Part 1</option>
          <option value="Atrium Part 2">Atrium Part 2</option>
          <option value="Cinema Theatre">Cinema Theatre</option>
          <option value="Banner">Banner</option>
        </select>
        <button type="submit">Add Space</button>
      </form>

      {/* Section for listing spaces */}
      <div className="space-table">
        <table>
          <thead>
            <tr>
              <th>Space ID</th>
              <th>Type</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {spaces.map(space => (
              <tr key={space.id}>
                <td>{space.id}</td>
                <td>{space.type}</td>
                <td>{space.name}</td>
                <td>
                  <span className={space.allocated ? 'status allocated' : 'status free'}>
                    {space.allocated ? 'Allocated' : 'Free'}
                  </span>
                </td>
                <td>
                  {space.allocated ? (
                    <button className="deallocate" onClick={() => handleAllocation(space.id, 'deallocate')}>
                      Deallocate
                    </button>
                  ) : (
                    <button className="allocate" onClick={() => handleAllocation(space.id, 'allocate')}>
                      Allocate
                    </button>
                  )}
                  <button className="delete" onClick={() => handleDelete(space.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpaceAllocation;
