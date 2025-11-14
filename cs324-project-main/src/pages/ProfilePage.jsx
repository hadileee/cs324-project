import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+216 00-000-000",
    bio: "Passionate computer science student seeking research and internship opportunities.",
  });

  const [studentInfo, setStudentInfo] = useState({
    degree: "Bachelor of Science",
    major: "Computer Science",
    graduation: "2025",
    skills: "Python, React, Machine Learning, JavaScript",
  });

  const [preferences, setPreferences] = useState({
    workLocation: "Tunis, Tunisia",
    remote: true,
    compensation: "Paid",
    availableFrom: "2025-06-01",
    availableTo: "2025-12-31",
    resumeLink: "https://drive.google.com/file/..."
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    console.log("Saving profile:", { personalInfo, studentInfo, preferences });
    alert("Profile saved successfully!");
  };

  return (
    <>
      <AnimatedBackground type="full" />

      <div className="d-flex align-items-center justify-content-center min-vh-100 position-relative z-10 px-3 py-5">
        <div className="w-100" style={{ maxWidth: '800px' }}>
          <div className="bg-white rounded shadow-sm p-4">

            {/* BACK BUTTON */}
            <button
              onClick={() => navigate('/')}
              className="btn btn-link text-danger p-0 mb-3 text-decoration-none d-flex align-items-center gap-1"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>

            <h1 className="h3 fw-bold mb-4">My Profile</h1>

            {/* AVATAR */}
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block">
                <div
                  className="bg-light border border-2 border-dashed rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 120, height: 120 }}
                >
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="rounded-circle w-100 h-100 object-fit-cover" />
                  ) : (
                    <Upload size={40} className="text-muted" />
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="position-absolute bottom-0 end-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center cursor-pointer"
                  style={{ width: 36, height: 36, cursor: 'pointer' }}
                >
                  <Upload size={16} />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="d-none"
                />
              </div>
              <p className="text-muted small mt-2">Click to change avatar</p>
            </div>

            {/* PERSONAL INFO */}
            <section className="mb-5">
              <h2 className="h5 fw-bold text-danger mb-3">Personal Information</h2>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input type="text" name="firstName" className="form-control" value={personalInfo.firstName} onChange={handlePersonalChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input type="text" name="lastName" className="form-control" value={personalInfo.lastName} onChange={handlePersonalChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={personalInfo.email} onChange={handlePersonalChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Phone (optional)</label>
                  <input type="tel" name="phone" className="form-control" value={personalInfo.phone} onChange={handlePersonalChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Bio</label>
                  <textarea name="bio" className="form-control" rows="3" value={personalInfo.bio} onChange={handlePersonalChange} />
                </div>
              </div>
            </section>

            {/* STUDENT INFO */}
            <section className="mb-5">
              <h2 className="h5 fw-bold text-danger mb-3">Student Information</h2>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Degree</label>
                  <input type="text" name="degree" className="form-control" placeholder="e.g., Bachelor of Science" value={studentInfo.degree} onChange={handleStudentChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Major</label>
                  <input type="text" name="major" className="form-control" placeholder="e.g., Computer Science" value={studentInfo.major} onChange={handleStudentChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Expected Graduation</label>
                  <input type="text" name="graduation" className="form-control" value={studentInfo.graduation} onChange={handleStudentChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Skills</label>
                  <input type="text" name="skills" className="form-control" placeholder="Python, React, ML..." value={studentInfo.skills} onChange={handleStudentChange} />
                </div>
              </div>
            </section>

            {/* PREFERENCES */}
            <section className="mb-5">
              <h2 className="h5 fw-bold text-danger mb-3">Preferences</h2>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Preferred Location</label>
                  <input type="text" name="workLocation" className="form-control" value={preferences.workLocation} onChange={handlePreferencesChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Remote Work</label>
                  <div className="form-check mt-2">
                    <input type="checkbox" name="remote" className="form-check-input" checked={preferences.remote} onChange={handlePreferencesChange} />
                    <label className="form-check-label">Available for remote</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Compensation</label>
                  <select name="compensation" className="form-select" value={preferences.compensation} onChange={handlePreferencesChange}>
                    <option value="">Select</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Stipend">Stipend</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Available From</label>
                  <input type="date" name="availableFrom" className="form-control" value={preferences.availableFrom} onChange={handlePreferencesChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Available To</label>
                  <input type="date" name="availableTo" className="form-control" value={preferences.availableTo} onChange={handlePreferencesChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">CV/Resume Link</label>
                  <input type="url" name="resumeLink" className="form-control" value={preferences.resumeLink} onChange={handlePreferencesChange} />
                </div>
              </div>
            </section>

            {/* SAVE BUTTON */}
            <div className="text-center">
              <button onClick={handleSave} className="btn btn-danger px-5">
                <Save size={18} className="me-2" />
                Save Profile
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;