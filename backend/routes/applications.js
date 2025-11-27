const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getOpportunityApplications,
  getStudentApplications,
  updateApplicationStatus,
  withdrawApplication,
} = require('../controllers/applicationController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Student routes
router.post('/', auth, authorize('student'), submitApplication);
router.get('/student/applications', auth, authorize('student'), getStudentApplications);
router.patch('/:applicationId/withdraw', auth, authorize('student'), withdrawApplication);

// University/Company routes (for managing applications to their opportunities)
router.get('/opportunity/:opportunityId', auth, getOpportunityApplications);
router.patch('/:applicationId/status', auth, updateApplicationStatus);

module.exports = router;
