from itertools import count
from multiprocessing import context
from urllib import response
from django.forms import ValidationError
from rest_framework import filters
from rest_framework.views import APIView
from .serializers import UserClimbListSerializer, UserFavoritesSerializer, UserFollowingSerializer, UserSerializer
from django.contrib.auth import get_user_model
from .models import ClimbList, Favorite, UserFollowing
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from crags.models import Crag, Route

User = get_user_model()

class UserCreate(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    

class AddFollower(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = self.request.user
        following = User.objects.get(id=request.data.get('following'))
        if (user == following):
            return Response({'status':status.HTTP_400_BAD_REQUEST})

        try:
            UserFollowing.objects.get(follower = user ,following=following)
            return Response({'status':status.HTTP_400_BAD_REQUEST})
        except UserFollowing.DoesNotExist:

            follow = UserFollowing.objects.create(follower=user,
                             following=following)
            UserFollowing.save(follow)
            return Response({'status':status.HTTP_200_OK})

# class AddFollower(generics.CreateAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = UserFollowSerializer
#     def perform_create(self, serializer):
#         queryset = UserFollowing.objects.filter(follower=self.request.user, following = self.request.data.get('following'))
#         if queryset.exists():
#             raise Exception('You have already followed')
#         serializer.save(follower=self.request.user)


class Userfollowings(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserFollowingSerializer
    
    def get_queryset(self):

        # This view should return a list of all the followings
        # for the currently authenticated user.

        user = self.request.user
        queryset = UserFollowing.objects.filter(follower=user)
        count = UserFollowing.objects.filter(follower=user).count()
        print(type(count))
        print(type(queryset))
        return queryset

    def get_context_data(self, **kwargs):
        context = super(Userfollowings, self).get_context_data(**kwargs)
        context['following'] = self.get_queryset.count()
        return context

# class Userfollowings(generics.ListAPIView):
#     model = UserFollowing
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['follower']
#     serializer_class = UserFollowingSerializer

#     def get_queryset(self):

#         # This view should return a list of all the followings
#         # for the currently authenticated user.

#         user = self.request.user
#         queryset = UserFollowing.objects.filter(follower=user)
#         count = UserFollowing.objects.filter(follower=user).count()
#         print(type(count))
#         print(type(queryset))

    
#     def followers(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         count = queryset.annotate(count('follower'))
#         return count

class Userfollowers(generics.ListAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = UserFollowingSerializer

    def get_queryset(self):

        # This view should return a list of all the followers
        # for the currently authenticated user.

        user = self.request.user
        queryset = UserFollowing.objects.filter(following=user)
        return queryset

class AddToFavorites(generics.CreateAPIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self.request.user
        crag = Crag.objects.get(id=request.data.get('crag'))

        try:
            Favorite.objects.get(user = user , crag = crag)
            return Response({'status':status.HTTP_400_BAD_REQUEST})
        except Favorite.DoesNotExist:

            favorite = Favorite.objects.create(user = user , crag = crag)
            Favorite.save(favorite)
            return Response({'status':status.HTTP_200_OK})

class FavoriteList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserFavoritesSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        queryset = Favorite.objects.filter(user=user)
        return queryset

class AddToClimbList(generics.CreateAPIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self.request.user
        route = Route.objects.get(id=request.data.get('route'))

        try:
            ClimbList.objects.get(user = user , route = route)
            return Response({'status':status.HTTP_400_BAD_REQUEST})
        except ClimbList.DoesNotExist:

            list = ClimbList.objects.create(user = user , route = route)
            ClimbList.save(list)
            return Response({'status':status.HTTP_200_OK})

class GetClimbList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserClimbListSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        queryset = ClimbList.objects.filter(user=user)
        return queryset