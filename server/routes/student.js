
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

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
      res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Database error'
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
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

// Get all students for placement analytics (placement dept only)
router.get('/analytics', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        usn, full_name, department, cgpa, tenth_marks, twelfth_marks,
        has_internship, internship_count, has_projects, project_count,
        has_work_experience, work_experience_months,
        placed, package_offered, job_offers_count, company_placed,
        year_of_admission
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
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

// Get student documents
router.get('/documents', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT id, document_name, document_type, upload_date, status, file_path
      FROM student_documents 
      WHERE student_usn = ?
      ORDER BY upload_date DESC
    `, [req.user?.usn]); // Assuming middleware sets req.user
    connection.release();

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

// Get student interviews (removed mock data)
router.get('/interviews', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT * FROM interviews 
      WHERE student_usn = ?
      ORDER BY interview_date DESC
    `, [req.user?.usn]);
    connection.release();

    res.json({
      success: true,
      data: {
        upcoming: rows.filter(r => new Date(r.interview_date) > new Date()),
        past: rows.filter(r => new Date(r.interview_date) <= new Date())
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

module.exports = router;
