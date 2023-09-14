from django.db import models
from users.models import User


class CarpoolUserSchedule(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()


class Car(models.Model):
    driver = models.ForeignKey(
        User, related_name="carsDriven", on_delete=models.CASCADE
    )
    passengers = models.ManyToManyField(User, related_name="carsRidden")
    startTime = models.DateTimeField()
    endtime = models.DateTimeField()
