from users.serializers import PostUserSerializer, PutUserSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from users import models


class UserView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        users = models.User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        if "profilePic" in request.FILES:
            request.data["profilePic"] = request.FILES["profilePic"]
        serializer = PostUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            user = models.User.objects.create_user(
                username=serializer.validated_data["username"],
                password=serializer.validated_data["password"],
                profilePic=serializer.validated_data.get("profilePic"),
                profileColor=serializer.validated_data["profileColor"],
            )
        except IntegrityError:
            # username already in use in db
            return Response(status=status.HTTP_409_CONFLICT)

        token = Token.objects.create(user=user)
        response = {"username": user.username, "token": token.key}
        return Response(response, status=status.HTTP_201_CREATED)


class TargetUserView(APIView):
    permission_classes = []
    parser_classes = [JSONParser, FormParser, MultiPartParser]

    def get(self, request, username):
        user = get_object_or_404(models.User, username=username)
        response = {
            "userId": user.pk,
            "username": user.username,
            "dateJoined": user.date_joined,
            "profilePic": user.profilePic.url if user.profilePic else None,
            "profileColor": user.profileColor,
            "isSuperuser": user.is_superuser,
        }
        return Response(response, status=status.HTTP_200_OK)

    # can only change username and password rn
    def put(self, request, username):
        user = get_object_or_404(models.User, username=username)
        if request.user.pk != user.pk and not request.user.is_superuser:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if "profilePic" in request.FILES:
            request.data["profilePic"] = request.FILES["profilePic"]
        serializer = PutUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if "username" in serializer.validated_data:
            user.username = serializer.validated_data["username"]
        if "profilePic" in serializer.validated_data:
            user.profilePic = serializer.validated_data["profilePic"]
        if "profileColor" in serializer.validated_data:
            user.profileColor = serializer.validated_data["profileColor"]
        if "password" in serializer.validated_data:
            user.set_password(serializer.validated_data["password"])
        try:
            user.save()
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, username):
        user = get_object_or_404(models, username=username)
        if request.user.pk != user.pk and not request.user.is_superuser:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        user.delete()
        return Response(status=status.HTTP_200_OK)


class UserViewWithToken(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = {
            "userId": request.user.pk,
            "username": request.user.username,
            "dateJoined": request.user.date_joined,
            "profileColor": request.user.profileColor,
            "profilePic": request.user.profilePic.url
            if request.user.profilePic
            else None,
            "isSuperuser": request.user.is_superuser,
        }
        return Response(response, status=status.HTTP_200_OK)
