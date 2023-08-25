from rest_framework import serializers
from picle import models
from users.serializers import UserSerializer


class PiclePostSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    likes = UserSerializer(many=True)

    class Meta:
        model = models.PiclePost
        fields = "__all__"


class PicleCommentSerializer(serializers.ModelSerializer):
    originalPostId = serializers.SerializerMethodField()
    author = UserSerializer()
    likes = UserSerializer(many=True)

    class Meta:
        model = models.PicleComment
        fields = ["id", "author", "likes", "content", "datePosted", "originalPostId"]

    def get_originalPostId(self, obj):
        return obj.id


class PostPiclePostRequest(serializers.Serializer):
    content = serializers.ImageField()
    caption = serializers.CharField()


class PutPiclePostRequest(serializers.Serializer):
    caption = serializers.CharField()


class PostPicleCommentRequest(serializers.Serializer):
    content = serializers.CharField()


class PutPicleCommentRequest(serializers.Serializer):
    content = serializers.CharField()
