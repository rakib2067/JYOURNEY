from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['id','name','username','email','password']
        extra_kwargs={
            'password':{'write_only':True}
        }

    def create(self,validated_data):
        # Extract the password
        password=validated_data.pop('password',None)

        # Passes all the data but the password
        instance=self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
            # Built in Django method to hash our password

        instance.save()
        return instance
        
