const mysql = require('mysql2/promise');

async function addPaymentVerificationColumns() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'rentread'
    });

    console.log('🔧 Adding payment verification columns to users table...');

    // Add payment verification columns
    const alterQueries = [
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS payment_verified BOOLEAN DEFAULT FALSE`,
      `ALTER TABLE users ADD COLUMN IF NOT EXISTS payment_verified_date DATETIME NULL`
    ];

    for (const query of alterQueries) {
      try {
        await connection.execute(query);
        console.log('✅ Executed:', query);
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log('⚠️ Column already exists, skipping');
        } else {
          throw err;
        }
      }
    }

    console.log('✅ Payment verification columns added successfully!');

  } catch (error) {
    console.error('❌ Error adding payment verification columns:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addPaymentVerificationColumns();