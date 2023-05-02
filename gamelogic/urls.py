from django.urls import path
from . import views

urlpatterns = [
   
    path('', views.signup, name='signup'),
    path('base/', views.base, name='base'),
    path('index/', views.index, name='home'),
    path('index2/', views.index2, name='index2'),   
    path('basic/', views.basic, name='basic')

]
