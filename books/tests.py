from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Book
from decimal import Decimal

User = get_user_model()


class BookModelTest(TestCase):
    """Test cases for Book model"""

    def setUp(self):
        """Set up test data"""
        self.book = Book.objects.create(
            title='Test Book',
            author='Test Author',
            description='Test Description',
            price_per_day=Decimal('5.00'),
            genre='Test Genre',
            is_available=True
        )

    def test_book_creation(self):
        """Test book is created correctly"""
        self.assertEqual(self.book.title, 'Test Book')
        self.assertEqual(self.book.author, 'Test Author')
        self.assertEqual(self.book.price_per_day, Decimal('5.00'))
        self.assertTrue(self.book.is_available)

    def test_book_string_representation(self):
        """Test book string representation"""
        expected = f"{self.book.title} by {self.book.author}"
        self.assertEqual(str(self.book), expected)

    def test_book_default_availability(self):
        """Test book is available by default"""
        self.assertTrue(self.book.is_available)
