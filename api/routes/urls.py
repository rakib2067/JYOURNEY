from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('route-list/', views.routeList, name="route-list"),
	path('users/', views.userList, name="user"),
	path('users/<int:id>', views.userDetail, name="user-detail"),
]
