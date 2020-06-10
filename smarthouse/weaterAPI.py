import requests
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