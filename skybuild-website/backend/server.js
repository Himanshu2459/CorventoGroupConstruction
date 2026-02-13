const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const projectRoutes = require('./routes/projects');
const serviceRoutes = require('./routes/services');
const contactRoutes = require('./routes/contact');
const testimonialRoutes = require('./routes/testimonials');
const authRoutes = require('./routes/auth');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Skybuild API is running' });
});

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Test the database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
    // Sync database models (this will update tables to match your models)
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('✅ Database models synchronized');
  })
  .catch(err => console.error('❌ PostgreSQL connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});