from django.urls import path
from .views import GetAttendees, GetEvents, JoinEvent, LogEvent, UnjoinEvent


urlpatterns = [
    path('', GetEvents.as_view()),
    path('log_event', LogEvent.as_view()),
    path('join_event', JoinEvent.as_view()),
    path('get_attendees', GetAttendees.as_view()),
    path('unjoin_event', UnjoinEvent.as_view())

]