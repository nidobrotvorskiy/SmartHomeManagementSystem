from django.db import models


class SmartHouseHUB(models.Model):
    HouseID = models.AutoField('House_ID',primary_key=True, null=False, auto_created=True)
    HouseName = models.CharField('House_name', max_length = 200)
    Country = models.CharField('Country', max_length=200)
    Adress = models.CharField('Adress', max_length=200)
    TimeCreated = models.DateTimeField('Date_created')

    def __str__(self):
        return self.HouseName


class SensorHUB(models.Model):
    SensorID = models.AutoField('Sensor_ID',primary_key=True, null=False, auto_created=True)
    SensorName = models.CharField('Sensor_name', max_length = 200)
    CheckData = models.DateTimeField('Check_data')
    TimeCreated = models.DateTimeField('Date_created')
    IsActive = models.IntegerField('Is_active')

    def __str__(self):
        return  self.SensorName

class WeatherSensorLink(models.Model):
    SensorId = models.ForeignKey(SensorHUB, on_delete=models.SET_NULL(), primary_key=True)
    HouseID = models.ForeignKey(SmartHouseHUB, on_delete=models.SET_NULL(), primary_key=True)
    temperatureData = models.CharField('temperature', max_length=200)
    timeRecieved = models.DateTimeField('time_measured')
