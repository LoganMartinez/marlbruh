from django.db import models
from users.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Book(models.Model):
    title = models.CharField(max_length=50)
    coverImage = models.ImageField()
    cssStyles = models.TextField()


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


class BookclubReply(models.Model):
    originalPost = models.ForeignKey(
        BookclubComment, related_name="replies", on_delete=models.CASCADE
    )
    content = models.CharField(max_length=250)
    author = models.ForeignKey(
        User, related_name="bookclubReplies", on_delete=models.CASCADE
    )
    likes = models.ManyToManyField(User, related_name="likedReplies")
    datePosted = models.DateTimeField()


class BookUserRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    lastChapterComplete = models.IntegerField(default=-1)
    bookmarkedChapter = models.IntegerField(default=-1)
    bookmarkedPage = models.FloatField(
        default=0.0, validators=[MinValueValidator(0.0), MaxValueValidator(1.0)]
    )
