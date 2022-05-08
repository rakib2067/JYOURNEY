from rest_framework import serializers

from .models import Account

class RegistrationSerializer(serializers.ModelSerializer):

    confirmed_password= serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model=Account
        fields=['email','username','password','confirmed_password'] 

        extra_kwargs={
            'password':{'write_only':True}
        }

    # Check both passwords match
    # Validated data will only be passed if we do is_valid in views
    def save(self):
        account=Account(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )
        password=self.validated_data['password']
        confirmed_password=self.validated_data['confirmed_password']

        if password != confirmed_password:
            raise serializers.ValidationError({'password':'Passwords do not match!'})
        
        # Upon confirming data is valid, we set password field and save to db
        account.set_password(password)
        account.save()

        return account