# Generated by Django 4.2.4 on 2023-08-28 19:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookclub', '0006_bookclubcomment_author_bookclubcomment_book_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bookclubcomment',
            old_name='higlighted',
            new_name='highlighted',
        ),
    ]