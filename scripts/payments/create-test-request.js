const pool = require('../../db');

async function createTestPaymentRequest() {
  try {
    console.log('Creating test payment request...\n');

    const [users] = await pool.query('SELECT id FROM users WHERE id != 1 LIMIT 1');
    if (!users[0]) {
      console.error('❌ No test users found. Please create a user first.');
      process.exit(1);
    }

    const userId = users[0].id;
    console.log('✅ Using User ID:', userId);

    const [books] = await pool.query('SELECT id, title, author, image_url FROM books LIMIT 1');
    if (!books[0]) {
      console.error('❌ No books found. Please add books first.');
      process.exit(1);
    }

    const book = books[0];
    console.log('✅ Using Book:', book.title, 'by', book.author);

    const [result] = await pool.query(`
      INSERT INTO rental_requests (
        user_id, 
        book_id, 
        rental_days, 
        rental_price, 
        bkash_transaction_id, 
        request_status, 
        status,
        book_title, 
        book_author, 
        book_image_url,
        user_name, 
        user_email, 
        user_phone
      ) VALUES (?, ?, 7, 105, 'T1234567890TEST', 'pending', 'pending', ?, ?, ?, 'Test User', 'test@example.com', '01700000000')
    `, [userId, book.id, book.title, book.author, book.image_url]);

    console.log('✅ Test rental request created!');
    console.log('   Request ID:', result.insertId);
    console.log('   User ID:', userId);
    console.log('   Book:', book.title);
    console.log('   Days: 7');
    console.log('   Total: ৳105');
    console.log('   Transaction ID: T1234567890TEST');
    console.log('   Status: PENDING\n');

    const [requests] = await pool.query('SELECT * FROM rental_requests WHERE id = ?', [result.insertId]);
    if (requests[0]) {
      console.log('✅ Verification: Request found in database');
      console.log('   Status:', requests[0].request_status || requests[0].status);
    }

    console.log('\n🎯 Next Steps:');
    console.log('1. Open http://localhost:5000/admin-rental-requests.html');
    console.log('2. Login as admin');
    console.log('3. You should see the pending request');
    console.log('4. Click "Approve" to test the approval flow\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTestPaymentRequest();
