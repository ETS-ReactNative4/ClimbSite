from itertools import count
import json
from django.db.models import Subquery
from multiprocessing import context
from django.forms import ValidationError
from django.http import HttpResponse, JsonResponse
from rest_framework import filters
from rest_framework.views import APIView
from .serializers import AscendingSerializer, UserClimbListSerializer, UserFavoritesSerializer, UserFollowingSerializer, UserSerializer
from django.contrib.auth import get_user_model
from .models import Ascending, ClimbList, Favorite, UserFollowing
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from crags.models import Crag, Route
from django.db.models import Count, Sum
from django.core import serializers


User = get_user_model()

class UserCreate(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetUserInfo(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = User.objects.filter(email=user)
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
        # count = UserFollowing.objects.filter(follower=user).count()
        # print(type(count))
        # print(type(queryset))
        return queryset
    # def get_context_data(self, **kwargs):
    #     context = super(Userfollowings, self).get_context_data(**kwargs)
    #     context['following'] = self.get_queryset.count()
    #     return context

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
        user = self.request.user
        # queryset= super().get_queryset().filter(user = user).filter(user = UserFollowing.objects.filter(follower= user).values_list('id'))
        # return queryset
        #         sub =UserFollowing.objects.filter(follower= user).values_list('id')
        # queryset = Ascending.objects.filter(user = user).filter(user = sub)
        # return queryset
        # queryset = Ascending.objects.filter(user__following__follower= user)
        queryset = Ascending.objects.filter(user=user)
        # queryset = Ascending.objects.all()
        return queryset

class GetAscents(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AscendingSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Ascending.objects.filter(user__following__follower= user)
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
    

# customers = Customer.objects.annotate(order_count=Count('order'), order_value_sum=Sum('order__value'))


# for customer in customers:
#     print(customer.name, customer.order_count, customer.order_value_sum)
    def get(self, request, *args, **kwargs):
        result = {}
        # queryset = Ascending.objects.values('user')
        # queryset = User.objects.annotate(Count('climber'))
        # queryset = User.objects.annotate(asc_count=Count('climber'),route_sum=Sum('climber__route_id'))
        # print(queryset.values_list('climber__user__full_name','asc_count','route_sum'))
        # # queryset = queryset.values_list('climber__user__full_name','climber__count')
        # # for user in queryset:
        # #     print(user.full_name, user.asc_count, user.routes_sum)
        # return queryset
        # queryset = User.objects.raw('SELECT climbers_user.id,climbers_user.full_name, COUNT(climbers_ascending.id) as coun FROM `climbers_ascending` ,climbers_user WHERE climbers_ascending.user_id=climbers_user.id GROUP BY climbers_ascending.user_id ORDER BY coun; ')
        # print(list(queryset))
        # return HttpResponse(queryset, content_type='application/json')
        # return  JsonResponse({'data': queryset})
        # for p in queryset:
        #     print(p.full_name , p.coun)
        queryset = User.objects.annotate(asc_count=Count('climber')).order_by('-asc_count')
        for user in queryset:
            result[user.full_name] = user.asc_count
        # print(list(queryset))
        print(result)
        array_result = [{'user' : i, 'ascents' : result[i]} for i in result]
        return Response({'result':array_result})

# dictionary = {'Apple': 3, 'Grapes': 1}
# array = [ {'key' : i, 'value' : dictionary[i]} for i in dictionary]
# print(json.dumps(array))