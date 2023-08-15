from rest_framework import serializers


class PostUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()


class GetUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)

    def validate(self, data):
        if not data:
            raise serializers.ValidationError("Must include at least one field")
        return data
