from django.urls import path
from .views import (
    home_view, login_view, registration_view,
    check_login, check_email, verify_email_view
)

urlpatterns = [
    path('', home_view, name='home'),
    path('login/', login_view, name='login'),
    path('registration/', registration_view, name='registration'),
    path('check_login/', check_login, name='check_login'),
    path('check_email/', check_email, name='check_email'),
    path('verify/', verify_email_view, name='verify_email'),
]



