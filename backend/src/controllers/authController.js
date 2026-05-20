const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getDbMode } = require('../config/db');

// Mock User Store
const mockUsers = [
  {
    _id: 'mock_admin_1',
    email: 'admin@mrd.in',
    // Hashed value of 'MRDCommandCenter2026'
    passwordHash: '$2a$10$dbf9d9ZIAdOD9zlYFLj/GuEQGY5poSl1VmiHeWlQgZUVoMkte7Hwq', 
    role: 'admin',
    createdAt: new Date('2026-01-01')
  }
];

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter all credentials.' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_mrd_command_center_key_2026';

    if (getDbMode()) {
      // Mock db check
      const user = mockUsers.find(u => u.email === email.toLowerCase().trim());
      if (!user) {
        return res.status(400).json({ error: 'Invalid command credentials.' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid command credentials.' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({
        token,
        user: { id: user._id, email: user.email, role: user.role }
      });
    }

    // Mongoose MongoDB check
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ error: 'Invalid command credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid command credentials.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server authentication critical error.' });
  }
};

const getMe = async (req, res) => {
  try {
    if (getDbMode()) {
      const user = mockUsers.find(u => u._id === req.user.id);
      if (!user) return res.status(404).json({ error: 'Session profile not found.' });
      return res.json({ id: user._id, email: user.email, role: user.role });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Session profile not found.' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Profile lookup critical error.' });
  }
};

module.exports = { login, getMe, mockUsers };
