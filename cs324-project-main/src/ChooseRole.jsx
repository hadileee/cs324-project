import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChooseRole() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup-${role}`); 
    // Example: /signup-student, /signup-university, /signup-company
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl w-full text-center">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Join <span className="text-blue-600">UniMatch</span>
        </h1>

        <p className="text-gray-600 mb-10">
          Select your role to continue with registration.
        </p>

        {/* Role Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* STUDENT */}
          <div 
            onClick={() => handleRoleSelect("student")} 
            className="cursor-pointer p-6 bg-blue-50 rounded-xl shadow hover:shadow-md hover:bg-blue-100 transition"
          >
            <div className="text-5xl mb-3">🎓</div>
            <h2 className="font-semibold text-gray-800 text-lg mb-1">Student</h2>
            <p className="text-gray-600 text-sm">
              Find internships, jobs & connect with universities.
            </p>
          </div>

          {/* UNIVERSITY */}
          <div 
            onClick={() => handleRoleSelect("university")} 
            className="cursor-pointer p-6 bg-green-50 rounded-xl shadow hover:shadow-md hover:bg-green-100 transition"
          >
            <div className="text-5xl mb-3">🏫</div>
            <h2 className="font-semibold text-gray-800 text-lg mb-1">University</h2>
            <p className="text-gray-600 text-sm">
              Showcase programs & match students effortlessly.
            </p>
          </div>

          {/* COMPANY */}
          <div 
            onClick={() => handleRoleSelect("company")} 
            className="cursor-pointer p-6 bg-yellow-50 rounded-xl shadow hover:shadow-md hover:bg-yellow-100 transition"
          >
            <div className="text-5xl mb-3">🏢</div>
            <h2 className="font-semibold text-gray-800 text-lg mb-1">Company</h2>
            <p className="text-gray-600 text-sm">
              Post jobs & find talented graduates and interns.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
