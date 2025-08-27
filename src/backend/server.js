const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const nodemailer = require('nodemailer');
const WebSocket = require('ws');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const studentRoutes = require('./routes/students');
const bookRoutes = require('./routes/books');
const eventRoutes = require('./routes/events');
const networkRoutes = require('./routes/network');
const weatherRoutes = require('./routes/weather');
const analyticsRoutes = require('./routes/analytics');

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname.split('.').pop());
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_projects', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// WebSocket connections for real-time features
const clients = new Map();

wss.on('connection', function connection(ws, req) {
  const clientId = Math.random().toString(36).substr(2, 9);
  clients.set(clientId, ws);
  
  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message);
      
      // Handle different types of real-time messages
      switch (data.type) {
        case 'join_room':
          ws.room = data.room;
          break;
        case 'live_scan_update':
          broadcastToRoom('network_scan', data);
          break;
        case 'weather_update':
          broadcastToRoom('weather', data);
          break;
        case 'event_notification':
          broadcastToRoom('events', data);
          break;
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', function() {
    clients.delete(clientId);
  });
});

function broadcastToRoom(room, data) {
  clients.forEach((client, id) => {
    if (client.readyState === WebSocket.OPEN && client.room === room) {
      client.send(JSON.stringify(data));
    }
  });
}

// Email configuration
const transporter = nodemailer.createTransporter({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/students', authenticateToken, studentRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/network', authenticateToken, networkRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/analytics', authenticateToken, analyticsRoutes);

// Portfolio-specific endpoints
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to database
    const Contact = require('./models/Contact');
    const contact = new Contact({
      name,
      email,
      message,
      subject: subject || 'General Inquiry',
      timestamp: new Date()
    });
    await contact.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || 'ericwambua098@gmail.com',
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Contact form submitted successfully',
      id: contact._id 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CV download tracking
app.get('/api/cv/download/:format', async (req, res) => {
  try {
    const { format } = req.params;
    const userAgent = req.get('User-Agent');
    const ipAddress = req.ip;

    // Track download
    const Download = require('./models/Download');
    const download = new Download({
      type: 'cv',
      format,
      userAgent,
      ipAddress,
      timestamp: new Date()
    });
    await download.save();

    // Return appropriate file
    const path = require('path');
    const filePath = path.join(__dirname, 'files', `cv.${format}`);
    
    res.download(filePath, `Eric_Wambua_CV.${format}`, (err) => {
      if (err) {
        console.error('File download error:', err);
        res.status(404).json({ error: 'File not found' });
      }
    });
  } catch (error) {
    console.error('CV download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Analytics endpoint
app.get('/api/analytics/portfolio', authenticateToken, async (req, res) => {
  try {
    const Contact = require('./models/Contact');
    const Download = require('./models/Download');
    const Visit = require('./models/Visit');

    const [contacts, downloads, visits] = await Promise.all([
      Contact.countDocuments(),
      Download.countDocuments(),
      Visit.countDocuments()
    ]);

    const recentContacts = await Contact.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .select('name email subject timestamp');

    const downloadStats = await Download.aggregate([
      {
        $group: {
          _id: '$format',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      summary: {
        totalContacts: contacts,
        totalDownloads: downloads,
        totalVisits: visits
      },
      recentContacts,
      downloadStats,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Visit tracking middleware
app.use('/api/track/visit', (req, res) => {
  const Visit = require('./models/Visit');
  const visit = new Visit({
    page: req.body.page || '/',
    userAgent: req.get('User-Agent'),
    ipAddress: req.ip,
    timestamp: new Date()
  });
  
  visit.save().catch(console.error);
  res.json({ success: true });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, server, wss, broadcastToRoom };