from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'rental', 'amount', 'payment_method', 'status', 'transaction_id', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('user__username', 'transaction_id', 'payment_id')
    readonly_fields = ('created_at', 'updated_at', 'bkash_response')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Payment Information', {
            'fields': ('user', 'rental', 'amount', 'payment_method')
        }),
        ('Transaction Details', {
            'fields': ('transaction_id', 'payment_id', 'status')
        }),
        ('bKash Response', {
            'fields': ('bkash_response',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
