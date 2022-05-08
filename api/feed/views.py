from django.shortcuts import  get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from rest_framework.response import Response
from .serializers import PostSerializer

from .models import Post


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def like_view(request,id):
    try:
        account=request.user  
        post=Post.objects.get(pk=id)
        if post.likes.filter(id=account.id).exists():
            post.likes.remove(account)
        else:
            post.likes.add(account)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method=='PUT':
        serializer=PostSerializer(post,data=request.data)
        data={}
        if serializer.is_valid():
            serializer.save()
            data['success']="update succesful"
            return Response(data=data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	
