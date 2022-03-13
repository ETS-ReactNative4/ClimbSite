from rest_framework import generics
from .models import Crag, Route, Sector
from .serializers import CragSerializer, RouteSerializer, SectorSerializer

class CragList(generics.ListAPIView):
    queryset = Crag.objects.all()
    serializer_class = CragSerializer

class SectorList(generics.ListAPIView):

    serializer_class = SectorSerializer
    def get_queryset(self):
        crag = Crag.objects.get(id=self.request.data.get('crag'))
        print(crag)
        queryset = Sector.objects.filter(crag=crag)
        return queryset

class RouteList(generics.ListAPIView):

    serializer_class = RouteSerializer
    def get_queryset(self):
        sector = Sector.objects.get(id=self.request.data.get('sector'))
        print(sector)
        queryset = Route.objects.filter(sector=sector)
        return queryset