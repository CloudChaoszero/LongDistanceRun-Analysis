import os
import sys
sys.path.insert(0,os.path.join('..','Resources','AccessInformation'))
from accessinformation import access_token

from flask import Flask, render_template,jsonify
from stravalib import Client , unithelper

import json

client = Client(access_token )
print(client.get_athlete())
print([float(unithelper.miles(i.distance)) for i in client.get_activities()])
print([i.segment_efforts for i in client.get_activities()])

with open('../Data/JSONData/MainDataset.json') as f:
    data = json.load(f)

app = Flask(__name__)

@app.route("/")
def homepage():
    return(render_template('index.html'))

@app.route("/data")
def dataset():
    return(jsonify(data))

if __name__ == '__main__':
    app.run()