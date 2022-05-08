from django.shortcuts import  get_object_or_404

from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from rest_framework.response import Response
from .serializers import RouteSerializer, UserSerializer

from .models import Route
from account.models import Account
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'All Routes':'/route-list/',
		'All Users':'/users/',
		'User Details':'/users/<int:id>',
		'Register':'/register/',
		}
	return Response(api_urls)

@api_view(['GET'])
def routeList(request):
	routes = Route.objects.all().order_by('-id')
	serializer = RouteSerializer(routes, many=True)
	return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def userList(request):
	users = Account.objects.all().order_by('-id')
	serializer = UserSerializer(users, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def userDetail(request,id):
	user = get_object_or_404(Account,pk=id)
	serializer = UserSerializer(user, many=False)
	return Response(serializer.data)

