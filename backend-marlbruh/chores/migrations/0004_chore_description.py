# Generated by Django 4.2.4 on 2023-08-21 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chores', '0003_chore_complete'),
    ]

    operations = [
        migrations.AddField(
            model_name='chore',
            name='description',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]