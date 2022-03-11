from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics


User = get_user_model()

class UserCreate(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer