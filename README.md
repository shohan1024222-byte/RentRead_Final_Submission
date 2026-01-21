# RentRead - PDF Book Rental Platform

![RentRead Logo](https://img.shields.io/badge/RentRead-Book%20Rental-blue)
![Django](https://img.shields.io/badge/Django-4.2-green)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 Overview

RentRead is a web-based subscription platform that allows users to rent PDF books for a minimal price. Users can rent books for a specific period, with pricing increasing based on rental duration (1 TK per day). The platform features user authentication, a comprehensive book catalog, rental management, and secure payment processing through the bKash payment gateway.

## ✨ Features

### User Features
- **Account Management**: User registration, login, and profile management
- **Book Browsing**: Search and filter books by title, author, and genre
- **Flexible Rental**: Rent books for 1-365 days with transparent pricing
- **PDF Access**: View and download rented PDFs during the rental period
- **Rental Dashboard**: Track active and expired rentals
- **Secure Payments**: Integrated bKash payment gateway

### Admin Features
- **Book Management**: Add, edit, and delete books
- **User Management**: View and manage user accounts
- **Rental Tracking**: Monitor all rental transactions
- **Payment Monitoring**: Track payment status and transactions
- **Custom Admin Panel**: Enhanced Django admin interface

## 🛠️ Technology Stack

- **Backend**: Django 4.2, Django REST Framework
- **Database**: SQLite (default) / PostgreSQL (production)
- **Frontend**: HTML5, CSS3, Bootstrap 5, jQuery
- **Payment Gateway**: bKash API
- **Authentication**: Django's built-in authentication system
- **Storage**: Local/Cloud storage for PDFs and images

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)
- bKash merchant account (for payment processing)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd RentRead
```

### 2. Create Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and configure the following:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (SQLite by default)
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3

# bKash Payment Gateway
BKASH_APP_KEY=your-bkash-app-key
BKASH_APP_SECRET=your-bkash-app-secret
BKASH_USERNAME=your-bkash-username
BKASH_PASSWORD=your-bkash-password
BKASH_BASE_URL=https://checkout.sandbox.bka.sh/v1.2.0-beta
```

### 5. Database Migration

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### 7. Create Static and Media Directories

```bash
mkdir static staticfiles media
mkdir media\book_covers media\book_pdfs
```

### 8. Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### 9. Run Development Server

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000` in your browser.

## 📁 Project Structure

```
RentRead/
├── rentread/               # Main project settings
│   ├── settings.py         # Django settings
│   ├── urls.py            # Main URL configuration
│   ├── wsgi.py            # WSGI configuration
│   └── asgi.py            # ASGI configuration
├── users/                 # User authentication app
│   ├── models.py          # Custom User model
│   ├── views.py           # Authentication views
│   ├── forms.py           # User forms
│   ├── admin.py           # User admin
│   └── urls.py            # User URLs
├── books/                 # Books management app
│   ├── models.py          # Book model
│   ├── views.py           # Book views
│   ├── serializers.py     # API serializers
│   ├── admin.py           # Book admin
│   └── urls.py            # Book URLs
├── rentals/               # Rental management app
│   ├── models.py          # Rental model
│   ├── views.py           # Rental views
│   ├── serializers.py     # API serializers
│   ├── admin.py           # Rental admin
│   └── urls.py            # Rental URLs
├── payments/              # Payment processing app
│   ├── models.py          # Payment model
│   ├── views.py           # Payment views
│   ├── bkash.py           # bKash integration
│   ├── serializers.py     # API serializers
│   ├── admin.py           # Payment admin
│   └── urls.py            # Payment URLs
├── templates/             # HTML templates
│   ├── base.html          # Base template
│   ├── home.html          # Homepage
│   ├── users/             # User templates
│   ├── books/             # Book templates
│   ├── rentals/           # Rental templates
│   └── payments/          # Payment templates
├── static/                # Static files
│   └── css/
│       └── style.css      # Custom CSS
├── media/                 # User uploaded files
│   ├── book_covers/       # Book cover images
│   └── book_pdfs/         # PDF files
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables example
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## 🔧 Configuration

### Database Configuration

**For PostgreSQL (Production):**

1. Install PostgreSQL adapter:
```bash
pip install psycopg2-binary
```

2. Update `.env`:
```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=rentread_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

### bKash Payment Gateway Setup

1. Register for a bKash merchant account
2. Obtain API credentials (App Key, App Secret, Username, Password)
3. Update `.env` with your credentials
4. For testing, use sandbox URL: `https://checkout.sandbox.bka.sh/v1.2.0-beta`
5. For production, use: `https://checkout.pay.bka.sh/v1.2.0-beta`

## 📚 Usage Guide

### Admin Panel

1. Access admin panel at `http://127.0.0.1:8000/admin/`
2. Login with superuser credentials
3. Manage books, users, rentals, and payments

### Adding Books

1. Go to Admin Panel → Books → Add Book
2. Fill in book details:
   - Title
   - Author
   - Description
   - Genre
   - Price per day
   - Upload cover image
   - Upload PDF file
3. Click "Save"

### User Workflow

1. **Registration**: Sign up at `/signup/`
2. **Browse Books**: View all available books at `/books/`
3. **Rent Book**: 
   - Select a book
   - Choose rental period (1-365 days)
   - Click "Rent Now"
4. **Payment**: Complete payment via bKash
5. **Access PDF**: View rented books in dashboard
6. **Read**: Download or view PDF online

## 🔐 Security Features

- CSRF protection on all forms
- Password hashing using Django's built-in system
- Session-based authentication
- Secure file upload handling
- Environment-based configuration
- SQL injection protection via ORM

## 🌐 API Endpoints

### Books API
- `GET /api/books/` - List all books
- `GET /api/books/{id}/` - Get book details
- `GET /api/books/search/?q=query` - Search books

### Rentals API
- `GET /api/rentals/` - List user's rentals
- `POST /api/rentals/create_rental/` - Create new rental

### Payments API
- `GET /api/payments/` - List user's payments
- `POST /api/payments/create_payment/` - Initiate payment
- `POST /api/payments/{id}/execute_payment/` - Execute payment

## 🧪 Testing

### Running Tests
```bash
python manage.py test
```

### Test Coverage
```bash
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

## 📦 Deployment

### Production Checklist

1. **Security Settings**:
   ```python
   DEBUG = False
   ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
   SECRET_KEY = 'strong-random-secret-key'
   ```

2. **Database**: Use PostgreSQL for production
3. **Static Files**: Configure cloud storage (AWS S3) for media files
4. **HTTPS**: Enable SSL certificate
5. **Environment Variables**: Set all production credentials
6. **bKash**: Switch to production API URL

### Deployment on Heroku

```bash
# Install Heroku CLI and login
heroku login

# Create Heroku app
heroku create rentread-app

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set BKASH_APP_KEY=your-key
# ... set other variables

# Deploy
git push heroku main

# Run migrations
heroku run python manage.py migrate

# Create superuser
heroku run python manage.py createsuperuser
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Django Documentation
- Bootstrap for UI components
- bKash Payment Gateway
- Font Awesome for icons

## 📞 Support

For support, email support@rentread.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Mobile app (iOS and Android)
- [ ] Book recommendations system
- [ ] User reviews and ratings
- [ ] Multiple payment gateway support
- [ ] Social media integration
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Reading progress tracking

## 📊 Database Schema

### User Model
- id (Primary Key)
- username (Unique)
- email (Unique)
- password (Hashed)
- phone
- created_at
- updated_at

### Book Model
- id (Primary Key)
- title
- author
- description
- price_per_day
- cover_image
- pdf_file
- genre
- is_available
- created_at
- updated_at

### Rental Model
- id (Primary Key)
- user_id (Foreign Key)
- book_id (Foreign Key)
- start_date
- end_date
- rental_days
- total_price
- status (active/expired)
- created_at
- updated_at

### Payment Model
- id (Primary Key)
- user_id (Foreign Key)
- rental_id (Foreign Key)
- amount
- payment_method
- transaction_id
- payment_id
- status (pending/completed/failed)
- bkash_response (JSON)
- created_at
- updated_at

---

**Built with ❤️ using Django**
