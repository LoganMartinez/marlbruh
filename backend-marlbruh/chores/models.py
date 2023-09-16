from django.db import models
from users.models import User


class Chore(models.Model):
    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=20)
    users = models.ManyToManyField(User)
    complete = models.BooleanField(default=False)
    description = models.CharField(blank=True, null=True, max_length=150)
