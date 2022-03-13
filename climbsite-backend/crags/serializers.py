from rest_framework import serializers
from .models import Crag, Route, Sector

class CragSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'description', 'conditions', 'gear','longitude','latitude')
        model = Crag

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'crag')
        model = Sector

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'name', 'sector', 'grade')
        model = Route