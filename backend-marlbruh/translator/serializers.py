from rest_framework import serializers
import wrpy


class GetTranslationSerializer(serializers.Serializer):
    inLanguage = serializers.CharField()
    outLanguage = serializers.CharField()
    phrase = serializers.CharField()

    def validate(self, data):
        dictionary = data["inLanguage"] + data["outLanguage"]
        if dictionary not in wrpy.get_available_dicts():
            raise serializers.ValidationError("in or out language not valid")
        return data
