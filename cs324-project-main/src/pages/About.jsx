import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, GraduationCap, Target, Eye, Clock, Globe, CheckCircle, Trophy } from 'lucide-react';
import Navbar from '../components/NavBar';


const About = () => {
  const stats = [
    { icon: <Users />, value: "10,000+", label: "Active Students" },
    { icon: <Building2 />, value: "150+", label: "Partner Companies" },
    { icon: <GraduationCap />, value: "40+", label: "Top Universities" },
    { icon: <Trophy />, value: "95%", label: "Placement Rate" },
  ];

  const benefits = [
    { icon: <Clock />, title: "Fast & Simple", desc: "Find opportunities in just a few clicks" },
    { icon: <Globe />, title: "Global Reach", desc: "Connect with opportunities worldwide" },
    { icon: <CheckCircle />, title: "Verified Opportunities", desc: "All postings vetted by our team" },
    { icon: <Trophy />, title: "Proven Success", desc: "95% placement rate for active users" },
  ];

  const team = [
    { name: "Kacem Abidi", role: "CEO & Founder", desc: "Visionary leader driving UniMatch to connect talent with opportunity" },
    { name: "Hadile Djebbi", role: "Lead Developer", desc: "Full-stack architect building scalable, user-centric solutions" },
    { name: "Emna Barbouche", role: "Head of Design", desc: "Crafting intuitive, beautiful experiences for all users" },
  ];

  return (
    <>
      <Navbar />

      <div className="min-vh-100 bg-light pt-4">
        {/* Back Button */}
        <div className="container py-3">
          <Link
            to="/"
            className="btn btn-link text-danger p-0 text-decoration-none d-flex align-items-center gap-1"
          >
            Back to Home
          </Link>
        </div>

        {/* HERO */}
        <section className="container py-5 text-center">
          <h1 className="display-4 fw-bold text-dark mb-4">About UniMatch</h1>
          <p className="lead text-muted col-lg-8 mx-auto mb-5">
            <strong>UniMatch</strong> connects students, universities, and companies through a powerful, 
            transparent platform — making career opportunities accessible to everyone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/signup" className="btn btn-danger px-5">Join Now</Link>
            <Link to="/contact" className="btn btn-outline-secondary px-5">Get in Touch</Link>
          </div>
        </section>

        {/* STATS */}
        <section className="py-5 bg-white border-top border-bottom">
          <div className="container">
            <div className="row g-4 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="col-6 col-md-3">
                  <div className="d-flex flex-column align-items-center">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light mb-3" style={{ width: 70, height: 70 }}>
                      <span className="text-danger">{stat.icon}</span>
                    </div>
                    <div className="fs-4 fw-bold text-dark">{stat.value}</div>
                    <div className="text-muted small">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="container py-5">
          <div className="row g-5">
            <div className="col-md-6">
              <div className="d-flex align-items-start gap-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light text-danger" style={{ width: 50, height: 50 }}>
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="h5 fw-bold text-dark">Our Mission</h3>
                  <p className="text-muted">
                    To empower students with direct access to meaningful opportunities and help organizations 
                    discover talent efficiently.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-start gap-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light text-danger" style={{ width: 50, height: 50 }}>
                  <Eye size={24} />
                </div>
                <div>
                  <h3 className="h5 fw-bold text-dark">Our Vision</h3>
                  <p className="text-muted">
                    A world where talent and opportunity find each other — without friction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY UNIMATCH */}
        <section className="bg-white py-5">
          <div className="container">
            <h2 className="h4 fw-bold text-center text-dark mb-5">Why Choose UniMatch?</h2>
            <div className="row g-4">
              {benefits.map((item, i) => (
                <div key={i} className="col-md-6">
                  <div className="d-flex gap-3 align-items-start p-4 rounded bg-light h-100">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white shadow-sm text-danger flex-shrink-0" style={{ width: 48, height: 48 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark">{item.title}</h5>
                      <p className="text-muted small mb-0">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="container py-5">
          <h2 className="h4 fw-bold text-center text-dark mb-5">Meet Our Team</h2>
          <div className="row g-4">
            {/* Kacem Abidi */}
            <div className="col-md-4">
              <div className="text-center">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light shadow-sm mb-3" style={{ width: 90, height: 90 }}>
                  <GraduationCap size={40} className="text-danger" />
                </div>
                <h5 className="fw-bold text-dark">Kacem Abidi</h5>
                <p className="text-danger small">CEO & Founder</p>
                <p className="text-muted small">Visionary leader driving UniMatch to connect talent with opportunity</p>
              </div>
            </div>

            {/* Hadile Djebbi */}
            <div className="col-md-4">
              <div className="text-center">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light shadow-sm mb-3" style={{ width: 90, height: 90 }}>
                  <GraduationCap size={40} className="text-danger" />
                </div>
                <h5 className="fw-bold text-dark">Hadile Djebbi</h5>
                <p className="text-danger small">Lead Developer</p>
                <p className="text-muted small">Full-stack architect building scalable, user-centric solutions</p>
              </div>
            </div>

            {/* Emna Barbouche */}
            <div className="col-md-4">
              <div className="text-center">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light shadow-sm mb-3" style={{ width: 90, height: 90 }}>
                  <GraduationCap size={40} className="text-danger" />
                </div>
                <h5 className="fw-bold text-dark">Emna Barbouche</h5>
                <p className="text-danger small">Head of Design</p>
                <p className="text-muted small">Crafting intuitive, beautiful experiences for all users</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-5 border-top">
          <div className="container text-center">
            <h3 className="h4 fw-bold text-dark mb-3">Ready to Get Started?</h3>
            <p className="text-muted mb-4">Join thousands of students advancing their careers.</p>
            <Link to="/signup" className="btn btn-danger px-5">
              Create Your Account
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;