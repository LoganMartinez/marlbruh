from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from chores import models
from chores import serializers
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from users.models import User


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
            return Response(status=status.HTTP_400_BAD_REQUEST)
        users = User.objects.filter(id__in=serializer.validated_data["userIds"])
        chore = models.Chore.objects.create(
            name=serializer.validated_data["name"],
            icon=serializer.validated_data["icon"],
            description=serializer.validated_data.get("description"),
        )
        chore.users.set(users)

        responseSerializer = serializers.ChoreSerializer(chore)
        return Response(
            responseSerializer.data,
            status=status.HTTP_201_CREATED,
        )

    def put(self, request):
        serializer = serializers.PutChoreSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        chores = models.Chore.objects.filter(
            pk__in=serializer.validated_data["choreIds"]
        )
        for chore in chores:
            if "name" in serializer.validated_data:
                chore.name = serializer.validated_data["name"]
            if "icon" in serializer.validated_data:
                chore.icon = serializer.validated_data["icon"]
            if "complete" in serializer.validated_data:
                chore.complete = serializer.validated_data["complete"]
            if "userIds" in serializer.validated_data:
                users = User.objects.filter(id__in=serializer.validated_data["userIds"])
                chore.users.set(users)
            if "description" in serializer.validated_data:
                chore.description = serializer.validated_data["description"]
            chore.save()
        return Response(status=status.HTTP_200_OK)


class TargetChoreView(APIView):
    permissions_classes = [IsAuthenticated]

    def delete(self, request, choreId):
        chore = get_object_or_404(models.Chore, id=choreId)
        chore.delete()
        return Response(status=status.HTTP_200_OK)

    def put(self, request, choreId):
        chore = get_object_or_404(models.Chore, id=choreId)
        serializer = serializers.PutTargetChoreSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if "name" in serializer.validated_data:
            chore.name = serializer.validated_data["name"]
        if "icon" in serializer.validated_data:
            chore.icon = serializer.validated_data["icon"]
        if "complete" in serializer.validated_data:
            chore.complete = serializer.validated_data["complete"]
        if "userIds" in serializer.validated_data:
            users = User.objects.filter(id__in=serializer.validated_data["userIds"])
            chore.users.set(users)
        if "description" in serializer.validated_data:
            chore.description = serializer.validated_data["description"]
        chore.save()
        response = serializers.ChoreSerializer(chore)
        return Response(response.data)
