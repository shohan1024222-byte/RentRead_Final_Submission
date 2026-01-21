from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    """Serializer for Payment model"""
    user_username = serializers.CharField(source='user.username', read_only=True)
    rental_info = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = [
            'id', 'user', 'user_username', 'rental', 'rental_info',
            'amount', 'payment_method', 'transaction_id', 'payment_id',
            'status', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']

    def get_rental_info(self, obj):
        return {
            'book_title': obj.rental.book.title,
            'rental_days': obj.rental.rental_days,
        }
