from django.db import models
from users.models import User


class Book(models.Model):
    title = models.CharField(max_length=50)
    coverImage = models.ImageField()


class Chapter(models.Model):
    chapterNumber = models.PositiveIntegerField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.TextField()


class BookclubComment(models.Model):
    passage = models.TextField()
    comment = models.CharField(max_length=250)
    highlighted = models.TextField()
    author = models.ForeignKey(
        User, related_name="bookclubComments", on_delete=models.CASCADE
    )
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name="likedBookclubComments")
