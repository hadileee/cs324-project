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
    const { firstName, lastName, bio, location, phone, profilePicture, skills } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        bio: bio || undefined,
        location: location || undefined,
        phone: phone || undefined,
        profilePicture: profilePicture || undefined,
        skills: skills || undefined,
      },
      { new: true, runValidators: true }
    );

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
