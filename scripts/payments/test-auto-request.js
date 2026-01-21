const pool = require('../../db');

async function createRealTestRequest() {
  try {
    const userId = 4;
    const bookId = 134;
    const transactionId = 'AUTO' + Date.now();
    const rentalDays = 3;
    const totalPrice = 20.00;

    const [books] = await pool.query('SELECT * FROM books WHERE id = ?', [bookId]);
    const book = books[0];

    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = users[0];

    await pool.query(`
      UPDATE users SET 
        last_transaction_id = ?,
        last_payment_date = NOW(),
        last_payment_amount = ?,
        payment_verified = FALSE
      WHERE id = ?
    `, [transactionId, totalPrice, userId]);

    await pool.query(`
      INSERT INTO rental_requests (
        user_id, book_id, rental_days, rental_price, 
        book_title, book_author, book_image_url,
        user_name, user_email, user_phone,
        status, payment_status, bkash_transaction_id,
        expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'paid', ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))
    `, [
      userId, bookId, rentalDays, totalPrice,
      book.title, book.author, book.image_url,
      user.name, user.email, user.phone || '',
      transactionId
    ]);

    console.log('✅ Payment request created successfully!');
    console.log('📝 Details:');
    console.log(`   User: ${user.name} (${user.email})`);
    console.log(`   Book: ${book.title}`);
    console.log(`   Transaction ID: ${transactionId}`);
    console.log(`   Amount: ৳${totalPrice}`);
    console.log(`   Days: ${rentalDays}`);
    console.log('\n🔗 Go to admin panel: http://localhost:5000/admin-panel.html');
    console.log('👉 Click "Verify Payment" to accept');
    console.log('📊 Check user_rentals table after accepting');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createRealTestRequest();