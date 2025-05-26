
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Regular expressions for username validation
const studentUsernameRegex = /^4SF\d{2}(CS|CI|IS|CD|ME|RA|EC|BA)\d{3}$/;
const placementUsernameRegex = /^FA\d{3}$/;

// Mock users data for demo
const users = [
  {
    id: 1,
    username: '4SF22CS001',
    password: 'password123',
    role: 'student',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    department: 'CSE',
    usn: '4SF22CS001'
  },
  {
    id: 2,
    username: 'FA001',
    password: 'password123',
    role: 'placement',
    name: 'Placement Officer',
    email: 'placement@university.edu'
  }
];

// Function to validate username format based on role
const validateUsername = (username, role) => {
  switch (role) {
    case 'student':
      return studentUsernameRegex.test(username);
    case 'placement':
      return placementUsernameRegex.test(username);
    default:
      return false;
  }
};

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  
  console.log('Login attempt:', { username, role });
  
  // Validate username format first
  if (!validateUsername(username, role)) {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid username format for ${role} role` 
    });
  }
  
  try {
    let user = null;
    const connection = await pool.getConnection();
    
    if (role === 'student') {
      const [rows] = await connection.query(
        'SELECT * FROM students WHERE usn = ?', 
        [username]
      );
      if (rows.length > 0) {
        user = { ...rows[0], role: 'student' };
      }
    } else if (role === 'placement') {
      const [rows] = await connection.query(
        'SELECT * FROM placement_officers WHERE username = ?', 
        [username]
      );
      if (rows.length > 0) {
        user = { ...rows[0], role: 'placement' };
      }
    }
    
    connection.release();
    
    // If not found in DB, fall back to mock data
    if (!user) {
      user = users.find(u => u.username === username && u.role === role);
    }
    
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // For demo simplicity, we're using the same password for all users
    if (password !== 'password123') {
      console.log('Invalid password');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    console.log('Login successful for user:', user.username || user.usn);
    
    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Register route (optional for demo)
router.post('/register', async (req, res) => {
  const { username, password, role, name } = req.body;
  
  // Validate username format
  if (!validateUsername(username, role)) {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid username format for ${role} role` 
    });
  }
  
  try {
    const connection = await pool.getConnection();
    let userExists = false;
    
    if (role === 'student') {
      const [rows] = await connection.query(
        'SELECT id FROM students WHERE usn = ?', 
        [username]
      );
      userExists = rows.length > 0;
      
      if (!userExists) {
        await connection.query(
          'INSERT INTO students (usn, full_name, email) VALUES (?, ?, ?)',
          [username, name, `${username.toLowerCase()}@university.edu`]
        );
        
        const [newUser] = await connection.query(
          'SELECT * FROM students WHERE usn = ?',
          [username]
        );
        
        connection.release();
        
        return res.status(201).json({
          success: true,
          message: 'Registration successful',
          data: {
            user: { ...newUser[0], role }
          }
        });
      }
    } else if (role === 'placement') {
      const [rows] = await connection.query(
        'SELECT id FROM placement_officers WHERE username = ?', 
        [username]
      );
      userExists = rows.length > 0;
      
      if (!userExists) {
        await connection.query(
          'INSERT INTO placement_officers (username, password, name, email) VALUES (?, ?, ?, ?)',
          [username, password, name, `${username.toLowerCase()}@university.edu`]
        );
        
        const [newUser] = await connection.query(
          'SELECT * FROM placement_officers WHERE username = ?',
          [username]
        );
        
        connection.release();
        
        return res.status(201).json({
          success: true,
          message: 'Registration successful',
          data: {
            user: { ...newUser[0], role }
          }
        });
      }
    }
    
    connection.release();
    
    if (userExists) {
      return res.status(409).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Invalid role specified'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

module.exports = router;
