const pool = require('../../db');

async function verifyTables() {
  try {
    console.log('Checking for rental_requests table...');
    const [tables1] = await pool.query("SHOW TABLES LIKE 'rental_requests'");
    console.log('rental_requests table:', tables1.length > 0 ? '✅ EXISTS' : '❌ NOT FOUND');

    console.log('\nChecking for admin_bkash_config table...');
    const [tables2] = await pool.query("SHOW TABLES LIKE 'admin_bkash_config'");
    console.log('admin_bkash_config table:', tables2.length > 0 ? '✅ EXISTS' : '❌ NOT FOUND');

    if (tables1.length > 0) {
      console.log('\nrental_requests table structure:');
      const [columns] = await pool.query('DESCRIBE rental_requests');
      columns.forEach(col => {
        console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''}`);
      });
    }

    console.log('\n✅ Database verification complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyTables();
