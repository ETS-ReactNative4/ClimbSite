from django.urls import path
from .views import AddToClimbList, AddToFavorites, FavoriteList, GetClimbList, UserCreate, Userfollowers, Userfollowings, AddFollower

urlpatterns = [
    path('register', UserCreate.as_view()),
    path('followings', Userfollowings.as_view()),
    path('followers', Userfollowers.as_view()),
    path('follow', AddFollower.as_view()),
    path('favorite', AddToFavorites.as_view()),
    path('get_favorites', FavoriteList.as_view()),
    path('add_route', AddToClimbList.as_view()),
    path('climblist', GetClimbList.as_view())
]