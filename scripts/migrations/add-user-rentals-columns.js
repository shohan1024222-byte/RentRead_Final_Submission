const pool = require('../../db');

async function addColumns() {
  try {
    console.log('🔧 Adding missing columns to user_rentals table...');

    const columns = [
      "ADD COLUMN IF NOT EXISTS `book_title` VARCHAR(512) AFTER `status`",
      "ADD COLUMN IF NOT EXISTS `title` VARCHAR(512) AFTER `book_title`",
      "ADD COLUMN IF NOT EXISTS `description` TEXT AFTER `title`",
      "ADD COLUMN IF NOT EXISTS `author` VARCHAR(255) AFTER `description`",
      "ADD COLUMN IF NOT EXISTS `price_per_day` DECIMAL(10,2) AFTER `author`",
      "ADD COLUMN IF NOT EXISTS `total_pages` INT AFTER `price_per_day`",
      "ADD COLUMN IF NOT EXISTS `category` VARCHAR(100) AFTER `total_pages`",
      "ADD COLUMN IF NOT EXISTS `is_available` TINYINT(1) DEFAULT 1 AFTER `category`",
      "ADD COLUMN IF NOT EXISTS `filename` VARCHAR(255) AFTER `is_available`",
      "ADD COLUMN IF NOT EXISTS `base_price` DECIMAL(10,2) AFTER `filename`",
      "ADD COLUMN IF NOT EXISTS `daily_increment` DECIMAL(10,2) AFTER `base_price`",
      "ADD COLUMN IF NOT EXISTS `max_rental_days` INT AFTER `daily_increment`",
      "ADD COLUMN IF NOT EXISTS `image_url` VARCHAR(500) AFTER `max_rental_days`",
      "ADD COLUMN IF NOT EXISTS `pdf_file` VARCHAR(500) AFTER `image_url`",
      "ADD COLUMN IF NOT EXISTS `file_size` BIGINT AFTER `pdf_file`",
      "ADD COLUMN IF NOT EXISTS `availability_status` VARCHAR(50) AFTER `file_size`",
      "ADD COLUMN IF NOT EXISTS `total_rented` INT AFTER `availability_status`",
      "ADD COLUMN IF NOT EXISTS `language` VARCHAR(50) AFTER `total_rented`",
      "ADD COLUMN IF NOT EXISTS `drive_link` VARCHAR(500) AFTER `language`"
    ];

    // Try each column individually
    for (const column of columns) {
      try {
        await pool.query(`ALTER TABLE user_rentals ${column}`);
        console.log(`✅ Added: ${column.split('`')[1]}`);
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`⏭️  Column already exists: ${column.split('`')[1]}`);
        } else {
          console.error(`❌ Error adding ${column.split('`')[1]}:`, err.message);
        }
      }
    }

    console.log('\n✅ Migration completed!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

addColumns();