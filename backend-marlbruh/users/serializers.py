from rest_framework import serializers


class PostUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    profilePic = serializers.ImageField(required=False)


class PutUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    profilePic = serializers.ImageField(required=False)

    def validate(self, data):
        if len(data.keys()) == 0:
            raise serializers.ValidationError("Must include at least one field")
        return data
