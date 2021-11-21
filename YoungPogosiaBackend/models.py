import json
from dataclasses import dataclass, asdict

from uuid import uuid4


@dataclass
class YoungPogosiaDataModel:
    def representation(self):
        return asdict(self)


@dataclass
class User(YoungPogosiaDataModel):
    id: uuid4
    default_lat: float
    default_long: float


@dataclass
class Address(YoungPogosiaDataModel):
    user_id: uuid4
    user_address: json
