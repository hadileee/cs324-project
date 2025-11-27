const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

// Create opportunity
const createOpportunity = async (req, res, next) => {
  try {
    const {
      title,
      description,
      type,
      location,
      salary,
      salaryType,
      duration,
      requirements,
      qualifications,
      skills,
      applicationDeadline,
    } = req.body;

    // Validate required fields
    if (!title || !description || !type || !location) {
      return res.status(400).json({
        message: 'Please provide title, description, type, and location',
      });
    }

    // Check if user is university or company
    const user = await User.findById(req.user.id);
    if (!['university', 'company'].includes(user.role)) {
      return res.status(403).json({
        message: 'Only universities and companies can post opportunities',
      });
    }

    const opportunity = new Opportunity({
      title,
      description,
      type,
      postedBy: req.user.id,
      postedByRole: user.role,
      location,
      salary,
      salaryType,
      duration,
      requirements: requirements || [],
      qualifications: qualifications || [],
      skills: skills || [],
      applicationDeadline,
    });

    await opportunity.save();

    res.status(201).json({
      message: 'Opportunity created successfully',
      opportunity,
    });
  } catch (error) {
    next(error);
  }
};

// Get all opportunities
const getAllOpportunities = async (req, res, next) => {
  try {
    const { type, location, status } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (status) filter.status = status;

    const opportunities = await Opportunity.find(filter)
      .populate('postedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    next(error);
  }
};

// Get opportunity by ID
const getOpportunityById = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('postedBy', 'firstName lastName email')
      .populate({
        path: 'applications',
        populate: { path: 'student', select: 'firstName lastName email' },
      });

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Increment views
    opportunity.views += 1;
    await opportunity.save();

    res.status(200).json({ opportunity });
  } catch (error) {
    next(error);
  }
};

// Update opportunity (only by poster)
const updateOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check authorization
    if (opportunity.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to update this opportunity',
      });
    }

    // Update allowed fields
    const { title, description, status, applicationDeadline, salary } = req.body;

    if (title) opportunity.title = title;
    if (description) opportunity.description = description;
    if (status) opportunity.status = status;
    if (applicationDeadline) opportunity.applicationDeadline = applicationDeadline;
    if (salary !== undefined) opportunity.salary = salary;

    await opportunity.save();

    res.status(200).json({
      message: 'Opportunity updated successfully',
      opportunity,
    });
  } catch (error) {
    next(error);
  }
};

// Delete opportunity (only by poster)
const deleteOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check authorization
    if (opportunity.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to delete this opportunity',
      });
    }

    await Opportunity.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Opportunity deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Get opportunities posted by a user
const getUserOpportunities = async (req, res, next) => {
  try {
    const opportunities = await Opportunity.find({ postedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
  getUserOpportunities,
};
