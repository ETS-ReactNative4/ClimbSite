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
        longitude = request.data.get('longitude')
        latitude = request.data.get('latitude')
        
        try:
            Event.objects.get(user = user , date = date)
            return Response({'status':status.HTTP_400_BAD_REQUEST})
        except Event.DoesNotExist:

            event = Event.objects.create(user = user , crag = crag, 
            description = description, date = date, total_seats=total_seats, longitude = longitude,
            latitude = latitude)
            Event.save(event)
            return Response({'status':status.HTTP_200_OK})

class GetEvents(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    def get_queryset(self):
        if self.request.data.get('crag') == None:
            return super().get_queryset()
        else:
            crag = self.request.data.get('crag')
            return super().get_queryset().filter(crag = crag)

class JoinEvent(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        event = Event.objects.get(id=request.data.get('event'))
        print(event.user)
        if(event.user == user):
            return Response({'status':status.HTTP_400_BAD_REQUEST})
        try:
            Attendee.objects.get(user = user , event = event)
            return Response({'status':status.HTTP_400_BAD_REQUEST})

        except Attendee.DoesNotExist:
            join = Attendee.objects.create(user = user , event = event)
            Attendee.save(join)
            return Response({'status':status.HTTP_200_OK})

class GetAttendees(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AttendeeSerializer
    queryset = Attendee.objects.all()

    def get_queryset(self):

        event = self.request.data.get('event')
        return super().get_queryset().filter( event = event)