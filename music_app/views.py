from django.shortcuts import render
from django.templatetags.static import static

def home_view(request):
    albums = [
        {
            "title": "Selected Ambient Works 85–92",
            "artist": "Aphex Twin",
            "cover": "music_app/images/Selected_Ambient_Works_85-92.jpg",
            "description": "Легендарный дебютный альбом Ричарда Джеймса...",
            "tracks": [
                {"title": "Xtal", "artist": "Aphex Twin", "url": "music_app/records/Xtal.mp3", "duration": "4:51"},
                {"title": "Tha", "artist": "Aphex Twin", "url": "music_app/records/Tha.mp3", "duration": "9:01"},
                {"title": "Pulsewidth", "artist": "Aphex Twin", "url": "music_app/records/Pulsewidth.mp3", "duration": "3:47"},
            ]
        }
    ]
    return render(request, 'music_app/home.html', {"albums": albums})


