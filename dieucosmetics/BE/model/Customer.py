from dataclasses import dataclass
from sqlalchemy import Column, Integer
from model.User import User

@dataclass
class Customer(User):
    __tablename__ = 'customer'
    point = Column(Integer)