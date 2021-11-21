import os

import requests

ACCESS_TOKEN = os.getenv("LOCATIONIQ_API_KEY")


class MapsLocator:
    def get_address_for_location(self, lat, long):
        url_of_request = self.construct_proper_url(lat, long)
        address_response = requests.get(url=url_of_request).json()
        return address_response['address']

    def construct_proper_url(self, lat, long):
        return "https://us1.locationiq.com/v1/reverse.php?key={}&lat={}&lon={}&format=json".format(ACCESS_TOKEN, lat, long)

