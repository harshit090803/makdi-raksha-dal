require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Establish Database Connection
connectDB();

// Global Security Middleware
app.use(helmet());
app.use(mongoSanitize());

// CORS configuration - Allow access from Frontend
app.use(cors({
  origin: '*', // For local dev/sandbox simplicity, allow all. In production, restrict to frontend URL.
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Cyber Terminal Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per window
  message: { error: 'Too many network packets from this terminal. Access restricted to prevent DDoS.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to API routes
app.use('/api/', apiLimiter);

// Mount API Routers
app.use('/api/auth', authRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/contact', contactRoutes);

// Health Check / Root endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Makdi Raksha Dal (MRD) Cyber Core API',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Core server exception occurred.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`======================================================================`);
  console.log(`🕵️‍♂️ MRD Cyber Command Center API online on port: ${PORT}`);
  console.log(`💻 Local Core: http://localhost:${PORT}`);
  console.log(`======================================================================`);
});
