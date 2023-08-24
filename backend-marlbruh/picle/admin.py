from django.contrib import admin
from picle import models


class PicleAdmin(admin.ModelAdmin):
    list_display = ["content", "caption", "author", "datePosted"]
    search_fields = ["caption"]


admin.site.register(models.PiclePost, PicleAdmin)
