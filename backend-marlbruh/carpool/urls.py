from django.urls import path
from carpool import views

urlpatterns = [path("userSchedule/", views.CarpoolUserScheduleView.as_view())]
