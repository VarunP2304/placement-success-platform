
const express = require('express');
const router = express.Router();

// Mock employer data
router.get('/jobs', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        title: "Software Engineer",
        company: "Google",
        location: "Bangalore",
        package: "₹18 LPA",
        deadline: "May 15, 2024",
        description: "Looking for talented software engineers",
        requirements: "B.Tech/M.Tech in CS/IT, 8+ CGPA",
        applicationCount: 45
      },
      {
        id: 2,
        title: "Product Manager",
        company: "Microsoft",
        location: "Hyderabad",
        package: "₹16 LPA",
        deadline: "May 18, 2024",
        description: "Product management role for fresh graduates",
        requirements: "Any degree with excellent communication skills",
        applicationCount: 32
      },
      {
        id: 3,
        title: "Data Scientist",
        company: "Amazon",
        location: "Pune",
        package: "₹15 LPA",
        deadline: "May 20, 2024",
        description: "Data science position for analytics enthusiasts",
        requirements: "Strong background in statistics and programming",
        applicationCount: 28
      }
    ]
  });
});

module.exports = router;
