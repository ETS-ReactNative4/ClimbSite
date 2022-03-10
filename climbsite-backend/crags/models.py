from django.db import models
from django.utils.translation import gettext_lazy as _

class Crag(models.Model):

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    description = models.TextField(max_length=500)
    gear = models.TextField(max_length=500)
    conditions = models.TextField(max_length=500)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    created_on = models.DateTimeField(auto_now_add=True)