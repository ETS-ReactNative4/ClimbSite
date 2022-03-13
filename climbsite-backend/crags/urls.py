from django.urls import path
from .views import CragList, SectorList


urlpatterns = [
    path('', CragList.as_view()),
    path('sectors', SectorList.as_view()),

]