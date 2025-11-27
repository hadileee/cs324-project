# UniMatch - Career Opportunities Platform

## 🎯 Project Overview

UniMatch is a comprehensive platform connecting students, universities, and companies for career opportunities including internships, research positions, and graduate jobs.

## 🏗️ Architecture

This is a full-stack MERN application:
- **Frontend**: React 19.2.0 with React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **API**: RESTful with JWT authentication

## 📋 Features

### For Students
- Browse internships, research roles, and graduate jobs
- Create and manage profiles
- Apply for opportunities
- Track application status

### For Universities
- Post research opportunities
- Manage student applications
- Review applicant profiles

### For Companies
- Post internship and job opportunities
- Review student applications
- Connect with talent

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- React Router 7.9.4
- Axios 1.12.2
- Bootstrap 5.3.3
- Framer Motion 12.23.24
- Lucide React (icons)

### Backend
- Node.js + Express 4.18.2
- MongoDB + Mongoose 7.5.0
- JWT Authentication 9.0.2
- bcryptjs 2.4.3
- CORS enabled

## 📁 Project Structure

```
cs324-project/
├── frontend/                    # React app
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/              # Page components
│   │   ├── components/         # Reusable components
│   │   └── services/           # API calls (Axios)
│   ├── public/
│   └── package.json
├── backend/                     # Node.js/Express server
│   ├── server.js
│   ├── config/                 # Database config
│   ├── models/                 # Mongoose schemas
│   ├── controllers/            # Business logic
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Auth, errors
│   ├── .env                    # Configuration
│   └── package.json
├── IMPLEMENTATION_SUMMARY.md   # What's been built
├── BACKEND_SETUP.md           # Backend setup guide
├── QUICK_START.md             # Quick reference
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free at mongodb.com)

### 1. Frontend Setup
```bash
cd /path/to/cs324-project
npm install
npm start
```
Frontend runs on `http://localhost:3000`

### 2. Backend Setup
```bash
cd backend
npm install
```

Configure `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster...
PORT=5001
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm start
```
Backend runs on `http://localhost:5001`

## 📚 Documentation

- **`IMPLEMENTATION_SUMMARY.md`** - Complete overview of what's been built
- **`BACKEND_SETUP.md`** - Detailed backend setup and configuration
- **`QUICK_START.md`** - Quick reference guide
- **`backend/API_DOCUMENTATION.md`** - Complete API reference

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/profile/update` - Update profile

### Opportunities
- `GET /api/opportunities` - Get all opportunities
- `POST /api/opportunities` - Create opportunity
- `GET /api/opportunities/:id` - Get opportunity details
- `PATCH /api/opportunities/:id` - Update opportunity
- `DELETE /api/opportunities/:id` - Delete opportunity

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications/student/applications` - Get my applications
- `PATCH /api/applications/:id/status` - Update application status
- `PATCH /api/applications/:id/withdraw` - Withdraw application

See `backend/API_DOCUMENTATION.md` for complete endpoint details.

## 🔐 Authentication

- JWT-based authentication
- Password hashing with bcryptjs
- Token-based authorization
- Role-based access control (student, university, company, admin)

## 📦 Database Schema

### User
- Email, password, first/last name
- Role (student, university, company, admin)
- Profile info (bio, location, skills, etc.)
- Role-specific data

### Opportunity
- Title, description, type (internship, research, etc.)
- Location, salary, duration
- Requirements, qualifications, skills
- Application tracking

### Application
- Student, opportunity reference
- Status (pending, reviewed, accepted, rejected, withdrawn)
- Cover letter, feedback

## 🧪 Testing API

Use Postman to test endpoints:
1. Import endpoints from `API_DOCUMENTATION.md`
2. Set base URL: `http://localhost:5001/api`
3. Register and login to get JWT token
4. Use token in Authorization header for protected routes

Example cURL:
```bash
# Register
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@test.com","password":"pass123","role":"student"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'
```

## 🎨 Features to Implement

### Frontend Pages
- [x] Home page with role selection
- [x] Login page
- [x] Signup page
- [ ] Student portal (browse opportunities, apply)
- [ ] University portal (post opportunities, view applications)
- [ ] Company portal (post opportunities, view applications)
- [ ] User profile page
- [ ] Application tracking page

### Backend Completion
- [x] Database models
- [x] Authentication system
- [x] CRUD operations
- [x] Error handling
- [x] CORS configuration
- [ ] Email notifications
- [ ] Search/filter optimization
- [ ] Rate limiting

## 🔄 Frontend Integration

Use Axios to connect to backend:
```javascript
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5001/api' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

## 📝 Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5001/api
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...
PORT=5001
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
JWT_EXPIRE=7d
```

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB URI is correct
- Ensure port 5001 is available
- Check `.env` file exists and is configured

### Frontend can't reach backend
- Ensure backend is running on port 5001
- Check CORS is enabled
- Verify API URLs in frontend

### MongoDB connection error
- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure username/password are correct

## 📈 Next Steps

1. ✅ Setup MongoDB Atlas
2. ✅ Configure backend `.env`
3. ✅ Test backend API with Postman
4. [ ] Build frontend pages
5. [ ] Integrate frontend with backend APIs
6. [ ] Add email notifications
7. [ ] Deploy to production

## 👥 User Roles

- **Student**: Can view and apply for opportunities
- **University**: Can post opportunities and manage applications
- **Company**: Can post opportunities and manage applications
- **Admin**: Full system access

## 📞 Support

For issues or questions, refer to:
- `BACKEND_SETUP.md` - Backend setup help
- `API_DOCUMENTATION.md` - API details
- `QUICK_START.md` - Quick reference

## 📄 License

ISC

---

**Status**: Backend complete, ready for frontend integration
**Last Updated**: November 27, 2025
**Version**: 1.0.0