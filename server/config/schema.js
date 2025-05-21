
const { pool } = require('./database');

// Function to initialize database tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create students table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(20),
        department VARCHAR(50),
        registration_number VARCHAR(50),
        batch VARCHAR(10),
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Create placement_officers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS placement_officers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create companies table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        industry VARCHAR(50),
        location VARCHAR(100),
        last_visit DATE,
        status VARCHAR(20),
        contact VARCHAR(100),
        email VARCHAR(100),
        offers INT DEFAULT 0,
        visits INT DEFAULT 0,
        logo VARCHAR(255) DEFAULT 'https://via.placeholder.com/40',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create placement_drives table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS placement_drives (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company VARCHAR(100) NOT NULL,
        title VARCHAR(200) NOT NULL,
        position VARCHAR(100),
        drive_date DATE,
        registration_deadline DATE,
        location VARCHAR(100),
        eligibility TEXT,
        roles TEXT,
        package VARCHAR(50),
        status VARCHAR(20),
        students_registered INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create applications table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT,
        drive_id INT,
        status VARCHAR(50),
        applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (drive_id) REFERENCES placement_drives(id)
      )
    `);

    console.log('Database tables initialized');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database initialization error:', error.message);
    return false;
  }
};

module.exports = {
  initializeDatabase
};
