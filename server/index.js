
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { testConnection } = require('./config/database');
const { initializeDatabase } = require('./config/schema');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
(async () => {
  const isConnected = await testConnection();
  if (isConnected) {
    await initializeDatabase();
  } else {
    console.log('Warning: Running with mock data since database connection failed');
  }
})();

// Import routes
const studentRoutes = require('./routes/student');
const employerRoutes = require('./routes/employer');
const placementRoutes = require('./routes/placement');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/students', studentRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.head('/api/health', (req, res) => {
  res.status(200).end();
});
app.get('/api/health', async (req, res) => {
  try {
    res.status(200).json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: 'error' });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('Placement Services Management System API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
