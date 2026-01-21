# RentRead Setup Script for Windows PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RentRead Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Python installation
Write-Host "Checking Python installation..." -ForegroundColor Yellow
python --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Python is not installed or not in PATH" -ForegroundColor Red
    exit 1
}
Write-Host "Python is installed!" -ForegroundColor Green
Write-Host ""

# Create virtual environment
Write-Host "Creating virtual environment..." -ForegroundColor Yellow
python -m venv venv
Write-Host "Virtual environment created!" -ForegroundColor Green
Write-Host ""

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1
Write-Host "Virtual environment activated!" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt
Write-Host "Dependencies installed!" -ForegroundColor Green
Write-Host ""

# Copy .env.example to .env if it doesn't exist
if (-Not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "Please edit .env file with your configuration!" -ForegroundColor Yellow
}
Write-Host ""

# Create necessary directories
Write-Host "Creating necessary directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "media/book_covers" | Out-Null
New-Item -ItemType Directory -Force -Path "media/book_pdfs" | Out-Null
New-Item -ItemType Directory -Force -Path "staticfiles" | Out-Null
Write-Host "Directories created!" -ForegroundColor Green
Write-Host ""

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
python manage.py makemigrations
python manage.py migrate
Write-Host "Migrations completed!" -ForegroundColor Green
Write-Host ""

# Collect static files
Write-Host "Collecting static files..." -ForegroundColor Yellow
python manage.py collectstatic --noinput
Write-Host "Static files collected!" -ForegroundColor Green
Write-Host ""

# Prompt for superuser creation
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit the .env file with your configuration" -ForegroundColor White
Write-Host "2. Create a superuser: python manage.py createsuperuser" -ForegroundColor White
Write-Host "3. Run the development server: python manage.py runserver" -ForegroundColor White
Write-Host "4. Access the site at: http://127.0.0.1:8000" -ForegroundColor White
Write-Host "5. Access admin panel at: http://127.0.0.1:8000/admin" -ForegroundColor White
Write-Host ""
Write-Host "Would you like to create a superuser now? (Y/N)" -ForegroundColor Yellow
$response = Read-Host
if ($response -eq "Y" -or $response -eq "y") {
    python manage.py createsuperuser
}

Write-Host ""
Write-Host "Setup completed successfully! Happy coding! 🚀" -ForegroundColor Green
