# 🚀 SETUP MongoDB & Connect Frontend - QUICK STEPS

## Step 1: Get MongoDB Atlas Connection String (10 minutes)

### 1. Go to MongoDB Atlas
- Visit: **https://www.mongodb.com/cloud/atlas**
- Click "Sign Up" or "Sign In"

### 2. Create Cluster
- Click "Build a Cluster"
- Choose **Free (M0)** - it's free!
- Select your region (closest to you)
- Click "Create Deployment"
- **WAIT 5-10 MINUTES** for it to start

### 3. Create Database User
1. Click **"Database Access"** in left menu
2. Click **"Add New Database User"**
3. Enter:
   - **Username**: `unimatch_user`
   - **Password**: `MySecurePassword123!` (SAVE THIS!)
4. Click "Add User"

### 4. Whitelist Your IP
1. Click **"Network Access"** in left menu
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"** (for testing)
4. Click "Confirm"

### 5. Get Connection String
1. Click **"Databases"** in left menu
2. Click **"Connect"** button
3. Click **"Drivers"**
4. Choose **"Node.js"**
5. **COPY** the connection string
   - It looks like: `mongodb+srv://unimatch_user:PASSWORD@cluster0-xxxxx.mongodb.net/unimatch?retryWrites=true&w=majority`

---

## Step 2: Update Backend MongoDB (2 minutes)

### Edit backend/.env file:
```
MONGODB_URI=mongodb+srv://unimatch_user:MySecurePassword123!@cluster0-xxxxx.mongodb.net/unimatch?retryWrites=true&w=majority
PORT=5001
JWT_SECRET=your_secure_key_here
FRONTEND_URL=http://localhost:3000
```

**IMPORTANT**: Replace `PASSWORD` with your actual password!

---

## Step 3: Start Backend (2 minutes)

```bash
cd backend
npm start
```

You should see:
```
Server running on port 5001
Environment: development
MongoDB Connected: cluster0-xxxxx.mongodb.net
```

✅ If you see "MongoDB Connected" - SUCCESS!

---

## Step 4: Start Frontend (2 minutes)

**Open NEW terminal window:**

```bash
npm start
```

You should see:
```
webpack compiled successfully
Compiled with warnings
You can now view your app at http://localhost:3000
```

---

## Step 5: Test Registration (5 minutes)

1. Go to http://localhost:3000
2. Click "Sign up" button
3. Fill the form:
   ```
   First Name: John
   Last Name: Doe
   Email: john@test.com
   Password: password123
   Confirm Password: password123
   Role: Student
   ```
4. Click "Create account"

### What should happen:
- ✅ Account created in MongoDB
- ✅ Redirects to Student Portal
- ✅ You can see opportunities list (empty if none posted)

### If it fails:
- Check backend terminal for errors
- Check browser console (F12)
- Make sure both servers are running

---

## Step 6: Test Login (5 minutes)

1. Go to http://localhost:3000/login
2. Enter credentials:
   ```
   Email: john@test.com
   Password: password123
   ```
3. Click "Log in"

### What should happen:
- ✅ Logs in successfully
- ✅ Redirects to Student Portal
- ✅ Shows "Available Opportunities"

---

## ✅ CHECKLIST - You're Done When All Are Checked!

- [ ] MongoDB Atlas account created
- [ ] Cluster deployed (status: CONNECTED)
- [ ] Database user created (unimatch_user)
- [ ] IP whitelisted
- [ ] Connection string copied
- [ ] backend/.env updated with MongoDB URI
- [ ] Backend running on port 5001
- [ ] Frontend running on port 3000
- [ ] Can register new account
- [ ] Account saved to MongoDB
- [ ] Can login with credentials
- [ ] Redirects to correct portal
- [ ] See "Available Opportunities" list

---

## 🎉 Success Signs

### Backend Terminal Should Show:
```
Server running on port 5001
Environment: development
MongoDB Connected: cluster0-xxxxx.mongodb.net
```

### Frontend Should Show:
```
webpack compiled successfully
http://localhost:3000
```

### Browser Should Load:
```
http://localhost:3000 - Home page loads
http://localhost:3000/signup - Sign up page works
http://localhost:3000/login - Login page works
```

---

## 🚨 TROUBLESHOOTING

### "Cannot connect to MongoDB"
```
Check:
1. MongoDB URI in backend/.env is correct
2. Password doesn't have special characters (or URL encode them)
3. IP is whitelisted in MongoDB Atlas
4. Cluster status is CONNECTED
```

### "CORS Error" or "Network Error"
```
Check:
1. Backend is running on :5001
2. Frontend .env has: REACT_APP_API_URL=http://localhost:5001/api
3. Clear browser cache (Ctrl+Shift+Delete)
4. Both servers running at same time
```

### "Login keeps redirecting to /login"
```
Check:
1. Backend API is responding: http://localhost:5001/api/health
2. Check browser console for error messages
3. Backend error logs for details
```

### "Blank Opportunities List"
```
Check:
1. Backend is running
2. Try: curl http://localhost:5001/api/opportunities
3. Should return: {"count": 0, "opportunities": []}
```

---

## 📱 Test Accounts to Create

Create a few test accounts to test different roles:

```
STUDENT:
Email: student1@test.com
Password: password123
Role: Student

COMPANY:
Email: company1@test.com
Password: password123
Role: Company

UNIVERSITY:
Email: university1@test.com
Password: password123
Role: University
```

Then:
- Login as Company → Post opportunity
- Login as Student → See and apply for opportunity
- Check in MongoDB if data is saved

---

## 🔗 LINKS

| What | Link |
|------|------|
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5001 |
| API Docs | ./backend/API_DOCUMENTATION.md |
| Integration Guide | ./FRONTEND_INTEGRATION.md |

---

## 📞 Still Having Issues?

1. Check **FRONTEND_INTEGRATION.md** - Complete detailed guide
2. Check **backend/API_DOCUMENTATION.md** - All API endpoints
3. Check browser console (F12 → Console) for errors
4. Check backend terminal for server errors
5. Make sure both servers are running (two terminals!)

---

**TOTAL TIME**: ~30 minutes (most is waiting for MongoDB)

**You now have**: ✅ Working app with real MongoDB! 🎉
