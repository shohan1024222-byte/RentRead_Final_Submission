-- Create rental_requests table for tracking payment and approval
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
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_book_id (book_id),
  INDEX idx_request_status (request_status),
  INDEX idx_payment_status (payment_status),
  INDEX idx_created_at (created_at)
);

-- Create admin_bkash_config table to store admin's Bkash details
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
);

-- Insert sample admin Bkash QR code (you can update this with actual QR)
INSERT INTO admin_bkash_config (admin_id, bkash_merchant_id, bkash_qr_code_url, bkash_phone_number, is_active)
SELECT id, 'RENTREAD001', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_Japanese_phone_number.svg/220px-QR_code_for_mobile_Japanese_phone_number.svg.png', '01700000000', TRUE
FROM users WHERE role = 'admin' LIMIT 1;
