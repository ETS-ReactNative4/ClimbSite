from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from .models import Ascending, ClimbList, UserFollowing, Favorite
from crags.serializers import RouteSerializer, SectorSerializer, CragSerializer


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset= User.objects.all())]
            )
    full_name = serializers.CharField(min_length=2,max_length=32)       
    password = serializers.CharField(min_length=8, write_only=True)
    # dob = serializers.DateField()

    def create(self, validated_data):
        user = User.objects.create_user( validated_data['email'],validated_data['full_name'],
             validated_data['password'])
        return user

    class Meta:
        model = User 
        fields = ('id', 'full_name', 'email', 'password')

class UserFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','follower','following')
        model = UserFollowing

class UserClimbListSerializer(serializers.ModelSerializer):
    route = RouteSerializer(read_only=True)
    user = UserSerializer(read_only = True)
    class Meta:
        fields = ('id','user','route')
        model = ClimbList

class UserFavoritesSerializer(serializers.ModelSerializer):
    
    crag = CragSerializer(read_only = True)
    user = UserSerializer(read_only = True)
    class Meta:
        fields = ('id','user','crag')
        model = Favorite

class AscendingSerializer(serializers.ModelSerializer):
    route = RouteSerializer(read_only=True)
    user = UserSerializer(read_only = True)
    class Meta:
        fields = ('id','user','route', 'tries','rating','comment','date')
        model = Ascending