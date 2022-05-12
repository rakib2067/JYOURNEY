from rest_framework import serializers

from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['title', 'route', 'description', 'post_url']


class GetPostSerializer(serializers.ModelSerializer):
    poster_name = serializers.CharField(source='poster.username')
    route = serializers.CharField(source='route.route_title')
    likes_count = serializers.IntegerField(
        source='likes.count',
        read_only=True
    )

    class Meta:
        model = Post

        fields = ['title', 'route', 'description',
                  'post_date', 'likes_count', 'poster_name', 'post_url', 'id']


class CommentSerializer(serializers.ModelSerializer):
    poster_name = serializers.CharField(source='name.username')
    likes_count = serializers.IntegerField(
        source='likes.count',
        read_only=True
    )

    class Meta:
        model = Comment
        fields = ['id', 'title', 'body', 'date_added',
                  'post', 'poster_name', 'likes_count']


class CreateCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['title', 'body',  'post']
        # fields = '__all__'
