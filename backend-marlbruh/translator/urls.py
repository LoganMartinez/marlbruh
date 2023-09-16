from django.urls import path
from translator import views

urlpatterns = [
    path(
        "translatePhrase/<str:inLanguage>/<str:outLanguage>/<str:phrase>/",
        views.TranslatorView.as_view(),
    ),
]
