from django.shortcuts import  get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from rest_framework.response import Response
from .serializers import PostSerializer,GetPostSerializer

from .models import Post




@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_view(request):


	posts = Post.objects.all()
	serializer = GetPostSerializer(posts, many=True)
	return Response(serializer.data)




@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_view(request):

    account=request.user
    post=Post(poster=account)

    if request.method=='POST':
        serializer=PostSerializer(post,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    

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
            return Response(data=data,status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

	

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_view(request,id):
    try:
        account=request.user  
        post=Post.objects.get(pk=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method=='DELETE':
        if post.poster !=account:
            return Response({'response':"You don't have permission to delete this post!"},status=status.HTTP_403_FORBIDDEN)
        operation = post.delete()
        data={}
        if operation:
            data['success']="delete succesful"
        else:
            data["failure"]="delete failed"   
        return Response(data=data)	
        

	
