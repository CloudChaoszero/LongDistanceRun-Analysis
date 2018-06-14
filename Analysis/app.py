from flask import Flask, render_template,jsonify

from stravalib import Client , unithelper

client = Client(access_toke )
print(client.get_athlete())
print([float(unithelper.miles(i.distance)) for i in client.get_activities()])
print([i.segment_efforts for i in client.get_activities()])
app = Flask(__name__)

@app.route("/")
def homepage():
    return(render_template('index.html'))

if __name__ == '__main__':
    app.run()