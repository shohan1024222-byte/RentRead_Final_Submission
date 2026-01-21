# RentRead - Complete File Structure

```
RentRead/
│
├── 📄 manage.py                    # Django management script
├── 📄 requirements.txt             # Python dependencies
├── 📄 .env.example                 # Environment variables template
├── 📄 .gitignore                   # Git ignore rules
├── 📄 setup.ps1                    # Automated setup script (Windows)
│
├── 📖 README.md                    # Main documentation
├── 📖 QUICKSTART.md                # Quick start guide
├── 📖 DEVELOPMENT_GUIDE.md         # Developer guide
├── 📖 PROJECT_SUMMARY.md           # Project summary
├── 📖 FILE_STRUCTURE.md            # This file
├── 📄 LICENSE                      # MIT License
│
├── 📁 rentread/                    # Main Django project
│   ├── 📄 __init__.py
│   ├── 📄 settings.py              # Django settings
│   ├── 📄 urls.py                  # Main URL configuration
│   ├── 📄 wsgi.py                  # WSGI configuration
│   └── 📄 asgi.py                  # ASGI configuration
│
├── 📁 users/                       # User authentication app
│   ├── 📄 __init__.py
│   ├── 📄 models.py                # Custom User model
│   ├── 📄 views.py                 # Auth views (signup, login, dashboard)
│   ├── 📄 forms.py                 # User forms (SignUp, Login)
│   ├── 📄 admin.py                 # User admin configuration
│   ├── 📄 apps.py                  # App configuration
│   ├── 📄 urls.py                  # User URLs
│   ├── 📄 tests.py                 # User tests
│   └── 📁 migrations/              # Database migrations
│
├── 📁 books/                       # Books management app
│   ├── 📄 __init__.py
│   ├── 📄 models.py                # Book model
│   ├── 📄 views.py                 # Book views (list, detail)
│   ├── 📄 serializers.py           # API serializers
│   ├── 📄 admin.py                 # Book admin configuration
│   ├── 📄 apps.py                  # App configuration
│   ├── 📄 urls.py                  # Book URLs
│   ├── 📄 tests.py                 # Book tests
│   ├── 📁 migrations/              # Database migrations
│   └── 📁 management/              # Custom management commands
│       ├── 📄 __init__.py
│       └── 📁 commands/
│           ├── 📄 __init__.py
│           └── 📄 populate_books.py  # Sample data command
│
├── 📁 rentals/                     # Rental management app
│   ├── 📄 __init__.py
│   ├── 📄 models.py                # Rental model
│   ├── 📄 views.py                 # Rental views (create, view PDF)
│   ├── 📄 serializers.py           # API serializers
│   ├── 📄 admin.py                 # Rental admin configuration
│   ├── 📄 apps.py                  # App configuration
│   ├── 📄 urls.py                  # Rental URLs
│   ├── 📄 tests.py                 # Rental tests
│   └── 📁 migrations/              # Database migrations
│
├── 📁 payments/                    # Payment processing app
│   ├── 📄 __init__.py
│   ├── 📄 models.py                # Payment model
│   ├── 📄 views.py                 # Payment views
│   ├── 📄 bkash.py                 # bKash API integration
│   ├── 📄 serializers.py           # API serializers
│   ├── 📄 admin.py                 # Payment admin configuration
│   ├── 📄 apps.py                  # App configuration
│   ├── 📄 urls.py                  # Payment URLs
│   └── 📁 migrations/              # Database migrations
│
├── 📁 templates/                   # HTML templates
│   ├── 📄 base.html                # Base template (navbar, footer)
│   ├── 📄 home.html                # Landing page
│   │
│   ├── 📁 users/                   # User templates
│   │   ├── 📄 signup.html          # Registration page
│   │   ├── 📄 login.html           # Login page
│   │   └── 📄 dashboard.html       # User dashboard
│   │
│   ├── 📁 books/                   # Book templates
│   │   ├── 📄 book_list.html       # Browse books
│   │   └── 📄 book_detail.html     # Book details
│   │
│   ├── 📁 rentals/                 # Rental templates
│   │   └── 📄 view_pdf.html        # PDF viewer
│   │
│   └── 📁 payments/                # Payment templates
│       ├── 📄 payment_create.html  # Payment page
│       └── 📄 payment_status.html  # Payment confirmation
│
├── 📁 static/                      # Static files
│   └── 📁 css/
│       └── 📄 style.css            # Custom CSS
│
├── 📁 staticfiles/                 # Collected static files (created by collectstatic)
│
└── 📁 media/                       # User uploaded files
    ├── 📁 book_covers/             # Book cover images
    └── 📁 book_pdfs/               # PDF files

```

