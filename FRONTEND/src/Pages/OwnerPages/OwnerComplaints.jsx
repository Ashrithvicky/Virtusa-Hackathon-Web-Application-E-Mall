import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../OwnerCssPages/OwnerComplaints.css';

const PAGE_SIZE = 10;

const OwnerComplaints = () => {
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [pendingPage, setPendingPage] = useState(0);
  const [resolvedPage, setResolvedPage] = useState(0);
  const [pendingTotalPages, setPendingTotalPages] = useState(0);
  const [resolvedTotalPages, setResolvedTotalPages] = useState(0);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [resolvedLoading, setResolvedLoading] = useState(false);

  useEffect(() => {
    fetchComplaints('pending', pendingPage);
  }, [pendingPage]);

  useEffect(() => {
    fetchComplaints('resolved', resolvedPage);
  }, [resolvedPage]);
  const fetchComplaints = (type, page) => {
  const pagedType = type === 'pending' ? 'pending-paged' : 'resolved-paged';

  if (type === 'pending') setPendingLoading(true);
  else setResolvedLoading(true);

  axios.get(`/api/owner/complaints/${pagedType}?page=${page}&size=${PAGE_SIZE}`)
    .then(res => {
      if (type === 'pending') {
        setPendingComplaints(res.data.content);
        setPendingTotalPages(res.data.totalPages);
      } else {
        setResolvedComplaints(res.data.content);
        setResolvedTotalPages(res.data.totalPages);
      }
    })
    .catch(err => console.error(`Error fetching ${type} complaints:`, err))
    .finally(() => {
      if (type === 'pending') setPendingLoading(false);
      else setResolvedLoading(false);
    });
};



  const handleResolve = useCallback((id) => {
    axios.post(`/api/owner/complaints/resolve/${id}`)
      .then(() => fetchComplaints('pending', pendingPage))
      .catch(err => console.error('Error resolving complaint:', err));
  }, [pendingPage]);

  const renderPagination = (page, totalPages, setPage) => (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>⬅ Prev</button>
      <span>Page {page + 1} of {totalPages}</span>
      <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next ➡</button>
    </div>
  );

  return (
    <div className="complaints-container">
      <h1>Complaints Dashboard</h1>

      {/* PENDING SECTION */}
      <div className="complaint-section">
        <h2>Pending Complaints</h2>
        {pendingLoading ? <p>Loading...</p> : (
          <>
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingComplaints?.length > 0 ? (
                  pendingComplaints.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.user}</td>
                      <td>{c.text}</td>
                      <td>{c.category || '-'}</td>
                      <td>{new Date(c.date).toLocaleDateString()}</td>
                      <td>
                        <button className="resolve-btn" onClick={() => handleResolve(c.id)}>
                          Resolve
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6">No pending complaints.</td></tr>
                )}
              </tbody>
            </table>
            {renderPagination(pendingPage, pendingTotalPages, setPendingPage)}
          </>
        )}
      </div>

      {/* RESOLVED SECTION */}
      <div className="complaint-section">
        <h2>Resolved Complaints</h2>
        {resolvedLoading ? <p>Loading...</p> : (
          <>
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {resolvedComplaints?.length > 0 ? (
                  resolvedComplaints.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.user}</td>
                      <td>{c.text}</td>
                      <td>{c.category || '-'}</td>
                      <td>{new Date(c.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No resolved complaints.</td></tr>
                )}
              </tbody>
            </table>
            {renderPagination(resolvedPage, resolvedTotalPages, setResolvedPage)}
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerComplaints;
