from rest_framework import serializers
from carpool import models
from users.serializers import UserSerializer


class CarpoolUserScheduleSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = models.CarpoolUserSchedule
        fields = "__all__"


class PostCarpoolUserScheduleSerializer(serializers.Serializer):
    startTime = serializers.DateTimeField()
    endTime = serializers.DateTimeField()

    def validate(self, data):
        if data["startTime"] >= data["endTime"]:
            raise serializers.ValidationError("start time must be before end time")
        if data["startTime"].date() != data["endTime"].date():
            raise serializers.ValidationError(
                "start time and end time must be on the same day"
            )
        return data
