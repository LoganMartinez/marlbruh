from django.contrib import admin
from chores import models


class ChoreAdmin(admin.ModelAdmin):
    list_display = ["name", "user"]
    search_fields = ["name"]
    list_filter = ["user"]


# Register your models here.
admin.site.register(models.Chore, ChoreAdmin)
