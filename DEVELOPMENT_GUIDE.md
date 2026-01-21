# RentRead - Complete Development Guide

## 🎯 Project Overview

RentRead is a fully-featured PDF book rental platform built with Django. This guide will help you understand the project structure and get started with development.

## 📚 What's Included

✅ **Complete Django Backend**
- Custom User authentication system
- Books, Rentals, and Payments apps
- Django REST Framework API
- Django Admin panel with custom configurations

✅ **Frontend Templates**
- Responsive design with Bootstrap 5
- Modern UI with Font Awesome icons
- jQuery for dynamic interactions
- Custom CSS styling

✅ **Payment Integration**
- bKash payment gateway integration
- Secure payment processing
- Transaction tracking

✅ **Features**
- User registration and authentication
- Book browsing with search and filters
- Flexible rental periods (1-365 days)
- PDF viewing and downloading
- User dashboard for rental management
- Admin panel for content management

## 🚀 Quick Setup

### Prerequisites
- Python 3.8+
- pip
- Virtual environment (recommended)
- Git (optional)

### Installation

1. **Navigate to project directory**
   ```powershell
   cd RentRead
   ```

2. **Run setup script** (Recommended)
   ```powershell
   .\setup.ps1
   ```

   Or follow manual steps in QUICKSTART.md

3. **Configure environment**
   - Edit `.env` file with your settings
   - Add bKash credentials if you have them

4. **Create superuser**
   ```powershell
   python manage.py createsuperuser
   ```

5. **Populate sample data** (Optional)
   ```powershell
   python manage.py populate_books
   ```

6. **Run server**
   ```powershell
   python manage.py runserver
   ```

## 📂 Project Structure Explained

### Core Apps

