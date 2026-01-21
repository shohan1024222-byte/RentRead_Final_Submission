# RentRead Payment System - Complete Documentation

## Overview
This document explains the complete payment workflow implemented in RentRead, where users can rent books through a Bkash payment verification system.

## System Flow

```
User Selection → Payment Page → Bkash Payment → Admin Approval → My Rentals
```

## Step-by-Step Process

### 1. **User Selects Book to Rent**
   - User clicks "Rent & Confirm" button on a book
   - Modal shows rental options (number of days)
   - User selects rental period (1-30 days)
   - Total price is calculated

### 2. **User Redirected to Payment Page**
   - User clicks "Rent & Confirm" button in the modal
   - System calculates total price: `base_price + ((days - 1) * daily_increment)`
   - User is redirected to `/payment.html` with these parameters:
     - `bookId` - The book ID
     - `days` - Number of rental days
     - `price` - Price per day
     - `title` - Book title
     - `author` - Book author
     - `image` - Book image URL
     - `total` - Total rental price

### 3. **Payment Page Displays**
   - File: `/public/payment.html`
   - Shows book details and total amount
   - Fetches admin's Bkash QR code from: `/api/rent/admin-bkash-config`
   - Displays admin's Bkash QR code (250x250px)
   - Shows step-by-step payment instructions

### 4. **User Makes Bkash Payment**
   - User opens their Bkash app
   - User scans the QR code OR enters admin's Bkash number manually
   - User enters the amount specified on the payment page
   - User completes the payment
   - User receives transaction confirmation from Bkash

### 5. **User Confirms Payment**
   - User enters their Bkash transaction ID on the payment page
   - User clicks "Confirm Payment"
   - System creates a rental request in the database

### 6. **Admin Dashboard - Manage Requests**
   - File: `/public/admin-rental-requests.html`
   - URL: `http://localhost:5000/admin-rental-requests.html`
   - Admin sees all pending rental requests
   - Each request shows:
     - User name and email
     - Book title and author
     - Rental period and amount
     - Bkash transaction ID
     - Payment and request status
   - Admin can:
     - View request details
     - Approve the rental request
     - Reject the rental request

### 7. **Admin Approves Request**
   - Admin clicks "Approve" button
   - System updates `rental_requests.status` to "approved"
   - System creates an active rental in `access_records` and `user_rentals` tables
   - User receives notification (optional)

### 8. **User's Rental Activated**
   - User navigates to "My Rentals" page
   - The newly approved rental appears in their rental list
   - User can download or access the book PDF
   - Rental expiry date is set based on rental days

---

## Database Tables

### rental_requests
Tracks all payment confirmation requests from users.

```sql
CREATE TABLE rental_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  rental_days INT NOT NULL,
  rental_price DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'bkash',
  payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  request_status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
  bkash_transaction_id VARCHAR(100) NULL,
  admin_notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  rental_start_date TIMESTAMP NULL,
  rental_end_date TIMESTAMP NULL,
  book_title VARCHAR(255),
  book_author VARCHAR(255),
  book_image_url VARCHAR(500),
  user_name VARCHAR(255),
  user_email VARCHAR(255),
  user_phone VARCHAR(20),
  status VARCHAR(50) DEFAULT 'pending',
  expires_at TIMESTAMP NULL,
  rejected_at TIMESTAMP NULL
);
```

### admin_bkash_config
Stores admin's Bkash payment details and QR code.

```sql
CREATE TABLE admin_bkash_config (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT NOT NULL,
  bkash_merchant_id VARCHAR(100) NOT NULL,
  bkash_qr_code_url VARCHAR(500) NULL,
  bkash_phone_number VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_admin (admin_id)
);
```

---

## API Endpoints

### Create Rental Request
```
POST /api/rent/request
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookId": 1,
  "days": 7,
  "totalPrice": "105",
  "transactionId": "BDU1234567890",
  "bookTitle": "Physics 9 and 10",
  "bookAuthor": "Author Name",
  "bookImage": "image_url"
}

Response:
{
  "success": true,
  "requestId": 1,
  "message": "Payment request submitted. Waiting for admin approval."
}
```

### Get Pending Requests (Admin)
```
GET /api/rent/requests/pending
Authorization: Bearer <admin_token>

Response:
[
  {
    "id": 1,
    "user_id": 2,
    "book_id": 1,
    "user_name": "John Doe",
    "user_email": "john@example.com",
    "book_title": "Physics 9 and 10",
    "book_author": "Author",
    "rental_days": 7,
    "total_price": "105.00",
    "bkash_transaction_id": "BDU1234567890",
    "status": "pending",
    "created_at": "2025-11-25 10:00:00"
  }
]
```

