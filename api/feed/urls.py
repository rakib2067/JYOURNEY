from django.urls import path
from . import views 

urlpatterns = [
    path('', views.get_view, name='posts_list'),
    path('like/<int:id>', views.like_view, name='like_post'),
    path('create',views.create_view,name='create-post'),
    path('delete/<int:id>',views.delete_view,name='delete-post'),
    path('<int:id>', views.get_comments, name='comments_list')
    # path('like/<int:id>', views.like_view, name='like_post'),
    # path('create',views.create_view,name='create-post'),
    # path('delete/<int:id>',views.delete_view,name='delete-post')
]
