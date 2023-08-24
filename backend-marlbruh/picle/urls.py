from django.urls import path
from picle import views

urlpatterns = [
    path("", views.PiclePostView.as_view()),
    path("<int:postId>/", views.TargetPiclePostView.as_view()),
    path("<int:postId>/like/", views.LikePostView.as_view()),
]
