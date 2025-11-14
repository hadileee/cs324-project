import React, { useState } from "react";

const CompanySignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    location: "",
    website: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Signup:", formData);
    // TODO: integrate signup API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Company Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            className="w-full border p-2 rounded-lg"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Official Email"
            className="w-full border p-2 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="industry"
            placeholder="Industry Type"
            className="w-full border p-2 rounded-lg"
            value={formData.industry}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="City / Country"
            className="w-full border p-2 rounded-lg"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="website"
            placeholder="Company Website"
            className="w-full border p-2 rounded-lg"
            value={formData.website}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded-lg"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-900"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/company-login" className="text-gray-800 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default CompanySignup;