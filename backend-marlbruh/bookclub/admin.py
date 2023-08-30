from django.contrib import admin
from bookclub import models

# Register your models here.
admin.site.register(models.Book)
admin.site.register(models.Chapter)
