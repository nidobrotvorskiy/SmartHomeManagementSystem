from django.urls import path
from django.conf.urls import include, url
from . import views

app_name = 'smarthouse'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:id_house>/', views.housesensors, name='housesensors')
]
