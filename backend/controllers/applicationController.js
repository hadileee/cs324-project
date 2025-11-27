const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

// Submit application
const submitApplication = async (req, res, next) => {
  try {
    const { opportunityId, coverLetter } = req.body;

    if (!opportunityId) {
      return res.status(400).json({
        message: 'Please provide opportunityId',
      });
    }

    // Check if user is a student
    const user = await User.findById(req.user.id);
    if (user.role !== 'student') {
      return res.status(403).json({
        message: 'Only students can apply for opportunities',
      });
    }

    // Check if opportunity exists
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      student: req.user.id,
      opportunity: opportunityId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied for this opportunity',
      });
    }

    // Create application
    const application = new Application({
      student: req.user.id,
      opportunity: opportunityId,
      coverLetter: coverLetter || '',
    });

    await application.save();

    // Add application to opportunity
    opportunity.applications.push(application._id);
    await opportunity.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    next(error);
  }
};

// Get applications for an opportunity (for poster)
const getOpportunityApplications = async (req, res, next) => {
  try {
    const { opportunityId } = req.params;

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Check authorization
    if (opportunity.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to view these applications',
      });
    }

    const applications = await Application.find({ opportunity: opportunityId })
      .populate('student', 'firstName lastName email skills');

    res.status(200).json({
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// Get student's applications
const getStudentApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ student: req.user.id })
      .populate('opportunity', 'title type location salary')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// Update application status (for opportunity poster)
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params;
    const { status, feedback } = req.body;

    if (!status) {
      return res.status(400).json({
        message: 'Please provide a status',
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check authorization
    const opportunity = await Opportunity.findById(application.opportunity);
    if (opportunity.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to update this application',
      });
    }

    application.status = status;
    application.feedback = feedback || '';
    application.reviewedAt = new Date();
    application.reviewedBy = req.user.id;

    await application.save();

    res.status(200).json({
      message: 'Application status updated',
      application,
    });
  } catch (error) {
    next(error);
  }
};

// Withdraw application
const withdrawApplication = async (req, res, next) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check authorization
    if (application.student.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to withdraw this application',
      });
    }

    if (application.status === 'withdrawn') {
      return res.status(400).json({
        message: 'Application already withdrawn',
      });
    }

    application.status = 'withdrawn';
    await application.save();

    res.status(200).json({
      message: 'Application withdrawn successfully',
      application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitApplication,
  getOpportunityApplications,
  getStudentApplications,
  updateApplicationStatus,
  withdrawApplication,
};
