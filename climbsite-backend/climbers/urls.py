from django.urls import path
from .views import UserCreate, Userfollowings

urlpatterns = [
    path('register', UserCreate.as_view()),
    path('followers', Userfollowings.as_view()),
]