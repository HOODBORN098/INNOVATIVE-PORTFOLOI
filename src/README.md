# Eric Wambua - Portfolio & Live Project Demonstrations

A comprehensive full-stack portfolio website featuring interactive cursor-following eyes and 7 production-ready live project demonstrations showcasing advanced software engineering, AI/ML implementation, and enterprise-level development practices.

![Portfolio Preview](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop)

## 🌟 Overview

This portfolio represents a complete showcase of modern software development skills, featuring:

- **Interactive Portfolio Website** with unique cursor-following eyes mechanic
- **7 Production-Ready Live Demos** with real backend functionality
- **Full-Stack Architecture** with Node.js/Express backend and React frontend
- **Enterprise-Level Features** including authentication, real-time updates, and analytics
- **AI/ML Integration** with recommendation systems and data analysis
- **Modern DevOps Practices** with containerization and deployment automation

## 🎯 Live Project Demonstrations

### 1. **Portfolio Website** - Interactive Professional Showcase
- **Tech Stack**: React, TypeScript, Tailwind CSS, Motion
- **Features**: Cursor-following eyes, dark/light mode, downloadable CV, contact forms
- **Backend**: Contact form processing, analytics tracking, CV download metrics
- **Status**: ✅ Production Ready

### 2. **Student Management System** - Academic Platform
- **Tech Stack**: React, Node.js, MongoDB, JWT Authentication
- **Features**: Role-based auth, grade tracking, course enrollment, PDF reports
- **Backend**: RESTful API, file uploads, email notifications, WebSocket messaging
- **Status**: 🚀 Full Stack Implementation

### 3. **BookSage AI** - Intelligent Book Recommender
- **Tech Stack**: Python, Scikit-learn, React, PostgreSQL
- **Features**: ML-powered recommendations, user profiles, reading analytics
- **Backend**: Recommendation engine API, collaborative filtering, NLP processing
- **Status**: 🚀 Full Stack Implementation

### 4. **Algorithm Visualizer Pro** - Educational Platform
- **Tech Stack**: JavaScript, HTML5 Canvas, D3.js, Web Workers
- **Features**: Sorting algorithms, pathfinding, data structures, performance metrics
- **Backend**: Progress tracking, algorithm sharing, learning analytics
- **Status**: ⚡ Enhanced with Backend

### 5. **CampusEvents** - Event Management Platform
- **Tech Stack**: Vue.js, Firebase, PWA, Service Workers
- **Features**: Real-time events, ticketing system, social features, analytics
- **Backend**: Real-time database, payment processing, notification system
- **Status**: ⚡ Enhanced with Backend

### 6. **NetScan Pro** - Network Security Scanner
- **Tech Stack**: Python, Nmap, React, WebSockets
- **Features**: Vulnerability scanning, device discovery, security reporting
- **Backend**: Distributed scanning, CVE integration, compliance reporting
- **Status**: 🚀 Full Stack Implementation

### 7. **WeatherScope AI** - Weather Analytics
- **Tech Stack**: Python, TensorFlow, React, PostgreSQL
- **Features**: Real-time data, AI predictions, historical analysis, station monitoring
- **Backend**: ML models, time-series DB, geospatial analysis, API integration
- **Status**: ⚡ Enhanced with Backend

## 🏗️ Architecture

### Frontend Architecture
```
📦 Frontend (React + TypeScript)
├── 🎨 Interactive UI Components
├── 👁️ Floating Eyes System
├── 🔄 Real-time WebSocket Integration
├── 📱 Responsive Design System
├── 🌙 Dark/Light Mode Toggle
├── 🎯 Live Project Deployer
└── 📊 Analytics Integration
```

### Backend Architecture
```
📦 Backend (Node.js + Express)
├── 🔐 JWT Authentication
├── 🗄️ MongoDB Database
├── 📡 WebSocket Real-time Updates
├── 📧 Email Integration
├── 🤖 AI/ML API Endpoints
├── 🔒 Security Middleware
├── 📈 Analytics & Monitoring
└── 🗂️ File Upload Handling
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (v6+)
- Redis (optional, for caching)
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ericwambua/portfolio.git
   cd portfolio
   ```

2. **Frontend Setup**
   ```bash
   npm install
   npm start
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env file with your configuration
   npm run seed  # Populate database with sample data
   npm run dev   # Start development server
   ```

4. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio_projects
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   CONTACT_EMAIL=ericwambua098@gmail.com
   ```

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run lint       # Run ESLint
```

**Backend:**
```bash
npm run dev        # Start with nodemon
npm run seed       # Seed database
npm test           # Run tests
npm run lint       # Run ESLint
npm run docker:build  # Build Docker image
```

### Database Seeding

The backend includes comprehensive sample data:
```bash
cd backend
npm run seed
```

This creates:
- 📚 Sample books with ratings and reviews
- 🎓 Student records with grades and enrollment data
- 📧 Contact form submissions
- 🔍 Search indexes for optimal performance

