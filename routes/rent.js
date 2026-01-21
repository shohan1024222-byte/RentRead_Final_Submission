const express = require('express');
const pool = require('../db');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// rent a book for N days (simulate low-cost subscription)
// body: { bookId, days }
router.post('/rent', auth, async (req, res) => {
  const { bookId, days } = req.body;
  const userId = req.user.id;
  const rentDays = parseInt(days, 10) || 1;
  try {
    // check book exists - accept either numeric id or title
    let books;
    if (!isNaN(Number(bookId))) {
      [books] = await pool.query('SELECT id, title, price_per_day FROM books WHERE id = ?', [Number(bookId)]);
    } else {
      // Try exact title match first
      [books] = await pool.query('SELECT id, title, price_per_day FROM books WHERE title = ?', [bookId]);
      
      // If no exact match, try partial match (for cases like "Database Management" -> "Database")
      if (!books || books.length === 0) {
        [books] = await pool.query('SELECT id, title, price_per_day FROM books WHERE title LIKE ? OR ? LIKE CONCAT("%", title, "%")', [
          `%${bookId}%`, bookId
        ]);
      }
    }
    if (!books || books.length === 0) return res.status(404).json({ error: 'Book not found' });

    const book = books[0];
    // create access record using the canonical numeric book id
    const [result] = await pool.query('INSERT INTO access_records (user_id, book_id, expires_at, active) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY), 1)', [userId, book.id, rentDays]);

    // Record complete rental in user_rentals table with all book information
    try {
      // Get complete book information
      const [fullBookData] = await pool.query(
        'SELECT * FROM books WHERE id = ?', 
        [book.id]
      );
      
      if (fullBookData && fullBookData.length > 0) {
        const bookData = fullBookData[0];
        
        // Calculate pricing
        const basePrice = bookData.price_per_day ? parseFloat(bookData.price_per_day) : 15;
        const dailyIncrement = 2;
        const totalPrice = basePrice + ((Math.max(1, rentDays) - 1) * dailyIncrement);
        
        // Debug: Log rental data being stored
        console.log('Storing complete rental to user_rentals:', {
          user_id: userId,
          book_title: bookData.title,
          rental_days: rentDays,
          total_price: totalPrice
        });

        // Insert into user_rentals with matching column structure
        await pool.query(`
          INSERT INTO user_rentals (
            user_id, book_id, rental_days, total_price, rental_date, expiry_date, status,
            title, description, author, price_per_day, total_pages, category, 
            is_available, filename, base_price, daily_increment, max_rental_days,
            image_url, pdf_file, file_size, availability_status, total_rented,
            language, drive_link
          ) VALUES (?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY), 'active', 
                   ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          userId, bookData.id, rentDays, totalPrice, rentDays,
          bookData.title, bookData.description, bookData.author, bookData.price_per_day,
          bookData.total_pages, bookData.category, bookData.is_available, bookData.filename,
          bookData.base_price, bookData.daily_increment, bookData.max_rental_days,
          bookData.image_url, bookData.pdf_file, bookData.file_size, 
          bookData.availability_status, bookData.total_rented, bookData.language, bookData.drive_link
        ]);
      }
    } catch (innerErr) {
      // Do not fail the main rental if logging to user_rentals fails - just log
      console.warn('Failed to insert into user_rentals table:', innerErr.message || innerErr);
    }

    res.json({ success: true, accessId: result.insertId, expiresInDays: rentDays });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create rental' });
  }
});

// user active rentals
router.get('/my', auth, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.id, 
        a.book_id, 
        a.expires_at, 
        a.active, 
        b.title,
        b.pdf_file,
        b.drive_link,
        b.image_url,
        b.category
      FROM access_records a 
      JOIN books b ON a.book_id=b.id 
      WHERE a.user_id=? 
      ORDER BY a.expires_at DESC
    `, [req.user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch rentals' });
  }
});

// Get user rental history from user_rentals table (new comprehensive table)
router.get('/my-rentals', auth, async (req, res) => {
  try {
    const [rentals] = await pool.query(`
      SELECT 
        id,
        book_id,
        rental_days,
        total_price,
        rental_date,
        expiry_date,
        status,
        title,
        description,
        author,
        price_per_day,
        total_pages,
        category,
        language,
        pdf_file,
        image_url,
        drive_link,
        file_size,
        CASE 
          WHEN expiry_date > NOW() THEN TRUE 
          ELSE FALSE 
        END as is_active,
        DATEDIFF(expiry_date, NOW()) as days_remaining
      FROM user_rentals 
      WHERE user_id = ? 
      ORDER BY rental_date DESC
    `, [req.user.id]);
    
    res.json(rentals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch rental history' });
  }
});

// Get user rental history from user_book table
router.get('/user-rentals', auth, async (req, res) => {
  try {
    // Get user email first
    const [users] = await pool.query('SELECT email FROM users WHERE id = ?', [req.user.id]);
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userEmail = users[0].email;
    
    // Get rental history from user_book table with book file info
    const [rentals] = await pool.query(`
      SELECT 
        ub.book_name, 
        ub.days, 
        ub.price, 
        ub.created_at as rent_date,
        DATE_ADD(ub.created_at, INTERVAL ub.days DAY) as return_date,
        FALSE as returned,
        COALESCE(ub.image_url, b.image_url) as image_url,
        COALESCE(ub.drive_link, b.drive_link) as drive_link,
        b.pdf_file,
        b.id as book_id
      FROM user_book ub
      LEFT JOIN books b ON ub.book_name = b.title
      WHERE ub.email = ? 
      ORDER BY ub.created_at DESC
    `, [userEmail]);
    
    res.json(rentals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch rental history' });
  }
});

// Create rental payment request
router.post('/request', auth, async (req, res) => {
  const { bookId, days, totalPrice, transactionId, bookTitle, bookAuthor, bookImage } = req.body;
  const userId = req.user.id;
  
  try {
    if (!bookId || !days || !totalPrice || !transactionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get book and user details
    const [books] = await pool.query('SELECT id, title, author, image_url FROM books WHERE id = ?', [bookId]);
    if (!books || books.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const book = books[0];
    const [users] = await pool.query('SELECT id, name, email, phone FROM users WHERE id = ?', [userId]);
    const user = users[0];

    // Update user's transaction info
    await pool.query(`
      UPDATE users SET 
        last_transaction_id = ?,
        last_payment_date = NOW(),
        last_payment_amount = ?,
        payment_verified = FALSE
      WHERE id = ?
    `, [transactionId, totalPrice, userId]);

    // Create rental request
    const [result] = await pool.query(`
      INSERT INTO rental_requests (
        user_id, book_id, rental_days, rental_price, 
        book_title, book_author, book_image_url,
        user_name, user_email, user_phone,
        status, payment_status, bkash_transaction_id,
        expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'paid', ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))
    `, [
      userId, bookId, days, totalPrice,
      book.title, book.author, book.image_url || bookImage,
      user.name, user.email, user.phone || '',
      transactionId
    ]);

    console.log('✅ Rental request created:', {
      requestId: result.insertId,
      userId,
      bookId,
      transactionId
    });

    res.json({ 
      success: true, 
      requestId: result.insertId,
      message: 'Payment request submitted. Waiting for admin approval.'
    });
  } catch (err) {
    console.error('Error creating rental request:', err);
    res.status(500).json({ error: 'Could not create rental request' });
  }
});

// Get users with transaction IDs (for admin)
router.get('/requests/pending', auth, async (req, res) => {
  try {
    // Get rental requests with user and book details
    const [requests] = await pool.query(`
      SELECT 
        rr.*,
        u.name as user_name,
        u.email as user_email,
        u.phone as user_phone,
        b.title as book_title,
        b.author as book_author,
        b.image_url as book_image,
        rr.request_status as status,
        rr.rental_price as total_price
      FROM rental_requests rr
      LEFT JOIN users u ON rr.user_id = u.id
      LEFT JOIN books b ON rr.book_id = b.id
      ORDER BY rr.created_at DESC
    `);
    
    console.log(`📋 Found ${requests.length} rental requests`);
    
    res.json(requests);
  } catch (err) {
    console.error('Error fetching rental requests:', err);
    res.status(500).json({ error: 'Could not fetch requests' });
  }
});

// Get all rental requests (for admin)
router.get('/requests/all', auth, async (req, res) => {
  try {
    const [requests] = await pool.query(`
      SELECT 
        rr.*,
        u.name as user_name,
        u.email as user_email,
        u.phone as user_phone,
        b.title as book_title,
        b.author as book_author,
        b.image_url as book_image
      FROM rental_requests rr
      LEFT JOIN users u ON rr.user_id = u.id
      LEFT JOIN books b ON rr.book_id = b.id
      ORDER BY rr.created_at DESC
      LIMIT 100
    `);
    
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch requests' });
  }
});

// Approve rental request (admin)
router.post('/request/:id/approve', auth, async (req, res) => {
  const requestId = req.params.id;
  
  try {
    // Get the rental request
    const [requests] = await pool.query(
      'SELECT * FROM rental_requests WHERE id = ?', 
      [requestId]
    );

    if (!requests || requests.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const request = requests[0];

    // Approve the request
    await pool.query(`
      UPDATE rental_requests 
      SET request_status = 'approved', status = 'approved', updated_at = NOW() 
      WHERE id = ?
    `, [requestId]);

    // Create actual rental in user_rentals
    const [result] = await pool.query(`
      INSERT INTO user_rentals (
        user_id, book_id, book_title, title, author, rental_days, 
        total_price, rental_date, expiry_date, status, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY), 'active', ?)
    `, [
      request.user_id,
      request.book_id,
      request.book_title,
      request.book_title,
      request.book_author,
      request.rental_days,
      request.total_price,
      request.rental_days,
      request.book_image_url
    ]);

    // Also create access record for PDF access
    await pool.query(`
      INSERT INTO access_records (user_id, book_id, expires_at, active, rental_days, total_cost, payment_status)
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY), 1, ?, ?, 'paid')
    `, [
      request.user_id,
      request.book_id,
      request.rental_days,
      request.rental_days,
      request.total_price
    ]);

    console.log('✅ Rental request approved:', requestId);

    res.json({ 
      success: true, 
      message: 'Rental approved and added to user rentals'
    });
  } catch (err) {
    console.error('Error approving rental:', err);
    res.status(500).json({ error: 'Could not approve rental' });
  }
});

// Verify payment (for users with transaction IDs)
router.post('/verify-payment', auth, async (req, res) => {
  try {
    const { user_id, transaction_id } = req.body;

    console.log(`🔍 Verifying payment for user ${user_id} with transaction ${transaction_id}`);

    if (!user_id || !transaction_id) {
      return res.status(400).json({ error: 'Missing user_id or transaction_id' });
    }

    // Find a matching rental_request by transaction id
    const [requests] = await pool.query(
      'SELECT * FROM rental_requests WHERE bkash_transaction_id = ? ORDER BY created_at DESC LIMIT 1',
      [transaction_id]
    );

    if (requests && requests.length > 0) {
      const request = requests[0];

      // Approve the request
      await pool.query(`
        UPDATE rental_requests 
        SET request_status = 'approved', status = 'approved', updated_at = NOW() 
        WHERE id = ?
      `, [request.id]);

      // Determine total price (support both naming conventions)
      const totalPrice = request.total_price || request.rental_price || request.total || 0;
      const rentalDays = request.rental_days || request.days || 1;

      // Get complete book information from books table
      console.log(`📚 Fetching book data for book_id: ${request.book_id}`);
      const [bookData] = await pool.query('SELECT * FROM books WHERE id = ?', [request.book_id]);
      
      if (bookData && bookData.length > 0) {
        const book = bookData[0];
        console.log(`✅ Book found: ${book.title}`);
        
        try {
          // Insert complete book information into user_rentals
          await pool.query(`
            INSERT INTO user_rentals (
              user_id, book_id, rental_days, total_price, rental_date, expiry_date, status,
              book_title, title, description, author, price_per_day, total_pages, category, 
              is_available, filename, base_price, daily_increment, max_rental_days,
              image_url, pdf_file, file_size, availability_status, total_rented,
              language, drive_link
            ) VALUES (?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY), 'active', 
                     ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            request.user_id,
            request.book_id,
            rentalDays,
            totalPrice,
            rentalDays,
            book.title,
            book.title,
            book.description || '',
            book.author || '',
            book.price_per_day || 0,
            book.total_pages || 0,
            book.category || '',
            book.is_available || 1,
            book.filename || '',
            book.base_price || 0,
            book.daily_increment || 0,
            book.max_rental_days || 30,
            book.image_url || '',
            book.pdf_file || '',
            book.file_size || 0,
            book.availability_status || 'available',
            book.total_rented || 0,
            book.language || '',
            book.drive_link || ''
          ]);
          console.log(`✅ Inserted complete book info into user_rentals`);
        } catch (insertErr) {
          console.error('❌ Error inserting complete book data:', insertErr.message);
          console.error('Full error:', insertErr);
          throw insertErr;
        }
      } else {
        // Fallback: use rental_request data if book not found
        await pool.query(`
          INSERT INTO user_rentals (
            user_id, book_id, book_title, title, author, rental_days, 
            total_price, rental_date, expiry_date, status, image_url
          ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY), 'active', ?)
        `, [
          request.user_id,
          request.book_id,
          request.book_title,
          request.book_title,
          request.book_author,
          rentalDays,
          totalPrice,
          rentalDays,
          request.book_image_url
        ]);
      }

      // Also create access record for PDF access
      await pool.query(`
        INSERT INTO access_records (user_id, book_id, expires_at, active, rental_days, total_cost, payment_status)
        VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY), 1, ?, ?, 'paid')
      `, [
        request.user_id,
        request.book_id,
        rentalDays,
        rentalDays,
        totalPrice
      ]);

      // Mark user as payment verified
      await pool.query(
        `UPDATE users SET payment_verified = 1, payment_verified_date = NOW() WHERE id = ? AND last_transaction_id = ?`,
        [user_id, transaction_id]
      );

      console.log(`✅ Payment verified and rental approved for user ${user_id} (request ${request.id})`);

      return res.json({ success: true, message: 'Payment verified and rental approved' });
    }

    // If no matching request found, still mark user as verified
    const [result] = await pool.query(
      `UPDATE users SET payment_verified = 1, payment_verified_date = NOW() WHERE id = ? AND last_transaction_id = ?`,
      [user_id, transaction_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User or transaction not found' });
    }

    console.log(`⚠️ No rental_request found for transaction ${transaction_id}. User marked verified.`);

    res.json({ success: true, message: 'Payment verified (no matching rental request found). Please approve rental manually if needed.' });

  } catch (err) {
    console.error('❌ Error verifying payment:', err.message);
    console.error('Full error details:', err);
    res.status(500).json({ 
      error: 'Could not verify payment', 
      details: err.message,
      sqlMessage: err.sqlMessage || 'No SQL error'
    });
  }
});

// Reject payment
router.post('/reject-payment', auth, async (req, res) => {
  try {
    const { user_id } = req.body;

    console.log(`❌ Rejecting payment for user ${user_id}`);

    if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

    // Fetch user's last transaction id
    const [users] = await pool.query('SELECT last_transaction_id FROM users WHERE id = ?', [user_id]);
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const tx = users[0].last_transaction_id;

    // If there is a rental_request with this transaction id, mark it rejected
    if (tx) {
      await pool.query(`
        UPDATE rental_requests SET request_status = 'rejected', status = 'rejected', updated_at = NOW() 
        WHERE bkash_transaction_id = ?
      `, [tx]);
    }

    // Clear transaction data and mark not verified
    const [result] = await pool.query(
      `UPDATE users SET 
         last_transaction_id = NULL,
         last_payment_amount = NULL,
         last_payment_date = NULL,
         payment_verified = 0
       WHERE id = ?`,
      [user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`✅ Payment rejected and cleared for user ${user_id}`);

    res.json({ success: true, message: 'Payment rejected and transaction cleared' });
  } catch (err) {
    console.error('Error rejecting payment:', err);
    res.status(500).json({ error: 'Could not reject payment' });
  }
});

// Reject rental request (admin)
router.post('/request/:id/reject', auth, async (req, res) => {
  const requestId = req.params.id;
  const { reason } = req.body;

  try {
    await pool.query(`
      UPDATE rental_requests 
      SET status = 'rejected', rejected_at = NOW() 
      WHERE id = ?
    `, [requestId]);

    console.log('❌ Rental request rejected:', requestId);

    res.json({ 
      success: true, 
      message: 'Request rejected'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not reject request' });
  }
});

// Alias routes with 's' in requests for admin page compatibility
router.post('/requests/:id/approve', auth, async (req, res) => {
  const requestId = req.params.id;
  try {
    // Get the rental request
    const [requests] = await pool.query(
      'SELECT * FROM rental_requests WHERE id = ?', 
      [requestId]
    );

    if (!requests || requests.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const request = requests[0];

    // Approve the request
    await pool.query(`
      UPDATE rental_requests 
      SET request_status = 'approved', status = 'approved', updated_at = NOW() 
      WHERE id = ?
    `, [requestId]);

    const totalPrice = request.total_price || request.rental_price || 0;
    const rentalDays = request.rental_days || request.days || 1;

    // Get complete book information from books table
    const [bookData] = await pool.query('SELECT * FROM books WHERE id = ?', [request.book_id]);
    
    if (bookData && bookData.length > 0) {
      const book = bookData[0];
      
      // Insert complete book information into user_rentals
      await pool.query(`
        INSERT INTO user_rentals (
          user_id, book_id, rental_days, total_price, rental_date, expiry_date, status,
          book_title, title, description, author, price_per_day, total_pages, category, 
          is_available, filename, base_price, daily_increment, max_rental_days,
          image_url, pdf_file, file_size, availability_status, total_rented,
          language, drive_link
        ) VALUES (?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY), 'active', 
                 ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        request.user_id,
        request.book_id,
        rentalDays,
        totalPrice,
        rentalDays,
        book.title,
        book.title,
        book.description,
        book.author,
        book.price_per_day,
        book.total_pages,
        book.category,
        book.is_available,
        book.filename,
        book.base_price,
        book.daily_increment,
        book.max_rental_days,
        book.image_url,
        book.pdf_file,
        book.file_size,
        book.availability_status,
        book.total_rented,
        book.language,
        book.drive_link
      ]);
    } else {
      // Fallback: use rental_request data if book not found
      await pool.query(`
        INSERT INTO user_rentals (
          user_id, book_id, book_title, title, author, rental_days, 
          total_price, rental_date, expiry_date, status, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY), 'active', ?)
      `, [
        request.user_id,
        request.book_id,
        request.book_title,
        request.book_title,
        request.book_author,
        rentalDays,
        totalPrice,
        rentalDays,
        request.book_image_url
      ]);
    }

    // Also create access record for PDF access
    await pool.query(`
      INSERT INTO access_records (user_id, book_id, expires_at, active, rental_days, total_cost, payment_status)
      VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY), 1, ?, ?, 'paid')
    `, [
      request.user_id,
      request.book_id,
      rentalDays,
      rentalDays,
      totalPrice
    ]);

    console.log('✅ Rental request approved:', requestId);

    res.json({ 
      success: true, 
      message: 'Rental approved and added to user rentals'
    });
  } catch (err) {
    console.error('Error approving request:', err);
    res.status(500).json({ error: 'Could not approve request' });
  }
});

router.post('/requests/:id/reject', auth, async (req, res) => {
  const requestId = req.params.id;
  const { reason } = req.body;

  try {
    await pool.query(`
      UPDATE rental_requests 
      SET request_status = 'rejected', status = 'rejected', updated_at = NOW() 
      WHERE id = ?
    `, [requestId]);

    console.log('❌ Rental request rejected:', requestId);

    res.json({ 
      success: true, 
      message: 'Request rejected'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not reject request' });
  }
});

// Get admin Bkash configuration
router.get('/admin-bkash-config', async (req, res) => {
  try {
    const [config] = await pool.query(`
      SELECT id, bkash_phone_number, bkash_qr_code_url FROM admin_bkash_config 
      WHERE is_active = TRUE 
      LIMIT 1
    `);

    if (!config || config.length === 0) {
      return res.status(404).json({ 
        error: 'Admin Bkash configuration not found',
        bkash_phone_number: '01700000000',
        qr_code_url: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=bkash'
      });
    }

    res.json({
      id: config[0].id,
      bkash_phone_number: config[0].bkash_phone_number || '01700000000',
      qr_code_url: config[0].bkash_qr_code_url
    });
  } catch (err) {
    console.error('Error fetching Bkash config:', err);
    res.status(500).json({ error: 'Could not fetch Bkash configuration' });
  }
});

module.exports = router;
