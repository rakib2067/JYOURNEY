from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RouteSerializer

from .models import Route
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'All':'/route-list/',
		}
	return Response(api_urls)

@api_view(['GET'])
def routeList(request):
	routes = Route.objects.all().order_by('-id')
	serializer = RouteSerializer(routes, many=True)
	return Response(serializer.data)
