from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer, BookDetailSerializer


class BookViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing books
    """
    queryset = Book.objects.filter(is_available=True)
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'author', 'genre', 'description']
    ordering_fields = ['title', 'price_per_day', 'created_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BookDetailSerializer
        return BookSerializer

    @action(detail=False, methods=['get'])
    def search(self, request):
        """Custom search endpoint"""
        query = request.query_params.get('q', '')
        genre = request.query_params.get('genre', '')
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)

        books = self.queryset

        if query:
            books = books.filter(
                Q(title__icontains=query) |
                Q(author__icontains=query) |
                Q(description__icontains=query)
            )

        if genre:
            books = books.filter(genre__icontains=genre)

        if min_price:
            books = books.filter(price_per_day__gte=min_price)

        if max_price:
            books = books.filter(price_per_day__lte=max_price)

        serializer = self.get_serializer(books, many=True)
        return Response(serializer.data)


def book_list_view(request):
    """Template view for book listing"""
    books = Book.objects.filter(is_available=True)
    
    # Search functionality
    query = request.GET.get('q', '')
    genre = request.GET.get('genre', '')
    
    if query:
        books = books.filter(
            Q(title__icontains=query) |
            Q(author__icontains=query) |
            Q(description__icontains=query)
        )
    
    if genre:
        books = books.filter(genre__icontains=genre)
    
    # Get unique genres for filter
    genres = Book.objects.filter(is_available=True).values_list('genre', flat=True).distinct()
    
    context = {
        'books': books,
        'genres': genres,
        'query': query,
        'selected_genre': genre,
    }
    
    return render(request, 'books/book_list.html', context)


def book_detail_view(request, pk):
    """Template view for book detail"""
    book = get_object_or_404(Book, pk=pk, is_available=True)
    
    context = {
        'book': book,
    }
    
    return render(request, 'books/book_detail.html', context)
