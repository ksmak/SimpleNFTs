from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    """
        Custom user admin
    """
    list_display = (
        'username',
        'first_name',
        'last_name',
        'is_active',
    )

    list_filter = ('username', )

    add_fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('username', 'password1', 'password2')
        }),
        ('Personal info', {
            'classes': ('wide', ),
            'fields': ('first_name', 'last_name')
        }),
        ('Permissions', {
            'classes': ('wide', ),
            'fields': ('is_active', 'is_staff', 'is_superuser')
        })
    )

    fieldsets = (
        (None, {
            'classes': ('wide', ),
            'fields': ('username', 'password')
        }),
        ('Personal info', {
            'classes': ('wide', ),
            'fields': ('first_name', 'last_name')
        }),
        ('Permissions', {
            'classes': ('wide', ),
            'fields': ('is_active', 'is_staff', 'is_superuser')
        }),
        ('Other fields', {
            'classes': ('wide', ),
            'fields': ('date_of_creation', 'date_of_change')
        })
    )

    readonly_fields = (
        'date_of_creation', 'date_of_change',
        'is_superuser', 'is_staff'
    )

    search_fields = ('username', )

    ordering = ('username', )


admin.site.register(CustomUser, CustomUserAdmin)
