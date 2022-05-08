from django.shortcuts import  get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from rest_framework.response import Response
from .serializers import RouteSerializer, UserSerializer

from .models import Route
from account.models import Account
# Create your views here.

@api_view(['GET'])
def api_overview(request):
	api_urls = {
		'All Routes':'/route/',
		'All Users':'/users/',
		'User Details':'/users/<int:id>',
		'Register':'/register/',
		'Login':'/login/',
		'Logout':'/logout/',
		'CreateRoute':'/route/create'
		}
	return Response(api_urls)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def route_list(request):

	account= request.user

	routes = Route.objects.filter(poster=account).order_by('-id')
	serializer = RouteSerializer(routes, many=True)
	return Response(serializer.data)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_route(request):

	account= request.user
	route=Route(poster=account)
	
	if request.method=='POST':
		serializer=RouteSerializer(route,data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data,status=status.HTTP_201_CREATED)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_route(request,id):
	try:
		account	= request.user
		route=Route.objects.get(pk=id)
	except Route.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)	
	if request.method=='PUT':
		if route.poster != account:
			return Response({'response':'You do not have permission to modify this route!'},status=status.HTTP_403_FORBIDDEN)
		serializer=RouteSerializer(route,data=request.data)
		data={}
		if serializer.is_valid():
			serializer.save()
			data['success']="update succesful"
			return Response(data=data)
		return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)	
	


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_route(request,id):
	try:
		account	= request.user
		route=Route.objects.get(pk=id)
	except Route.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)	
	if request.method=='DELETE':
		if route.poster !=account:
			return Response({'response':"You don't have permission to delete this route!"},status=status.HTTP_403_FORBIDDEN)
		operation= route.delete()
		data={}
		if operation:
			data["success"]="delete successful"
		else:
			data["failure"]="delete failed"
		return Response(data=data)	
		



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_list(request):
	users = Account.objects.all().order_by('-id')
	serializer = UserSerializer(users, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def user_detail(request,id):
	user = get_object_or_404(Account,pk=id)
	serializer = UserSerializer(user, many=False)
	return Response(serializer.data)

