from rest_framework import serializers

from .models import Post

class PostSerializer(serializers.ModelSerializer):
    poster_name = serializers.CharField(source='poster.username')
    likes_count = serializers.IntegerField(
    source='likes.count', 
    read_only=True
)
    class Meta:
        model=Post

        fields=['title','route','description','post_date','likes_count','poster_name']
    
