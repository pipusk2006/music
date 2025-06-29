from django.shortcuts import render
from django.templatetags.static import static

def home_view(request):
    album_cover = static('music_app/images/Selected_Ambient_Works_85-92.jpg')

    tracks = [
        {"title": "Xtal", "artist": "Aphex Twin", "url": static("music_app/records/Xtal.mp3"), "duration": "4:51"},
        {"title": "Tha", "artist": "Aphex Twin", "url": static("music_app/records/Tha.mp3"), "duration": "9:01"},
        {"title": "Pulsewidth", "artist": "Aphex Twin", "url": static("music_app/records/Pulsewidth.mp3"), "duration": "3:47"},
        # Добавь остальные треки здесь
    ]

    return render(request, 'music_app/home.html', {
        'tracks': tracks,
        'album_cover_url': album_cover,
    })

