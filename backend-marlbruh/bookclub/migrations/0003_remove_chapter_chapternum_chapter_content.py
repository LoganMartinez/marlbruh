# Generated by Django 4.2.4 on 2023-08-27 21:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookclub', '0002_chapter'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chapter',
            name='chapterNum',
        ),
        migrations.AddField(
            model_name='chapter',
            name='content',
            field=models.TextField(default='junk data'),
            preserve_default=False,
        ),
    ]