### Approve Rental Request
```
POST /api/rent/requests/:id/approve
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "message": "Request approved"
}
```

### Reject Rental Request
```
POST /api/rent/requests/:id/reject
Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "message": "Request rejected"
}
```

### Get Admin Bkash Configuration
```
GET /api/rent/admin-bkash-config

Response:
{
  "id": 1,
  "bkash_phone_number": "01700000000",
  "qr_code_url": "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=..."
}
```

---

## Files Created/Modified

### New Files Created:
1. `/public/payment.html` - Payment confirmation page with Bkash QR
2. `/public/payment-styles.css` - Styling for payment page
3. `/public/admin-rental-requests.html` - Admin dashboard for managing payment requests
4. `/sql/create_rental_requests_table.sql` - Database schema migrations
5. `/scripts/payments/setup-payment-tables.js` - Node.js script to create database tables

### Modified Files:
1. `/routes/rent.js` - Added payment request endpoints:
   - `POST /api/rent/request` - Create rental request
   - `GET /api/rent/requests/pending` - Get pending requests
   - `POST /api/rent/requests/:id/approve` - Approve request
   - `POST /api/rent/requests/:id/reject` - Reject request
   - `GET /api/rent/admin-bkash-config` - Get admin Bkash config
2. `/public/books.html` - Already had redirect to payment page

---

## Configuration

### Admin Bkash Setup

The default admin Bkash configuration is automatically created with:
- **Phone Number**: `01700000000`
- **Merchant ID**: `RENTREAD001`
- **QR Code URL**: Generated dynamically

To update the admin Bkash configuration:

```javascript
// Query to update admin Bkash settings
UPDATE admin_bkash_config 
SET bkash_phone_number = '01XXXXXXXXXX',
    bkash_qr_code_url = 'your_qr_code_url'
WHERE admin_id = <admin_id>;
```

---

## User Journey Summary

### For Regular Users:
1. Browse books on home page
2. Click "Rent & Confirm" on desired book
3. Select rental days (1-30)
4. Click "Rent & Confirm" in modal
5. Redirected to payment page
6. Scan Bkash QR code with their app
7. Complete payment in Bkash app
8. Enter transaction ID on payment page
9. Click "Confirm Payment"
10. Wait for admin approval
11. Once approved, book appears in "My Rentals"

### For Admin:
1. Navigate to "Admin" > "Rental Requests"
2. View all pending payment requests
3. Review transaction ID and amount
4. Click "Approve" to activate the rental
5. Click "Reject" to decline the request
6. View request details for more information

---

## Testing

### Test Payment Flow:
1. Login as user
2. Browse to any book
3. Click "Rent & Confirm"
4. Select days and confirm
5. Enter any transaction ID (e.g., `TEST123456789`)
6. Check admin dashboard for the pending request

### Test Admin Approval:
1. Login as admin
2. Go to `http://localhost:5000/admin-rental-requests.html`
3. See pending payment requests
4. Click "Approve" to activate rental
5. Check user's "My Rentals" to confirm

---

## Troubleshooting

### Issue: QR code not displaying
- **Solution**: Check that admin_bkash_config table has valid data. The QR code is generated dynamically from the URL.

### Issue: Payment request not creating
- **Solution**: Verify that user is authenticated (valid token), and book_id exists in the database.

### Issue: Admin not seeing requests
- **Solution**: Ensure user has admin role. Check `/api/rent/requests/pending` endpoint response.

### Issue: Transaction ID not accepted
- **Solution**: Ensure transaction ID is at least 5 characters long. Can be in format: `BDU1234567890` or any custom format.

---

## Security Notes

1. **Transaction Verification**: Currently accepts any transaction ID format. In production, should verify with Bkash API.
2. **Amount Validation**: Server validates the amount matches the calculated rental price.
3. **User Authentication**: All endpoints require valid JWT token.
4. **Admin Verification**: Only admins can approve/reject requests.

---

## Future Enhancements

1. **Bkash API Integration**: Direct integration with Bkash API for automatic payment verification
2. **Webhook Support**: Automatic status updates when payment is received
3. **Payment History**: User can view past payments and transactions
4. **Invoice Generation**: PDF invoices for users
5. **Automatic Reminders**: Email reminders before rental expiry
6. **Multiple Payment Methods**: Add support for Nagad, Rocket, etc.
7. **Installment Payments**: Allow users to pay in installments
8. **Refund System**: Handle refunds for rejected rentals

---

## Support

For issues or questions regarding the payment system, please contact the development team.

Last Updated: November 25, 2025
