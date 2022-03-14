from rest_framework import generics
from .models import Event, Attendee
from .serializers import EventSerializer, AttendeeSerializer
from rest_framework.permissions import IsAuthenticated
from crags.models import Crag
from rest_framework.response import Response
from rest_framework import status

class LogEvent(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        crag = Crag.objects.get(id=request.data.get('crag'))
        description = request.data.get('description')
        date = request.data.get('date')
        total_seats = request.data.get('total_seats')
        
        try:
            Event.objects.get(user = user , date = date)
            return Response({'status':status.HTTP_400_BAD_REQUEST})
        except Event.DoesNotExist:

            event = event.objects.create(user = user , crag = crag, 
            description = description, date = date, total_seats=total_seats)
            Event.save(event)
            return Response({'status':status.HTTP_200_OK})
