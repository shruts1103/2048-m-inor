from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index, name='home'),
    path('', views.base, name='base'),
    path('index/', views.index, name='home'),
    path('index2/', views.index2, name='index2'),   
    path('basic/', views.basic, name='basic'),

]
