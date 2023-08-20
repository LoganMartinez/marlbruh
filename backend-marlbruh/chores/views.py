from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from chores import models
from chores import serializers
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from users.models import User
from users.serializers import UserSerializer


# Create your views here.
class ChoreView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chores = models.Chore.objects.all()
        serializer = serializers.ChoreSerializer(chores, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = serializers.PostChoreSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_404_NOT_FOUND)
        user = (
            get_object_or_404(User, pk=serializer.validated_data["userId"])
            if "userId" in serializer.validated_data
            else None
        )
        chore = models.Chore.objects.create(
            name=serializer.validated_data["name"],
            icon=serializer.validated_data["icon"],
            user=user,
        )
        responseSerializer = serializers.ChoreSerializer(chore)
        return Response(
            responseSerializer.data,
            status=status.HTTP_201_CREATED,
        )


class TargetChoreView(APIView):
    permissions_classes = [IsAuthenticated]

    def delete(self, request, choreId):
        chore = get_object_or_404(models.Chore, id=choreId)
        chore.delete()
        return Response(status=status.HTTP_200_OK)