## 📊 File Count by Type

- **Python Files (.py)**: 35+
- **HTML Templates (.html)**: 10
- **CSS Files (.css)**: 1
- **Configuration Files**: 5
- **Documentation Files (.md)**: 5
- **Total Files**: 50+

## 🎯 Key Files Quick Reference

### 🔧 Configuration
- `rentread/settings.py` - All Django settings
- `.env.example` - Environment variables template
- `requirements.txt` - Python dependencies

### 🗄️ Models (Database)
- `users/models.py` - User model
- `books/models.py` - Book model
- `rentals/models.py` - Rental model
- `payments/models.py` - Payment model

### 👁️ Views (Logic)
- `users/views.py` - Authentication & dashboard
- `books/views.py` - Book listing & details
- `rentals/views.py` - Rental creation & PDF access
- `payments/views.py` - Payment processing

### 🎨 Templates (UI)
- `templates/base.html` - Base layout
- `templates/home.html` - Landing page
- `templates/users/` - User pages
- `templates/books/` - Book pages
- `templates/rentals/` - Rental pages
- `templates/payments/` - Payment pages

### 🔌 APIs
- `books/serializers.py` - Book API
- `rentals/serializers.py` - Rental API
- `payments/serializers.py` - Payment API

### 🛡️ Admin
- `users/admin.py` - User admin
- `books/admin.py` - Book admin
- `rentals/admin.py` - Rental admin
- `payments/admin.py` - Payment admin

### 🧪 Tests
- `users/tests.py` - User tests
- `books/tests.py` - Book tests
- `rentals/tests.py` - Rental tests

### 📚 Documentation
- `README.md` - Complete guide
- `QUICKSTART.md` - Quick setup
- `DEVELOPMENT_GUIDE.md` - Developer guide
- `PROJECT_SUMMARY.md` - Project overview
- `FILE_STRUCTURE.md` - This file

## 🚀 Most Important Files to Know

### For Setup:
1. `setup.ps1` - Automated setup
2. `.env.example` - Environment template
3. `requirements.txt` - Dependencies

### For Development:
1. `rentread/settings.py` - Configuration
2. `rentread/urls.py` - URL routing
3. `*/models.py` - Database structure
4. `*/views.py` - Application logic
5. `templates/` - User interface

### For Deployment:
1. `rentread/settings.py` - Production config
2. `.env` - Production secrets
3. `requirements.txt` - Dependencies
4. `rentread/wsgi.py` - WSGI server

## 📝 Notes

- **Migrations folders** are auto-generated by Django
- **`__pycache__`** folders are ignored (in .gitignore)
- **`.env`** file is not tracked (in .gitignore)
- **`db.sqlite3`** is the database file (created after migration)
- **`staticfiles/`** is created by `collectstatic` command
- **`media/`** folders are created during setup

## 🎓 Understanding the Structure

### Django Apps Pattern:
Each app follows Django's standard structure:
```
app_name/
├── models.py      # Database models
├── views.py       # Business logic
├── urls.py        # URL routing
├── admin.py       # Admin panel config
├── apps.py        # App configuration
├── tests.py       # Unit tests
└── migrations/    # Database migrations
```

### Templates Pattern:
Templates are organized by app:
```
templates/
├── base.html           # Shared layout
└── app_name/           # App-specific templates
    └── page.html
```

### Static Files Pattern:
Static files are organized by type:
```
static/
├── css/      # Stylesheets
├── js/       # JavaScript (if added)
└── images/   # Static images (if added)
```

---

**Quick Navigation**: Use this file to quickly locate any component in the project!
