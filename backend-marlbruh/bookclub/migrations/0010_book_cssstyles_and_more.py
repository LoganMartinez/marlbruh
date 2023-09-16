# Generated by Django 4.2.4 on 2023-09-15 02:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookclub', '0009_bookuserrelation'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='cssStyles',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='bookuserrelation',
            name='lastChapterComplete',
            field=models.IntegerField(default=-1),
        ),
    ]
