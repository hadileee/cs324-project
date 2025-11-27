import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setMessage(res.data.message || 'If an account exists for that email, a reset link will be sent');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3">
        <div className="w-100" style={{ maxWidth: '480px' }}>
          <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="h4 fw-bold mb-3">Forgot Password</h2>
            <p className="text-muted mb-3">Enter your email and we'll send you instructions to reset your password.</p>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required disabled={loading} />
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-danger" disabled={loading}>{loading ? 'Sending…' : 'Send Reset'}</button>
                <button type="button" className="btn btn-outline-secondary" onClick={()=>navigate(-1)}>Back</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
