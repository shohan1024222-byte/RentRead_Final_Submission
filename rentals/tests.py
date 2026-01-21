from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from books.models import Book
from .models import Rental
from decimal import Decimal

User = get_user_model()


class RentalModelTest(TestCase):
    """Test cases for Rental model"""

    def setUp(self):
        """Set up test data"""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.book = Book.objects.create(
            title='Test Book',
            author='Test Author',
            price_per_day=Decimal('5.00'),
            is_available=True
        )
        self.rental = Rental.objects.create(
            user=self.user,
            book=self.book,
            rental_days=7,
            end_date=timezone.now() + timedelta(days=7),
            total_price=Decimal('35.00'),
            status='active'
        )

    def test_rental_creation(self):
        """Test rental is created correctly"""
        self.assertEqual(self.rental.user, self.user)
        self.assertEqual(self.rental.book, self.book)
        self.assertEqual(self.rental.rental_days, 7)
        self.assertEqual(self.rental.total_price, Decimal('35.00'))
        self.assertEqual(self.rental.status, 'active')

    def test_rental_is_active(self):
        """Test is_active method for active rental"""
        self.assertTrue(self.rental.is_active())

    def test_rental_expired(self):
        """Test rental expiration"""
        self.rental.end_date = timezone.now() - timedelta(days=1)
        self.rental.save()
        self.assertFalse(self.rental.is_active())
        self.assertEqual(self.rental.status, 'expired')

    def test_rental_string_representation(self):
        """Test rental string representation"""
        expected = f"{self.user.username} - {self.book.title}"
        self.assertEqual(str(self.rental), expected)
