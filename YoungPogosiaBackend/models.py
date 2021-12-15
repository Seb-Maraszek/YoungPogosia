import json
import time
from contextlib import contextmanager
from dataclasses import dataclass, asdict
from datetime import datetime
from time import perf_counter
from uuid import uuid4


@dataclass
class YoungPogosiaDataModel:
    def representation(self):
        return asdict(self)


@dataclass
class User(YoungPogosiaDataModel):
    id: uuid4


@dataclass
class TimeSpentOnRequest(YoungPogosiaDataModel):
    spent_time: float
    request: str
    user_uuid: str


@dataclass
class Address(YoungPogosiaDataModel):
    user_id: uuid4
    user_address: json
