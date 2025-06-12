
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { pool } = require('../config/database');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow specific file types
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'video/mp4',
      'video/avi',
      'video/mov',
      'image/jpeg',
      'image/png'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

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

// Create/Update student profile with file upload
router.post('/profile', upload.fields([
  { name: 'resumeFile', maxCount: 1 },
  { name: 'videoResumeFile', maxCount: 1 }
]), async (req, res) => {
  const studentData = req.body;
  const files = req.files;
  
  try {
    const connection = await pool.getConnection();
    
    // Handle file uploads
    let resumeFilePath = null;
    let videoResumeFilePath = null;
    
    if (files && files.resumeFile) {
      resumeFilePath = files.resumeFile[0].filename;
    }
    
    if (files && files.videoResumeFile) {
      videoResumeFilePath = files.videoResumeFile[0].filename;
    }
    
    // Check if student exists
    const [existing] = await connection.query(
      'SELECT id FROM students WHERE usn = ?',
      [studentData.usn]
    );

    if (existing.length > 0) {
      // Update existing record
      const updateQuery = `
        UPDATE students SET 
          name = ?, branch = ?, company_names = ?, number_of_offers = ?,
          email = ?, contact_number = ?, year_of_passing = ?,
          be_cgpa = ?, tenth_percentage = ?, twelfth_percentage = ?,
          permanent_address = ?,
          has_internship = ?, internship_count = ?,
          has_projects = ?, project_count = ?,
          has_work_experience = ?, work_experience_months = ?,
          sem1_marks = ?, sem2_marks = ?, sem3_marks = ?, sem4_marks = ?,
          sem5_marks = ?, sem6_marks = ?, sem7_marks = ?, sem8_marks = ?,
          diploma_sem1 = ?, diploma_sem2 = ?, diploma_sem3 = ?,
          diploma_sem4 = ?, diploma_sem5 = ?, diploma_sem6 = ?
          ${resumeFilePath ? ', resume_file = ?' : ''}
          ${videoResumeFilePath ? ', video_resume_file = ?' : ''},
          updated_at = CURRENT_TIMESTAMP
        WHERE usn = ?
      `;
      
      const updateParams = [
        studentData.name, studentData.branch, studentData.companyNames, studentData.numberOfOffers || 0,
        studentData.email, studentData.contactNumber, studentData.yearOfPassing,
        studentData.beCgpa, studentData.tenthPercentage, studentData.twelfthPercentage,
        studentData.permanentAddress,
        studentData.hasInternship, studentData.internshipCount || 0,
        studentData.hasProjects, studentData.projectCount || 0,
        studentData.hasWorkExperience, studentData.workExperienceMonths || 0,
        studentData.sem1, studentData.sem2, studentData.sem3, studentData.sem4,
        studentData.sem5, studentData.sem6, studentData.sem7, studentData.sem8,
        studentData.diplomaSem1, studentData.diplomaSem2, studentData.diplomaSem3,
        studentData.diplomaSem4, studentData.diplomaSem5, studentData.diplomaSem6
      ];
      
      if (resumeFilePath) updateParams.push(resumeFilePath);
      if (videoResumeFilePath) updateParams.push(videoResumeFilePath);
      updateParams.push(studentData.usn);
      
      await connection.query(updateQuery, updateParams);
    } else {
      // Insert new record
      const insertQuery = `
        INSERT INTO students (
          usn, name, branch, company_names, number_of_offers,
          email, contact_number, year_of_passing,
          be_cgpa, tenth_percentage, twelfth_percentage,
          permanent_address,
          has_internship, internship_count, has_projects, project_count,
          has_work_experience, work_experience_months,
          sem1_marks, sem2_marks, sem3_marks, sem4_marks,
          sem5_marks, sem6_marks, sem7_marks, sem8_marks,
          diploma_sem1, diploma_sem2, diploma_sem3,
          diploma_sem4, diploma_sem5, diploma_sem6,
          resume_file, video_resume_file
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.query(insertQuery, [
        studentData.usn, studentData.name, studentData.branch, studentData.companyNames, studentData.numberOfOffers || 0,
        studentData.email, studentData.contactNumber, studentData.yearOfPassing,
        studentData.beCgpa, studentData.tenthPercentage, studentData.twelfthPercentage,
        studentData.permanentAddress,
        studentData.hasInternship, studentData.internshipCount || 0,
        studentData.hasProjects, studentData.projectCount || 0,
        studentData.hasWorkExperience, studentData.workExperienceMonths || 0,
        studentData.sem1, studentData.sem2, studentData.sem3, studentData.sem4,
        studentData.sem5, studentData.sem6, studentData.sem7, studentData.sem8,
        studentData.diplomaSem1, studentData.diplomaSem2, studentData.diplomaSem3,
        studentData.diplomaSem4, studentData.diplomaSem5, studentData.diplomaSem6,
        resumeFilePath, videoResumeFilePath
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

// Upload document
router.post('/documents/upload', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { documentType, documentName } = req.body;
    const studentUsn = req.user?.usn || 'TEST_USN'; // Get from auth middleware
    
    const connection = await pool.getConnection();
    await connection.query(`
      INSERT INTO student_documents (student_usn, document_name, document_type, file_path, status)
      VALUES (?, ?, ?, ?, 'pending')
    `, [studentUsn, documentName, documentType, req.file.filename]);
    connection.release();

    res.json({
      success: true,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed'
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
    `, [req.user?.usn || 'TEST_USN']); // Get from auth middleware
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

// Delete document
router.delete('/documents/:id', async (req, res) => {
  try {
    const documentId = req.params.id;
    const connection = await pool.getConnection();
    
    // Get file path before deleting
    const [rows] = await connection.query(
      'SELECT file_path FROM student_documents WHERE id = ? AND student_usn = ?',
      [documentId, req.user?.usn || 'TEST_USN']
    );
    
    if (rows.length > 0) {
      // Delete file from filesystem
      const filePath = path.join('uploads', rows[0].file_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      // Delete from database
      await connection.query(
        'DELETE FROM student_documents WHERE id = ? AND student_usn = ?',
        [documentId, req.user?.usn || 'TEST_USN']
      );
    }
    
    connection.release();

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Delete failed'
    });
  }
});

// Serve uploaded files
router.get('/documents/view/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../../uploads', filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(path.resolve(filePath));
  } else {
    res.status(404).json({
      success: false,
      message: 'File not found'
    });
  }
});

// Get all students for placement analytics (placement dept only)
router.get('/analytics', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        usn, name, branch, company_names, number_of_offers,
        email, contact_number, year_of_passing, year_of_admission,
        be_cgpa, tenth_percentage, twelfth_percentage,
        has_internship, internship_count, has_projects, project_count,
        has_work_experience, work_experience_months,
        sem1_marks, sem2_marks, sem3_marks, sem4_marks,
        sem5_marks, sem6_marks, sem7_marks, sem8_marks,
        diploma_sem1, diploma_sem2, diploma_sem3,
        diploma_sem4, diploma_sem5, diploma_sem6,
        resume_file, video_resume_file,
        created_at, updated_at
      FROM students
      ORDER BY be_cgpa DESC
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
