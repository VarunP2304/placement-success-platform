
const express = require('express');
const router = express.Router();

// Mock users data
const users = {
  student: {
    id: 1,
    username: 'student',
    password: 'password123',
    role: 'student',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    department: 'Computer Science',
    regNumber: 'CS2020135',
    batch: '2024'
  },
  placement: {
    id: 2,
    username: 'placement',
    password: 'password123',
    role: 'placement',
    name: 'Placement Officer',
  },
  employer: {
    id: 3,
    username: 'employer',
    password: 'password123',
    role: 'employer',
    name: 'Recruiter',
    company: 'Google'
  },
  admin: {
    id: 4,
    username: 'admin',
    password: 'password123',
    role: 'admin',
    name: 'Admin User'
  }
};

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Find user
  const user = Object.values(users).find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
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

// Get current user route
router.get('/me', (req, res) => {
  // In a real app, this would verify the JWT token
  // For now, just return a mock user based on the provided role
  const role = req.headers.role;
  
  if (!role || !users[role]) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const { password: _, ...userWithoutPassword } = users[role];
  
  res.json({
    success: true,
    data: {
      user: userWithoutPassword
    }
  });
});

module.exports = router;
