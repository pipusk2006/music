# Generated by Django 5.1.6 on 2025-07-06 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music_app', '0003_alter_album_duration_alter_album_tracks_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
