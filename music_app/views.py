from django.templatetags.static import static
from music_app.models import Album
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import UserProfile
from django.utils.crypto import get_random_string
from django.contrib import messages
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password, check_password
from .utils.upload_to_s3 import upload_to_s3
from .utils.upload_to_s3 import upload_to_s3
from mutagen.mp3 import MP3
import math


def account_view(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    user = get_object_or_404(UserProfile, id=user_id)
    return render(request, 'music_app/account.html', {'user': user})


from django.conf import settings

def home_view(request):
    albums = Album.objects.all()
    user = None

    if request.session.get('user_id'):
        try:
            user = UserProfile.objects.get(id=request.session['user_id'])
        except UserProfile.DoesNotExist:
            user = None

    for album in albums:
        folder = album.title.replace(' ', '_')

        # ✅ теперь обложка тоже из S3
        album.cover_url = f"{settings.S3_PUBLIC_URL_PREFIX}/{folder}/cover.jpg"

        # ✅ треки из S3
        album.track_data = [
            {
                'name': track.strip(),
                'url': f"{settings.S3_PUBLIC_URL_PREFIX}/{folder}/{track.strip().replace(' ', '_')}.mp3"
            }
            for track in album.get_track_list()
        ]

    return render(request, 'music_app/home.html', {
        'albums': albums,
        'user': user
    })




def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user = UserProfile.objects.get(login=username)
        except UserProfile.DoesNotExist:
            messages.error(request, 'User not found')
            return render(request, 'music_app/login.html')

        if not user.is_verified:
            messages.error(request, 'Email not verified')
            return render(request, 'music_app/login.html')

        if check_password(password, user.password):
            request.session['user_id'] = user.id  # создаём сессию
            return redirect('home')
        else:
            messages.error(request, 'Incorrect password')
            return render(request, 'music_app/login.html')

    return render(request, 'music_app/login.html')

def registration_view(request):
    if request.method == 'POST':
        login = request.POST.get('login')
        email = request.POST.get('email')
        password = request.POST.get('password1')

        if UserProfile.objects.filter(login=login).exists():
            return render(request, 'music_app/registration.html', {'error': 'Login already exists'})
        if UserProfile.objects.filter(email=email).exists():
            return render(request, 'music_app/registration.html', {'error': 'Email already in use'})

        hashed_password = make_password(password)

        user = UserProfile.objects.create(
            login=login,
            email=email,
            password=hashed_password
        )

        code = get_random_string(6, allowed_chars='0123456789')
        request.session['verification_code'] = code
        request.session['registered_user_id'] = user.id

        send_mail(
            subject='Your verification code',
            message=f'Hello {login},\n\nYour verification code is: {code}',
            from_email=None,
            recipient_list=[email],
            fail_silently=False,
        )

        return redirect('verify_email')

    return render(request, 'music_app/registration.html')


def check_login(request):
    login = request.GET.get('login', '')
    exists = UserProfile.objects.filter(login=login).exists()
    return JsonResponse({'exists': exists})


def check_email(request):
    email = request.GET.get('email', '')
    exists = UserProfile.objects.filter(email=email).exists()
    return JsonResponse({'exists': exists})


def verify_email_view(request):
    if request.method == 'POST':
        code_input = request.POST.get('code')
        stored_code = request.session.get('verification_code')
        user_id = request.session.get('registered_user_id')

        if code_input == stored_code:
            user = get_object_or_404(UserProfile, id=user_id)
            user.is_verified = True
            user.save()

            del request.session['verification_code']
            del request.session['registered_user_id']

            return render(request, 'music_app/registration_success.html', {'user': user})
        else:
            messages.error(request, 'Invalid code. Try again.')

    return render(request, 'music_app/verify.html')

from django.http import JsonResponse
from .models import Album, FavoriteAlbum
from django.contrib.auth.decorators import login_required

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # если используешь JS fetch без csrf-token
def toggle_favorite(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return JsonResponse({'error': 'Not authenticated'}, status=403)

    if request.method == "POST":
        album_id = request.POST.get('album_id')
        album = get_object_or_404(Album, id=album_id)
        user = get_object_or_404(UserProfile, id=user_id)

        fav, created = FavoriteAlbum.objects.get_or_create(user=user, album=album)

        if not created:
            fav.delete()
            return JsonResponse({'status': 'removed'})
        return JsonResponse({'status': 'added'})

    return JsonResponse({'error': 'Invalid request'}, status=400)





from .utils.upload_to_s3 import upload_to_s3
from django.conf import settings
from mutagen.mp3 import MP3
from io import BytesIO
import math

def format_duration(seconds):
    """Преобразует секунды в формат MM:SS"""
    minutes = math.floor(seconds // 60)
    secs = math.floor(seconds % 60)
    return f"{minutes}:{secs:02}"

def upload_album_view(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    user = get_object_or_404(UserProfile, id=user_id)

    if request.method == 'POST':
        title = request.POST.get('title')
        artist = request.POST.get('artist')
        description = request.POST.get('description', '')
        total_tracks = int(request.POST.get('total_tracks', 0))

        track_titles = []
        track_durations = []

        folder = title.replace(' ', '_')

        for i in range(total_tracks):
            track_title = request.POST.get(f'track_title_{i}', '').strip()
            mp3_file = request.FILES.get(f'track_file_{i}')

            if track_title and mp3_file:
                track_titles.append(track_title)

                # ✅ Читаем mp3-файл в буфер, чтобы можно было прочитать дважды
                mp3_data = mp3_file.read()
                mp3_buffer = BytesIO(mp3_data)

                # ✅ Определяем длительность
                try:
                    audio = MP3(mp3_buffer)
                    duration_sec = audio.info.length
                    duration_str = format_duration(duration_sec)
                except Exception as e:
                    print(f"❌ Ошибка чтения MP3: {e}")
                    duration_str = "0:00"

                track_durations.append(duration_str)

                # ✅ Перематываем буфер перед загрузкой
                mp3_buffer.seek(0)

                filename = f"{folder}/{track_title.replace(' ', '_')}.mp3"
                upload_to_s3(mp3_buffer, filename)

        # ✅ Сохраняем альбом в базу данных
        album = Album.objects.create(
            title=title,
            artist=artist,
            description=description,
            tracks=", ".join(track_titles),
            duration=", ".join(track_durations),
        )

        # ✅ Обложка
        cover_file = request.FILES.get('cover')
        if cover_file:
            cover_path = f"{folder}/cover.jpg"
            upload_to_s3(cover_file, cover_path)

        return redirect('account')

    return render(request, 'music_app/upload.html')
