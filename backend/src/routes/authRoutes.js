const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// @route   POST api/auth/login
// @desc    Admin sign in
router.post('/login', login);

// @route   GET api/auth/me
// @desc    Get session admin
router.get('/me', authMiddleware, getMe);

module.exports = router;