**1. users/** - User Management
- Custom User model extending Django's AbstractUser
- Registration, login, logout views
- User dashboard for rental management
- Forms for authentication

**2. books/** - Book Management
- Book model with title, author, PDF, cover image
- Book listing and detail views
- Search and filter functionality
- REST API endpoints

**3. rentals/** - Rental Management
- Rental model linking users to books
- Rental creation and management
- PDF access control
- Expiration tracking

**4. payments/** - Payment Processing
- Payment model for transaction tracking
- bKash payment gateway integration
- Payment status management
- Callback handling

### Templates Structure

```
templates/
├── base.html              # Base template with navbar and footer
├── home.html              # Landing page
├── users/
│   ├── signup.html        # User registration
│   ├── login.html         # User login
│   └── dashboard.html     # User dashboard
├── books/
│   ├── book_list.html     # Browse books
│   └── book_detail.html   # Book details and rent
├── rentals/
│   └── view_pdf.html      # PDF viewer
└── payments/
    ├── payment_create.html    # Payment initiation
    └── payment_status.html    # Payment confirmation
```

## 🔧 Configuration

### Environment Variables (.env)

```env
# Django Settings
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

### Important Settings (rentread/settings.py)

- **AUTH_USER_MODEL**: Custom user model
- **MEDIA_ROOT**: Location for uploaded files
- **STATIC_ROOT**: Location for collected static files
- **REST_FRAMEWORK**: API configuration
- **LOGIN_URL**: Redirect URL for authentication

## 🎨 Customization

### Adding New Features

1. **Create a new app**
   ```powershell
   python manage.py startapp newapp
   ```

2. **Add to INSTALLED_APPS** in settings.py

3. **Create models, views, templates**

4. **Register URLs** in main urls.py

### Modifying Templates

- Templates use Bootstrap 5
- Extend `base.html` for consistent layout
- Use Django template tags: `{% extends %}`, `{% block %}`
- Static files: `{% load static %}`

### Styling

- Main CSS: `static/css/style.css`
- Bootstrap 5 included via CDN
- Font Awesome icons included
- Custom scrollbar and animations

## 🧪 Testing

Run tests:
```powershell
python manage.py test
```

Run specific app tests:
```powershell
python manage.py test users
python manage.py test books
python manage.py test rentals
```

## 📊 Database Management

### Migrations

Create migrations after model changes:
```powershell
python manage.py makemigrations
```

Apply migrations:
```powershell
python manage.py migrate
```

### Database Shell

Access Django shell:
```powershell
python manage.py shell
```

Example queries:
```python
from books.models import Book
from django.contrib.auth import get_user_model

# Get all books
books = Book.objects.all()

# Filter available books
available_books = Book.objects.filter(is_available=True)

# Get user
User = get_user_model()
user = User.objects.get(username='admin')
```

## 🔐 Admin Panel

Access: `http://127.0.0.1:8000/admin/`

### Admin Features

1. **Books Management**
   - Add/Edit/Delete books
   - Upload PDF files and cover images
   - Set pricing and availability

2. **User Management**
   - View all users
   - Manage permissions
   - Track user activity

3. **Rental Management**
   - View all rentals
   - Track active/expired rentals
   - Monitor rental history

4. **Payment Management**
   - View payment transactions
   - Track payment status
   - Access bKash responses

## 🌐 API Documentation

### Books API

**List Books**
```
GET /api/books/
```

**Book Detail**
```
GET /api/books/{id}/
```

**Search Books**
```
GET /api/books/search/?q=query&genre=genre
```

### Rentals API (Requires Authentication)

**List User Rentals**
```
GET /api/rentals/
```

**Create Rental**
```
POST /api/rentals/create_rental/
{
    "book_id": 1,
    "rental_days": 7
}
```

### Payments API (Requires Authentication)

**List User Payments**
```
GET /api/payments/
```

**Create Payment**
```
POST /api/payments/create_payment/
{
    "rental_id": 1
}
```

## 🚢 Deployment

### Production Checklist

- [ ] Set DEBUG=False
- [ ] Configure ALLOWED_HOSTS
- [ ] Use strong SECRET_KEY
- [ ] Use PostgreSQL database
- [ ] Configure cloud storage (AWS S3)
- [ ] Enable HTTPS
- [ ] Set up proper logging
- [ ] Configure email backend
- [ ] Update bKash to production URL
- [ ] Set up monitoring

### Environment-Specific Settings

Create different settings files:
```
rentread/
├── settings/
│   ├── __init__.py
│   ├── base.py          # Common settings
│   ├── development.py   # Dev settings
│   └── production.py    # Prod settings
```

## 🐛 Troubleshooting

### Common Issues

**1. Import Errors**
- Ensure virtual environment is activated
- Check all dependencies are installed

**2. Database Errors**
- Run migrations: `python manage.py migrate`
- Check database file permissions

**3. Static Files Not Loading**
- Run: `python manage.py collectstatic`
- Check STATIC_ROOT and STATIC_URL settings

**4. Media Files Not Showing**
- Ensure MEDIA_ROOT directory exists
- Check file upload permissions

**5. bKash Integration Issues**
- Verify credentials in .env
- Check sandbox vs production URL
- Review bKash documentation

## 📝 Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes**
   - Update models
   - Create/modify views
   - Update templates
   - Add tests

3. **Test changes**
   ```powershell
   python manage.py test
   python manage.py runserver
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

## 🔒 Security Best Practices

- Never commit `.env` file
- Use environment variables for secrets
- Keep Django and dependencies updated
- Use HTTPS in production
- Implement rate limiting
- Validate all user inputs
- Use CSRF protection
- Sanitize file uploads

## 📚 Resources

- Django Documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Bootstrap 5: https://getbootstrap.com/
- bKash API: https://developer.bka.sh/
- Font Awesome: https://fontawesome.com/

## 💡 Tips

- Use Django Debug Toolbar for development
- Implement caching for better performance
- Use select_related() and prefetch_related() for queries
- Write tests for all new features
- Keep code DRY (Don't Repeat Yourself)
- Follow PEP 8 style guide
- Document your code

## 🤝 Need Help?

- Check README.md for detailed documentation
- Review QUICKSTART.md for quick start guide
- Search Django documentation
- Check Stack Overflow
- Review existing code for patterns

---

**Happy Coding! 🚀**

Built with ❤️ using Django
