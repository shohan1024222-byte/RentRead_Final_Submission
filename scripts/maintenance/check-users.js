const pool = require('../../db');

async function checkUsers() {
  try {
    const [users] = await pool.query(`
      SELECT 
        id, name, email, last_transaction_id, payment_verified, last_payment_date
      FROM users 
      WHERE last_transaction_id IS NOT NULL
    `);

    console.log('\n📊 Users with transaction IDs:');
    console.table(users);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

checkUsers();
