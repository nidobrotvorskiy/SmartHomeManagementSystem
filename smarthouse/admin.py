from django.contrib import admin
from . models import SensorHUB, SmartHouseHUB, LockControlSensorLink, WeatherSensorLink, WeatherOutDoors
admin.site.register(SensorHUB)
admin.site.register(SmartHouseHUB)
admin.site.register(LockControlSensorLink)
admin.site.register(WeatherSensorLink)
admin.site.register(WeatherOutDoors)
