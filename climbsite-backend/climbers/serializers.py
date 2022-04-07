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
    
    def create(self, validated_data):
        user = User.objects.create_user( validated_data['email'],validated_data['full_name'],
             validated_data['password'], validated_data['phone_number'] )
        return user

    class Meta:
        model = User 
        fields = ('id', 'full_name', 'email', 'password','profile_pic', 'phone_number')

class UserFollowingSerializer(serializers.ModelSerializer):
    following = UserSerializer(read_only = True)
    follower = UserSerializer(read_only = True)
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

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance

class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    full_name = serializers.CharField(min_length=2,max_length=32)
    class Meta:
        model = User
        fields = ( 'full_name', 'email')
        extra_kwargs = {
            'full_name': {'required': True},
            
        }

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})
        return value


    def update(self, instance, validated_data):
        instance.full_name = validated_data['full_name']
        instance.email = validated_data['email']
        instance.save()
        return instance