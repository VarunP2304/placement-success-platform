
const express = require('express');
const router = express.Router();

// Placement drives data
const placementDrives = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    date: "2024-05-15",
    location: "Campus",
    eligibility: "8+ CGPA, no backlogs",
    status: "Upcoming",
    package: "₹18 LPA",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Product Manager",
    date: "2024-05-18",
    location: "Virtual",
    eligibility: "7.5+ CGPA",
    status: "Upcoming",
    package: "₹16 LPA",
  },
  {
    id: 3,
    company: "Amazon",
    position: "Data Scientist",
    date: "2024-07-20",
    location: "Campus",
    eligibility: "8.5+ CGPA, strong analytics background",
    status: "Upcoming",
    package: "₹15 LPA",
  }
];

// Companies data
const companies = [
  {
    id: 1,
    name: "Google",
    industry: "Technology",
    location: "Bangalore",
    lastVisit: "2025-01-15",
    status: "Active",
    offers: 12,
    visits: 3,
    contact: "John Doe",
    email: "john.doe@google.com",
    logo: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Microsoft",
    industry: "Technology",
    location: "Hyderabad",
    lastVisit: "2025-02-10",
    status: "Active",
    offers: 8,
    visits: 2,
    contact: "Jane Smith",
    email: "jane.smith@microsoft.com",
    logo: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Amazon",
    industry: "E-commerce",
    location: "Bangalore",
    lastVisit: "2025-03-05",
    status: "Active",
    offers: 15,
    visits: 4,
    contact: "Mike Johnson",
    email: "mike@amazon.com",
    logo: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    name: "IBM",
    industry: "Technology",
    location: "Pune",
    lastVisit: "2024-12-20",
    status: "Inactive",
    offers: 5,
    visits: 1,
    contact: "Sarah Williams",
    email: "sarah@ibm.com",
    logo: "https://via.placeholder.com/40",
  }
];

// Chart data
const chartData = {
  departmentData: [
    {
      name: "Computer Science",
      placed: 85,
      total: 95,
      placementRate: (85 / 95) * 100,
    },
    {
      name: "Electronics",
      placed: 65,
      total: 80,
      placementRate: (65 / 80) * 100,
    },
    {
      name: "Mechanical",
      placed: 50,
      total: 70,
      placementRate: (50 / 70) * 100,
    },
    {
      name: "Civil",
      placed: 40,
      total: 60,
      placementRate: (40 / 60) * 100,
    },
    {
      name: "Electrical",
      placed: 55,
      total: 70,
      placementRate: (55 / 70) * 100,
    }
  ]
};

// Get placement drives
router.get('/drives', (req, res) => {
  res.json({
    success: true,
    data: placementDrives
  });
});

// Add a new placement drive
router.post('/drives', (req, res) => {
  const newDrive = {
    id: placementDrives.length + 1,
    ...req.body,
    studentsRegistered: 0,
  };
  
  placementDrives.push(newDrive);
  
  res.json({
    success: true,
    message: "Drive added successfully",
    data: newDrive
  });
});

// Get companies
router.get('/companies', (req, res) => {
  res.json({
    success: true,
    data: companies
  });
});

// Add a new company
router.post('/companies', (req, res) => {
  const newCompany = {
    id: companies.length + 1,
    ...req.body,
    offers: 0,
    visits: 0,
    logo: "https://via.placeholder.com/40"
  };
  
  companies.push(newCompany);
  
  res.json({
    success: true,
    message: "Company added successfully",
    data: newCompany
  });
});

// Get chart data
router.get('/charts/department', (req, res) => {
  res.json({
    success: true,
    data: chartData.departmentData
  });
});

module.exports = router;
