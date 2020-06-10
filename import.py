import csv,sys,os
import os
from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from django.db.models import F
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
import json
from django.apps import apps
from django import template
from django.utils import timezone
dir_path = os.path.dirname(os.path.realpath(__file__))
dir_path += '/kursovaya'
project_dir = dir_path
sys.path.append(project_dir)
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'
import django
django.setup()
from smarthouse.models import SmartHouseHUB, SensorHUB, WeatherSensorLink, WeatherOutDoors
from smarthouse.weaterAPI import city_id
import requests



SmartHouseHUB.objects.all().delete()
SensorHUB.objects.all().delete()

house = SmartHouseHUB()
house.HouseName = 'Flat'
house.Adress = 'Moscow, Shabolovskaya, 26'
house.Country = 'Russia'
house.TimeCreated = timezone.now()
house.save()

sensor = SensorHUB()
sensor.SensorName = 'A001WeatherHome'
sensor.TimeCreated = timezone.now()
sensor.CheckData = timezone.now()
sensor.IsActive = 1
sensor.save()

weatherSensor = WeatherSensorLink()
weatherSensor.HouseID = SmartHouseHUB.objects.all()[0]
weatherSensor.SensorId = SensorHUB.objects.all()[0]
weatherSensor.humidityData = 70.5
weatherSensor.temperatureData = 29
weatherSensor.timeRecieved = timezone.now()



s_city = city_id('Moscow')
city_id= 524901
appid = "127f887d9185ced53fc154fb4de09126"
data = ''
try:
    res = requests.get("http://api.openweathermap.org/data/2.5/weather",
                 params={'id': city_id, 'units': 'metric', 'lang': 'ru', 'APPID': appid})
    data = res.json()
    weatheroutdoors = WeatherOutDoors(humidityData=data['main']['humidity'],
                                      pressureData=data['main']['pressure'],
                                      timeRecieved=timezone.now(),
                                      temperatureData=data['main']['temp'],
                                      HouseID=SmartHouseHUB.objects.all()[0])
    weatheroutdoors.save()

except Exception as e:
    print("Exception (weather):", e)
    pass