from django.contrib import admin
from chores import models


class ChoreAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]
    search_fields = ["name", "description"]


# Register your models here.
admin.site.register(models.Chore, ChoreAdmin)
