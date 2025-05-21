
const mysql = require('mysql2/promise');

// Create connection pool for MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'placement_services',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection function
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection error:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};
