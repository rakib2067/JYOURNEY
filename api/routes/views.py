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
		return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)


	



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

