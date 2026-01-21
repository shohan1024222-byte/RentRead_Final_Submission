from django.db import models
from django.conf import settings
from django.utils import timezone
from books.models import Book


class Rental(models.Model):
    """
    Rental model for tracking book rentals
    """
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('expired', 'Expired'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rentals')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='rentals')
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    rental_days = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'rentals'
        verbose_name = 'Rental'
        verbose_name_plural = 'Rentals'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"

    def is_active(self):
        """Check if rental is still active"""
        return timezone.now() < self.end_date and self.status == 'active'

    def save(self, *args, **kwargs):
        """Override save to update status based on end_date"""
        if timezone.now() > self.end_date:
            self.status = 'expired'
        super().save(*args, **kwargs)
