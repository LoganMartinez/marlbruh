# Generated by Django 4.2.4 on 2023-08-29 00:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bookclub', '0007_rename_higlighted_bookclubcomment_highlighted'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookclubReply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=250)),
                ('datePosted', models.DateTimeField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookclubReplies', to=settings.AUTH_USER_MODEL)),
                ('likes', models.ManyToManyField(related_name='likedReplies', to=settings.AUTH_USER_MODEL)),
                ('originalPost', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='bookclub.bookclubcomment')),
            ],
        ),
    ]