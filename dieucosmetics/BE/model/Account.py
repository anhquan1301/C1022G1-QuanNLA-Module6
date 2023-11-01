from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, Text
from model.BaseModel import BaseModel
from sqlalchemy.orm import relationship


@dataclass
class Account(BaseModel):
    __tablename__ = "account"
    id = Column(Integer, primary_key=True,autoincrement=True)
    username = Column(String(50))
    password = Column(Text)
    email = Column(String(50))
    o_auth_provider = Column(String(20))
    otp_scret = Column(String(6))

    