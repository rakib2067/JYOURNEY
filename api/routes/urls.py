from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('route-list/', views.routeList, name="route-list"),
	path('user-list/', views.userList, name="user-list"),
]
