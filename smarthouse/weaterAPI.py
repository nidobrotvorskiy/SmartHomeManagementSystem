import requests
from django.http import JsonResponse


def city_id(name):
    s_city = name
    appid = "127f887d9185ced53fc154fb4de09126"
    try:
        res = requests.get("http://api.openweathermap.org/data/2.5/find",
                           params={'q': s_city, 'type': 'like', 'units': 'metric', 'APPID': appid})
        data = res.json()
        return data['list'][0]['id']
    except Exception as e:
        print("Exception (find):", e)
        pass

def forecast(city_id):
    appid = "127f887d9185ced53fc154fb4de09126"
    data = ''
    try:
        res = requests.get("http://api.openweathermap.org/data/2.5/weather",
                           params={'id': city_id, 'units': 'metric', 'lang': 'ru', 'APPID': appid})
        return res.json()

    except Exception as e:
        print("Exception (weather):", e)
        return JsonResponse({"valid": False}, content_type="application/json")