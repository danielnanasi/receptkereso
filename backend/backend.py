#!/usr/bin/python3.8

import requests
from flask import Flask
app = Flask(__name__)

spooncalcular_api_key="apiKey=55c3167293d4431289eb466abf605bb4"

@app.route('/')
def hello_world():
    return "Awsome receptkereső API \n developed by CSAPAT-6 \n Internet szolgáltatások és alkalmazások házi feladataként \n 2020 ősz"

@app.route('/search/<query_string>')
def spooncalcular_search(query_string, vega=False, glutenmentes=False, cukormentes=False):
    # spooncalular api doksi: https://spoonacular.com/food-api/docs#Search-Recipes-Complex

    query = "&query=" + str(query_string.replace(' ', ','))
    special=""
    if vega:
        special="&diet=vegetarian"
    if glutenmentes:
        special="&intolerance=gluten"
    if cukormentes:
        special="&intolerance=sugar"
    response = requests.get("https://api.spoonacular.com/recipes/complexSearch?"+spooncalcular_api_key + query + special )

    return response.text


@app.route('/detail/<object_id>')
def spooncalcular_detail(object_id):

    response = requests.get("https://api.spoonacular.com/recipes/"+str(object_id)+"/information?"+spooncalcular_api_key+"&includeNutrition=true")

    return response.text

@app.route('/search_ingredient/<ingredients>')
def spooncalcular_search_ingredint(ingredients):

    response = requests.get("https://api.spoonacular.com/recipes/findByIngredients?"+spooncalcular_api_key +"&ingredients="+str(ingredients))

    return response.text

