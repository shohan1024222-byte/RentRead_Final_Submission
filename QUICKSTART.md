# Quick Start Guide for RentRead

## Getting Started in 5 Minutes! 🚀

### Step 1: Setup (One-time)

**Option A: Using Setup Script (Recommended for Windows)**
```powershell
# Run the setup script
.\setup.ps1
```

**Option B: Manual Setup**
```powershell
# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Create directories
mkdir media\book_covers, media\book_pdfs, staticfiles

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Create superuser
python manage.py createsuperuser
```

### Step 2: Configure Environment

Edit the `.env` file with your settings:
```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# bKash credentials (get from bKash merchant portal)
BKASH_APP_KEY=your-app-key
BKASH_APP_SECRET=your-app-secret
BKASH_USERNAME=your-username
BKASH_PASSWORD=your-password
BKASH_BASE_URL=https://checkout.sandbox.bka.sh/v1.2.0-beta
```

### Step 3: Run the Server

```powershell
python manage.py runserver
```

Visit: `http://127.0.0.1:8000`

### Step 4: Add Sample Books

1. Go to admin panel: `http://127.0.0.1:8000/admin/`
2. Login with superuser credentials
3. Click "Books" → "Add Book"
4. Fill in details and upload files
5. Click "Save"

### Step 5: Test the Platform

1. **Create User Account**
   - Go to homepage
   - Click "Sign Up"
   - Fill in the form

2. **Browse Books**
   - Click "Browse Books" in navbar
   - Search or filter books

3. **Rent a Book**
   - Click on a book
   - Select rental period
   - Click "Rent Now"
   - Complete payment (sandbox mode)

4. **Access Your Book**
   - Go to "My Rentals" dashboard
   - Click "View PDF" on active rental

## Common Commands

```powershell
# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Run development server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic

# Run tests
python manage.py test
```

## Troubleshooting

### Issue: Import errors
**Solution**: Make sure virtual environment is activated
```powershell
.\venv\Scripts\Activate.ps1
```

### Issue: Static files not loading
**Solution**: Collect static files
```powershell
python manage.py collectstatic --noinput
```

### Issue: Database errors
**Solution**: Run migrations
```powershell
python manage.py makemigrations
python manage.py migrate
```

### Issue: bKash payment not working
**Solution**: 
1. Check `.env` has correct bKash credentials
2. Ensure using sandbox URL for testing
3. Check bKash merchant account is active

## Project URLs

- **Homepage**: http://127.0.0.1:8000/
- **Admin Panel**: http://127.0.0.1:8000/admin/
- **Browse Books**: http://127.0.0.1:8000/books/
- **User Dashboard**: http://127.0.0.1:8000/dashboard/
- **Login**: http://127.0.0.1:8000/login/
- **Sign Up**: http://127.0.0.1:8000/signup/

## API Endpoints

- **Books API**: http://127.0.0.1:8000/api/books/
- **Rentals API**: http://127.0.0.1:8000/api/rentals/
- **Payments API**: http://127.0.0.1:8000/api/payments/

## File Structure

```
RentRead/
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables (create from .env.example)
├── setup.ps1             # Setup script
├── rentread/             # Main project folder
├── users/                # User authentication app
├── books/                # Books management app
├── rentals/              # Rentals management app
├── payments/             # Payments processing app
├── templates/            # HTML templates
├── static/               # Static files (CSS, JS)
└── media/                # Uploaded files (PDFs, images)
```

## Need Help?

- Read the full README.md for detailed documentation
- Check Django documentation: https://docs.djangoproject.com/
- Check bKash API documentation: https://developer.bka.sh/

---

**Happy Coding! 🎉**
