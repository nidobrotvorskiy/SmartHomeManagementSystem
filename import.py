import csv,sys,os
import os
from django.utils import timezone
dir_path = os.path.dirname(os.path.realpath(__file__))
dir_path += '/kursovaya'
project_dir = dir_path
sys.path.append(project_dir)
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'
import django
django.setup()
from smarthouse.models import SmartHouse
SmartHouse.objects.all().delete()
house = SmartHouse()
house.HouseName = 'Дача'
house.Adress = 'Московская область, СНТ Дельфин'
house.Country = 'Russia'
house.TimeCreated = timezone.now()
house.save()
print(SmartHouse.objects.all())