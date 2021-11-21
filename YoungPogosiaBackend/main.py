import dataclasses

from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from uuid import uuid4

from external_api.weather.openweathermap import OpenWeatherMap
from external_api.loaction.communicator import MapsLocator
from models import User, Address

client = MongoClient()
app = FastAPI()

WROC_LAT = 51.107883
WROC_LONG = 17.038538

db = client['YoungPogosia']
Users = db['users']
Addresses = db['address']


@app.get("/")
async def root():
    api = OpenWeatherMap()
    return api.get_current_weather()


class RegisterUserRequestBody(BaseModel):
    lat: float
    long: float


@app.post("/init")
def register_user(body: RegisterUserRequestBody):
    lat = body.lat
    long = body.long

    google_address = MapsLocator().get_address_for_location(lat, long)

    user = User(id=uuid4(), default_lat=lat, default_long=long)
    address = Address(user_id=user.id, user_address=google_address)

    Users.insert_one(user.representation())
    Addresses.insert_one(address.representation())

    return address.representation()
