import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', age: '', gender: '', role: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
  e.preventDefault();
  console.log("Signup:", formData);

  setTimeout(() => {
    const role = formData.role;
    if (role === 'student') navigate('/student-portal');
    else if (role === 'university') navigate('/university-portal');
    else if (role === 'company') navigate('/company-portal');
    else navigate('/login');
  }, 500);
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

            <form onSubmit={handleSignup}>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">First Name *</label>
                  <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} placeholder="John" required />
                </div>
                <div className="col-6">
                  <label className="form-label">Last Name *</label>
                  <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} placeholder="Doe" required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Password *</label>
                <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} placeholder="Create a strong password" required />
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Age (optional)</label>
                  <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} placeholder="25" />
                </div>
                <div className="col-6">
                  <label className="form-label">Gender (optional)</label>
                  <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">I am a *</label>
                <select name="role" className="form-select" value={formData.role} onChange={handleChange} required>
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="university">University</option>
                  <option value="company">Company</option>
                </select>
              </div>

              <button type="submit" className="btn btn-danger w-100 text-white">
                Create account
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