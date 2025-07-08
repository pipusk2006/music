from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    login = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    last_login = models.DateTimeField(null=True, blank=True)
    fav_albums = models.ManyToManyField('Album', blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.login


class Album(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    tracks = models.TextField()  # "Track 1, Track 2"
    duration = models.TextField(blank=True)  # "3:42, 4:15"

    def get_cover_path(self):
        return f"music_app/images/{self.title.replace(' ', '_')}.jpg"

    def get_track_list(self):
        return [t.strip() for t in self.tracks.split(',')]

    def get_durations_list(self):
        return [d.strip() for d in self.duration.split(',')] if self.duration else []

    def get_s3_track_urls(self):
        base_url = "https://s3.timeweb.cloud/2cc4fb86-neobinaural"
        folder = self.title.replace(" ", "_")
        return [
            f"{base_url}/{folder}/{track.strip().replace(' ', '_')}.mp3"
            for track in self.get_track_list()
        ]


class FavoriteAlbum(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'album')






