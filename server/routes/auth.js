
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Regular expressions for username validation
const studentUsernameRegex = /^4SF22(CI|IS|ME|RA|CS|CD)[0-9]{3}$/;
const placementUsernameRegex = /^FA[0-9]{3}$/;
const employerUsernameRegex = /^CA[0-9]{3}$/;
const adminUsernameRegex = /^SA[0-9]{3}$/;

// Mock users data
const users = [
  {
    id: 1,
    username: '4SF22CI001',
    password: 'password123',
    role: 'student',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    department: 'Computer Science',
    regNumber: 'CS2020135',
    batch: '2024'
  },
  {
    id: 2,
    username: 'FA001',
    password: 'password123',
    role: 'placement',
    name: 'Placement Officer',
  },
  {
    id: 3,
    username: 'CA001',
    password: 'password123',
    role: 'employer',
    name: 'Recruiter',
    company: 'Google'
  },
  {
    id: 4,
    username: 'SA001',
    password: 'password123',
    role: 'admin',
    name: 'Admin User'
  }
];

// Function to validate username format based on role
const validateUsername = (username, role) => {
  switch (role) {
    case 'student':
      return studentUsernameRegex.test(username);
    case 'placement':
      return placementUsernameRegex.test(username);
    case 'employer':
      return employerUsernameRegex.test(username);
    case 'admin':
      return adminUsernameRegex.test(username);
    default:
      return false;
  }
};

// Add a health check endpoint for frontend to check server status
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
    // First try to get from database
    let user = null;
    const connection = await pool.getConnection();
    
    if (role === 'student') {
      const [rows] = await connection.query(
        'SELECT * FROM students WHERE username = ?', 
        [username]
      );
      if (rows.length > 0) user = rows[0];
    } else if (role === 'placement') {
      const [rows] = await connection.query(
        'SELECT * FROM placement_officers WHERE username = ?', 
        [username]
      );
      if (rows.length > 0) user = rows[0];
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
    
    // For demo simplicity, we're not strictly checking passwords
    // In a real app, you'd use bcrypt to compare hashed passwords
    if (user.password !== 'password123' && password !== 'password123') {
      console.log('Invalid password');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    console.log('Login successful for user:', user.username);
    
    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + (user.role || role) // In a real app, use JWT
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

// Register route
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
    // Check if user exists in database
    const connection = await pool.getConnection();
    let userExists = false;
    
    if (role === 'student') {
      const [rows] = await connection.query(
        'SELECT id FROM students WHERE username = ?', 
        [username]
      );
      userExists = rows.length > 0;
      
      if (!userExists) {
        await connection.query(
          'INSERT INTO students (username, password, name) VALUES (?, ?, ?)',
          [username, password, name]
        );
        
        const [newUser] = await connection.query(
          'SELECT * FROM students WHERE username = ?',
          [username]
        );
        
        connection.release();
        
        const { password: _, ...userWithoutPassword } = newUser[0];
        
        return res.status(201).json({
          success: true,
          message: 'Registration successful',
          data: {
            user: { ...userWithoutPassword, role }
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
          'INSERT INTO placement_officers (username, password, name) VALUES (?, ?, ?)',
          [username, password, name]
        );
        
        const [newUser] = await connection.query(
          'SELECT * FROM placement_officers WHERE username = ?',
          [username]
        );
        
        connection.release();
        
        const { password: _, ...userWithoutPassword } = newUser[0];
        
        return res.status(201).json({
          success: true,
          message: 'Registration successful',
          data: {
            user: { ...userWithoutPassword, role }
          }
        });
      }
    } else {
      connection.release();
    }
    
    // If we reach here, either the user exists or it's not a database-backed role
    // Check in the mock data
    if (users.find(u => u.username === username)) {
      return res.status(409).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }
    
    // Create new user in mock data
    const newUser = {
      id: users.length + 1,
      username,
      password,
      role,
      name
    };
    
    users.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// Get current user route
router.get('/me', (req, res) => {
  // In a real app, this would verify the JWT token
  // For now, just return a mock user based on the provided role
  const role = req.headers.role;
  
  if (!role || !users.find(u => u.role === role)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const user = users.find(u => u.role === role);
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({
    success: true,
    data: {
      user: userWithoutPassword
    }
  });
});

module.exports = router;
