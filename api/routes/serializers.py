from account.models import Account

from rest_framework import serializers
from .models import Route

class RouteSerializer(serializers.ModelSerializer):
	class Meta:
		model = Route
		fields ='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'email','username']