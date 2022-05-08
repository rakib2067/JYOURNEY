from django.urls import path
from . import views


urlpatterns = [
	path('', views.api_overview, name="api-overview"),
	path('route/', views.route_list, name="route-list"),
	path('route/create', views.create_route, name="create-route"),
	path('route/update/<int:id>', views.update_route, name="update-route"),
	path('route/delete/<int:id>', views.delete_route, name="delete-route"),
]
