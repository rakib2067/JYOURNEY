from django.urls import path
from . import views


urlpatterns = [
	path('', views.route_list, name="route-list"),
	path('create', views.create_route, name="create-feed"),
	path('update/<int:id>', views.update_route, name="update-feed"),
	path('delete/<int:id>', views.delete_route, name="delete-feed"),
]
