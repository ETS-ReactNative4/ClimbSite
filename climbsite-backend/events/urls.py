from django.urls import path
from .views import LogEvent


urlpatterns = [
    path('', LogEvent.as_view()),

]