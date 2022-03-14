from django.urls import path
from .views import GetEvents, JoinEvent, LogEvent


urlpatterns = [
    path('', GetEvents.as_view()),
    path('log_event', LogEvent.as_view()),
    path('join_event', JoinEvent.as_view()),

]