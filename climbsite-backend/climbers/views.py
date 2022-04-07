import base64
from itertools import count
import json
from django.db.models import Subquery
from multiprocessing import context
from django.forms import ValidationError
from django.http import HttpResponse, JsonResponse
from rest_framework import filters
from rest_framework.views import APIView
from .serializers import AscendingSerializer, ChangePasswordSerializer, ProfileSerializer, UpdateUserSerializer, UserClimbListSerializer, UserFavoritesSerializer, UserFollowingSerializer, UserSerializer
from django.contrib.auth import get_user_model
from .models import Ascending, ClimbList, Favorite, UserFollowing
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from crags.models import Crag, Route
from django.db.models import Count, Sum
from django.core import serializers
from  django.core.files.base import ContentFile
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework import viewsets

User = get_user_model()

class UserCreate(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateProfileView(generics.UpdateAPIView):

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer

class ChangePasswordView(generics.UpdateAPIView):

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

class GetUserInfo(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = User.objects.filter(email=user)
        return queryset

class UpdateUserProfile(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = (MultiPartParser, JSONParser)

    # def post(self, request):


    #     user = self.request.user
    #     image = request.data.get('image')
      
    #     try:
    #         format, imgstr = image.split(';base64,') 
    #         ext = format.split('/')[-1] 
    #         print(ext)
    #         # print(base64.b64decode(imgstr))
    #         image_file = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
    #         # print(base64.b64decode(imgstr))
    #         # # image_file = ContentFile(base64.b64decode(image),)
    #         # print(base64.b64decode(image))
    #         edit_profile = User.objects.filter(email=user)
    #         edit_profile.update(profile_pic = image_file)
           
   
        
    #         return Response({'status':status.HTTP_200_OK, 'message':'image changed'})

    #     except Exception as ex:
    #         raise ex
            

class GetOthersInfo(generics.ListAPIView):
    serializer_class = UserSerializer


    def get_queryset(self):
        user =  User.objects.get(id= self.request.query_params.get('user_id'))
        queryset = User.objects.filter(email= user)
        return queryset

class GetUsers(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def get_queryset(self):
        user = self.request.user
        queryset = User.objects.exclude(email=user)
        return queryset
    
class AddFollower(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = self.request.user
        following = User.objects.get(id=request.data.get('following'))
        if (user == following):
            return Response({'status':status.HTTP_400_BAD_REQUEST})

        try:
            UserFollowing.objects.get(follower = user ,following=following)
            follow = UserFollowing.objects.filter(follower=user,following=following)
            follow.delete()
            return Response({'status':status.HTTP_200_OK, 'message':'unfollowed'})

        except UserFollowing.DoesNotExist:
            follow = UserFollowing.objects.create(follower=user,
                             following=following)
            UserFollowing.save(follow)
            return Response({'status':status.HTTP_200_OK, 'message':'followed'})

class Unfollow(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = self.request.user
        following = User.objects.get(id=request.data.get('following'))

        try:
            UserFollowing.objects.get(follower = user ,following=following)
            follow = UserFollowing.objects.filter(follower=user,following=following)
            follow.delete()
            return Response({'status':status.HTTP_200_OK})

        except UserFollowing.DoesNotExist:
            return Response({'status':status.HTTP_400_BAD_REQUEST})


class Userfollowings(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserFollowingSerializer

    def get_queryset(self):

        # This view should return a list of all the followings
        # for the currently authenticated user.
        if self.request.query_params.get('user_id') == None:
            user = self.request.user
            queryset = UserFollowing.objects.filter(follower=user)
            return queryset

        else:
            user =  self.request.query_params.get('user_id')
            queryset = UserFollowing.objects.filter(follower=user)
            return queryset

class Userfollowers(generics.ListAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = UserFollowingSerializer

    def get_queryset(self):
        
        if self.request.query_params.get('user_id') == None:
            user = self.request.user
            queryset = UserFollowing.objects.filter(following=user)
            return queryset
        # This view should return a list of all the followers
        # for the currently authenticated user.

        else:
            user =  self.request.query_params.get('user_id')
            queryset = UserFollowing.objects.filter(following=user)
            return queryset


class UserNonfollowings(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):

        user = self.request.user
        
        queryset = User.objects.exclude(user__in=(User.objects.filter(follower=user.id)))

        return queryset

class CheckIfFollowing(generics.CreateAPIView):

    permission_classes = [IsAuthenticated]


    def get(self, request, *args, **kwargs):
        user = self.request.user
        other = User.objects.get(id= self.request.query_params.get('other_id'))

        try:
            UserFollowing.objects.get(follower = user , following = other)
            return Response({'message': 'following'})
        except UserFollowing.DoesNotExist:
            return Response({'message':"not following"})



class AddToFavorites(generics.CreateAPIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self.request.user
        crag = Crag.objects.get(id=request.data.get('crag'))

        try:
            Favorite.objects.get(user = user , crag = crag)
            favorite = Favorite.objects.filter(user = user , crag = crag)
            favorite.delete()
            return Response({'status':status.HTTP_200_OK,'message':'unfavorite'})
          
        except Favorite.DoesNotExist:

            favorite = Favorite.objects.create(user = user , crag = crag)
            Favorite.save(favorite)
            return Response({'status':status.HTTP_200_OK,'message':'favorite'})


class CheckIfFavorite(generics.CreateAPIView):

    permission_classes = [IsAuthenticated]


    def get(self, request, *args, **kwargs):
        user = self.request.user
        crag = Crag.objects.get(id= self.request.query_params.get('crag_id'))

        try:
            Favorite.objects.get(user = user , crag = crag)
            return Response({'message': 'is favorite'})
        except Favorite.DoesNotExist:
            return Response({'message':"not favorite"})

class DeleteFromFavorites(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = self.request.user
        crag = Crag.objects.get(id=request.data.get('crag'))

        try:
            Favorite.objects.get(user = user , crag = crag)
            favorite = Favorite.objects.filter(user = user , crag = crag)
            favorite.delete()
            return Response({'status':status.HTTP_200_OK})

        except Favorite.DoesNotExist:
            return Response({'status':status.HTTP_400_BAD_REQUEST})


class FavoriteList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserFavoritesSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Favorite.objects.filter(user=user)
        return queryset

class AddToClimbList(generics.CreateAPIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self.request.user
        route = Route.objects.get(id=request.data.get('route'))
        try:
            if (Ascending.objects.get(user = user , route = route)):

                return Response({'status':status.HTTP_400_BAD_REQUEST,'message':'already climbed'})
        except:

            try:
                ClimbList.objects.get(user = user , route = route)
                return Response({'status':status.HTTP_400_BAD_REQUEST,'message':'already in list'})
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

class LogAscent(generics.CreateAPIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = self.request.user
        route = Route.objects.get(id=request.data.get('route'))
        tries = request.data.get('tries')
        rating = request.data.get('rating')
        comment = request.data.get('comment')


        try:
            Ascending.objects.get(user = user , route = route)
            return Response({'status':status.HTTP_400_BAD_REQUEST,'message':'already climbed'})
        except Ascending.DoesNotExist:

            ascent = Ascending.objects.create(user = user , route = route,
            tries = tries, rating = rating, comment=comment)
            Ascending.save(ascent)
            if (ClimbList.objects.filter(route=route)):
                route_inlist = ClimbList.objects.filter(route=route)
                route_inlist.delete()

            return Response({'status':status.HTTP_200_OK})

class GetMyAscents(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AscendingSerializer


    def get_queryset(self):
        

        if self.request.query_params.get('user_id') == None:
            user = self.request.user
            queryset = Ascending.objects.filter(user=user).order_by('-date')
            return queryset
        else:
            user =  self.request.query_params.get('user_id')
            queryset = Ascending.objects.filter(user=user).order_by('-date')
            return queryset


class GetAscents(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AscendingSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Ascending.objects.filter(user__following__follower= user).order_by('-date')
        return queryset

class GetNumberOfAscents(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AscendingSerializer

    def list(self, request, *args, **kwargs):
        user=self.request.user
        queryset = Ascending.objects.filter(user=user)
        Ascending_counts = queryset.count()
        return Response({'ascents':Ascending_counts})


class Rankings(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        result = {}

        queryset = User.objects.annotate(asc_count=Count('climber')).order_by('-asc_count')
        for user in queryset:
            result[user.full_name] = user.asc_count
  
        print(result)
        array_result = [{'user' : i, 'ascents' : result[i]} for i in result]
        return Response({'result':array_result})

