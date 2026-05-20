const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// @route   POST api/contact
// @desc    Submit general query or anonymous cyber tip (Public)
router.post('/', submitContact);

// @route   GET api/contact
// @desc    View all contact submissions/tips logs (Admin Only)
router.get('/', authMiddleware, adminMiddleware, getContacts);

module.exports = router;
