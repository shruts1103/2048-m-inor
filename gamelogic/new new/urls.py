from django.urls import path
from . import views

urlpatterns = [
   
    path('', views.signup, name='signup'),
    path('base/', views.base, name='base'),
    path('index/', views.index, name='home'),
    path('index2/', views.index2, name='index2'),   
    path('basic/', views.basic, name='basic'),

    path('fivebasic/', views.fivebasic, name='basic'),
    path('fivebasic2/', views.fivebasic2, name='basic'),
    path('fiveindex/', views.fiveindex, name='basic'),
    path('fiveindex2/', views.fiveindex2, name='basic'),


    path('basic2/', views.basic, name='basic2')

]
