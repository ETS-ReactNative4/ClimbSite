from rest_framework import generics
from .models import Event, Attendee
from .serializers import EventSerializer, AttendeeSerializer
from rest_framework.permissions import IsAuthenticated
from crags.models import Crag, Sector
from rest_framework.response import Response
from rest_framework import status

class LogEvent(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        crag = Crag.objects.get(id=request.data.get('crag'))
        sector = Sector.objects.get(id = request.data.get('sector'))
        description = request.data.get('description')
        date = request.data.get('date')
        total_seats = request.data.get('total_seats')
        longitude = request.data.get('longitude')
        latitude = request.data.get('latitude')
        
        try:
            Event.objects.get(user = user , date = date)
            return Response({'status':status.HTTP_400_BAD_REQUEST})
        except Event.DoesNotExist:

            event = Event.objects.create(user = user , crag = crag, sector = sector, 
            description = description, date = date, total_seats=total_seats, longitude = longitude,
            latitude = latitude)
            Event.save(event)
            return Response({'status':status.HTTP_200_OK})

class GetEvents(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer
    queryset = Event.objects.all()

    def get_queryset(self):
        if self.request.query_params.get('crag_id') == None:
            return super().get_queryset()
        else:
            crag =  self.request.query_params.get('crag_id')
            return super().get_queryset().filter(crag = crag)

class JoinEvent(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = self.request.user
        event = Event.objects.get(id=request.data.get('event'))
        print(event.user)
        if(event.user == user):
            return Response({'status':status.HTTP_400_BAD_REQUEST,'message':'you created this event'})

        try:
            Attendee.objects.get(user = user , event = event)
            unjoin = Attendee.objects.filter(user = user , event = event)
            unjoin.delete()
            event.decerement_seats()
            event.save()
       
            return Response({'status':status.HTTP_200_OK,'message':'you unjoined the event'})

        except Attendee.DoesNotExist:
            if(event.current_seats >= event.total_seats):
                return Response({'status':status.HTTP_400_BAD_REQUEST, 'message':'full'})
            join = Attendee.objects.create(user = user , event = event)
            Attendee.save(join)
            event.incerement_seats()
            event.save()
            return Response({'status':status.HTTP_200_OK,'message':'you joined the event'})
            
# class UnjoinEvent(generics.DestroyAPIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         user = self.request.user
#         event = Event.objects.get(id=request.data.get('event'))
#         if(event.user == user):
#             event.delete()
#             return Response({'status':status.HTTP_200_OK,'message':'event deleted'})
#         try:
#             Attendee.objects.get(user = user , event = event)
#             unjoin = Attendee.objects.filter(user = user , event = event)
#             unjoin.delete()
#             event.decerement_seats()
#             event.save()
#             return Response({'status':status.HTTP_200_OK})
            
#         except Attendee.DoesNotExist:
#             return Response({'status':status.HTTP_400_BAD_REQUEST,'message':'you are not joining the event'})

class CheckIfJoined(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self.request.user
        event = Event.objects.get(id=request.data.get('event'))
        if(event.user == user):
            return Response({'message':'Delete'})
        try:
            Attendee.objects.get(user = user , event = event)
            return Response({'message':'unjoin'})
            
        except Attendee.DoesNotExist:
            return Response({'message':'join'})


class GetAttendees(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AttendeeSerializer
    queryset = Attendee.objects.all()

    def get_queryset(self):

        
        user = self.request.user
        return super().get_queryset().filter(  user = user)