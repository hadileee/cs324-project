import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import api from '../services/api';

function useQuery() { return new URLSearchParams(useLocation().search); }

const OpportunityCreate = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const presetType = query.get('type') || 'internship';

  const [form, setForm] = useState({
    title: '', description: '', type: presetType, location: '', salary: '', salaryType: 'annual', duration: '', skills: '', requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        salary: form.salary ? Number(form.salary) : undefined,
        skills: form.skills ? form.skills.split(',').map(s => s.trim()) : [],
        requirements: form.requirements ? form.requirements.split(',').map(s=>s.trim()) : [],
      };
      await api.post('/opportunities', payload);
      alert('Opportunity posted');
      navigate('/university-portal');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create opportunity');
    } finally { setLoading(false); }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3">
        <div className="w-100" style={{ maxWidth: '800px' }}>
          <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="h4 fw-bold mb-3">Post Opportunity</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input name="title" value={form.title} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="form-select">
                  <option value="research">Research</option>
                  <option value="internship">Internship</option>
                  <option value="graduate_job">Graduate Job</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input name="salary" value={form.salary} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Salary Type</label>
                <select name="salaryType" value={form.salaryType} onChange={handleChange} className="form-select">
                  <option value="annual">Annual</option>
                  <option value="stipend">Stipend</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Duration</label>
                <input name="duration" value={form.duration} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Skills (comma separated)</label>
                <input name="skills" value={form.skills} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Requirements (comma separated)</label>
                <input name="requirements" value={form.requirements} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows={6} />
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-danger" disabled={loading}>{loading ? 'Posting…' : 'Post Opportunity'}</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpportunityCreate;
