
const { pool } = require('./database');

// Function to initialize database tables
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create students table with your specific requirements
    await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usn VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        branch VARCHAR(20) NOT NULL,
        company_names TEXT,
        number_of_offers INT DEFAULT 0,
        email VARCHAR(100) UNIQUE NOT NULL,
        contact_number VARCHAR(20) NOT NULL,
        year_of_passing VARCHAR(4) NOT NULL,
        year_of_admission VARCHAR(2) GENERATED ALWAYS AS (
          LPAD(CAST(year_of_passing AS UNSIGNED) - 4, 2, '0')
        ) STORED,
        be_cgpa DECIMAL(4,2),
        tenth_percentage DECIMAL(5,2),
        twelfth_percentage DECIMAL(5,2),
        
        -- Additional Details
        permanent_address TEXT,
        has_internship ENUM('yes', 'no') DEFAULT 'no',
        internship_count INT DEFAULT 0,
        has_projects ENUM('yes', 'no') DEFAULT 'no',
        project_count INT DEFAULT 0,
        has_work_experience ENUM('yes', 'no') DEFAULT 'no',
        work_experience_months INT DEFAULT 0,
        
        -- Semester Marks
        sem1_marks DECIMAL(4,2),
        sem2_marks DECIMAL(4,2),
        sem3_marks DECIMAL(4,2),
        sem4_marks DECIMAL(4,2),
        sem5_marks DECIMAL(4,2),
        sem6_marks DECIMAL(4,2),
        sem7_marks DECIMAL(4,2),
        sem8_marks DECIMAL(4,2),
        
        -- Diploma marks (if applicable)
        diploma_sem1 DECIMAL(4,2),
        diploma_sem2 DECIMAL(4,2),
        diploma_sem3 DECIMAL(4,2),
        diploma_sem4 DECIMAL(4,2),
        diploma_sem5 DECIMAL(4,2),
        diploma_sem6 DECIMAL(4,2),
        
        -- File uploads
        resume_file VARCHAR(255),
        video_resume_file VARCHAR(255),
        
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
        company VARCHAR(100) NOT NULL,
        title VARCHAR(200) NOT NULL,
        position VARCHAR(100),
        drive_date DATE,
        registration_deadline DATE,
        location VARCHAR(100),
        eligibility TEXT,
        roles TEXT,
        package_offered VARCHAR(50),
        status VARCHAR(20) DEFAULT 'Upcoming',
        students_registered INT DEFAULT 0,
        students_selected INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create student_documents table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS student_documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_usn VARCHAR(20) NOT NULL,
        document_name VARCHAR(255) NOT NULL,
        document_type ENUM('resume', 'marksheet', 'certificate', 'other') NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
        FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE
      )
    `);
    
    // Create interviews table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS interviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_usn VARCHAR(20) NOT NULL,
        company_name VARCHAR(100) NOT NULL,
        position VARCHAR(100) NOT NULL,
        interview_date DATETIME NOT NULL,
        interview_type ENUM('technical', 'hr', 'group', 'aptitude') NOT NULL,
        location VARCHAR(100),
        status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
        result ENUM('selected', 'rejected', 'pending') DEFAULT 'pending',
        feedback TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_usn) REFERENCES students(usn) ON DELETE CASCADE
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
