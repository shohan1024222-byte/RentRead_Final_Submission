from django.contrib import admin
from django.utils.html import format_html
from .models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'genre', 'price_per_day', 'is_available', 'has_pdf', 'created_at')
    list_filter = ('is_available', 'genre', 'created_at')
    search_fields = ('title', 'author', 'genre', 'description')
    list_editable = ('is_available', 'price_per_day')
    ordering = ('-created_at',)
    
    class Media:
        css = {
            'all': ('admin/css/book_admin.css',)
        }
    
    fieldsets = (
        ('Book Information', {
            'fields': ('title', 'author', 'description', 'genre'),
            'description': 'Basic information about the book'
        }),
        ('Cover Image Upload', {
            'fields': ('cover_image_preview', 'cover_image'),
            'description': 'Upload or update the book cover image'
        }),
        ('📄 PDF File Upload', {
            'fields': ('pdf_file_info', 'pdf_file'),
            'description': '<strong style="font-size: 16px; color: #e65100;">⬇️ Upload the PDF book file here (Users will NOT be able to download it)</strong>',
            'classes': ('wide', 'fieldset-pdf_file_upload')
        }),
        ('Pricing & Availability', {
            'fields': ('price_per_day', 'is_available')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at', 'cover_image_preview', 'pdf_file_info')
    
    def cover_image_preview(self, obj):
        """Display preview of the current cover image"""
        if obj.cover_image:
            return format_html(
                '<img src="{}" style="max-height: 200px; max-width: 200px; border: 1px solid #ddd; padding: 5px;" /><br><br>'
                '<a href="{}" target="_blank" class="button">View Full Size</a>',
                obj.cover_image.url,
                obj.cover_image.url
            )
        return format_html('<span style="color: #999;">No cover image uploaded yet</span>')
    cover_image_preview.short_description = 'Current Cover Image'
    
    def pdf_file_info(self, obj):
        """Display information about the current PDF file"""
        if not obj or not obj.pk:
            # For new books being created
            return format_html(
                '<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 5px solid #2196f3; margin-bottom: 15px;">'
                '<h3 style="margin-top: 0; color: #1565c0;">📤 Upload PDF File</h3>'
                '<p style="margin: 10px 0; font-size: 14px;">Upload the PDF book file for users to read.</p>'
                '<p style="margin: 10px 0; color: #666;"><strong>👇 Use the "Choose File" button below to select the PDF file</strong></p>'
                '</div>'
            )
        if obj.pdf_file:
            import os
            file_size = obj.pdf_file.size
            size_mb = file_size / (1024 * 1024)
            return format_html(
                '<div style="background: #e8f5e9; padding: 20px; border-radius: 8px; border-left: 5px solid #4caf50; margin-bottom: 15px;">'
                '<h3 style="margin-top: 0; color: #2e7d32;">✅ PDF File Currently Uploaded</h3>'
                '<p style="margin: 10px 0;"><strong>📄 File Name:</strong> {}</p>'
                '<p style="margin: 10px 0;"><strong>📦 File Size:</strong> {:.2f} MB</p>'
                '<p style="margin: 15px 0;">'
                '<a href="{}" target="_blank" class="button" style="background: #4caf50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">📥 View/Download Current PDF</a>'
                '</p>'
                '<hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">'
                '<p style="margin: 10px 0; color: #666;"><strong>💡 To Replace PDF:</strong> Use the "Choose File" button in the "Pdf file" field below, then click Save.</p>'
                '</div>',
                os.path.basename(obj.pdf_file.name),
                size_mb,
                obj.pdf_file.url
            )
        return format_html(
            '<div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 5px solid #ff9800; margin-bottom: 15px;">'
            '<h3 style="margin-top: 0; color: #e65100;">⚠️ No PDF File Uploaded</h3>'
            '<p style="margin: 10px 0; font-size: 14px;">This book does not have a PDF file yet.</p>'
            '<hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">'
            '<p style="margin: 10px 0; color: #666;"><strong>📤 To Upload PDF:</strong> Use the "Choose File" button in the "Pdf file" field below, then click Save.</p>'
            '</div>'
        )
    pdf_file_info.short_description = ''
    
    def has_pdf(self, obj):
        """Display if book has PDF file"""
        if obj.pdf_file:
            return format_html('<span style="color: green;">✅ Yes</span>')
        return format_html('<span style="color: red;">❌ No</span>')
    has_pdf.short_description = 'Has PDF'
    has_pdf.admin_order_field = 'pdf_file'
