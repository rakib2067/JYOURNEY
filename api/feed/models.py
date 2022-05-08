from django.conf import settings
from django.db import models
# Create your models here.

class Post(models.Model):
    title=models.CharField(max_length=255)
    route=models.CharField(max_length=255)
    poster=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    description=models.TextField(blank=True)
    post_date=models.DateField(auto_now_add=True)
    likes=models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='feed_post', blank=True)

    def total_likes(self):
        return self.likes.count()
      
    def __str__(self):
        return f"{self.title} {self.poster}"



class Comment(models.Model):
    title=models.CharField(max_length=255)
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    name=models.CharField(max_length=255)
    body=models.TextField()
    date_added=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} {self.name}"
