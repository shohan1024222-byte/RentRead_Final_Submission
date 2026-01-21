const bcrypt = require('bcryptjs');
const pool = require('../../db');
require('dotenv').config();

async function createAdminUser() {
  try {
    console.log('🔐 Creating admin user...');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL
      )
    `);

    console.log('✅ Admin table created/verified');

    const [existing] = await pool.query('SELECT id FROM admin_users WHERE email = ?', ['admin@rentread.com']);

    if (existing && existing.length > 0) {
      console.log('ℹ️ Admin user already exists');
      console.log('📧 Email: admin@rentread.com');
      console.log('🔑 Password: admin123');
      process.exit(0);
    }

    const adminEmail = 'admin@rentread.com';
    const adminPassword = 'admin123';
    const adminName = 'Admin User';

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await pool.query(`
      INSERT INTO admin_users (name, email, password_hash, is_active) 
      VALUES (?, ?, ?, TRUE)
    `, [
      adminName, 
      adminEmail, 
      hashedPassword
    ]);

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('🎯 Login Details:');
    console.log('📧 Email: admin@rentread.com');
    console.log('🔑 Password: admin123');
    console.log('');
    console.log('🌐 Admin Panel URL: http://localhost:5000/admin-panel.html');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
    process.exit(1);
  }
}

createAdminUser();
