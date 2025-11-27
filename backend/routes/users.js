const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateProfile,
  deleteUser,
  getUsersByRole,
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Public route - get user by ID
router.get('/:id', getUserById);

// Protected routes
router.get('/role/:role', getUsersByRole);

// User profile routes
router.patch('/profile/update', auth, updateProfile);
router.put('/:id', auth, updateProfile);

// Admin routes
router.get('/', auth, authorize('admin'), getAllUsers);
router.delete('/:id', auth, authorize('admin'), deleteUser);

module.exports = router;
