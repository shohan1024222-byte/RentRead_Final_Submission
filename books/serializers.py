from rest_framework import serializers
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    """Serializer for Book model"""
    
    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'description', 'price_per_day',
            'cover_image', 'genre', 'is_available', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class BookDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for Book model including PDF access"""
    
    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'description', 'price_per_day',
            'cover_image', 'pdf_file', 'genre', 'is_available', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
