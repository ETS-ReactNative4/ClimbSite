from django.utils import timezone
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class User(AbstractBaseUser, PermissionsMixin):
    
    email = models.EmailField(_('email address'), unique=True)
    full_name = models.CharField(max_length=150, blank=True)
    # profile_pic = models.ImageField(_("Image"),upload_to = upload_to, null=True, blank = True)
    dob = models.DateField(null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    start_date = models.DateTimeField(default=timezone.now)

    # objects = CustomManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']