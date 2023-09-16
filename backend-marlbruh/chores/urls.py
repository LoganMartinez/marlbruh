from chores import views
from django.urls import path

urlpatterns = [
    path("", views.ChoreView.as_view()),
    path("<int:choreId>/", views.TargetChoreView.as_view()),
]
