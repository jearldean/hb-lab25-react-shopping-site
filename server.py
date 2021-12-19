from flask import Flask, jsonify, render_template
from model import db, Melon, MelonType, connect_to_db
from time import sleep

app = Flask(__name__)
app.secret_key = 'secret'


@app.route('/')
def home():

    return render_template('index.html')


@app.route('/<path>')
def route(path):

    return render_template('index.html')


@app.route('/<path>/<code>')
def nested_route(path, code):

    return render_template('index.html')


@app.route('/api/melons')
def get_melons():
    """
    To view data from the melons database, we need a way for the frontend 
    (browser) to recieve communications from the backend (server). However, 
    our server is written in Python and our React app is written in JavaScript. 
    Luckily, they both understand how to communicate over HTTP and they're both 
    able to read/write JSON.
    """
    sleep(2) # simulate slow connections
    melons = Melon.query.all()
    return jsonify({melon.melon_code: melon.to_dict() for melon in melons})


@app.route('/api/melon/<melon_code>')
def get_melon(melon_code):

    melon = Melon.query.get(melon_code)
    return jsonify(melon.to_dict())


if __name__ == '__main__':
    connect_to_db(app)
    app.run('0.0.0.0', debug=True)
