const mysql = require('mysql2/promise');
require('dotenv').config();

async function addBasePriceColumn() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'rentread'
    });

    console.log('📦 Checking if base_price column exists in books table...');

    // Check if column exists
    const [columns] = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_NAME = 'books' AND COLUMN_NAME = 'base_price'`
    );

    if (columns.length > 0) {
      console.log('✅ base_price column already exists!');
    } else {
      console.log('➕ Adding base_price column to books table...');
      await connection.query(`
        ALTER TABLE books 
        ADD COLUMN base_price DECIMAL(8,2) NOT NULL DEFAULT 10.00
      `);
      console.log('✅ base_price column added successfully!');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addBasePriceColumn();