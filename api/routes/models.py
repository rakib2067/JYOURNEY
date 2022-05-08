from django.conf import settings
from django.db import models
from account.models import Account
# Create your models here.

class Route(models.Model):
  starting_latitude = models.DecimalField(max_digits=9, decimal_places=6)
  starting_longitude = models.DecimalField(max_digits=9, decimal_places=6)
  destination_latitude = models.DecimalField(max_digits=9, decimal_places=6)
  destination_longitude = models.DecimalField(max_digits=9, decimal_places=6)
  poster = models.ForeignKey(settings.AUTH_USER_MODEL,null=True,on_delete=models.CASCADE)
  completed=models.BooleanField(default=False)
      
  def __str__(self):
    return f"{self.starting_latitude}({self.starting_longitude})"

