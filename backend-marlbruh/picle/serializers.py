from rest_framework import serializers
from picle import models
from users.serializers import UserSerializer


class PiclePostSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    likes = UserSerializer(many=True)

    class Meta:
        model = models.PiclePost
        fields = "__all__"


class PicleCommentSerializer(serializers.Serializer):
    originalPost = PiclePostSerializer()

    class Meta:
        model = models.PicleComment
        fields = "__all__"


class PostPiclePostRequest(serializers.Serializer):
    content = serializers.ImageField()
    caption = serializers.CharField()


class PutPiclePostRequest(serializers.Serializer):
    caption = serializers.CharField()
