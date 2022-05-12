from django.urls import path
from . import views as auth_views
from routes import views

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
	path('user/', views.user_detail, name="user-detail"),
	path('user/upload', views.user_upload, name="user-upload"),
	path('register',auth_views.registration_view,name='register'),
	path('login',obtain_auth_token,name='login'),
	path('logout',auth_views.logout_view,name='logout'),
]
