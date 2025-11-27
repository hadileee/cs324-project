import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import api from '../services/api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Opportunities = () => {
  const query = useQuery();
  const type = query.get('type') || '';
  const [loading, setLoading] = useState(true);
  const [opps, setOpps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        const params = {};
        if (type) params.type = type;
        const res = await api.get('/opportunities', { params });
        setOpps(res.data.opportunities || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load opportunities');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [type]);

  const titleMap = {
    research: 'Research Opportunities',
    internship: 'Internships',
    graduate_job: 'Graduate Jobs',
  };

  return (
    <>
      <AnimatedBackground type="full" />
      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3 py-5">
        <div className="w-100" style={{ maxWidth: '1000px' }}>
          <div className="bg-white rounded shadow-sm p-4">
            <h1 className="h4 fw-bold text-danger mb-3">{titleMap[type] || 'All Opportunities'}</h1>

            {loading && <p className="text-muted">Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && opps.length === 0 && (
              <p className="text-muted">No opportunities found.</p>
            )}

            <div className="row g-3">
              {opps.map((o) => (
                <div className="col-md-6" key={o._id}>
                  <div className="card h-100 shadow-sm p-3">
                    <h5 className="fw-bold">{o.title}</h5>
                    <div className="text-muted small mb-2">{o.type} • {o.location}</div>
                    <p className="mb-2">{o.description?.slice(0, 140)}{o.description && o.description.length > 140 ? '...' : ''}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">Posted by {o.postedBy?.firstName || 'Org'}</small>
                      <Link to={`/opportunities/${o._id}`} className="btn btn-sm btn-outline-danger">View</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Opportunities;
