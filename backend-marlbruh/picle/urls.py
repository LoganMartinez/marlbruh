from django.urls import path
from picle import views

urlpatterns = [
    path("", views.PiclePostView.as_view()),
    path("<int:postId>/", views.TargetPiclePostView.as_view()),
    path("<int:postId>/like/", views.LikePostView.as_view()),
    path("comments/<int:commentId>/like/", views.LikeCommentView.as_view()),
    path("<int:postId>/comments/", views.PicleCommentView.as_view()),
    path("latest/", views.LatestPiclePostView.as_view()),
]
