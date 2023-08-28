from django.urls import path
from bookclub import views

urlpatterns = [
    path("", views.BookView.as_view()),
    path("likes/<int:commentId>/", views.LikeBookclubCommentView.as_view()),
    path("<int:bookId>/", views.TargetBookView.as_view()),
    path(
        "<int:bookId>/chapters/<int:chapterNumber>/", views.TargetChapterView.as_view()
    ),
    path(
        "<int:bookId>/chapters/<int:chapterNumber>/comments/",
        views.BookclubCommentsView.as_view(),
    ),
]
