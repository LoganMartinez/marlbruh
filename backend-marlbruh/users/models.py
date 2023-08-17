from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    profilePic = models.ImageField(blank=True, null=True, upload_to="pfps/")

    def create(self, username, password, profilePic):
        self.create_user(username=username, password=password)
        if profilePic:
            self.profilePic = profilePic
            self.save()
