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


class PutChoreSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    icon = serializers.CharField(required=False)
    userId = serializers.IntegerField(required=False)

    def validate(self, data):
        if len(data.keys()) == 0:
            raise serializers.ValidationError("Must include at least one field")
        return data
