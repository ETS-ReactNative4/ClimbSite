from django.urls import path
from .views import (AddToClimbList, AddToFavorites, FavoriteList, GetAscents, 
GetClimbList, LogAscent, UserCreate, Userfollowers, Userfollowings, AddFollower,GetUserInfo)

urlpatterns = [
    path('register', UserCreate.as_view()),
    path('user_info', GetUserInfo.as_view()),
    path('followings', Userfollowings.as_view()),
    path('followers', Userfollowers.as_view()),
    path('follow', AddFollower.as_view()),
    path('favorite', AddToFavorites.as_view()),
    path('get_favorites', FavoriteList.as_view()),
    path('add_to_climblist', AddToClimbList.as_view()),
    path('climblist', GetClimbList.as_view()),
    path('logascent', LogAscent.as_view()),
    path('get_ascents', GetAscents.as_view()),
]