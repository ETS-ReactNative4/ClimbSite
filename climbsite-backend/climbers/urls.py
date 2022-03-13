from django.urls import path
from .views import UserCreate, Userfollowers, Userfollowings, AddFollower

urlpatterns = [
    path('register', UserCreate.as_view()),
    path('followings', Userfollowings.as_view()),
    path('followers', Userfollowers.as_view()),
    path('follow', AddFollower.as_view())
]