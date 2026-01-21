-- Rental Requests table for payment workflow
CREATE TABLE IF NOT EXISTS `rental_requests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `rental_days` INT NOT NULL DEFAULT 1,
  `total_price` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'confirmed', 'rejected', 'expired') DEFAULT 'pending',
  `payment_status` ENUM('awaiting_payment', 'paid', 'failed') DEFAULT 'awaiting_payment',
  `bkash_transaction_id` VARCHAR(255) NULL,
  
  -- Book details snapshot
  `book_title` VARCHAR(512) NOT NULL,
  `book_author` VARCHAR(255) NULL,
  `book_image_url` VARCHAR(500) NULL,
  `book_category` VARCHAR(100) NULL,
  
  -- User details snapshot
  `user_name` VARCHAR(255) NOT NULL,
  `user_email` VARCHAR(255) NOT NULL,
  `user_phone` VARCHAR(20) NULL,
  
  -- Timestamps
  `requested_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `confirmed_at` DATETIME NULL,
  `rejected_at` DATETIME NULL,
  `expires_at` DATETIME NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`),
  INDEX (`user_id`),
  INDEX (`book_id`),
  INDEX (`status`),
  INDEX (`payment_status`),
  INDEX (`requested_at`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
