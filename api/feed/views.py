from django.shortcuts import  get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from rest_framework.response import Response
from .serializers import PostSerializer,GetPostSerializer,CommentSerializer,CreateCommentSerializer

from .models import Post,Comment


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
        

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_comments(request, id):
    try:
        post = get_object_or_404(Post, id=id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        comments = Comment.objects.filter(post=post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def post_comment(request):

    account = request.user
    comment = Comment(name=account)

    if request.method == 'POST':
        serializer = CreateCommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_comment(request, id):

    try:
        account = request.user
        comment = Comment.objects.get(pk=id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        if comment.name != account:
            return Response({'response': "You don't have permission to delete this comment!"}, status=status.HTTP_403_FORBIDDEN)
        operation = comment.delete()
        data = {}
        if operation:
            data['success'] = "delete succesful"
        else:
            data["failure"] = "delete failed"
        return Response(data=data)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def like_comment(request, id):
    try:
        account = request.user
        comment = Comment.objects.get(pk=id)
        if comment.likes.filter(id=account.id).exists():
            comment.likes.remove(account)
        else:
            comment.likes.add(account)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    comment.save()
    return Response(status=status.HTTP_204_NO_CONTENT)
