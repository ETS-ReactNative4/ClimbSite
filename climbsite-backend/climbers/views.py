from rest_framework.views import APIView
from .serializers import UserFollowingSerializer, UserSerializer
from django.contrib.auth import get_user_model
from .models import UserFollowing
from rest_framework import generics
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


User = get_user_model()

class UserCreate(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class Userfollowings(generics.ListAPIView):
    
    # authentication_classes = [JWTAuthentication]
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserFollowingSerializer
    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        queryset = UserFollowing.objects.filter(follower=user)
        return queryset
    