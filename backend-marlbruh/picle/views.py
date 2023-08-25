from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from picle import serializers
from rest_framework.response import Response
from rest_framework import status
from picle import models
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
import pytz
from users.models import User


class PiclePostView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        posts = models.PiclePost.objects.all()
        serializer = serializers.PiclePostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request):
        if "content" in request.FILES:
            request.data["content"] = request.FILES["content"]
        serializer = serializers.PostPiclePostRequest(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        post = models.PiclePost.objects.create(
            content=serializer.validated_data["content"],
            caption=serializer.validated_data["caption"],
            author=request.user,
            datePosted=datetime.now().replace(tzinfo=pytz.timezone("US/Central")),
        )
        responseSerializer = serializers.PiclePostSerializer(post)
        return Response(responseSerializer.data, status=status.HTTP_201_CREATED)


class TargetPiclePostView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, postId):
        post = get_object_or_404(models.PiclePost, pk=postId)
        if request.user.pk != post.author.pk and not request.user.is_superuser:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = serializers.PutPiclePostRequest(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        post.caption = serializer.validated_data["caption"]
        post.save()
        return Response(status=status.HTTP_200_OK)


class LikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, postId):
        post = get_object_or_404(models.PiclePost, pk=postId)
        if request.user in post.likes.all():
            post.likes.remove(request.user)
        else:
            post.likes.add(request.user)
        return Response(status=status.HTTP_200_OK)


class PicleCommentView(APIView):
    permissions_classes = [IsAuthenticated]

    def post(self, request, postId):
        post = get_object_or_404(models.PiclePost, pk=postId)
        serializer = serializers.PostPicleCommentRequest(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        comment = models.PicleComment.objects.create(
            originalPost=post,
            content=serializer.validated_data["content"],
            author=request.user,
            datePosted=datetime.now().replace(tzinfo=pytz.timezone("US/Central")),
        )
        responseSerializer = serializers.PicleCommentSerializer(comment)
        return Response(responseSerializer.data)

    def get(self, request, postId):
        comments = models.PicleComment.objects.filter(originalPost_id=postId)
        responseSerializer = serializers.PicleCommentSerializer(comments, many=True)
        print(comments)
        return Response(responseSerializer.data)
