from django.db import models

# Create your models here.

class Route(models.Model):
  latitude = models.DecimalField(max_digits=9, decimal_places=6)
  longitude = models.DecimalField(max_digits=9, decimal_places=6)
      
  def __str__(self):
    return f"{self.latitude}({self.longitude})"
