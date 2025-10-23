import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('http://localhost:8080/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Project Dashboard</h2>
        <button 
          onClick={() => navigate('/addProject')}
          className="add-project-btn"
        >
          Add New Project
        </button>
      </div>

      <div className="chart-container">
        <h3>Project Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={projects}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="id" fill="#8884d8" name="Project ID" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="table-container">
        <h3>Recent Projects</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;