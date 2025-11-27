import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import api from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Save token and user info to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect based on role
      const { role } = response.data.user;
      if (role === 'student') navigate('/student-portal');
      else if (role === 'university') navigate('/university-portal');
      else if (role === 'company') navigate('/company-portal');
      else navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <div className="bg-white p-4 rounded shadow-sm">
            {/* BACK BUTTON WITH ARROW */}
            <button
              onClick={() => navigate('/')}
              className="btn btn-link text-danger p-0 mb-3 text-decoration-none d-flex align-items-center gap-1"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>

            <h2 className="h4 fw-bold text-center mb-3">Welcome back</h2>
            <p className="text-muted text-center mb-4">Log in to your UniMatch account</p>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <div className="text-end mb-3">
                <Link to="/forgot-password" className="text-danger small text-decoration-none">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-danger w-100 text-white" disabled={loading}>
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            <p className="text-center text-muted mt-3 small">
              Don't have an account?{' '}
              <Link to="/signup" className="text-danger text-decoration-none">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;