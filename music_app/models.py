# music_app/models.py

from django.db import models
import os
from django.conf import settings

class Album(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    duration = models.CharField(max_length=10, blank=True)  # например: "52:45"
    tracks = models.TextField(blank=True)  # строка с треками через запятую


    def __str__(self):
        return f"{self.title} — {self.artist}"

    def get_track_list(self):
        return [t.strip() for t in self.tracks.split(',')]

    def get_cover_path(self):
        return f"music_app/images/{self.title.replace(' ', '_')}.jpg"
    
    def cover_exists(self):
        path = os.path.join(settings.STATIC_ROOT, self.get_cover_path())
        return os.path.exists(path)


