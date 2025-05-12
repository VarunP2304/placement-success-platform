
const express = require('express');
const router = express.Router();

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

// Add a test user with the given username
// This will help us test the login with the specific username mentioned by the user
users.push({
  id: 5,
  username: '4SF22CI123',
  password: 'password123',
  role: 'student',
  name: 'Test Student',
  email: 'test.student@university.edu',
  department: 'Computer Science',
  regNumber: 'CS2020123',
  batch: '2024'
});

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
router.post('/login', (req, res) => {
  const { username, password, role } = req.body;
  
  console.log('Login attempt:', { username, role });
  
  // Validate username format first
  if (!validateUsername(username, role)) {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid username format for ${role} role` 
    });
  }
  
  // Find user
  const user = users.find(u => u.username === username && u.role === role);
  
  if (!user) {
    console.log('User not found');
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
  
  // For demo simplicity, we're not strictly checking passwords
  // In a real app, you'd use bcrypt to compare hashed passwords
  if (password !== 'password123') {
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
      token: 'mock-jwt-token-' + user.role // In a real app, use JWT
    }
  });
});

// Register route (for demo purposes)
router.post('/register', (req, res) => {
  const { username, password, role, name } = req.body;
  
  // Validate username format
  if (!validateUsername(username, role)) {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid username format for ${role} role` 
    });
  }
  
  // Check if user already exists
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ 
      success: false, 
      message: 'Username already exists' 
    });
  }
  
  // Create new user
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
