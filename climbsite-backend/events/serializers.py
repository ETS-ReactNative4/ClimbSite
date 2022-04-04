from rest_framework import serializers
from .models import Event, Attendee
from climbers.serializers import UserSerializer
from crags.serializers import CragSerializer, SectorSerializer

class EventSerializer(serializers.ModelSerializer):
    crag = CragSerializer(read_only=True)
    user = UserSerializer(read_only = True)
    sector = SectorSerializer(read_only = True)
    class Meta:
        fields=('id','user','crag','sector','description','date','total_seats','current_seats','longitude','latitude')
        model = Event

class AttendeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    event = EventSerializer(read_only = True)
    class Meta:
        fields=('id','user','event')
        model = Attendee