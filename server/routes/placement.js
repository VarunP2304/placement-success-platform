const express = require('express');
const PDFDocument = require('pdfkit');
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
        branch as name,
        COUNT(*) as total,
        SUM(CASE WHEN number_of_offers > 0 THEN 1 ELSE 0 END) as placed,
        ROUND((SUM(CASE WHEN number_of_offers > 0 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1) as placementRate,
        ROUND(AVG(be_cgpa), 2) as avgCGPA,
        ROUND(AVG(number_of_offers), 2) as avgOffers
      FROM students 
      GROUP BY branch
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

// Get CGPA vs Offers correlation data
router.get('/charts/cgpa-offers-correlation', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        ROUND(be_cgpa, 1) as cgpa,
        number_of_offers as offers,
        name,
        branch
      FROM students 
      WHERE be_cgpa IS NOT NULL AND number_of_offers IS NOT NULL
      ORDER BY be_cgpa ASC
    `);
    connection.release();
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error getting correlation data:', error);
    res.status(500).json({
      success: false,
      message: 'Database error occurred'
    });
  }
});

// Download chart as PDF
router.get('/charts/download/:chartType', async (req, res) => {
  try {
    const { chartType } = req.params;
    const { format = 'pdf' } = req.query;
    
    const connection = await pool.getConnection();
    let data = [];
    let title = '';
    
    switch (chartType) {
      case 'branch-placement-rate':
        const [branchRows] = await connection.query(`
          SELECT 
            branch as name,
            COUNT(*) as total,
            SUM(CASE WHEN number_of_offers > 0 THEN 1 ELSE 0 END) as placed,
            ROUND((SUM(CASE WHEN number_of_offers > 0 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 1) as placementRate,
            ROUND(AVG(be_cgpa), 2) as avgCGPA
          FROM students 
          GROUP BY branch
          ORDER BY placementRate DESC
        `);
        data = branchRows;
        title = 'Branch-wise Placement Rate';
        break;
        
      case 'cgpa-offers-correlation':
        const [correlationRows] = await connection.query(`
          SELECT 
            ROUND(be_cgpa, 1) as cgpa,
            AVG(number_of_offers) as avgOffers,
            COUNT(*) as studentCount
          FROM students 
          WHERE be_cgpa IS NOT NULL AND number_of_offers IS NOT NULL
          GROUP BY ROUND(be_cgpa, 1)
          ORDER BY cgpa ASC
        `);
        data = correlationRows;
        title = 'CGPA vs Number of Offers Correlation';
        break;
        
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid chart type'
        });
    }
    
    connection.release();
    
    // Generate PDF
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${chartType}-report.pdf"`);
    
    doc.pipe(res);
    
    // Add title
    doc.fontSize(20).text(title, 50, 50);
    doc.moveDown();
    
    // Add data table
    let y = 150;
    doc.fontSize(12);
    
    if (chartType === 'branch-placement-rate') {
      doc.text('Branch', 50, y);
      doc.text('Total Students', 150, y);
      doc.text('Placed Students', 250, y);
      doc.text('Placement Rate', 350, y);
      doc.text('Avg CGPA', 450, y);
      y += 20;
      
      data.forEach((row) => {
        doc.text(row.name, 50, y);
        doc.text(row.total.toString(), 150, y);
        doc.text(row.placed.toString(), 250, y);
        doc.text(`${row.placementRate}%`, 350, y);
        doc.text(row.avgCGPA?.toString() || 'N/A', 450, y);
        y += 20;
      });
    } else if (chartType === 'cgpa-offers-correlation') {
      doc.text('CGPA', 50, y);
      doc.text('Average Offers', 200, y);
      doc.text('Student Count', 350, y);
      y += 20;
      
      data.forEach((row) => {
        doc.text(row.cgpa.toString(), 50, y);
        doc.text(row.avgOffers.toFixed(2), 200, y);
        doc.text(row.studentCount.toString(), 350, y);
        y += 20;
      });
    }
    
    doc.end();
    
  } catch (error) {
    console.error('Error generating chart PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF'
    });
  }
});

