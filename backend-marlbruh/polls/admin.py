from django.contrib import admin
from .models import Question, Choice


# allows creation of Choices during creation of a Question
class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3


# this ModelAdmin is optional, allows you to customize the admin view
class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["question_text"]}),
        ("Date information", {"fields": ["pub_date"]}),
    ]
    # fields = ["pub_date", "question_text"]
    inlines = [ChoiceInline]

    # what gets displayed on the page that lists all of the questions (instead of just showing the str())
    list_display = ["question_text", "pub_date", "was_published_recently"]

    list_filter = ["pub_date"]

    search_fields = ["question_text"]


admin.site.register(Question, QuestionAdmin)
