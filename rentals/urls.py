from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'rentals', views.RentalViewSet, basename='rental')

urlpatterns = [
    path('api/', include(router.urls)),
    path('rent/<int:book_id>/', views.create_rental_view, name='create_rental'),
    path('rental/<int:rental_id>/pdf/', views.rental_pdf_view, name='rental_pdf'),
]
