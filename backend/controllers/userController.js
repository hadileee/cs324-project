const User = require('../models/User');

// Get all users (admin only)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// Update user profile
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.params.id || req.user.id;
    
    // Fields that can be updated
    const allowedFields = [
      'firstName', 'lastName', 'bio', 'location', 'phone', 
      'skills', 'resume', 'gpa', 'university',
      'graduationDate', 'universityName', 'website', 'contactPerson',
      'companyName', 'industry', 'companySize'
    ];

    // Filter req.body to only allow certain fields
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Get users by role
const getUsersByRole = async (req, res, next) => {
  try {
    const { role } = req.params;
    const validRoles = ['student', 'university', 'company', 'admin'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
      });
    }

    const users = await User.find({ role }).select('-password');
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateProfile,
  deleteUser,
  getUsersByRole,
};
