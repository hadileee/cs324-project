import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import api from '../services/api';

const OpportunityApplications = () => {
  const { id } = useParams(); // opportunity id
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/applications/opportunity/${id}`);
        setApplications(res.data.applications || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [id]);

  const updateStatus = async (applicationId, status) => {
    try {
      await api.patch(`/applications/${applicationId}/status`, { status });
      setApplications(apps => apps.map(a => a._id === applicationId ? { ...a, status } : a));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <>
      <AnimatedBackground type="full" />
      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3 py-5">
        <div className="w-100" style={{ maxWidth: '900px' }}>
          <div className="bg-white rounded shadow-sm p-4">
            <h1 className="h4 fw-bold text-danger mb-3">Applications for Opportunity</h1>
            {loading && <p className="text-muted">Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {applications.length === 0 && !loading && (
              <p className="text-muted">No applications yet.</p>
            )}

            <div className="list-group">
              {applications.map((a) => (
                <div key={a._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{a.student?.firstName} {a.student?.lastName}</strong>
                    <div className="text-muted small">{a.student?.email}</div>
                    <div className="mt-2">{a.coverLetter}</div>
                  </div>
                  <div className="text-end">
                    <div className="mb-2"><span className={`badge ${a.status==='pending'?'bg-warning':a.status==='accepted'?'bg-success':'bg-secondary'}`}>{a.status}</span></div>
                    <div className="d-flex flex-column gap-1">
                      <button className="btn btn-sm btn-outline-success" onClick={() => updateStatus(a._id, 'accepted')}>Accept</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => updateStatus(a._id, 'rejected')}>Reject</button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => updateStatus(a._id, 'reviewed')}>Mark Reviewed</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpportunityApplications;
