from django.templatetags.static import static
from models import Album
from django.shortcuts import render

def home_view(request):
    albums = Album.objects.all()
    
    # Добавляем полные пути к файлам
    for album in albums:
        album.cover_url = static(album.get_cover_path())
        # Формируем пути к трекам
        album.track_data = [
            {
                'name': track.strip(),
                'url': static(f'music_app/records/{track.strip().replace(" ", "_")}.mp3')
            }
            for track in album.get_track_list()
        ]
    
    return render(request, 'music_app/home.html', {'albums': albums})



