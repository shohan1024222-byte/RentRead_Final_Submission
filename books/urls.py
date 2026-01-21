from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'books', views.BookViewSet, basename='book')

urlpatterns = [
    path('api/', include(router.urls)),
    path('books/', views.book_list_view, name='book_list'),
    path('book/<int:pk>/', views.book_detail_view, name='book_detail'),
]
