from django.db import models


class SmartHouse(models.Model):
    HouseID = models.AutoField('House_ID',primary_key=True, null=False, auto_created=True)
    HouseName = models.CharField('House_name', max_length = 200)
    Country = models.CharField('Country', max_length=200)
    Adress = models.CharField('Adress', max_length=200)
    TimeCreated = models.DateTimeField('Date_created')

    def __str__(self):
        return self.HouseName


class SensorWeather(models.Model):
    SensorID = models.AutoField('Sensor_ID',primary_key=True, null=False, auto_created=True)
    SensorName = models.CharField('Sensor_name', max_length = 200)
    CheckData = models.DateTimeField('Check_data')
    TimeCreated = models.DateTimeField('Date_created')
    IsActive = models.BinaryField('Is_active')

    def __str__(self):
        return  self.SensorName