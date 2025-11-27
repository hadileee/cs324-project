import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, FileText, Building2, Target, Users, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';


const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION WITH ANIMATED BACKGROUND */}
      <section className="position-relative py-5 overflow-hidden" style={{ minHeight: '80vh' }}>
        
        <div className="animated-bg-hero">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        <div className="container position-relative z-10 text-center py-4">
          {user ? (
            <>
              <h1 className="display-4 fw-bold text-dark mb-3">
                Welcome back, {user.firstName}!
              </h1>
              <p className="lead text-muted mb-5">
                Continue your journey with UniMatch
              </p>
              <div className="d-flex gap-3 justify-content-center">
                {user.role === 'student' && (
                  <Link to="/student-portal" className="btn btn-danger btn-lg text-white">
                    Go to Student Portal
                  </Link>
                )}
                {user.role === 'university' && (
                  <Link to="/university-portal" className="btn btn-danger btn-lg text-white">
                    Go to University Portal
                  </Link>
                )}
                {user.role === 'company' && (
                  <Link to="/company-portal" className="btn btn-danger btn-lg text-white">
                    Go to Company Portal
                  </Link>
                )}
                <Link to="/profile" className="btn btn-outline-danger btn-lg">
                  View Profile
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="display-4 fw-bold text-dark mb-3">
                Find internships, research roles,<br />and graduate jobs
              </h1>
              <p className="lead text-muted mb-5">
                Connecting students, universities, and companies for meaningful career opportunities
              </p>

              {/* Search Bar */}
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="input-group input-group-lg shadow-sm">
                    <span className="input-group-text bg-white border-end-0">
                      <Search size={20} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search title, keyword, org..."
                      style={{ borderLeft: 'none', fontSize: '0.9rem', minWidth: '0' }}
                    />
                    <button className="btn btn-danger text-white px-4">Search</button>
                  </div>
                </div>
              </div>

              {/* Role Cards */}
              <div className="row justify-content-center mt-5 g-4">
                {/* Student Card */}
                <div className="col-md-3">
                  <div className="card h-100 border-0 shadow-sm text-center p-4 d-flex flex-column position-relative z-20">
                    <div className="mb-3">
                      <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light" style={{ width: 70, height: 70 }}>
                        <GraduationCap size={36} className="text-danger" />
                      </div>
                    </div>
                    <h5 className="fw-bold">I'm a Student</h5>
                    <p className="text-muted small flex-grow-1">
                      Find research positions, internships, and graduate opportunities
                    </p>
                    <div className="mt-auto">
                      <Link to="/signup" className="btn btn-danger text-white w-100">
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>

                {/* University Card */}
                <div className="col-md-3">
                  <div className="card h-100 border-0 shadow-sm text-center p-4 d-flex flex-column position-relative z-20">
                    <div className="mb-3">
                      <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light" style={{ width: 70, height: 70 }}>
                        <FileText size={36} className="text-danger" />
                      </div>
                    </div>
                    <h5 className="fw-bold">I'm a University</h5>
                    <p className="text-muted small flex-grow-1">
                      Post research opportunities and find talented students
                    </p>
                    <div className="mt-auto">
                      <Link to="/signup" className="btn btn-outline-danger w-100">University Portal</Link>
                    </div>
                  </div>
                </div>

                {/* Company Card */}
                <div className="col-md-3">
                  <div className="card h-100 border-0 shadow-sm text-center p-4 d-flex flex-column position-relative z-20">
                    <div className="mb-3">
                      <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light" style={{ width: 70, height: 70 }}>
                        <Building2 size={36} className="text-danger" />
                      </div>
                    </div>
                    <h5 className="fw-bold">I'm a Company</h5>
                    <p className="text-muted small flex-grow-1">
                      Connect with interns and graduate talent
                    </p>
                    <div className="mt-auto">
                      <Link to="/signup" className="btn btn-outline-danger w-100">Company Portal</Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-5">How it works</h2>

          <div className="row justify-content-center g-5">
            {/* Step 1 */}
            <div className="col-md-3">
              <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                  <span className="fs-4 fw-bold">1</span>
                </div>
                <Target size={40} className="text-danger mb-3" />
                <h5 className="fw-bold">Create Your Profile</h5>
                <p className="text-muted small">
                  Sign up and tell us about your skills, interests, and career goals
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-md-3">
              <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                  <span className="fs-4 fw-bold">2</span>
                </div>
                <Users size={40} className="text-danger mb-3" />
                <h5 className="fw-bold">Browse & Match</h5>
                <p className="text-muted small">
                  Explore opportunities tailored to your profile and preferences
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-3">
              <div className="d-flex flex-column align-items-center">
                <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                  <span className="fs-4 fw-bold">3</span>
                </div>
                <CheckCircle size={40} className="text-danger mb-3" />
                <h5 className="fw-bold">Apply & Connect</h5>
                <p className="text-muted small">
                  Submit applications and connect directly with organizations
                </p>
              </div>
            </div>
          </div>

          {/* Trusted By */}
          <div className="mt-5 pt-4">
            <p className="text-muted mb-3">Trusted by leading institutions</p>
            <div className="d-flex justify-content-center align-items-center gap-5 flex-wrap">
              {['Stanford', 'MIT', 'Oxford', 'Cambridge', 'Harvard'].map((uni) => (
                <span key={uni} className="text-secondary fw-medium fs-5">{uni}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;