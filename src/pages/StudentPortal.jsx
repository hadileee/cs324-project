import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Briefcase, Building, Edit3, CheckCircle } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const StudentPortal = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    degree: "Bachelor of Science",
    major: "Computer Science",
    graduation: "2025",
    skills: ["Python", "React", "Machine Learning", "JavaScript"],
    preferences: ["Remote", "Paid", "Tunis"],
  });

  const [applications, setApplications] = useState([
    { position: "AI Research Intern", organization: "MIT Media Lab", status: "Applied", applied: "2025-04-01" },
    { position: "Frontend Developer", organization: "Google", status: "Interview", applied: "2025-03-15" },
  ]);

  return (
    <>
      <AnimatedBackground type="full" />

      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3 py-5">
        <div className="w-100" style={{ maxWidth: '900px' }}>
          <div className="bg-white rounded shadow-sm p-4">

            {/* BACK BUTTON */}
            <button
              onClick={() => navigate('/')}
              className="btn btn-link text-danger p-0 mb-3 text-decoration-none d-flex align-items-center gap-1"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>

            <div className="d-flex align-items-center gap-3 mb-4">
              <GraduationCap size={32} className="text-danger" />
              <h1 className="h3 fw-bold mb-0">Student Portal</h1>
            </div>

            {/* OPPORTUNITIES */}
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                  <Briefcase size={40} className="text-danger mb-3" />
                  <h5 className="fw-bold">Research</h5>
                  <p className="text-muted small">Browse academic research opportunities</p>
                  <button className="btn btn-outline-danger w-100">Find Research</button>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                  <Building size={40} className="text-danger mb-3" />
                  <h5 className="fw-bold">Internships</h5>
                  <p className="text-muted small">Discover internship opportunities</p>
                  <button className="btn btn-outline-danger w-100">Find Internships</button>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                  <CheckCircle size={40} className="text-danger mb-3" />
                  <h5 className="fw-bold">Graduate Jobs</h5>
                  <p className="text-muted small">Explore full-time job opportunities</p>
                  <button className="btn btn-outline-danger w-100">Find Jobs</button>
                </div>
              </div>
            </div>

            {/* PROFILE ESSENTIALS */}
            <section className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 fw-bold text-danger mb-0">Profile Essentials</h2>
                <Link to="/profile" className="btn btn-sm btn-outline-danger">
                  <Edit3 size={16} className="me-1" />
                  Edit Profile
                </Link>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <strong>Degree & Major:</strong>
                  <p className="mb-0">{profile.degree} in {profile.major} • Expected {profile.graduation}</p>
                </div>
                <div className="col-md-6">
                  <strong>Skills:</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {profile.skills.map((skill, i) => (
                      <span key={i} className="badge bg-light text-dark border">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="col-12">
                  <strong>Preferences:</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {profile.preferences.map((pref, i) => (
                      <span key={i} className="badge bg-danger text-white">{pref}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* MY APPLICATIONS */}
            <section>
              <h2 className="h5 fw-bold text-danger mb-3">My Applications</h2>

              {applications.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Position</th>
                        <th>Organization</th>
                        <th>Status</th>
                        <th>Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app, i) => (
                        <tr key={i}>
                          <td><strong>{app.position}</strong></td>
                          <td>{app.organization}</td>
                          <td>
                            <span className={`badge ${
                              app.status === 'Applied' ? 'bg-warning' :
                              app.status === 'Interview' ? 'bg-info' : 'bg-success'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td>{app.applied}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No applications yet. <Link to="/" className="text-danger">Start applying!</Link></p>
              )}
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPortal;