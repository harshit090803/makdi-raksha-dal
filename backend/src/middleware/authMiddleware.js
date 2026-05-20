const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. Command credentials token missing.' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Authentication token malformed.' });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_mrd_command_center_key_2026';
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid command console authorization token.' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Action forbidden. Insufficient security clearance.' });
  }
};

module.exports = { authMiddleware, adminMiddleware };
