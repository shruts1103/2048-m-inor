from django.urls import path
from . import views

urlpatterns = [
   
    path('', views.index, name='signup'),
    path('base/', views.base, name='base'),
    path('index1/', views.index1, name='home'),
    path('index2/', views.index2, name='index2'),   
    path('basic/', views.basic, name='basic')

]
