from django.db import models

class Album(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    tracks = models.TextField()  # "Track 1, Track 2"
    duration = models.TextField(blank=True)  # "3:42, 4:15"  ← ОБРАТИТЕ ВНИМАНИЕ: БЕЗ 's'!

    def get_cover_path(self):
        return f"music_app/images/{self.title.replace(' ', '_')}.jpg"

    def get_track_list(self):
        return [t.strip() for t in self.tracks.split(',')]

    def get_durations_list(self):
        return [d.strip() for d in self.duration.split(',')] if self.duration else []  # ← Используем duration (без 's')


