# Generated by Django 4.2.4 on 2023-08-24 02:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('picle', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='piclecomment',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='piclecomment',
            name='likes',
        ),
        migrations.AlterField(
            model_name='piclepost',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='piclepost',
            name='likes',
        ),
        migrations.AddField(
            model_name='piclecomment',
            name='likes',
            field=models.ManyToManyField(related_name='likedComments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='piclepost',
            name='likes',
            field=models.ManyToManyField(related_name='likedPosts', to=settings.AUTH_USER_MODEL),
        ),
    ]
