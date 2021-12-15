import requests
from external_api.weather.communicator import ExternalAPI
from fastapi import HTTPException

"https://api.openweathermap.org/data/2.5/forecast?lat=%24%7Bposition.coords.latitude%7D&lon=%24%7Bposition.coords.longitude%7D&appid=%24%7BAPI_KEY"
"https://api.openweathermap.org/data/2.5/forecast?q=%24%7Bcity%7D&appid=%24%7BAPI_KEY"
API_KEY = "083133539dc7e11d413c05e4de2a48bd"


class OpenWeatherMap:
    name = "OpenWeatherMap"
    url = "https://api.openweathermap.org/data/2.5/forecast"

    def get_basic_url(self):
        return self.url

    def construct_final_url_for_city(self, city_name):
        url_params = self.construct_url_parameters(city_name)
        key_request = self.append_api_key()
        basic_url = self.get_basic_url()

        final_url = basic_url + url_params + key_request
        return final_url

    def construct_final_url_for_lat_lon(self, lat, lon):
        url_params = self.construct_lan_lon_parameters(lat, lon)
        key_request = self.append_api_key()
        basic_url = self.get_basic_url()

        final_url = basic_url + url_params + key_request
        return final_url

    def weather_by_city(self, city_name):
        url_for_city = self.construct_final_url_for_city(city_name)
        return self.get_weather(url_for_city)

    def weather_by_lat_lon(self, lat, lon):
        url_for_lat_lon = self.construct_final_url_for_lat_lon(lat, lon)
        return self.get_weather(url_for_lat_lon)

    def construct_url_parameters(self, city_name):
        return "?q={}".format(city_name)

    def construct_lan_lon_parameters(self, lat, lon):
        return "?lat={}&lon={}".format(lat, lon)

    def append_api_key(self):
        return "&appid={}".format(API_KEY)

    def get_weather(self, url):
        response = requests.get(url=url)
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            raise HTTPException(status_code=400, detail="Invalid city")