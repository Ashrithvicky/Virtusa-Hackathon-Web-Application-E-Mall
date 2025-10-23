import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddProject.css';

const AddProjectPage = () => {
  const { userId } = useParams(); // Get userId from URL
  const [project, setProject] = useState({
    name: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `http://localhost:8080/api/auth/${userId}/project`, 
      {  // Send as request body instead of params
        name: project.name,
        description: project.description
      }
    );
    
    if (response.data.success) {
      alert('Project added successfully!');
      navigate('/dashboard');
    } else {
      alert('Failed to add project: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error adding project:', error);
    alert(error.response?.data?.message || 'Error adding project');
  }
};





  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-project-container">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Project</button>
      </form>
    </div>
  );
};

export default AddProjectPage;