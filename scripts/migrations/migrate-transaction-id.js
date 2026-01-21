const pool = require('../../db');
require('dotenv').config();

async function runMigration() {
  try {
    console.log('🔄 Adding transaction_id columns to users table...');
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS last_transaction_id VARCHAR(100) DEFAULT NULL,
      ADD COLUMN IF NOT EXISTS last_payment_date TIMESTAMP NULL DEFAULT NULL,
      ADD COLUMN IF NOT EXISTS last_payment_amount DECIMAL(10,2) DEFAULT 0.00
    `);

    console.log('✅ Columns added successfully');

    try {
      await pool.query('ALTER TABLE users ADD INDEX IF NOT EXISTS idx_transaction_id (last_transaction_id)');
      console.log('✅ Index added successfully');
    } catch (err) {
      console.log('ℹ️ Index may already exist:', err.message);
    }

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

runMigration();