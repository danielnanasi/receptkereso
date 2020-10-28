#!/usr/bin/python3.8

import requests
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Awsome receptkereső API \n developed by CSAPAT-6 \n Internet szolgáltatások és alkalmazások házi feladataként \n 2020 ősz"

@app.route('/search/<query_string>')
def spooncalcular_search(query_string, vega=False, glutenmentes=False, cukormentes=False):
    # spooncalular api doksi: https://spoonacular.com/food-api/docs#Search-Recipes-Complex

    query = "&query=" + query_string.replace(' ', ',')
    special=""
    if vega:
        special="&diet=vegetarian"
    if glutenmentes:
        special="&intolerance=gluten"
    if cukormentes:
        special="&intolerance=sugar"
    response = requests.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=a25b3cc5960d454a8f90037209582963"+query+special )
    
    return response.text
