from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from .serializers import UserSerializer
from .models import User

class RegisterView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class LoginView(APIView):
    def post(self,request):
        password=request.data['password']

        if 'username' in request.data :
            username=request.data['username']

            user= User.objects.filter(username=username).first()

            if user is None:
                raise AuthenticationFailed('User not found!') 

            if not user.check_password(password):
                raise AuthenticationFailed('Incorrect Password!')
            
            return Response({'message':'success'})

        else: 
            email=request.data['email']

            user= User.objects.filter(email=email).first()

            if user is None:
                raise AuthenticationFailed('User not found!') 

            if not user.check_password(password):
                raise AuthenticationFailed('Incorrect Password!')

        

            return Response({'message':'success'})

# Create your views here.
