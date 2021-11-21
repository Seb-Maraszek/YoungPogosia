from communicator import ExternalAPI

class OpenWeatherMap(ExternalAPI):
    name = "OpenWeatherMap"
    url = "https://community-open-weather-map.p.rapidapi.com"
    query = None
    headers = ExternalAPI.construct_rapidapi_headers()

    def current_weather_query(self):
        url = {"{}/weather".format(self.url)}
        query = {"q": "Wroclaw,pl", "lat": "0", "lon": "0", "callback": "test", "id": "2172797", "lang": "null",
                "units": "imperial", "mode": "json"}
        headers = self.headers

        return {'url': url, 'query': query, 'headers': headers}
