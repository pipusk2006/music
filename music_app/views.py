from django.shortcuts import render
from .models import Album

def home_view(request):
    albums = Album.objects.all()
    return render(request, 'music_app/home.html', {'albums': albums})



