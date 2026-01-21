from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from books.models import Book
from decimal import Decimal
import os

User = get_user_model()


class Command(BaseCommand):
    help = 'Populate the database with sample books for testing'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Creating sample books...'))

        # Sample books data
        sample_books = [
            {
                'title': 'The Great Gatsby',
                'author': 'F. Scott Fitzgerald',
                'description': 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
                'price_per_day': Decimal('5.00'),
                'genre': 'Classic Literature',
            },
            {
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'description': 'A gripping tale of racial injustice and childhood innocence in the American South.',
                'price_per_day': Decimal('4.50'),
                'genre': 'Classic Literature',
            },
            {
                'title': '1984',
                'author': 'George Orwell',
                'description': 'A dystopian social science fiction novel and cautionary tale about totalitarianism.',
                'price_per_day': Decimal('6.00'),
                'genre': 'Science Fiction',
            },
            {
                'title': 'Pride and Prejudice',
                'author': 'Jane Austen',
                'description': 'A romantic novel of manners that critiques the British landed gentry at the end of the 18th century.',
                'price_per_day': Decimal('4.00'),
                'genre': 'Romance',
            },
            {
                'title': 'The Hobbit',
                'author': 'J.R.R. Tolkien',
                'description': 'A fantasy adventure about a hobbit who embarks on an epic quest to reclaim a treasure.',
                'price_per_day': Decimal('7.00'),
                'genre': 'Fantasy',
            },
            {
                'title': 'Harry Potter and the Philosopher\'s Stone',
                'author': 'J.K. Rowling',
                'description': 'The first novel in the Harry Potter series, following a young wizard\'s journey.',
                'price_per_day': Decimal('8.00'),
                'genre': 'Fantasy',
            },
            {
                'title': 'The Catcher in the Rye',
                'author': 'J.D. Salinger',
                'description': 'A story about teenage rebellion and alienation in 1950s America.',
                'price_per_day': Decimal('5.50'),
                'genre': 'Classic Literature',
            },
            {
                'title': 'Animal Farm',
                'author': 'George Orwell',
                'description': 'An allegorical novella reflecting events leading up to the Russian Revolution.',
                'price_per_day': Decimal('3.50'),
                'genre': 'Political Satire',
            },
            {
                'title': 'The Lord of the Rings',
                'author': 'J.R.R. Tolkien',
                'description': 'An epic high-fantasy novel following the quest to destroy the One Ring.',
                'price_per_day': Decimal('10.00'),
                'genre': 'Fantasy',
            },
            {
                'title': 'The Alchemist',
                'author': 'Paulo Coelho',
                'description': 'A philosophical book about following your dreams and listening to your heart.',
                'price_per_day': Decimal('6.50'),
                'genre': 'Philosophy',
            },
        ]

        created_count = 0
        for book_data in sample_books:
            book, created = Book.objects.get_or_create(
                title=book_data['title'],
                author=book_data['author'],
                defaults=book_data
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created: {book.title} by {book.author}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Already exists: {book.title}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'\nSuccessfully created {created_count} sample books!')
        )
        self.stdout.write(
            self.style.SUCCESS('Note: These books don\'t have PDF files or cover images.')
        )
        self.stdout.write(
            self.style.SUCCESS('You can add them through the admin panel.')
        )
