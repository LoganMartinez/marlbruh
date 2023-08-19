from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    profilePic = models.ImageField(blank=True, null=True, upload_to="pfps/")

    def create_user(self, username, password, profilePic=None):
        super().create_user(username=username, password=password)
        if profilePic:
            self.profilePic = profilePic
            self.save()
