const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, forgotPassword } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.get('/me', auth, getCurrentUser);

module.exports = router;
