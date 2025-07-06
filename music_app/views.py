from django.templatetags.static import static
from music_app.models import Album  # Явное указание приложения
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import UserProfile
from django.utils.crypto import get_random_string
from django.contrib import messages
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password

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

def login_view(request):
    return render(request, 'login.html')

def registration_view(request):
    return render(request, 'registration.html')


def registration_view(request):
    if request.method == 'POST':
        login = request.POST.get('login')
        email = request.POST.get('email')
        password = request.POST.get('password1')

        # Проверка на уникальность логина и email
        if UserProfile.objects.filter(login=login).exists():
            return render(request, 'registration.html', {'error': 'Login already exists'})
        if UserProfile.objects.filter(email=email).exists():
            return render(request, 'registration.html', {'error': 'Email already in use'})

        # Хешируем пароль перед сохранением
        hashed_password = make_password(password)

        # Создание пользователя
        user = UserProfile.objects.create(
            login=login,
            email=email,
            password=hashed_password
        )

        # Генерация кода подтверждения
        code = get_random_string(6, allowed_chars='0123456789')
        request.session['verification_code'] = code
        request.session['registered_user_id'] = user.id

        # Отправка письма с кодом подтверждения
        send_mail(
            subject='Your verification code',
            message=f'Hello {login},\n\nYour verification code is: {code}',
            from_email='noreply@yourdomain.com',  # ЗАМЕНИ на свою почту
            recipient_list=[email],
            fail_silently=False,
        )

        return redirect('verify_email')

    return render(request, 'registration.html')


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

            # Удалим код из сессии
            del request.session['verification_code']
            del request.session['registered_user_id']

            return render(request, 'registration_success.html', {'user': user})
        else:
            messages.error(request, 'Invalid code. Try again.')

    return render(request, 'verify.html')




