from django.urls import path
from .views import (AddToClimbList, AddToFavorites, CheckIfFavorite, CheckIfFollowing, FavoriteList,GetAscents, Rankings,Unfollow,GetNumberOfAscents,
GetClimbList, LogAscent, UserCreate, UserNonfollowings, Userfollowers, Userfollowings, AddFollower,GetUserInfo,GetMyAscents, DeleteFromFavorites)

urlpatterns = [
    path('register', UserCreate.as_view()),
    path('user_info', GetUserInfo.as_view()),
    path('followings', Userfollowings.as_view()),
    path('non_followings', UserNonfollowings.as_view()),
    path('follow_check', CheckIfFollowing.as_view()),
    path('followers', Userfollowers.as_view()),
    path('follow', AddFollower.as_view()),
    path('unfollow', Unfollow.as_view()),
    path('favorite', AddToFavorites.as_view()),
    path('favorite_check', CheckIfFavorite.as_view()),
    path('delete_favorite', DeleteFromFavorites.as_view()),
    path('get_favorites', FavoriteList.as_view()),
    path('add_to_climblist', AddToClimbList.as_view()),
    path('climblist', GetClimbList.as_view()),
    path('logascent', LogAscent.as_view()),
    path('get_my_ascents', GetMyAscents.as_view()),
    path('get_ascents', GetAscents.as_view()),
    path('get_number_ascents', GetNumberOfAscents.as_view()),
    path('rankings', Rankings.as_view()),

]