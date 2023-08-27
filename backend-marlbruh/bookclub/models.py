from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=50)
    coverImage = models.ImageField()


class Chapter(models.Model):
    chapterNumber = models.PositiveIntegerField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.TextField()
