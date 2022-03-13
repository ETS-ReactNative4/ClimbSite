from rest_framework import serializers
from .models import Crag

class CragSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'description', 'conditions', 'gear','longitude','latitude')
        model = Crag