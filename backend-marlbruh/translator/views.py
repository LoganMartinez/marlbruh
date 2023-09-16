from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from translator import serializers
from rest_framework.response import Response
from rest_framework import status
from wrpy import WordReference


class TranslatorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, inLanguage, outLanguage, phrase):
        serializer = serializers.GetTranslationSerializer(
            data={
                "inLanguage": inLanguage,
                "outLanguage": outLanguage,
                "phrase": phrase,
            }
        )
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        wr = WordReference(
            serializer.validated_data["inLanguage"],
            serializer.validated_data["outLanguage"],
        )
        try:
            translation = wr.translate(serializer.validated_data["phrase"])
        except NameError:
            translation = {
                "word": serializer.validated_data["phrase"],
                "from_lang": serializer.validated_data["inLanguage"],
                "to_lang": serializer.validated_data["outLanguage"],
                "url": "",
                "translations": [],
            }
        return Response(translation)
