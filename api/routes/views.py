from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RouteSerializer, UserSerializer

from .models import Route
from django.contrib.auth.models import User

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'All Routes':'/route-list/',
		'All Users':'/user-list/',
		}
	return Response(api_urls)

@api_view(['GET'])
def routeList(request):
	routes = Route.objects.all().order_by('-id')
	serializer = RouteSerializer(routes, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def userList(request):
	users = User.objects.all().order_by('-id')
	serializer = UserSerializer(users, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def userDetail(request,id):
	user = User.objects.get(pk=id)
	serializer = UserSerializer(user, many=False)
	return Response(serializer.data)

