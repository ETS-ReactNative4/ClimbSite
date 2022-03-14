from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Event, Attendee

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        fields=('id','user','crag','description','date','total_seats','current_seats')
        model = Event

class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        fields=('id','user','event')
        model = Attendee