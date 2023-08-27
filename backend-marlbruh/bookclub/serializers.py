from rest_framework import serializers
from bookclub import models


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = "__all__"


class ChapterSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = models.Chapter
        fields = "__all__"


class PostBookSerializer(serializers.Serializer):
    bookfile = serializers.FileField()
