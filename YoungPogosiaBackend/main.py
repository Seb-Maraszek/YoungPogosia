import dataclasses
import time
from datetime import datetime

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware

from external_api.weather.openweathermap import OpenWeatherMap
from external_api.loaction.communicator import MapsLocator
from models import User, Address, TimeSpentOnRequest

client = MongoClient()
app = FastAPI()

WROC_LAT = 51.107883
WROC_LONG = 17.038538

db = client['YoungPogosia']
Users = db['users']
Addresses = db['address']
Stats = db['stats']


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegisterUserRequestBody(BaseModel):
    lat: float
    long: float

class GetCityCurrentWeather(BaseModel):
    city: str


@app.get("/init/")
def register_user():
    start = time.time()

    user = User(id=uuid4())
    Users.insert_one(user.representation())

    end = time.time()
    stat = TimeSpentOnRequest(spent_time=float(end-start), request="initalize_user", user_uuid=user.id)
    print(stat)
    Stats.insert_one(stat.representation())
    return user.representation()


@app.get("/weather/city/")
async def get_current_weather(city: str = "", user_uuid: str = ""):
    if not city:
        return HTTPException(400, "Incorrect, or missing city")
    if not user_uuid:
        return HTTPException(400, "Missing user uuid")
    start = time.time()

    request = OpenWeatherMap().weather_by_city(city_name=city)

    end = time.time()
    stat = TimeSpentOnRequest(spent_time=float(end - start), request="initalize_user", user_uuid=user_uuid)
    print(stat)
    Stats.insert_one(stat.representation())

    return request

@app.get("/weather/city/")
async def get_current_weather(city: str = "", user_uuid: str = ""):
    if not city:
        return HTTPException(400, "Incorrect, or missing city")
    if not user_uuid:
        return HTTPException(400, "Missing user uuid")
    start = time.time()

    request = OpenWeatherMap().weather_by_city(city_name=city)

    end = time.time()
    stat = TimeSpentOnRequest(spent_time=float(end - start), request="weather_by_city")
    print(stat)
    Stats.insert_one(stat.representation())

    return request


@app.get("/weather/coords/")
async def get_current_weather(lat: str = "", lon: str = "",  user_uuid: str = ""):
    if not lat or not lon:
        return HTTPException(400, "Incorrect, or missing city")

    if not user_uuid:
        return HTTPException(400, "Missing user uuid")
    start = time.time()

    request = OpenWeatherMap().weather_by_lat_lon(lat=lat, lon=lon)

    end = time.time()
    stat = TimeSpentOnRequest(spent_time=float(end - start), request="weather_by_coords", user_uuid=user_uuid)
    print(stat)
    Stats.insert_one(stat.representation())

    return request


@app.get("/user/stats/")
async def get_user_stats(user_uuid: str = ""):
    stats = Stats.find({'user_uuid': user_uuid})
    x = [({"spent_time": stat["spent_time"], "request": stat['request']}) for stat in stats]
    return x