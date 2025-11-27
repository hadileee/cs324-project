import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, FileText } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import api from '../services/api';

const UniversityPortal = () => {
  const navigate = useNavigate();
  const [researchPosts, setResearchPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [preferences, setPreferences] = useState({
    skills: "Python, TensorFlow, Research",
    experience: "1+ years",
    gpa: "3.5",
    languages: "English, French",
  });

  useEffect(() => {
    const fetchUserOpportunities = async () => {
      try {
        const response = await api.get('/opportunities/user/opportunities');
        const filtered = response.data.filter(o => o.type === 'research');
        setResearchPosts(filtered);
      } catch (err) {
        console.error('Failed to fetch opportunities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOpportunities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleUpdatePreferences = () => {
    alert('Preferences updated successfully!');
  };

  return (
    <>
      <AnimatedBackground type="full" />
      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3 py-5">
        <div className="w-100" style={{ maxWidth: '900px' }}>
          <div className="bg-white rounded shadow-sm p-4">

            <button onClick={() => navigate('/')} className="btn btn-link text-danger p-0 mb-3 d-flex align-items-center gap-1">
              <ArrowLeft size={18} /> Back to Home
            </button>

            <div className="d-flex align-items-center gap-3 mb-4">
              <FileText size={32} className="text-danger" />
              <h1 className="h3 fw-bold mb-0">University Portal</h1>
            </div>

            {/* POST NEW */}
            <div className="text-center mb-5">
              <button className="btn btn-danger px-5" onClick={() => navigate('/opportunities/new?type=research')}>
                <Plus size={18} className="me-2" />
                Post New Research Opportunity
              </button>
            </div>

            {/* POSTED RESEARCH */}
            <section className="mb-5">
              <h2 className="h5 fw-bold text-danger mb-3">Posted Research Opportunities</h2>
              {loading ? (
                <p className="text-muted">Loading opportunities...</p>
              ) : researchPosts.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Applicants</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {researchPosts.map((post) => (
                        <tr key={post._id}>
                          <td><strong>{post.title}</strong></td>
                          <td>{post.location}</td>
                          <td>{post.applications?.length || 0}</td>
                          <td>
                            <span className={`badge ${post.status === 'open' ? 'bg-success' : 'bg-secondary'}`}>
                              {post.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1" onClick={() => navigate(`/opportunities/${post._id}/applications`)}>View Applications</button>
                            <button className="btn btn-sm btn-outline-warning" onClick={() => navigate(`/opportunities/${post._id}`)}>View Post</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No research opportunities posted yet.</p>
              )}
            </section>

            {/* PREFERENCES */}
            <section>
              <h2 className="h5 fw-bold text-danger mb-3">Recruitment Preferences</h2>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Preferred Skills</label>
                  <input type="text" name="skills" className="form-control" value={preferences.skills} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Research Experience</label>
                  <input type="text" name="experience" className="form-control" value={preferences.experience} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Minimum GPA</label>
                  <input type="number" step="0.01" name="gpa" className="form-control" value={preferences.gpa} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Required Languages</label>
                  <input type="text" name="languages" className="form-control" value={preferences.languages} onChange={handleChange} />
                </div>
              </div>
              <button className="btn btn-danger mt-3" onClick={handleUpdatePreferences}>Update Preferences</button>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default UniversityPortal;