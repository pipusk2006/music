from django.urls import path
from .views import (
    home_view, login_view, registration_view,
    check_login, check_email, verify_email_view, account_view, 
    toggle_favorite,
)
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', home_view, name='home'),
    path('login/', login_view, name='login'),
    path('registration/', registration_view, name='registration'),
    path('check_login/', check_login, name='check_login'),
    path('check_email/', check_email, name='check_email'),
    path('verify/', verify_email_view, name='verify_email'),
    path('account/', account_view, name='account'),
    path('toggle_favorite/', toggle_favorite, name='toggle_favorite'),
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
]

