from django.db import models
from django.utils.translation import gettext_lazy as _


def upload_to(instance, filename):
    return 'crags/{filename}'.format(filename=filename)

class Crag(models.Model):

    name = models.CharField(max_length=255)
    description = models.TextField(max_length=500)
    gear = models.TextField(max_length=500)
    conditions = models.TextField(max_length=500)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    image = models.ImageField(_("Image"),upload_to = upload_to, null=True, blank = True)
    created_on = models.DateField(auto_now_add=True)

class Sector(models.Model):
    crag = models.ForeignKey(Crag, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

class Route(models.Model):
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    grade = models.CharField(max_length=3)
