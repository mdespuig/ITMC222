"""
URL configuration for ljays project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from ljaysApp import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('registration/', views.registration, name='registration'),
    path('admin-page/', views.admin_page, name='admin_page'),
    path('admin-user/', views.admin_userm, name='admin_user'),
    path('admin-order/', views.admin_order, name='admin_order'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('logout/', views.logout_user, name='logout'),
    path('insert-user/', views.insert_user, name='insert_user'),
    path('user/<int:user_id>/', views.user_detail, name='user_detail'),
    path('profile/', views.user_profile, name='view_profile'),
    path('transactions/', views.transaction_history, name='transaction_history'),
    path('submit-order/', views.submit_order, name='submit_order'),
    path('user_detail/<int:user_id>/', views.user_detail, name='user_detail'),
    path('staff/', views.staff_page, name='staff_page'),
    path('users-json/', views.users_json, name='users_json'),
    path('items-json/', views.items_json, name='items_json'),
]
