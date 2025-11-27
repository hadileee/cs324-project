import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import api from '../services/api';

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [opportunity, setOpportunity] = useState(null);
  const [error, setError] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/opportunities/${id}`);
        setOpportunity(res.data.opportunity);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load opportunity');
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunity();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      await api.post('/applications', { opportunityId: id, coverLetter });
      alert('Application submitted successfully');
      navigate('/student-portal');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      <AnimatedBackground type="full" />
      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3 py-5">
        <div className="w-100" style={{ maxWidth: '900px' }}>
          <div className="bg-white rounded shadow-sm p-4">
            {loading && <p className="text-muted">Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && opportunity && (
              <div>
                <h1 className="h4 fw-bold text-danger">{opportunity.title}</h1>
                <div className="text-muted small mb-3">{opportunity.type} • {opportunity.location}</div>
                <p>{opportunity.description}</p>

                <h5 className="mt-3">Details</h5>
                <ul>
                  {opportunity.duration && <li><strong>Duration:</strong> {opportunity.duration}</li>}
                  {opportunity.salary !== undefined && opportunity.salary !== null && (
                    <li><strong>Salary:</strong> {opportunity.salary} {opportunity.salaryType || ''}</li>
                  )}
                  {opportunity.applicationDeadline && <li><strong>Deadline:</strong> {new Date(opportunity.applicationDeadline).toLocaleDateString()}</li>}
                </ul>

                <div className="mt-4">
                  <h5>Apply</h5>
                  <textarea
                    className="form-control mb-2"
                    rows={6}
                    placeholder="Write a short cover letter (optional)"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                  <div className="d-flex gap-2">
                    <button className="btn btn-danger" onClick={handleApply} disabled={applying}>
                      {applying ? 'Applying…' : 'Submit Application'}
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OpportunityDetail;
