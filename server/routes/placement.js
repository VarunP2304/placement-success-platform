
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Get placement drives
router.get('/drives', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM placement_drives ORDER BY drive_date DESC');
    connection.release();
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error getting drives:', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

// Add a new placement drive
router.post('/drives', async (req, res) => {
  try {
    const {
      company,
      title,
      position,
      driveDate,
      registrationDeadline,
      location,
      eligibility,
      roles,
      package,
      status
    } = req.body;
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(`
      INSERT INTO placement_drives 
      (company, title, position, drive_date, registration_deadline, location, eligibility, roles, package_offered, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      company,
      title,
      position,
      driveDate,
      registrationDeadline,
      location,
      eligibility,
      roles,
      package,
      status
    ]);
    
    const [newDrive] = await connection.query('SELECT * FROM placement_drives WHERE id = ?', [result.insertId]);
    connection.release();
    
    res.json({
      success: true,
      message: "Drive added successfully",
      data: newDrive[0]
    });
  } catch (error) {
    console.error('Error adding drive:', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

// Get companies
router.get('/companies', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM companies ORDER BY name');
    connection.release();
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error getting companies:', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

// Add a new company
router.post('/companies', async (req, res) => {
  try {
    const {
      name,
      industry,
      location,
      lastVisit,
      status,
      contact,
      email
    } = req.body;
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(`
      INSERT INTO companies 
      (name, industry, location, last_visit, status, contact_person, contact_email) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      name,
      industry,
      location,
      lastVisit,
      status,
      contact,
      email
    ]);
    
    const [newCompany] = await connection.query('SELECT * FROM companies WHERE id = ?', [result.insertId]);
    connection.release();
    
    res.json({
      success: true,
      message: "Company added successfully",
      data: newCompany[0]
    });
  } catch (error) {
    console.error('Error adding company:', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

// Update a company
router.put('/companies/:id', async (req, res) => {
  const companyId = req.params.id;
  
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE companies SET ? WHERE id = ?', 
      [req.body, companyId]
    );
    
    if (result.affectedRows === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }
    
    const [updatedCompany] = await connection.query('SELECT * FROM companies WHERE id = ?', [companyId]);
    connection.release();
    
    res.json({
      success: true,
      message: "Company updated successfully",
      data: updatedCompany[0]
    });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({
      success: false,
      message: "Database error occurred"
    });
  }
});

// Delete a company
router.delete('/companies/:id', async (req, res) => {
  const companyId = req.params.id;
  
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM companies WHERE id = ?', [companyId]);
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      });
    }
    
    res.json({
      success: true,
      message: "Company deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({
      success: false,
      message: "Database error occurred"
    });
  }
});

// Get chart data from actual database
router.get('/charts/department', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        department as name,
        COUNT(*) as total,
        SUM(CASE WHEN placed = 1 THEN 1 ELSE 0 END) as placed,
        ROUND((SUM(CASE WHEN placed = 1 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1) as placementRate
      FROM students 
      GROUP BY department
      ORDER BY placementRate DESC
    `);
    connection.release();
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error getting chart data:', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

module.exports = router;
