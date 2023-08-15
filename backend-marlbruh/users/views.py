from users.serializers import PostUserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.views import obtain_auth_token


class UserCreationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PostUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(
                username=serializer.validated_data["username"],
                email=serializer.validated_data["email"],
                password=serializer.validated_data["password"],
            )
        except IntegrityError:
            # username or email already in use in db
            return Response(status=status.HTTP_409_CONFLICT)

        token = Token.objects.create(user=user)
        response = {"username": user.username, "token": token.key}
        return Response(response, status=status.HTTP_201_CREATED)


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        response = {
            "user_id": user.pk,
            "username": user.username,
            "email": user.email,
            "date_joined": user.date_joined,
        }
        return Response(response, status=status.HTTP_200_OK)
