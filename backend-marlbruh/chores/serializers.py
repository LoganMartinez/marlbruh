from rest_framework import serializers
from chores.models import Chore
from users.serializers import UserSerializer


class ChoreSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Chore
        fields = "__all__"


class PostChoreSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    icon = serializers.CharField(max_length=20)
    userId = serializers.IntegerField(required=False)
