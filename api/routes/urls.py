from django.urls import path
from . import views

from account import views as auth_views

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('route-list/', views.routeList, name="route-list"),
	path('users/', views.userList, name="user"),
	path('users/<int:id>', views.userDetail, name="user-detail"),
	path('register',auth_views.registration_view,name='register'),
	path('login',obtain_auth_token,name='login'),
	path('logout',auth_views.logout_view,name='logout'),

]
