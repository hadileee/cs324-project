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
  const [locationFilter, setLocationFilter] = useState(query.get('location') || '');
  const [skillsFilter, setSkillsFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true);
        const params = {};
        if (type) params.type = type;
        if (locationFilter) params.location = locationFilter;
        params.page = page;
        params.limit = limit;
        const res = await api.get('/opportunities', { params });
        const fetched = res.data.opportunities || [];
        setTotal(res.data.count || fetched.length);
        // client-side skills filter if provided
        if (skillsFilter.trim()) {
          const wanted = skillsFilter.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
          setOpps(fetched.filter(o => (o.skills || []).some(sk => wanted.includes(sk.toLowerCase()))));
        } else {
          setOpps(fetched);
        }
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load opportunities');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [type, locationFilter, skillsFilter, page, limit]);

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

            <div className="mb-3 d-flex gap-2 align-items-center">
              <input className="form-control" placeholder="Location (city or remote)" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} />
              <input className="form-control" placeholder="Skills (comma separated)" value={skillsFilter} onChange={e => setSkillsFilter(e.target.value)} />
              <button className="btn btn-danger" onClick={() => setPage(1)}>Apply</button>
            </div>

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
                      <div className="d-flex gap-2">
                        <Link to={`/opportunities/${o._id}`} className="btn btn-sm btn-outline-danger">View</Link>
                        <QuickApplyButton opportunityId={o._id} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">Showing {opps.length} of {total} results</small>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</button>
                <span className="align-middle">Page {page}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => setPage(p => p+1)} disabled={opps.length < limit}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const QuickApplyButton = ({ opportunityId }) => {
  const [loading, setLoading] = useState(false);
  const handleQuickApply = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    try {
      setLoading(true);
      await api.post('/applications', { opportunityId });
      alert('Application submitted');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to apply');
    } finally {
      setLoading(false);
    }
  };
  return (
    <button className="btn btn-sm btn-danger" onClick={handleQuickApply} disabled={loading}>{loading ? 'Applying…' : 'Apply'}</button>
  );
};

export default Opportunities;
