import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-bottom">
      <nav className="container-fluid py-2 px-4 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-4">
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <GraduationCap size={28} className="text-danger" />
            <span className="fw-bold fs-4 text-dark">UniMatch</span>
          </Link>
          <div className="d-flex gap-3">
            <Link to="/" className="text-dark text-decoration-none fw-medium">Home</Link>
            <Link to="/about" className="text-dark text-decoration-none fw-medium">About</Link>
            <Link to="/contact" className="text-dark text-decoration-none fw-medium">Contact</Link>
            <a href="/info" className="text-dark text-decoration-none fw-medium">Info/FAQ</a>
            <a href="/catalog" className="text-dark text-decoration-none fw-medium">Catalog</a>
          </div>
        </div>
        <div className="d-flex gap-2 align-items-center">
          {user ? (
            <>
              <span className="text-dark fw-medium">
                Welcome, {user.firstName}!
              </span>
              <Link to="/profile" className="btn btn-outline-secondary d-flex align-items-center gap-2">
                <User size={18} />
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn-outline-danger d-flex align-items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-danger">Login</Link>
              <Link to="/signup" className="btn btn-danger text-white">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;