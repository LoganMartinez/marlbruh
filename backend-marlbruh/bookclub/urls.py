from django.urls import path
from bookclub import views

urlpatterns = [
    path("", views.BookView.as_view()),
    path("likes/<int:commentId>/", views.LikeBookclubCommentView.as_view()),
    path("likes/reply/<int:replyId>/", views.LikeBookclubReplyView.as_view()),
    path("replies/<int:commentId>/", views.BookclubRepliesView.as_view()),
    path("<int:bookId>/", views.TargetBookView.as_view()),
    # should be removed after migration
    path("<int:bookId>/htmlmigrate/", views.MigrateHtml.as_view()),
    path("<int:bookId>/relations/", views.BookclubUserRelationView.as_view()),
    path("<int:bookId>/comments/", views.BookclubCommentsView.as_view()),
    path(
        "<int:bookId>/chapters/<int:chapterNumber>/", views.TargetChapterView.as_view()
    ),
    path(
        "<int:bookId>/chapters/<int:chapterNumber>/comments/",
        views.BookclubChapterCommentsView.as_view(),
    ),
]
