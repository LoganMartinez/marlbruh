from django.db import models
from users.models import User


# Create your models here.
class PiclePost(models.Model):
    content = models.ImageField()
    caption = models.CharField(max_length=250)
    author = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name="likedPosts")
    datePosted = models.DateTimeField()


class PicleComment(models.Model):
    originalPost = models.ForeignKey(PiclePost, on_delete=models.CASCADE)
    content = models.TextField(max_length=250)
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name="likedComments")
    datePosted = models.DateTimeField()
