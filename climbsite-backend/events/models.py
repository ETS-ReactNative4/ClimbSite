from django.db import models
from crags.models import Crag, Sector
from climbers.models import User

class Event(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    crag = models.ForeignKey(Crag, on_delete=models.CASCADE)
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE,null=True)
    description = models.TextField(max_length=500)
    date = models.DateField()
    total_seats = models.IntegerField()
    current_seats = models.IntegerField(default=0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    created = models.DateField(auto_now_add=True)

    def incerement_seats(self):
        self.current_seats += 1

class Attendee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
