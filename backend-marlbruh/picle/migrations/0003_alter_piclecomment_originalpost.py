# Generated by Django 4.2.4 on 2023-08-28 19:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('picle', '0002_alter_piclecomment_author_remove_piclecomment_likes_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='piclecomment',
            name='originalPost',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='picle.piclepost'),
        ),
    ]
