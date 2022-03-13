from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from .models import Ascending, ClimbList, UserFollowing, Favorite


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset= User.objects.all())]
            )
    full_name = serializers.CharField(min_length=2,max_length=32)       
    password = serializers.CharField(min_length=8, write_only=True)
    dob = serializers.DateField()

    def create(self, validated_data):
        user = User.objects.create_user( validated_data['email'],validated_data['full_name'],
             validated_data['password'], validated_data['dob'])
        return user

    class Meta:
        model = User 
        fields = ('id', 'full_name', 'email', 'password','dob')

class UserFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','follower','following')
        model = UserFollowing

class UserClimbListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','user','route')
        model = ClimbList

class UserFavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','user','crag')
        model = Favorite

class AscendingSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','user','route', 'tries','rating','comment','date')
        model = Ascending