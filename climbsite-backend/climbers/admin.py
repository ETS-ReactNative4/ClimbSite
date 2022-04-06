from django.contrib import admin
from .models import User, UserFollowing, ClimbList, Ascending, Favorite
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea
from django.db import models


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'full_name')
    list_filter = ('email', 'full_name','is_staff','profile_pic','phone_number')
    ordering = ('-start_date',)
    list_display = ('email', 'full_name',
                    'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'full_name',)}),
        ('Permissions', {'fields': ('is_staff',)}),
        ('Personal', {'fields': ('profile_pic','phone_number',)}),
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

admin.site.register(UserFollowing)
admin.site.register(ClimbList)
admin.site.register(Ascending)
admin.site.register(Favorite)
admin.site.register(User, UserAdminConfig)
