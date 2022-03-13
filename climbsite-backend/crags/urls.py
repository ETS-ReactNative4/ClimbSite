from django.urls import path
from .views import CragList, RouteList, SectorList


urlpatterns = [
    path('', CragList.as_view()),
    path('sectors', SectorList.as_view()),
    path('routes', RouteList.as_view()),
    

]