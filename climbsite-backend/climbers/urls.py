from django.urls import path
from .views import UserCreate, Userfollowings, AddFollower

urlpatterns = [
    path('register', UserCreate.as_view()),
    path('followers', Userfollowings.as_view()),
    path('follow', AddFollower.as_view())
]