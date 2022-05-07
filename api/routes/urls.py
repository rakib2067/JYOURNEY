from django.urls import path
from . import views
from users.views import RegisterView,LoginView

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('route-list/', views.routeList, name="route-list"),
	path('users/', views.userList, name="user"),
	path('users/<int:id>', views.userDetail, name="user-detail"),
	path('register', RegisterView.as_view(), name="register"),
	path('login', LoginView.as_view(), name="login"),

]
