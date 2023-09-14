from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from carpool import serializers, models
from rest_framework.response import Response
from rest_framework import status


class CarpoolUserScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = serializers.PostCarpoolUserScheduleSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # should check for conflicting times for user
        schedule = models.CarpoolUserSchedule.objects.create(
            user=request.user,
            startTime=serializer.validated_data["startTime"],
            endTime=serializer.validated_data["startTime"],
        )
        response = serializers.CarpoolUserScheduleSerializer(schedule)
        return Response(response.data)
