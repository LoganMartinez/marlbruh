from rest_framework import serializers
from bookclub import models
from users.serializers import UserSerializer


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = "__all__"


class ChapterSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = models.Chapter
        fields = "__all__"


class ChapterNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = "chapterNumber"


class BookclubCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    likes = UserSerializer(many=True)
    chapterNumber = serializers.SerializerMethodField()

    class Meta:
        model = models.BookclubComment()
        fields = "__all__"

    def get_chapterNumber(self, obj):
        return obj.chapter.chapterNumber


class BookclubReplySerializer(serializers.ModelSerializer):
    author = UserSerializer()
    likes = UserSerializer(many=True)

    class Meta:
        model = models.BookclubReply()
        fields = "__all__"


class BookclubUserRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BookUserRelation()
        fields = "__all__"


class PostBookSerializer(serializers.Serializer):
    bookfile = serializers.FileField()


class PostBookclubCommentSerializer(serializers.Serializer):
    passage = serializers.CharField()
    comment = serializers.CharField()
    highlighted = serializers.ListField(child=serializers.CharField())


class PostBookclubReplySerializer(serializers.Serializer):
    content = serializers.CharField()


class PutBookclubUserRelationSerialzier(serializers.Serializer):
    lastChapterComplete = serializers.IntegerField(required=False)
    bookmarkedChapter = serializers.IntegerField(required=False)
    bookmarkedPage = serializers.IntegerField(required=False)

    def validate(self, data):
        if len(data.keys()) == 0:
            raise serializers.ValidationError("Must include at least one field")
        return data
