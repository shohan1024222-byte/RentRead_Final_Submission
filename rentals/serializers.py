from rest_framework import serializers
from .models import Rental
from books.serializers import BookSerializer


class RentalSerializer(serializers.ModelSerializer):
    """Serializer for Rental model"""
    book = BookSerializer(read_only=True)
    book_id = serializers.IntegerField(write_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)
    is_active = serializers.SerializerMethodField()

    class Meta:
        model = Rental
        fields = [
            'id', 'user', 'user_username', 'book', 'book_id',
            'start_date', 'end_date', 'rental_days', 'total_price',
            'status', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'start_date', 'end_date', 'total_price', 'status', 'created_at']

    def get_is_active(self, obj):
        return obj.is_active()


class CreateRentalSerializer(serializers.Serializer):
    """Serializer for creating a rental"""
    book_id = serializers.IntegerField()
    rental_days = serializers.IntegerField(min_value=1)

    def validate_rental_days(self, value):
        if value < 1:
            raise serializers.ValidationError("Rental days must be at least 1.")
        if value > 365:
            raise serializers.ValidationError("Rental days cannot exceed 365.")
        return value