// Download reports as PDF
router.post('/reports/download', async (req, res) => {
  try {
    const { reportType, filters = {} } = req.body;
    
    const connection = await pool.getConnection();
    
    // Base query for student data
    let query = `
      SELECT 
        usn, name, branch, company_names, number_of_offers,
        email, contact_number, year_of_passing, year_of_admission,
        be_cgpa, tenth_percentage, twelfth_percentage,
        has_internship, internship_count, has_projects, project_count,
        has_work_experience, work_experience_months
      FROM students
      WHERE 1=1
    `;
    
    const queryParams = [];
    
    // Apply filters
    if (filters.department && filters.department !== 'all') {
      query += ' AND branch = ?';
      queryParams.push(filters.department);
    }
    
    if (filters.cgpaRange && filters.cgpaRange !== 'all') {
      switch (filters.cgpaRange) {
        case '9-10':
          query += ' AND be_cgpa >= 9.0 AND be_cgpa <= 10.0';
          break;
        case '8-9':
          query += ' AND be_cgpa >= 8.0 AND be_cgpa < 9.0';
          break;
        case '7-8':
          query += ' AND be_cgpa >= 7.0 AND be_cgpa < 8.0';
          break;
        case '6-7':
          query += ' AND be_cgpa >= 6.0 AND be_cgpa < 7.0';
          break;
        case '5-6':
          query += ' AND be_cgpa >= 5.0 AND be_cgpa < 6.0';
          break;
        case 'below-5':
          query += ' AND be_cgpa < 5.0';
          break;
      }
    }
    
    query += ' ORDER BY be_cgpa DESC';
    
    const [rows] = await connection.query(query, queryParams);
    connection.release();
    
    // Generate PDF report
    const doc = new PDFDocument({ margin: 30 });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${reportType}-report.pdf"`);
    
    doc.pipe(res);
    
    // Add header
    doc.fontSize(18).text('Placement Analytics Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Report Type: ${reportType}`, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);
    
    // Add summary statistics
    const totalStudents = rows.length;
    const placedStudents = rows.filter(r => r.number_of_offers > 0).length;
    const placementRate = totalStudents > 0 ? ((placedStudents / totalStudents) * 100).toFixed(1) : 0;
    const avgCGPA = rows
      .filter(r => r.be_cgpa)
      .reduce((sum, r) => sum + (r.be_cgpa || 0), 0) / (rows.filter(r => r.be_cgpa).length || 1);
    
    doc.fontSize(14).text('Summary Statistics:', { underline: true });
    doc.fontSize(12);
    doc.text(`Total Students: ${totalStudents}`);
    doc.text(`Students with Offers: ${placedStudents}`);
    doc.text(`Placement Rate: ${placementRate}%`);
    doc.text(`Average CGPA: ${avgCGPA.toFixed(2)}`);
    doc.moveDown(2);
    
    // Add student data table
    doc.fontSize(14).text('Student Details:', { underline: true });
    doc.moveDown();
    
    let y = doc.y;
    const pageHeight = doc.page.height - doc.page.margins.bottom;
    
    // Table headers
    doc.fontSize(9);
    doc.text('USN', 30, y, { width: 70 });
    doc.text('Name', 110, y, { width: 80 });
    doc.text('Branch', 200, y, { width: 50 });
    doc.text('CGPA', 260, y, { width: 40 });
    doc.text('Offers', 310, y, { width: 40 });
    doc.text('Companies', 360, y, { width: 150 });
    
    y += 15;
    
    // Table data
    rows.forEach((student, index) => {
      if (y > pageHeight - 50) {
        doc.addPage();
        y = 50;
      }
      
      doc.text(student.usn || '', 30, y, { width: 70 });
      doc.text(student.name || '', 110, y, { width: 80 });
      doc.text(student.branch || '', 200, y, { width: 50 });
      doc.text((student.be_cgpa || 0).toFixed(2), 260, y, { width: 40 });
      doc.text((student.number_of_offers || 0).toString(), 310, y, { width: 40 });
      doc.text(student.company_names || '-', 360, y, { width: 150 });
      
      y += 15;
    });
    
    doc.end();
    
  } catch (error) {
    console.error('Error generating report PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate report'
    });
  }
});

module.exports = router;
