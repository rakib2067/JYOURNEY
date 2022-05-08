from django.urls import path
from . import views 

urlpatterns = [
    path('like/<int:id>', views.like_view, name='like_post')
]
