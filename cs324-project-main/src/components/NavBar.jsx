import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-bottom">
      <nav className="container-fluid py-2 px-4 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center gap-2">
            <GraduationCap size={28} className="text-danger" />
            <span className="fw-bold fs-4 text-dark">UniMatch</span>
          </div>
          <div className="d-flex gap-3">
            <Link to="/" className="text-dark text-decoration-none fw-medium">Home</Link>
            <Link to="/about" className="text-dark text-decoration-none fw-medium">About</Link>
            <Link to="/contact" className="text-dark text-decoration-none fw-medium">Contact</Link>
            <a href="/info" className="text-dark text-decoration-none fw-medium">Info/FAQ</a>
            <a href="/catalog" className="text-dark text-decoration-none fw-medium">Catalog</a>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-danger">Login</Link>
          <Link to="/signup" className="btn btn-danger text-white">Signup</Link>
          <Link to="/profile" className="btn btn-outline-secondary">Profile</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;