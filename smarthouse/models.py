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
    SensorId = models.ForeignKey(SensorHUB, on_delete=models.CASCADE)
    HouseID = models.ForeignKey(SmartHouseHUB, on_delete=models.CASCADE)
    temperatureData = models.FloatField('temperature', max_length=200)
    humidityData = models.FloatField('humidity')
    timeRecieved = models.DateTimeField('time_measured')

class LockControlSensorLink(models.Model):
    SensorId = models.ForeignKey(SensorHUB, on_delete=models.CASCADE)
    HouseID = models.ForeignKey(SmartHouseHUB, on_delete=models.CASCADE)
    IsLocked = models.IntegerField('is_locked')
    timeRecieved = models.DateTimeField('time_measured')


class WeatherOutDoors(models.Model):
    HouseID = models.ForeignKey(SmartHouseHUB, on_delete=models.CASCADE)
    temperatureData = models.FloatField('temperature', max_length=200)
    humidityData = models.FloatField('humidity')
    timeRecieved = models.DateTimeField('time_measured')
    pressureData = models.FloatField('pressure')