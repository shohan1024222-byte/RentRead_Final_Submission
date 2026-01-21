-- Simple version: Add columns only if they don't exist
-- Run this if you get "Duplicate column" error

-- For MySQL versions that don't support IF NOT EXISTS in ALTER TABLE
-- Just ignore the error if columns already exist

-- Add transaction tracking columns
ALTER TABLE `users` ADD COLUMN `last_transaction_id` VARCHAR(100) DEFAULT NULL;
ALTER TABLE `users` ADD COLUMN `last_payment_date` TIMESTAMP NULL DEFAULT NULL;  
ALTER TABLE `users` ADD COLUMN `last_payment_amount` DECIMAL(10,2) DEFAULT 0.00;

-- Add index
ALTER TABLE `users` ADD INDEX `idx_transaction_id` (`last_transaction_id`);

-- If you get "Duplicate column" errors, it means the columns already exist
-- You can ignore these errors - the migration was already run successfully