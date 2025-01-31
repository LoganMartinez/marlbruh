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
        page_number_str = request.GET.get("page", "0")
        try:
            page_number = int(page_number_str)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        page_size = request.GET.get("page-size", 6)
        posts = list(models.PiclePost.objects.all())
        posts.reverse()
        posts_page = posts[
            page_number * page_size : page_number * page_size + page_size
        ]
        serializer = serializers.PiclePostSerializer(posts_page, many=True)
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


class LikeCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, commentId):
        comment = get_object_or_404(models.PicleComment, pk=commentId)
        if request.user in comment.likes.all():
            comment.likes.remove(request.user)
        else:
            comment.likes.add(request.user)
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
        return Response(responseSerializer.data)


class LatestPiclePostView(APIView):
    permissions_classes = [IsAuthenticated]

    def get(self, request):
        mostRecent = models.PiclePost.objects.latest("id")
        response = serializers.PiclePostSerializer(mostRecent)
        return Response(response.data)
