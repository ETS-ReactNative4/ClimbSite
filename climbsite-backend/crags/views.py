from rest_framework import generics
from .models import Crag, Sector
from .serializers import CragSerializer, SectorSerializer

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

 