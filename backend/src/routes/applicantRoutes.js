const express = require('express');
const router = express.Router();
const { submitApplicant, getApplicants, updateStatus, exportCSV } = require('../controllers/applicantController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// @route   POST api/applicants
// @desc    Submit application to join movement (Public)
router.post('/', submitApplicant);

// @route   GET api/applicants
// @desc    Get all applicants list (Admin Only)
router.get('/', authMiddleware, adminMiddleware, getApplicants);

// @route   GET api/applicants/export
// @desc    Export applicants to CSV (Admin Only)
router.get('/export', authMiddleware, adminMiddleware, exportCSV);

// @route   PATCH api/applicants/:id/status
// @desc    Approve/Reject applicant onboarding status (Admin Only)
router.patch('/:id/status', authMiddleware, adminMiddleware, updateStatus);

module.exports = router;
