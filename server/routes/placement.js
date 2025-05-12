
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
    date: "2024-05-20",
    location: "Campus",
    eligibility: "8.5+ CGPA, strong analytics background",
    status: "Upcoming",
    package: "₹15 LPA",
  }
];

// Get placement drives
router.get('/drives', (req, res) => {
  res.json({
    success: true,
    data: placementDrives
  });
});

module.exports = router;
