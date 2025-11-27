import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import api from '../services/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to appropriate portal
      const { role } = response.data.user;
      if (role === 'student') navigate('/student-portal');
      else if (role === 'university') navigate('/university-portal');
      else if (role === 'company') navigate('/company-portal');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3">
        <div className="w-100" style={{ maxWidth: '500px' }}>
          <div className="bg-white p-4 rounded shadow-sm">
            {/* BACK BUTTON WITH ARROW */}
            <button
              onClick={() => navigate('/')}
              className="btn btn-link text-danger p-0 mb-3 text-decoration-none d-flex align-items-center gap-1"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>

            <h2 className="h4 fw-bold text-center mb-3">Create your account</h2>
            <p className="text-muted text-center mb-4">Join UniMatch to discover opportunities</p>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <form onSubmit={handleSignup}>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password (min 6 characters)"
                  required
                  minLength="6"
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength="6"
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">I am a *</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="student">Student</option>
                  <option value="university">University</option>
                  <option value="company">Company</option>
                </select>
              </div>

              <button type="submit" className="btn btn-danger w-100 text-white" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="text-center text-muted mt-3 small">
              Already have an account?{' '}
              <Link to="/login" className="text-danger text-decoration-none">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;