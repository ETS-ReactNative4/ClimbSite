from rest_framework import serializers
from .models import Crag, Route, Sector

class CragSerializer(serializers.ModelSerializer):

    longitude = serializers.DecimalField(max_digits=9, decimal_places=6)
    latitude = serializers.DecimalField(max_digits=9, decimal_places=6)
    image = serializers.ImageField()
    class Meta:
        fields = ('id', 'name', 'description', 'conditions', 'gear','longitude','latitude','image')
        model = Crag

class SectorSerializer(serializers.ModelSerializer):
    crag=CragSerializer(read_only = True)

    class Meta:
        fields = ('id', 'name', 'crag')
        model = Sector

class RouteSerializer(serializers.ModelSerializer):
    sector=SectorSerializer(read_only = True)

    class Meta:
        fields = ('id', 'name', 'sector', 'grade')
        model = Route