from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'payments', views.PaymentViewSet, basename='payment')

urlpatterns = [
    path('api/', include(router.urls)),
    path('payment/create/<int:rental_id>/', views.payment_create_view, name='payment_create'),
    path('payment/status/<int:payment_id>/', views.payment_status_view, name='payment_status'),
    path('payment/initiate/<int:payment_id>/', views.initiate_bkash_payment, name='initiate_payment'),
    path('payment/callback/', views.bkash_callback, name='bkash_callback'),
]
