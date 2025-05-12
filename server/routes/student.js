const express = require('express');
const router = express.Router();

// Mock interviews data from your frontend
const { upcomingInterviewsData, pastInterviewsData } = require('../data/interviewData');

// Mock job and internship applications
const jobApplications = [
  {
    id: 1,
    companyName: "Google",
    position: "Software Engineer",
    appliedDate: "2023-04-15",
    location: "Bangalore",
    status: "Interview Scheduled",
    package: "₹18 LPA",
  },
  {
    id: 2,
    companyName: "Microsoft",
    position: "Product Manager",
    appliedDate: "2023-04-10",
    location: "Hyderabad",
    status: "Application Under Review",
    package: "₹16 LPA",
  },
  {
    id: 3,
    companyName: "Amazon",
    position: "Data Scientist",
    appliedDate: "2023-04-05",
    location: "Pune",
    status: "Shortlisted",
    package: "₹15 LPA",
  },
  {
    id: 4,
    companyName: "Apple",
    position: "iOS Developer",
    appliedDate: "2023-03-25",
    location: "Bangalore",
    status: "Rejected",
    package: "₹17 LPA",
  },
  {
    id: 5,
    companyName: "Netflix",
    position: "UI/UX Designer",
    appliedDate: "2023-03-20",
    location: "Mumbai",
    status: "Offer Received",
    package: "₹14 LPA",
  }
];

const internshipApplications = [
  {
    id: 1,
    companyName: "IBM",
    position: "Software Development Intern",
    appliedDate: "2023-04-18",
    duration: "6 months",
    location: "Remote",
    status: "Application Under Review",
    stipend: "₹25,000/month",
  },
  {
    id: 2,
    companyName: "Adobe",
    position: "UX Research Intern",
    appliedDate: "2023-04-12",
    duration: "3 months",
    location: "Noida",
    status: "Interview Scheduled",
    stipend: "₹20,000/month",
  },
  {
    id: 3,
    companyName: "Flipkart",
    position: "Data Analytics Intern",
    appliedDate: "2023-04-08",
    duration: "4 months",
    location: "Bangalore",
    status: "Selected",
    stipend: "₹18,000/month",
  }
];

// Get student profile
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: {
      fullName: "John Doe",
      email: "john.doe@university.edu",
      phone: "+1 234 567 8901",
      department: "Computer Science",
      regNumber: "CS2020135",
      batch: "2024",
      bio: "Computer Science student with a passion for AI and web development. Looking for opportunities in software engineering roles."
    }
  });
});

// Get student interviews
router.get('/interviews', (req, res) => {
  res.json({
    success: true,
    data: {
      upcoming: upcomingInterviewsData,
      past: pastInterviewsData
    }
  });
});

// Get student applications
router.get('/applications', (req, res) => {
  res.json({
    success: true,
    data: {
      jobs: jobApplications,
      internships: internshipApplications
    }
  });
});

// Get student documents
router.get('/documents', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: "1",
        name: "Resume_John_Doe.pdf",
        type: "resume",
        date: "Feb 10, 2024",
        status: "verified",
        url: "#"
      },
      {
        id: "2",
        name: "Semester5_Marksheet.pdf",
        type: "marksheet",
        date: "Jan 15, 2024",
        status: "verified",
        url: "#"
      },
      {
        id: "3",
        name: "Semester6_Marksheet.pdf",
        type: "marksheet",
        date: "Mar 01, 2024",
        status: "pending",
        url: "#"
      },
      {
        id: "4",
        name: "Google_Internship_Certificate.pdf",
        type: "internship",
        date: "Dec 20, 2023",
        status: "verified",
        url: "#"
      }
    ]
  });
});

// Update student profile
router.put('/profile', (req, res) => {
  // In a real app, this would update the database
  res.json({
    success: true,
    message: "Profile updated successfully",
    data: req.body
  });
});

module.exports = router;
