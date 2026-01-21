from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from datetime import timedelta
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Rental
from books.models import Book
from .serializers import RentalSerializer, CreateRentalSerializer


class RentalViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing rentals
    """
    serializer_class = RentalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return rentals for the current user"""
        return Rental.objects.filter(user=self.request.user).select_related('book')

    @action(detail=False, methods=['post'])
    def create_rental(self, request):
        """Create a new rental"""
        serializer = CreateRentalSerializer(data=request.data)
        if serializer.is_valid():
            book_id = serializer.validated_data['book_id']
            rental_days = serializer.validated_data['rental_days']

            try:
                book = Book.objects.get(id=book_id, is_available=True)
            except Book.DoesNotExist:
                return Response(
                    {'error': 'Book not found or not available'},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Calculate rental details
            total_price = book.price_per_day * rental_days
            end_date = timezone.now() + timedelta(days=rental_days)

            # Create rental (payment will be handled separately)
            rental = Rental.objects.create(
                user=request.user,
                book=book,
                rental_days=rental_days,
                end_date=end_date,
                total_price=total_price,
                status='active'
            )

            return Response(
                {
                    'rental_id': rental.id,
                    'total_price': float(total_price),
                    'message': 'Rental created successfully. Please proceed to payment.'
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@login_required
def create_rental_view(request, book_id):
    """Template view for creating a rental"""
    book = get_object_or_404(Book, id=book_id, is_available=True)
    
    if request.method == 'POST':
        rental_days = int(request.POST.get('rental_days', 1))
        
        if rental_days < 1 or rental_days > 365:
            messages.error(request, 'Invalid rental period.')
            return redirect('book_detail', pk=book_id)
        
        # Calculate rental details
        total_price = book.price_per_day * rental_days
        end_date = timezone.now() + timedelta(days=rental_days)
        
        # Create rental
        rental = Rental.objects.create(
            user=request.user,
            book=book,
            rental_days=rental_days,
            end_date=end_date,
            total_price=total_price,
            status='active'
        )
        
        # Redirect to payment
        return redirect('payment_create', rental_id=rental.id)
    
    context = {
        'book': book,
    }
    
    return render(request, 'rentals/create_rental.html', context)


@login_required
def rental_pdf_view(request, rental_id):
    """View for accessing rented PDF"""
    rental = get_object_or_404(Rental, id=rental_id, user=request.user)
    
    if not rental.is_active():
        messages.error(request, 'This rental has expired.')
        return redirect('dashboard')
    
    context = {
        'rental': rental,
        'book': rental.book,
    }
    
    return render(request, 'rentals/view_pdf.html', context)
