from users.serializers import PostUserSerializer, GetUserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.db.utils import IntegrityError


class UserCreationView(APIView):
    permissions_classes = [AllowAny]

    def post(self, request):
        serializer = PostUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # should check that username and email aren't already in use
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
    def get(self, request, username):
        return Response("hi")
