import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import api from '../services/api';
import Navbar from '../components/NavBar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
  });

  const [studentInfo, setStudentInfo] = useState({
    university: '',
    graduationDate: '',
    skills: '',
    gpa: '',
    resume: '',
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
  });

  const [universityInfo, setUniversityInfo] = useState({
    universityName: '',
    website: '',
    contactPerson: '',
  });

  const [preferences, setPreferences] = useState({
    workLocation: '',
    remote: false,
    compensation: 'Paid',
    availableFrom: '',
    availableTo: '',
    resumeLink: '',
  });

  const [user, setUser] = useState(null);

  // Load user data on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const storedUser = localStorage.getItem('user');
        
        if (!storedUser) {
          navigate('/login');
          return;
        }

        const userData = JSON.parse(storedUser);
        setUser(userData);

        // Populate personal info from stored user
        setPersonalInfo({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          bio: userData.bio || '',
        });

        // Populate role-specific info
        if (userData.role === 'student') {
          setStudentInfo({
            university: userData.university || '',
            graduationDate: userData.graduationDate ? userData.graduationDate.split('T')[0] : '',
            skills: Array.isArray(userData.skills) ? userData.skills.join(', ') : userData.skills || '',
            gpa: userData.gpa || '',
            resume: userData.resume || '',
          });
        } else if (userData.role === 'company') {
          setCompanyInfo({
            companyName: userData.companyName || '',
            industry: userData.industry || '',
            companySize: userData.companySize || '',
            website: userData.website || '',
          });
        } else if (userData.role === 'university') {
          setUniversityInfo({
            universityName: userData.universityName || '',
            website: userData.website || '',
            contactPerson: userData.contactPerson || '',
          });
        }

        setError('');
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const handleUniversityChange = (e) => {
    const { name, value } = e.target;
    setUniversityInfo({ ...universityInfo, [name]: value });
  };

  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Prepare data based on role
      let updateData = { ...personalInfo };

      if (user.role === 'student') {
        updateData = {
          ...updateData,
          university: studentInfo.university,
          graduationDate: studentInfo.graduationDate,
          skills: studentInfo.skills.split(',').map(s => s.trim()),
          gpa: studentInfo.gpa ? parseFloat(studentInfo.gpa) : undefined,
          resume: studentInfo.resume,
        };
      } else if (user.role === 'company') {
        updateData = {
          ...updateData,
          companyName: companyInfo.companyName,
          industry: companyInfo.industry,
          companySize: companyInfo.companySize,
          website: companyInfo.website,
        };
      } else if (user.role === 'university') {
        updateData = {
          ...updateData,
          universityName: universityInfo.universityName,
          website: universityInfo.website,
          contactPerson: universityInfo.contactPerson,
        };
      }

      // Call backend to update profile
      const response = await api.put(`/users/${user._id}`, updateData);

      // Update localStorage with new data
      const updatedUser = { ...user, ...response.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setSuccess('Profile saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="d-flex align-items-center justify-content-center min-vh-100">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
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

            {/* ERROR MESSAGE */}
            {error && (
              <div className="alert alert-danger d-flex gap-2 mb-3">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="alert alert-success mb-3">
                ✓ {success}
              </div>
            )}

            {/* AVATAR */}
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block">
                <div
                  className="bg-light border border-2 border-dashed rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 120, height: 120 }}
                >
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="rounded-circle w-100 h-100" style={{ objectFit: 'cover' }} />
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
                  <input type="email" name="email" className="form-control" value={personalInfo.email} disabled />
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
            {user?.role === 'student' && (
              <>
                <section className="mb-5">
                  <h2 className="h5 fw-bold text-danger mb-3">Student Information</h2>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">University</label>
                      <input type="text" name="university" className="form-control" placeholder="e.g., Stanford University" value={studentInfo.university} onChange={handleStudentChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Expected Graduation</label>
                      <input type="date" name="graduationDate" className="form-control" value={studentInfo.graduationDate} onChange={handleStudentChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">GPA</label>
                      <input type="number" name="gpa" className="form-control" placeholder="e.g., 3.8" step="0.1" max="4.0" value={studentInfo.gpa} onChange={handleStudentChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Resume Link</label>
                      <input type="url" name="resume" className="form-control" placeholder="https://..." value={studentInfo.resume} onChange={handleStudentChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Skills (comma-separated)</label>
                      <input type="text" name="skills" className="form-control" placeholder="Python, React, Machine Learning..." value={studentInfo.skills} onChange={handleStudentChange} />
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* COMPANY INFO */}
            {user?.role === 'company' && (
              <section className="mb-5">
                <h2 className="h5 fw-bold text-danger mb-3">Company Information</h2>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Company Name</label>
                    <input type="text" name="companyName" className="form-control" value={companyInfo.companyName} onChange={handleCompanyChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Industry</label>
                    <input type="text" name="industry" className="form-control" placeholder="e.g., Technology" value={companyInfo.industry} onChange={handleCompanyChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Company Size</label>
                    <select name="companySize" className="form-select" value={companyInfo.companySize} onChange={handleCompanyChange}>
                      <option value="">Select Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Website</label>
                    <input type="url" name="website" className="form-control" placeholder="https://..." value={companyInfo.website} onChange={handleCompanyChange} />
                  </div>
                </div>
              </section>
            )}

            {/* UNIVERSITY INFO */}
            {user?.role === 'university' && (
              <section className="mb-5">
                <h2 className="h5 fw-bold text-danger mb-3">University Information</h2>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">University Name</label>
                    <input type="text" name="universityName" className="form-control" value={universityInfo.universityName} onChange={handleUniversityChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Website</label>
                    <input type="url" name="website" className="form-control" placeholder="https://..." value={universityInfo.website} onChange={handleUniversityChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Contact Person</label>
                    <input type="text" name="contactPerson" className="form-control" placeholder="Department Head or Contact Name" value={universityInfo.contactPerson} onChange={handleUniversityChange} />
                  </div>
                </div>
              </section>
            )}

            {/* SAVE BUTTON */}
            <div className="text-center">
              <button 
                onClick={handleSave} 
                className="btn btn-danger px-5"
                disabled={saving}
              >
                <Save size={18} className="me-2" />
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
