from itertools import count
from multiprocessing import context
from urllib import response
from rest_framework import filters
from rest_framework.views import APIView
from .serializers import UserFollowingSerializer, UserSerializer
from django.contrib.auth import get_user_model
from .models import UserFollowing
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

class UserCreate(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class AddFollower(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):

        user = User.objects.get(id=request.data.get('follower'))
        follow = User.objects.get(id=request.data.get('following'))
        if (user == follow):
            return Response({'status':status.HTTP_400_BAD_REQUEST})

        try:
            UserFollowing.objects.get(follower = user ,following=follow)
            return Response({'status':status.HTTP_400_BAD_REQUEST})
        except UserFollowing.DoesNotExist:

            following = UserFollowing.objects.create(follower=user,
                             following=follow)
            UserFollowing.save(following)
            return Response({'status':status.HTTP_200_OK})


# class Userfollowings(generics.ListAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = UserFollowingSerializer
    
#     def get_queryset(self):

#         """
#         This view should return a list of all the followings
#         for the currently authenticated user.
#         """
#         user = self.request.user
#         queryset = UserFollowing.objects.filter(follower=user)
#         count = UserFollowing.objects.filter(follower=user).count()
#         print(type(count))
#         print(type(queryset))
#         return queryset

#     def get_context_data(self, **kwargs):
#         context = super(Userfollowings, self).get_context_data(**kwargs)
#         context['following'] = self.get_queryset.count()
#         return context

class Userfollowings(generics.ListAPIView):
    model = UserFollowing
    filter_backends = [filters.SearchFilter]
    search_fields = ['follower']
    serializer_class = UserFollowingSerializer

    def get_queryset(self):

        """
        This view should return a list of all the followings
        for the currently authenticated user.
        """
        user = self.request.user
        queryset = UserFollowing.objects.filter(follower=user)
        count = UserFollowing.objects.filter(follower=user).count()
        print(type(count))
        print(type(queryset))

    
    def followers(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        count = queryset.annotate(count('follower'))
        return count

class Userfollowers(generics.ListAPIView):
    
    permission_classes = [IsAuthenticated]
    serializer_class = UserFollowingSerializer

    def get_queryset(self):

        """
        This view should return a list of all the followings
        for the currently authenticated user.
        """
        user = self.request.user
        queryset = UserFollowing.objects.filter(following=user)
        return queryset