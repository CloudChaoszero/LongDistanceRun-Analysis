from sqlalchemy.orm import Session
from sqlalchemy import create_engine, ForeignKey
from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.ext.declarative import declarative_base


import pandas as pd

engine = create_engine('sqlite:///../../Analysis/db/RunningData.db')
Base = declarative_base()


class RunningData(Base):
    time = Column(Integer)
    distance = Column(Integer)
    altitude = Column(Integer)
    grade_smooth = Column(Integer)
    moving = Column(Integer)
    velocity_smooth = Column(Integer)
    latitude = Column(Integer)
    longitude = Column(Integer)
    
    def __init__(self, time, distance, altitude, grade_smooth, moving, \
                velocity_smooth, latitude, longitude):
        self.time = time
        self.distance = distance
        self.altitude = altitude 
        self.grade_smooth = grade_smooth
        self.moving = moving
        self.velocity_smooth = velocity_smooth
        self.latitude = latitude
        self.longitude = longitude

Base.metadata.create_all(engine)

session = Session(bind = engine)