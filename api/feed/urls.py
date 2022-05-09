from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_view, name='posts_list'),
    path('like/<int:id>', views.like_view, name='like_post'),
    path('create', views.create_view, name='create-post'),
    path('delete/<int:id>', views.delete_view, name='delete-post'),
    path('<int:id>', views.get_comments, name='comments_list'),
    path('comment', views.post_comment, name='create-comment'),
    path('comment/delete/<int:id>', views.delete_comment, name='delete-comment'),
    path('comment/like/<int:id>', views.like_comment, name='like-comment'),

    # path('like/<int:id>', views.like_view, name='like_post'),
    # path('create',views.create_view,name='create-post'),
    # path('delete/<int:id>',views.delete_view,name='delete-post')
]
