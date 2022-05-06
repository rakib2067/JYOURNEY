from django.db import models

# Create your models here.

class Task(models.Model):
  id = models.CharField(max_length=200)
  username = models.BooleanField(default=False, blank=True, null=True)
      
  def __str__(self):
    return self.title
