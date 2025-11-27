import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Briefcase, Users } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const CompanyPortal = () => {
  const navigate = useNavigate();

  const graduates = [
    { id: 1, name: "Sarah Chen", degree: "MSc CS", skills: ["React", "Node"], availability: "Jun 2025" },
  ];

  const interns = [
    { id: 2, name: "Alex Kim", degree: "BSc CS", skills: ["Python", "ML"], availability: "Summer 2025" },
  ];

  const handleInvite = (name) => {
    alert(`Invitation sent to ${name}!`);
  };

  const handleViewProfile = (name) => {
    alert(`Viewing profile for ${name}`);
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
              <Briefcase size={32} className="text-danger" />
              <h1 className="h3 fw-bold mb-0">Company Portal</h1>
            </div>

            {/* POST BUTTONS */}
            <div className="d-flex gap-2 mb-5">
              <button className="btn btn-danger" onClick={() => navigate('/opportunities/new?type=graduate_job')}>
                <Plus size={18} className="me-2" />
                Post Job
              </button>
              <button className="btn btn-outline-danger" onClick={() => navigate('/opportunities/new?type=internship')}>
                <Plus size={18} className="me-2" />
                Post Internship
              </button>
            </div>

            {/* GRADUATES */}
            <section className="mb-5">
              <h2 className="h5 fw-bold text-danger mb-3">Graduates Seeking Jobs</h2>
              {graduates.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Degree</th>
                        <th>Skills</th>
                        <th>Availability</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {graduates.map((g) => (
                        <tr key={g.id}>
                          <td><strong>{g.name}</strong></td>
                          <td>{g.degree}</td>
                          <td>{g.skills.join(", ")}</td>
                          <td>{g.availability}</td>
                          <td>
                            <button className="btn btn-sm btn-success me-1" onClick={() => handleInvite(g.name)}>Invite</button>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => handleViewProfile(g.name)}>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No graduates found.</p>
              )}
            </section>

            {/* INTERNS */}
            <section>
              <h2 className="h5 fw-bold text-danger mb-3">Students Seeking Internships</h2>
              {interns.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Degree</th>
                        <th>Skills</th>
                        <th>Availability</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interns.map((s) => (
                        <tr key={s.id}>
                          <td><strong>{s.name}</strong></td>
                          <td>{s.degree}</td>
                          <td>{s.skills.join(", ")}</td>
                          <td>{s.availability}</td>
                          <td>
                            <button className="btn btn-sm btn-success me-1" onClick={() => handleInvite(s.name)}>Invite</button>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => handleViewProfile(s.name)}>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No interns found.</p>
              )}
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyPortal;