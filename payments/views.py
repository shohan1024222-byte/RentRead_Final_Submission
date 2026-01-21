from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from rentals.models import Rental
from .serializers import PaymentSerializer
from .bkash import BkashPaymentGateway


class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing payments
    """
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return payments for the current user"""
        return Payment.objects.filter(user=self.request.user).select_related('rental', 'rental__book')

    @action(detail=False, methods=['post'])
    def create_payment(self, request):
        """Create a payment for a rental"""
        rental_id = request.data.get('rental_id')
        
        try:
            rental = Rental.objects.get(id=rental_id, user=request.user)
        except Rental.DoesNotExist:
            return Response(
                {'error': 'Rental not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if payment already exists
        if hasattr(rental, 'payment'):
            return Response(
                {'error': 'Payment already exists for this rental'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create payment
        payment = Payment.objects.create(
            user=request.user,
            rental=rental,
            amount=rental.total_price,
            payment_method='bkash',
            status='pending'
        )

        # Initialize bKash payment
        bkash = BkashPaymentGateway()
        result = bkash.create_payment(
            amount=float(rental.total_price),
            invoice_number=f"RR-{payment.id}",
            merchant_invoice_number=f"RENTAL-{rental.id}"
        )

        if 'error' in result:
            payment.status = 'failed'
            payment.bkash_response = result
            payment.save()
            return Response(
                {'error': 'Failed to initialize payment', 'details': result['error']},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Update payment with bKash response
        payment.payment_id = result.get('paymentID')
        payment.bkash_response = result
        payment.save()

        return Response({
            'payment_id': payment.id,
            'bkash_payment_id': result.get('paymentID'),
            'bkash_url': result.get('bkashURL'),
            'message': 'Payment initialized. Please complete payment on bKash.'
        })

    @action(detail=True, methods=['post'])
    def execute_payment(self, request, pk=None):
        """Execute bKash payment after user approval"""
        payment = self.get_object()

        if payment.status != 'pending':
            return Response(
                {'error': 'Payment is not in pending state'},
                status=status.HTTP_400_BAD_REQUEST
            )

        bkash = BkashPaymentGateway()
        result = bkash.execute_payment(payment.payment_id)

        if 'error' in result or result.get('statusCode') != '0000':
            payment.status = 'failed'
            payment.bkash_response = result
            payment.save()
            return Response(
                {'error': 'Payment execution failed', 'details': result},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update payment status
        payment.status = 'completed'
        payment.transaction_id = result.get('trxID')
        payment.bkash_response = result
        payment.save()

        return Response({
            'message': 'Payment completed successfully',
            'transaction_id': payment.transaction_id
        })


@login_required
def payment_create_view(request, rental_id):
    """Template view for creating payment"""
    rental = get_object_or_404(Rental, id=rental_id, user=request.user)

    # Check if payment already exists
    if hasattr(rental, 'payment'):
        messages.info(request, 'Payment already exists for this rental.')
        return redirect('payment_status', payment_id=rental.payment.id)

    # Create payment
    payment = Payment.objects.create(
        user=request.user,
        rental=rental,
        amount=rental.total_price,
        payment_method='bkash',
        status='pending'
    )

    context = {
        'payment': payment,
        'rental': rental,
        'book': rental.book,
    }

    return render(request, 'payments/payment_create.html', context)


@login_required
def payment_status_view(request, payment_id):
    """Template view for payment status"""
    payment = get_object_or_404(Payment, id=payment_id, user=request.user)

    context = {
        'payment': payment,
        'rental': payment.rental,
        'book': payment.rental.book,
    }

    return render(request, 'payments/payment_status.html', context)


@login_required
def initiate_bkash_payment(request, payment_id):
    """Initiate bKash payment"""
    payment = get_object_or_404(Payment, id=payment_id, user=request.user)

    if payment.status != 'pending':
        return JsonResponse({'error': 'Payment is not in pending state'}, status=400)

    bkash = BkashPaymentGateway()
    result = bkash.create_payment(
        amount=float(payment.amount),
        invoice_number=f"RR-{payment.id}",
        merchant_invoice_number=f"RENTAL-{payment.rental.id}"
    )

    if 'error' in result:
        payment.status = 'failed'
        payment.bkash_response = result
        payment.save()
        return JsonResponse({'error': 'Failed to initialize payment', 'details': result['error']}, status=500)

    # Update payment with bKash response
    payment.payment_id = result.get('paymentID')
    payment.bkash_response = result
    payment.save()

    return JsonResponse({
        'payment_id': payment.id,
        'bkash_payment_id': result.get('paymentID'),
        'bkash_url': result.get('bkashURL'),
    })


@csrf_exempt
def bkash_callback(request):
    """Handle bKash payment callback"""
    if request.method == 'GET':
        payment_id = request.GET.get('paymentID')
        status_param = request.GET.get('status')

        if not payment_id:
            return JsonResponse({'error': 'Missing payment ID'}, status=400)

        try:
            payment = Payment.objects.get(payment_id=payment_id)
        except Payment.DoesNotExist:
            return JsonResponse({'error': 'Payment not found'}, status=404)

        if status_param == 'success':
            # Execute payment
            bkash = BkashPaymentGateway()
            result = bkash.execute_payment(payment_id)

            if 'error' in result or result.get('statusCode') != '0000':
                payment.status = 'failed'
                payment.bkash_response = result
                payment.save()
                messages.error(request, 'Payment failed. Please try again.')
            else:
                payment.status = 'completed'
                payment.transaction_id = result.get('trxID')
                payment.bkash_response = result
                payment.save()
                messages.success(request, 'Payment completed successfully!')

        elif status_param == 'cancel':
            payment.status = 'failed'
            payment.save()
            messages.warning(request, 'Payment was cancelled.')
        else:
            payment.status = 'failed'
            payment.save()
            messages.error(request, 'Payment failed.')

        return redirect('payment_status', payment_id=payment.id)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
