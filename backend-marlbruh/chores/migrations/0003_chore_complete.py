# Generated by Django 4.2.4 on 2023-08-21 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chores', '0002_alter_chore_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='chore',
            name='complete',
            field=models.BooleanField(default=False),
        ),
    ]
