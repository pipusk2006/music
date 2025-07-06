from django.templatetags.static import static
from music_app.models import Album
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import UserProfile
from django.utils.crypto import get_random_string
from django.contrib import messages
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password


def account_view(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return redirect('login')

    user = get_object_or_404(UserProfile, id=user_id)
    return render(request, 'music_app/account.html', {'user': user})


def home_view(request):
    albums = Album.objects.all()
    user = None

    if request.session.get('user_id'):
        try:
            user = UserProfile.objects.get(id=request.session['user_id'])
        except UserProfile.DoesNotExist:
            user = None

    for album in albums:
        album.cover_url = static(album.get_cover_path())
        album.track_data = [
            {
                'name': track.strip(),
                'url': static(f'music_app/records/{track.strip().replace(" ", "_")}.mp3')
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






