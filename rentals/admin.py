from django.contrib import admin
from .models import Rental


@admin.register(Rental)
class RentalAdmin(admin.ModelAdmin):
    list_display = ('user', 'book', 'rental_days', 'total_price', 'status', 'start_date', 'end_date')
    list_filter = ('status', 'start_date', 'end_date')
    search_fields = ('user__username', 'user__email', 'book__title', 'book__author')
    readonly_fields = ('start_date', 'created_at', 'updated_at')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Rental Information', {
            'fields': ('user', 'book', 'rental_days', 'total_price')
        }),
        ('Dates & Status', {
            'fields': ('start_date', 'end_date', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
