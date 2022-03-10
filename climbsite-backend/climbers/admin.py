from django.contrib import admin
from climbers.models import User
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django.db import models


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'full_name')
    list_filter = ('email', 'full_name','is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'full_name',
                    'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'full_name',)}),
        ('Permissions', {'fields': ('is_staff',)}),
        ('Personal', {'fields': ()}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'password1', 'password2', 'is_staff')}
         ),
    )


admin.site.register(User, UserAdminConfig)
