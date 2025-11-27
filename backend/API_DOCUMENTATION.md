# UniMatch Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require a JWT token. Include the token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Roles:** `student`, `university`, `company`, `admin`

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

---

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

---

### Get Current User
**GET** `/auth/me`

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student",
    "skills": ["JavaScript", "React"],
    "createdAt": "2025-11-27T12:00:00Z"
  }
}
```

---

## 2. User Endpoints

### Get User by ID
**GET** `/users/:id`

**Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student",
    "bio": "Passionate about web development",
    "location": "San Francisco, CA",
    "skills": ["JavaScript", "React", "Node.js"]
  }
}
```

---

### Get Users by Role
**GET** `/users/role/:role`

**Roles:** `student`, `university`, `company`

**Response (200):**
```json
{
  "count": 10,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "student"
    }
  ]
}
```

---

### Update Profile
**PATCH** `/users/profile/update`

**Headers Required:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Software engineer",
  "location": "San Francisco, CA",
  "phone": "+1234567890",
  "skills": ["JavaScript", "Python", "React"],
  "profilePicture": "https://..."
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "bio": "Software engineer",
    "location": "San Francisco, CA",
    "skills": ["JavaScript", "Python", "React"]
  }
}
```

---

### Get All Users (Admin Only)
**GET** `/users/`

**Headers Required:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "count": 50,
  "users": [...]
}
```

---

### Delete User (Admin Only)
**DELETE** `/users/:id`

**Headers Required:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

## 3. Opportunity Endpoints

### Create Opportunity
**POST** `/opportunities`

**Headers Required:**
```
Authorization: Bearer <token>
```
(User must be `university` or `company`)

**Request Body:**
```json
{
  "title": "Summer Internship - Web Development",
  "description": "Join our team for a 12-week summer internship...",
  "type": "internship",
  "location": "San Francisco, CA",
  "salary": 20,
  "salaryType": "hourly",
  "duration": "12 weeks",
  "requirements": ["HTML/CSS", "JavaScript"],
  "qualifications": ["Current student", "3+ months availability"],
  "skills": ["React", "Node.js"],
  "applicationDeadline": "2025-12-31T23:59:59Z"
}
```

**Response (201):**
```json
{
  "message": "Opportunity created successfully",
  "opportunity": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Summer Internship - Web Development",
    "description": "Join our team...",
    "type": "internship",
    "postedBy": "507f1f77bcf86cd799439011",
    "postedByRole": "company",
    "location": "San Francisco, CA",
    "salary": 20,
    "status": "open",
    "views": 0
  }
}
```

---

### Get All Opportunities
**GET** `/opportunities`

**Query Parameters (Optional):**
```
?type=internship&location=San%20Francisco&status=open
```

**Response (200):**
```json
{
  "count": 15,
  "opportunities": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Summer Internship",
      "type": "internship",
      "location": "San Francisco, CA",
      "salary": 20,
      "status": "open",
      "postedBy": {
        "_id": "507f1f77bcf86cd799439011",
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane@company.com"
      }
    }
  ]
}
```

---

### Get Opportunity by ID
**GET** `/opportunities/:id`

**Response (200):**
```json
{
  "opportunity": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Summer Internship",
    "description": "...",
    "type": "internship",
    "location": "San Francisco, CA",
    "requirements": ["HTML/CSS", "JavaScript"],
    "skills": ["React"],
    "views": 5,
    "applications": []
  }
}
```

---

### Update Opportunity
**PATCH** `/opportunities/:id`

**Headers Required:**
```
Authorization: Bearer <token>
```
(Must be the opportunity poster)

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "closed",
  "salary": 25,
  "applicationDeadline": "2025-12-31T23:59:59Z"
}
```

**Response (200):**
```json
{
  "message": "Opportunity updated successfully",
  "opportunity": {...}
}
```

---

### Delete Opportunity
**DELETE** `/opportunities/:id`

**Headers Required:**
```
Authorization: Bearer <token>
```
(Must be the opportunity poster)

**Response (200):**
```json
{
  "message": "Opportunity deleted successfully"
}
```

---

### Get User's Posted Opportunities
**GET** `/opportunities/user/opportunities`

**Headers Required:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "count": 5,
  "opportunities": [...]
}
```

---

## 4. Application Endpoints

### Submit Application
**POST** `/applications`

**Headers Required:**
```
Authorization: Bearer <token>
```
(User must be a `student`)

**Request Body:**
```json
{
  "opportunityId": "507f1f77bcf86cd799439012",
  "coverLetter": "I am very interested in this position because..."
}
```

**Response (201):**
```json
{
  "message": "Application submitted successfully",
  "application": {
    "_id": "507f1f77bcf86cd799439013",
    "student": "507f1f77bcf86cd799439010",
    "opportunity": "507f1f77bcf86cd799439012",
    "status": "pending",
    "coverLetter": "I am very interested...",
    "appliedAt": "2025-11-27T12:00:00Z"
  }
}
```

---

### Get Student's Applications
**GET** `/applications/student/applications`

**Headers Required:**
```
Authorization: Bearer <token>
```
(User must be a `student`)

**Response (200):**
```json
{
  "count": 3,
  "applications": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "student": "507f1f77bcf86cd799439010",
      "opportunity": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Summer Internship",
        "type": "internship",
        "location": "San Francisco",
        "salary": 20
      },
      "status": "pending",
      "appliedAt": "2025-11-27T12:00:00Z"
    }
  ]
}
```

---

### Get Applications for Opportunity
**GET** `/applications/opportunity/:opportunityId`

**Headers Required:**
```
Authorization: Bearer <token>
```
(Must be the opportunity poster)

**Response (200):**
```json
{
  "count": 5,
  "applications": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "student": {
        "_id": "507f1f77bcf86cd799439010",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "skills": ["JavaScript", "React"]
      },
      "status": "pending",
      "coverLetter": "..."
    }
  ]
}
```

---

### Update Application Status
**PATCH** `/applications/:applicationId/status`

**Headers Required:**
```
Authorization: Bearer <token>
```
(Must be the opportunity poster)

**Request Body:**
```json
{
  "status": "accepted",
  "feedback": "We would like to move forward with your application!"
}
```

**Status Values:** `pending`, `reviewed`, `accepted`, `rejected`, `withdrawn`

**Response (200):**
```json
{
  "message": "Application status updated",
  "application": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "accepted",
    "feedback": "We would like to move forward...",
    "reviewedAt": "2025-11-27T12:00:00Z"
  }
}
```

---

### Withdraw Application
**PATCH** `/applications/:applicationId/withdraw`

**Headers Required:**
```
Authorization: Bearer <token>
```
(Must be the student who applied)

**Response (200):**
```json
{
  "message": "Application withdrawn successfully",
  "application": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "withdrawn"
  }
}
```

---

## HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Server Error

---

## Error Responses

**400 - Bad Request:**
```json
{
  "message": "Please provide email and password"
}
```

**401 - Unauthorized:**
```json
{
  "message": "Token is not valid"
}
```

**403 - Forbidden:**
```json
{
  "message": "Not authorized to update this opportunity"
}
```

**404 - Not Found:**
```json
{
  "message": "User not found"
}
```

---

## Testing with Postman

1. Save this as a `.json` file and import into Postman
2. Set environment variable: `base_url = http://localhost:5000/api`
3. After login, save the token to a variable: `token`
4. Use `{{token}}` in Authorization headers
