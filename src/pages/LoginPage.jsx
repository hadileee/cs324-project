import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();
  // detect role from email
  const mockRole = emailOrUsername.includes('uni') ? 'university' :
                   emailOrUsername.includes('corp') ? 'company' : 'student';

  setTimeout(() => {
    if (mockRole === 'student') navigate('/student-portal');
    else if (mockRole === 'university') navigate('/university-portal');
    else if (mockRole === 'company') navigate('/company-portal');
  }, 500);
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

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email or Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="Enter your email or username"
                  required
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
                />
              </div>

              <div className="text-end mb-3">
                <Link to="/forgot-password" className="text-danger small text-decoration-none">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-danger w-100 text-white">
                Log in
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