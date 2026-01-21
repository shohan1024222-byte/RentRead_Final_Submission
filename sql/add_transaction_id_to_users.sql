-- Add transaction_id column to users table (Safe version)
-- This will store the last transaction ID when user makes payment

-- Check if columns exist before adding (MySQL 8.0+ syntax)
-- If using older MySQL, run each ALTER statement separately and ignore "column exists" errors

SET @sql1 = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='users' AND COLUMN_NAME='last_transaction_id') = 0,
    'ALTER TABLE `users` ADD COLUMN `last_transaction_id` VARCHAR(100) DEFAULT NULL COMMENT "Last Bkash transaction ID from payment"',
    'SELECT "Column last_transaction_id already exists"');
PREPARE stmt1 FROM @sql1;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;

SET @sql2 = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='users' AND COLUMN_NAME='last_payment_date') = 0,
    'ALTER TABLE `users` ADD COLUMN `last_payment_date` TIMESTAMP NULL DEFAULT NULL COMMENT "When last payment was made"',
    'SELECT "Column last_payment_date already exists"');
PREPARE stmt2 FROM @sql2;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;

SET @sql3 = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='users' AND COLUMN_NAME='last_payment_amount') = 0,
    'ALTER TABLE `users` ADD COLUMN `last_payment_amount` DECIMAL(10,2) DEFAULT 0.00 COMMENT "Last payment amount"',
    'SELECT "Column last_payment_amount already exists"');
PREPARE stmt3 FROM @sql3;
EXECUTE stmt3;
DEALLOCATE PREPARE stmt3;

-- Add index if it doesn't exist
SET @sql4 = IF((SELECT COUNT(*) FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='users' AND INDEX_NAME='idx_transaction_id') = 0,
    'ALTER TABLE `users` ADD INDEX `idx_transaction_id` (`last_transaction_id`)',
    'SELECT "Index idx_transaction_id already exists"');
PREPARE stmt4 FROM @sql4;
EXECUTE stmt4;
DEALLOCATE PREPARE stmt4;

-- Update existing users to have default values
UPDATE `users` SET 
  `last_transaction_id` = NULL,
  `last_payment_date` = NULL,
  `last_payment_amount` = 0.00
WHERE `last_transaction_id` IS NULL;