from django.urls import path
from .views import GetEvents, LogEvent


urlpatterns = [
    path('', GetEvents.as_view()),
    path('log_event', LogEvent.as_view()),

]