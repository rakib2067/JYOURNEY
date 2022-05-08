from django.urls import path
from . import views

from account import views as auth_views

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
	path('', views.api_overview, name="api-overview"),
	path('route/', views.route_list, name="route-list"),
	path('route/create', views.create_route, name="create-route"),
	path('users/', views.user_list, name="user"),
	path('users/<int:id>', views.user_detail, name="user-detail"),
	path('register',auth_views.registration_view,name='register'),
	path('login',obtain_auth_token,name='login'),
	path('logout',auth_views.logout_view,name='logout'),

]
