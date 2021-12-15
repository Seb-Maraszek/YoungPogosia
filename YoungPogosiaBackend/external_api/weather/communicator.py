import os
from abc import ABC, abstractmethod

import requests

RAPID_API_HOST = "community-open-weather-map.p.rapidapi.com"
RAPID_API_KEY = "40deed2ff4mshdd7a9e52c1d13a5p1ac846jsn9def6b584dfb"


class ExternalAPI(ABC):
    @staticmethod
    def construct_rapidapi_headers():
        headers = {
            'x-rapidapi-host': RAPID_API_HOST,
            'x-rapidapi-key': RAPID_API_KEY
        }
        return headers

    @abstractmethod
    def current_weather_query(self):
        pass

    def get_current_weather(self):
        url = "https://community-open-weather-map.p.rapidapi.com/weather"

        querystring = {"q": "London,uk", "lat": "0", "lon": "0", "callback": "test", "id": "2172797", "lang": "null",
                       "units": "imperial", "mode": "xml"}

        headers = {
            'x-rapidapi-host': "community-open-weather-map.p.rapidapi.com",
            'x-rapidapi-key': "40deed2ff4mshdd7a9e52c1d13a5p1ac846jsn9def6b584dfb"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)
        return

    @property
    @abstractmethod
    def query(self):
        pass

    @property
    @abstractmethod
    def headers(self):
        pass

    @property
    @abstractmethod
    def name(self):
        pass

    @property
    @abstractmethod
    def url(self):
        pass
