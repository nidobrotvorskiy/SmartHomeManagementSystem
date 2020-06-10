from django.shortcuts import render
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.db.models import F
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
import json
from django.apps import apps
from django import template
from .models import SmartHouseHUB
from . models import SensorHUB, SmartHouseHUB, LockControlSensorLink, WeatherSensorLink, WeatherOutDoors
from .weaterAPI import forecast, city_id

register = template.Library()

@register.filter
def get_obj_attr(obj, attr):
    return getattr(obj, attr)


def index(request):
    sensorhub = SensorHUB.objects.all()
    smarthouse = SmartHouseHUB.objects.all()
    lockcontrol = LockControlSensorLink.objects.all()
    weathersensor = WeatherSensorLink.objects.all()
    weatheroutdoors = forecast(city_id('Moscow'))

    return render(request, 'userPage/base.html', {'sensor_hub': sensorhub,
                                               'smart_house': smarthouse, 'lock_control': lockcontrol,
                                               'weather_sensor': weathersensor, 'weather_outdoors': weatheroutdoors})