import os
from abc import ABC, abstractmethod

import requests

RAPID_API_HOST = os.getenv("RAPID_API_HOST")
RAPID_API_KEY = os.getenv("RAPID_API_KEY")


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

    @abstractmethod
    def get_current_weather(self):
        query = self.current_weather_query()
        return requests.get(url=query['url'])

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

    @abstractmethod
    def construct_query(self):
        pass
