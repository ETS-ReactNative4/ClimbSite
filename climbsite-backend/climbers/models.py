from django.utils import timezone
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomManager(BaseUserManager):
    def create_user(self, email, full_name, password,dob, **other_fields):
        
        if not email:
            raise ValueError(_('You must provide an email address'))
        
        email = self.normalize_email(email)
        user = self.model(email = email, full_name=full_name,dob = dob, **other_fields )
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    
    email = models.EmailField(_('email address'), unique=True)
    full_name = models.CharField(max_length=150, blank=True)
    # profile_pic = models.ImageField(_("Image"),upload_to = upload_to, null=True, blank = True)
    dob = models.DateField(null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    start_date = models.DateTimeField(default=timezone.now)

    objects = CustomManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']