from django.urls import path
from .views import UserCreate, Userfollowers

urlpatterns = [
    path('register', UserCreate.as_view()),
    path('followers', Userfollowers.as_view()),
]