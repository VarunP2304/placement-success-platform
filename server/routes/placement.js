const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Placement drives data - keep for backward compatibility
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

// Companies data - keep for backward compatibility
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

// Chart data - keep for backward compatibility
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
router.get('/drives', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM placement_drives ORDER BY drive_date DESC');
    connection.release();
    
    // If no drives in database yet, return mock data
    if (rows.length === 0) {
      return res.json({
        success: true,
        data: placementDrives,
        source: 'mock'
      });
    }
    
    res.json({
      success: true,
      data: rows,
      source: 'database'
    });
  } catch (error) {
    console.error('Error getting drives:', error);
    // Fall back to mock data in case of error
    res.json({
      success: true,
      data: placementDrives,
      source: 'mock (fallback)'
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
      (company, title, position, drive_date, registration_deadline, location, eligibility, roles, package, status) 
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
    
    if (result.affectedRows === 1) {
      const [newDrive] = await connection.query('SELECT * FROM placement_drives WHERE id = ?', [result.insertId]);
      connection.release();
      
      res.json({
        success: true,
        message: "Drive added successfully to database",
        data: newDrive[0]
      });
    } else {
      connection.release();
      
      // Fall back to mock data if DB insert fails
      const newDrive = {
        id: placementDrives.length + 1,
        ...req.body,
        studentsRegistered: 0,
      };
      
      placementDrives.push(newDrive);
      
      res.json({
        success: true,
        message: "Drive added successfully to mock data",
        data: newDrive
      });
    }
  } catch (error) {
    console.error('Error adding drive:', error);
    
    // Fall back to mock data in case of error
    const newDrive = {
      id: placementDrives.length + 1,
      ...req.body,
      studentsRegistered: 0,
    };
    
    placementDrives.push(newDrive);
    
    res.json({
      success: true,
      message: "Drive added to mock data (database error)",
      data: newDrive
    });
  }
});

// Get companies
router.get('/companies', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM companies');
    connection.release();
    
    // If no companies in database yet, return mock data
    if (rows.length === 0) {
      return res.json({
        success: true,
        data: companies,
        source: 'mock'
      });
    }
    
    res.json({
      success: true,
      data: rows,
      source: 'database'
    });
  } catch (error) {
    console.error('Error getting companies:', error);
    // Fall back to mock data in case of error
    res.json({
      success: true,
      data: companies,
      source: 'mock (fallback)'
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
      (name, industry, location, last_visit, status, contact, email) 
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
    
    if (result.affectedRows === 1) {
      const [newCompany] = await connection.query('SELECT * FROM companies WHERE id = ?', [result.insertId]);
      connection.release();
      
      res.json({
        success: true,
        message: "Company added successfully to database",
        data: newCompany[0]
      });
    } else {
      connection.release();
      
      // Fall back to mock data if DB insert fails
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
        message: "Company added successfully to mock data",
        data: newCompany
      });
    }
  } catch (error) {
    console.error('Error adding company:', error);
    
    // Fall back to mock data in case of error
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
      message: "Company added to mock data (database error)",
      data: newCompany
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
      message: "Error updating company"
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
      message: "Error deleting company"
    });
  }
});

// Get chart data
router.get('/charts/department', async (req, res) => {
  // Return mock chart data for now
  // In a real implementation, this would aggregate data from database
  res.json({
    success: true,
    data: chartData.departmentData
  });
});

// Update the API service to handle errors better
<lov-write file_path="src/services/api.ts">
import axios from 'axios';

// Get API URL from environment or use fallback URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  // Add timeout to avoid hanging requests
  timeout: 10000,
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for network error
    if (!error.response) {
      console.error('Server connection error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ... keep existing code (authService, studentService, employerService)

// Placement services
export const placementService = {
  getDrives: async () => {
    const response = await api.get('/placements/drives');
    return response.data;
  },
  addDrive: async (driveData: any) => {
    const response = await api.post('/placements/drives', driveData);
    return response.data;
  },
  getCompanies: async () => {
    const response = await api.get('/placements/companies');
    return response.data;
  },
  addCompany: async (companyData: any) => {
    const response = await api.post('/placements/companies', companyData);
    return response.data;
  },
  updateCompany: async (id: number, companyData: any) => {
    const response = await api.put(`/placements/companies/${id}`, companyData);
    return response.data;
  },
  deleteCompany: async (id: number) => {
    const response = await api.delete(`/placements/companies/${id}`);
    return response.data;
  },
  getDepartmentChartData: async () => {
    const response = await api.get('/placements/charts/department');
    return response.data;
  },
  downloadChart: async (chartType: string, format: string = 'pdf') => {
    // In a real application, this would hit an endpoint that returns a file
    // For this mock implementation, we'll simulate a file download
    return {
      success: true,
      message: `Chart ${chartType} downloaded as ${format}`,
      url: `data:application/pdf;base64,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`
    };
  }
};

export default api;

</edits_to_apply>
