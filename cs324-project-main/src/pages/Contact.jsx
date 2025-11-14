import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/NavBar';


const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact:", formData);
    alert("Thank you for contacting UniMatch! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

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

        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="bg-white p-5 rounded shadow-sm">
                <h1 className="h3 fw-bold text-center text-dark mb-4">Contact Us</h1>
                <p className="text-muted text-center mb-4">
                  Have a question or want to collaborate? Fill out the form below and our team will reach out to you.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-danger w-100">
                    Send Message
                  </button>
                </form>

                <div className="mt-4 text-center text-muted small">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <Mail size={16} /> support@unimatch.com
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                    <Phone size={16} /> +216 12 345 678
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <MapPin size={16} /> Tunis, Tunisia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;