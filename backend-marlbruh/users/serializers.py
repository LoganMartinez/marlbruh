from rest_framework import serializers


class PostUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class PutUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    password = serializers.CharField(required=False)

    def validate(self, data):
        if "username" not in data and "password" not in data:
            raise serializers.ValidationError("Must include at least one field")
        return data
