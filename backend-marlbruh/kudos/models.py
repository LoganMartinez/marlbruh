from django.db import models
from users.models import User


# Create your models here.
class Kudo(models.Model):
    targetUser = models.ForeignKey(User, related_name="kudos", on_delete=models.CASCADE)
    author = models.ForeignKey(
        User, related_name="kudosGiven", on_delete=models.CASCADE
    )
    content = models.TextField()
    likes = models.ManyToManyField(User, related_name="likedKudos")
