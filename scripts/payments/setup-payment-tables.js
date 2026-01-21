const pool = require('../../db');

async function createTables() {
  try {
    console.log('Creating rental_requests table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rental_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        book_id INT NOT NULL,
        rental_days INT NOT NULL,
        rental_price DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'bkash',
        payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
        request_status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
        bkash_transaction_id VARCHAR(100) NULL,
        admin_notes TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        rental_start_date TIMESTAMP NULL,
        rental_end_date TIMESTAMP NULL,
        book_title VARCHAR(255),
        book_author VARCHAR(255),
        book_image_url VARCHAR(500),
        user_name VARCHAR(255),
        user_email VARCHAR(255),
        user_phone VARCHAR(20),
        status VARCHAR(50) DEFAULT 'pending',
        expires_at TIMESTAMP NULL,
        rejected_at TIMESTAMP NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_book_id (book_id),
        INDEX idx_request_status (request_status),
        INDEX idx_payment_status (payment_status),
        INDEX idx_created_at (created_at)
      )
    `);
    console.log('✅ rental_requests table created');

    console.log('\nCreating admin_bkash_config table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_bkash_config (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT NOT NULL,
        bkash_merchant_id VARCHAR(100) NOT NULL,
        bkash_qr_code_url VARCHAR(500) NULL,
        bkash_phone_number VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_admin (admin_id)
      )
    `);
    console.log('✅ admin_bkash_config table created');

    console.log('\nInserting sample admin Bkash QR...');
    const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://bkash.com';
    try {
      await pool.query(`
        INSERT INTO admin_bkash_config (admin_id, bkash_merchant_id, bkash_qr_code_url, bkash_phone_number, is_active)
        SELECT id, 'RENTREAD001', ?, '01700000000', TRUE
        FROM users WHERE role = 'admin' LIMIT 1
      `, [qrUrl]);
      console.log('✅ Sample admin Bkash config inserted');
    } catch (insertErr) {
      console.log('⚠️ Could not insert sample config (might already exist):', insertErr.message);
    }

    console.log('\n🎉 All tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createTables();
