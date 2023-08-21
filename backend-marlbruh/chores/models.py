from django.db import models
from users.models import User


class Chore(models.Model):
    name = models.CharField(max_length=50)
    icon = models.CharField(max_length=20)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)
