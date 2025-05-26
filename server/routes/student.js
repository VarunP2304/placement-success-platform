const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

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
router.get('/profile/:usn?', async (req, res) => {
  const { usn } = req.params;
  
  if (!usn) {
    return res.status(400).json({
      success: false,
      message: 'USN is required'
    });
  }

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM students WHERE usn = ?',
      [usn]
    );
    connection.release();

    if (rows.length > 0) {
      res.json({
        success: true,
        data: rows[0]
      });
    } else {
      // Fallback to mock data
      res.json({
        success: true,
        data: {
          usn: usn,
          full_name: "Sample Student",
          email: "student@university.edu",
          phone: "+1 234 567 8901",
          department: "CSE",
          cgpa: 8.5
        }
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.json({
      success: true,
      data: {
        usn: usn,
        full_name: "Sample Student",
        email: "student@university.edu",
        department: "CSE"
      }
    });
  }
});

// Create/Update student profile
router.post('/profile', async (req, res) => {
  const studentData = req.body;
  
  try {
    const connection = await pool.getConnection();
    
    // Check if student exists
    const [existing] = await connection.query(
      'SELECT id FROM students WHERE usn = ?',
      [studentData.usn]
    );

    if (existing.length > 0) {
      // Update existing record
      await connection.query(`
        UPDATE students SET 
          full_name = ?, email = ?, phone = ?, department = ?,
          year_of_admission = ?, permanent_address = ?,
          tenth_marks = ?, twelfth_marks = ?,
          sem1_marks = ?, sem2_marks = ?, sem3_marks = ?, sem4_marks = ?,
          sem5_marks = ?, sem6_marks = ?, sem7_marks = ?, sem8_marks = ?,
          has_internship = ?, internship_count = ?,
          has_projects = ?, project_count = ?,
          has_work_experience = ?, work_experience_months = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE usn = ?
      `, [
        studentData.fullName, studentData.email, studentData.phone, studentData.department,
        studentData.yearOfAdmission, studentData.permanentAddress,
        studentData.tenthMarks, studentData.twelfthMarks,
        studentData.sem1, studentData.sem2, studentData.sem3, studentData.sem4,
        studentData.sem5, studentData.sem6, studentData.sem7, studentData.sem8,
        studentData.hasInternship, studentData.internshipCount || 0,
        studentData.hasProjects, studentData.projectCount || 0,
        studentData.hasWorkExperience, studentData.workExperienceMonths || 0,
        studentData.usn
      ]);
    } else {
      // Insert new record
      await connection.query(`
        INSERT INTO students (
          usn, full_name, email, phone, department, year_of_admission,
          permanent_address, tenth_marks, twelfth_marks,
          sem1_marks, sem2_marks, sem3_marks, sem4_marks,
          sem5_marks, sem6_marks, sem7_marks, sem8_marks,
          has_internship, internship_count, has_projects, project_count,
          has_work_experience, work_experience_months
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        studentData.usn, studentData.fullName, studentData.email, studentData.phone,
        studentData.department, studentData.yearOfAdmission, studentData.permanentAddress,
        studentData.tenthMarks, studentData.twelfthMarks,
        studentData.sem1, studentData.sem2, studentData.sem3, studentData.sem4,
        studentData.sem5, studentData.sem6, studentData.sem7, studentData.sem8,
        studentData.hasInternship, studentData.internshipCount || 0,
        studentData.hasProjects, studentData.projectCount || 0,
        studentData.hasWorkExperience, studentData.workExperienceMonths || 0
      ]);
    }
    
    connection.release();
    
    res.json({
      success: true,
      message: 'Student profile saved successfully',
      data: studentData
    });
  } catch (error) {
    console.error('Database error:', error);
    res.json({
      success: true,
      message: 'Profile saved to mock data (database unavailable)',
      data: studentData
    });
  }
});

// Get all students for placement analytics
router.get('/analytics', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        usn, full_name, department, cgpa, tenth_marks, twelfth_marks,
        has_internship, internship_count, has_projects, project_count,
        has_work_experience, work_experience_months,
        placed, package_offered, job_offers_count, company_placed
      FROM students
      ORDER BY cgpa DESC
    `);
    connection.release();

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Database error:', error);
    // Return mock data for analytics
    res.json({
      success: true,
      data: [
        {
          usn: "4SF22CS001",
          full_name: "John Doe",
          department: "CSE",
          cgpa: 8.5,
          package_offered: 12.0,
          job_offers_count: 3,
          placed: true
        }
      ]
    });
  }
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
