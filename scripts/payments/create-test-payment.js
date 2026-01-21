const pool = require('../../db');

async function createTestPayment() {
  try {
    const userId = 4;
    const bookId = 134; // Dsa book pdf
    const transactionId = 'TXN' + Date.now();
    const days = 3;
    const totalPrice = 16.00;
    const [books] = await pool.query('SELECT id, title, author, image_url FROM books WHERE id = ?', [bookId]);
    if (!books || books.length === 0) {
      console.error('❌ Book not found');
      process.exit(1);
    }
    const book = books[0];
    const [users] = await pool.query('SELECT id, name, email, phone FROM users WHERE id = ?', [userId]);
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
      userId, bookId, days, totalPrice,
      book.title, book.author, book.image_url,
      user.name, user.email, user.phone || '',
      transactionId
    ]);

    console.log('✅ Created realistic payment request');
    console.log('👤 User:', user.name, '(' + user.email + ')');
    console.log('📚 Book:', book.title);
    console.log('📝 Transaction ID:', transactionId);
    console.log('💰 Amount:', totalPrice);
    console.log('📅 Rental Days:', days);
    console.log('\n🔗 Now go to: http://localhost:5000/admin-panel.html');
    console.log('✅ You should see this payment request automatically');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createTestPayment();
