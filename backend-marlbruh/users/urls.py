from rest_framework.authtoken.views import obtain_auth_token
from users import views
from django.urls import path

urlpatterns = [
    path("", views.UserCreationView.as_view()),
    path("<str:username>/", views.UserView.as_view()),
    path("api-token-auth/", obtain_auth_token),
]
