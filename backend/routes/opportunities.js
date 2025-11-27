const express = require('express');
const router = express.Router();
const {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
  getUserOpportunities,
} = require('../controllers/opportunityController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// Public routes
router.get('/', getAllOpportunities);
router.get('/:id', getOpportunityById);

// Protected routes - require authentication
router.post('/', auth, authorize('university', 'company'), createOpportunity);
router.get('/user/opportunities', auth, getUserOpportunities);
router.patch('/:id', auth, updateOpportunity);
router.delete('/:id', auth, deleteOpportunity);

module.exports = router;
