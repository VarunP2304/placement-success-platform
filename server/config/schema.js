
const { pool } = require('./database');

// Function to initialize database tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create students table with new fields
    await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usn VARCHAR(20) UNIQUE NOT NULL,
        year_of_admission VARCHAR(4) NOT NULL,
        department VARCHAR(20) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        permanent_address TEXT NOT NULL,
        
        -- Academic Details
        tenth_marks DECIMAL(5,2),
        twelfth_marks DECIMAL(5,2),
        sem1_marks DECIMAL(4,2),
        sem2_marks DECIMAL(4,2),
        sem3_marks DECIMAL(4,2),
        sem4_marks DECIMAL(4,2),
        sem5_marks DECIMAL(4,2),
        sem6_marks DECIMAL(4,2),
        sem7_marks DECIMAL(4,2),
        sem8_marks DECIMAL(4,2),
        cgpa DECIMAL(4,2) GENERATED ALWAYS AS (
          (IFNULL(sem1_marks, 0) + IFNULL(sem2_marks, 0) + IFNULL(sem3_marks, 0) + IFNULL(sem4_marks, 0) + 
           IFNULL(sem5_marks, 0) + IFNULL(sem6_marks, 0) + IFNULL(sem7_marks, 0) + IFNULL(sem8_marks, 0)) / 8
        ) STORED,
        
        -- Experience Details
        has_internship ENUM('yes', 'no') DEFAULT 'no',
        internship_count INT DEFAULT 0,
        has_projects ENUM('yes', 'no') DEFAULT 'no',
        project_count INT DEFAULT 0,
        has_work_experience ENUM('yes', 'no') DEFAULT 'no',
        work_experience_months INT DEFAULT 0,
        
        -- File uploads
        resume_file VARCHAR(255),
        video_resume_file VARCHAR(255),
        
        -- Placement Details
        placed BOOLEAN DEFAULT FALSE,
        package_offered DECIMAL(4,1) DEFAULT 0,
        job_offers_count INT DEFAULT 0,
        company_placed VARCHAR(100),
        
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
        email VARCHAR(100),
        designation VARCHAR(50),
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
        website VARCHAR(100),
        contact_person VARCHAR(100),
        contact_email VARCHAR(100),
        contact_phone VARCHAR(20),
        status VARCHAR(20) DEFAULT 'Active',
        last_visit DATE,
        offers INT DEFAULT 0,
        visits INT DEFAULT 0,
        logo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create placement_drives table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS placement_drives (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_id INT,
        title VARCHAR(200) NOT NULL,
        position VARCHAR(100),
        drive_date DATE,
        registration_deadline DATE,
        location VARCHAR(100),
        eligibility TEXT,
        package_offered DECIMAL(4,1),
        status VARCHAR(20) DEFAULT 'Active',
        students_registered INT DEFAULT 0,
        students_selected INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (company_id) REFERENCES companies(id)
      )
    `);
    
    // Create applications table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT,
        drive_id INT,
        status VARCHAR(50) DEFAULT 'Applied',
        applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        interview_date DATE,
        result VARCHAR(50),
        package_offered DECIMAL(4,1),
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (drive_id) REFERENCES placement_drives(id)
      )
    `);

    console.log('Database tables initialized successfully');
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
