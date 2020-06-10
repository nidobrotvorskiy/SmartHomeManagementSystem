import csv,sys,os
import os
from datetime import datetime

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
from smarthouse.models import SmartHouseHUB, SensorHUB, WeatherSensorLink, WeatherOutDoors, LockControlSensorLink
from smarthouse.weaterAPI import city_id, forecast
import requests

#
#
# SmartHouseHUB.objects.all().delete()
# SensorHUB.objects.all().delete()
#
# house = SmartHouseHUB()
# house.HouseName = 'Flat'
# house.Adress = 'Moscow, Shabolovskaya, 26'
# house.Country = 'Russia'
# house.TimeCreated = timezone.now()
# house.save()
#
# house = SmartHouseHUB(HouseName = 'Flat', Adress = 'Tver, Ordgenikidze, 5', Country = 'Russia',
#                       TimeCreated = timezone.now())
# house.save()
# house = SmartHouseHUB(HouseName = 'Country', Adress = 'Yglich, DGary, 5', Country = 'Russia',
#                       TimeCreated = timezone.now())
# house.save()
# sensor = SensorHUB()
# sensor.SensorName = 'A031WeatherHome'
# sensor.TimeCreated = timezone.now()
# sensor.CheckData = timezone.now()
# sensor.IsActive = 1
# sensor.save()
# #
# weatherSensor = WeatherSensorLink()
# weatherSensor.HouseID = SmartHouseHUB.objects.get(HouseID=15)
# weatherSensor.SensorId = SensorHUB.objects.get(SensorID=8)
# weatherSensor.humidityData = 56
# weatherSensor.temperatureData = 34
# weatherSensor.timeRecieved = timezone.now()

#
#
# s_city = city_id('Tver')
# city_id= 524901
# appid = "127f887d9185ced53fc154fb4de09126"
# data = ''
# try:
#     res = requests.get("http://api.openweathermap.org/data/2.5/weather",
#                  params={'id': city_id, 'units': 'metric', 'lang': 'ru', 'APPID': appid})
#     data = res.json()
#     weatheroutdoors = WeatherOutDoors(humidityData=data['main']['humidity'],
#                                       pressureData=data['main']['pressure'],
#                                       timeRecieved=timezone.now(),
#                                       temperatureData=data['main']['temp'],
#                                       HouseID=SmartHouseHUB.objects.get(HouseID=14))
#     weatheroutdoors.save()
#
# except Exception as e:
#     print("Exception (weather):", e)
#     pass
# f = LockControlSensorLink(IsLocked=1, timeRecieved=timezone.now(),
#                           HouseID=SmartHouseHUB.objects.get(HouseID=13), SensorId=SensorHUB.objects.get(SensorID=11))
# f.save()
data = csv.reader(open("smarthouse/static/data/datathirteenhome.csv"), delimiter=";")
for i in data:
     if i[0] != 'Sensor':
         ob = WeatherSensorLink()
         ob.HouseID = SmartHouseHUB.objects.get(HouseID=int(i[1]))
         ob.SensorId =ensorId=SensorHUB.objects.get(SensorID=int(i[0]))
         ob.temperatureData = float(i[2])
         ob.humidityData =float(i[3])
         ob.timeRecieved =datetime.strptime(i[4],"%d.%m.%Y %H:%M" )
         ob.save()