## 📊 API Documentation

### Core Endpoints

#### Portfolio APIs
```http
POST /api/contact           # Submit contact form
GET  /api/cv/download/:format  # Download CV (pdf/doc/json)
GET  /api/analytics/portfolio  # Portfolio analytics
POST /api/track/visit       # Track page visits
```

#### Book Recommendation APIs
```http
GET  /api/books                    # List books with filtering
GET  /api/books/:id               # Get book details
GET  /api/books/recommendations/:userId  # AI recommendations
POST /api/books/:id/reviews       # Add book review
GET  /api/books/analytics/stats   # Book analytics
```

#### Student Management APIs
```http
GET  /api/students        # List students
POST /api/students        # Create student
GET  /api/students/:id    # Get student details
PUT  /api/students/:id    # Update student
DELETE /api/students/:id  # Delete student
```

#### Real-time WebSocket Events
```javascript
// Network scanning updates
ws.send({ type: 'join_room', room: 'network_scan' });

// Weather data updates
ws.send({ type: 'join_room', room: 'weather' });

// Event notifications
ws.send({ type: 'join_room', room: 'events' });
```

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Rate Limiting** to prevent abuse
- **Helmet.js** for security headers
- **Input Validation** with Joi/express-validator
- **File Upload Security** with type and size restrictions
- **CORS Configuration** for cross-origin requests
- **Password Hashing** with bcrypt
- **Environment Variables** for sensitive data

## 📈 Analytics & Monitoring

### Built-in Analytics
- **Contact Form Submissions** tracking
- **CV Download Metrics** by format
- **Page Visit Analytics** with user agent data
- **Book Interaction Tracking** for recommendations
- **Real-time Usage Statistics**

### Monitoring Setup
```javascript
// Health check endpoint
GET /api/health

// Response format
{
  "status": "OK",
  "timestamp": "2024-03-15T10:30:00Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0"
}
```

## 🎨 Key Features

### Interactive Eyes System
- **Real-time cursor tracking** across all devices
- **Smooth animations** with CSS transforms
- **Performance optimized** with requestAnimationFrame
- **Responsive behavior** adapting to screen sizes

### AI-Powered Recommendations
- **Collaborative Filtering** based on user behavior
- **Content-Based Filtering** using book metadata
- **Hybrid Approach** combining multiple algorithms
- **Real-time Learning** from user interactions

### Real-time Features
- **WebSocket Integration** for live updates
- **Network Scan Results** streaming in real-time
- **Weather Data Updates** with live charts
- **Event Notifications** with instant delivery

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or individual containers
docker build -t portfolio-frontend .
docker build -t portfolio-backend ./backend
```

### Production Deployment
```bash
# Frontend build
npm run build

# Backend production
cd backend
npm install --production
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=production-secret-key-very-long-and-random
FRONTEND_URL=https://your-domain.com
EMAIL_SERVICE=gmail
SENTRY_DSN=your-sentry-dsn-for-error-tracking
```

## 📚 Technology Stack

### Frontend Technologies
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Motion** (Framer Motion) for animations
- **Lucide React** for icons
- **Recharts** for data visualization
- **ShadCN/UI** for component library

### Backend Technologies
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **WebSocket** for real-time communication
- **JWT** for authentication
- **Nodemailer** for email services
- **Multer** for file uploads
- **Winston** for logging

### DevOps & Tools
- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **ESLint** and **Prettier** for code quality
- **Jest** for testing
- **Nodemon** for development

## 🎯 Performance Optimizations

### Frontend Optimizations
- **Code Splitting** with React.lazy
- **Image Optimization** with WebP support
- **Bundle Analysis** and tree shaking
- **Caching Strategies** for API responses
- **Lazy Loading** for components and images

### Backend Optimizations
- **Database Indexing** for fast queries
- **Response Compression** with gzip
- **API Rate Limiting** to prevent abuse
- **Caching Layer** with Redis (optional)
- **Connection Pooling** for MongoDB

## 📞 Contact Information

**Eric Wambua**
- 📧 Email: [ericwambua098@gmail.com](mailto:ericwambua098@gmail.com)
- 📱 Phone: [0112394362](tel:+254112394362)
- 🎓 University: Egerton University - Computer Science
- 💼 LinkedIn: [LinkedIn Profile](https://linkedin.com/in/ericwambua)
- 🐙 GitHub: [GitHub Profile](https://github.com/ericwambua)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 🙏 Acknowledgments

- **Egerton University** for providing excellent computer science education
- **Open Source Community** for the amazing tools and libraries
- **Figma Make** for the development platform and hosting
- **Unsplash** for providing high-quality images

---

<div align="center">
  <p><strong>Built with ❤️ by Eric Wambua</strong></p>
  <p><em>Showcasing the future of software development</em></p>
</div>