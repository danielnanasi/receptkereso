#!/usr/bin/python3.8

import requests
import json
import traceback
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
spooncalcular_api_key="apiKey=55c3167293d4431289eb466abf605bb4"

@app.route('/')
def hello_world():
    return """Awsome receptkereső API
            developed by CSAPAT-6
            Internet szolgáltatások és alkalmazások házi feladataként
            2020 ősz
            source code: https://github.com/nanasidaniel/receptkereso"""

edamam_ids = (
    ('app_id', '57326fe9'),
    ('app_key', '6a59155eecd222e3dd4099f45d51a769'),
)

@app.route('/search/<query_string>/<options>')
def spooncalcular_search(query_string, options="00"):
    # spooncalular api doksi: https://spoonacular.com/food-api/docs#Search-Recipes-Complex
    
    response_data = {'results':[]}

    query = "&query=" + str(query_string.replace(' ', ','))
    special=""
    edmam_health_labels=""
    if options[0] == 0:
        special="&diet=vegetarian"
    if options[0] == 1:
        special="&intolerance=gluten"
    if options[0] == 2:
        special="&intolerance=sugar"
    
    meal_type=""
    if options[1] == 0:
        meal_type="&type=soup"
    if options[1] == 1:
        meal_type="&type=main course"
    if options[1] == 2:
        meal_type="&type=dessert"

    spooncacular_response = requests.get("https://api.spoonacular.com/recipes/complexSearch?"+spooncalcular_api_key + query + special + meal_type + "&number=20" )
    spooncacular_response_data = json.loads(spooncacular_response.text)

    params = (
        ("q", query_string),
        ("from", "0"),
        ("to", "20"),
    ) + edamam_ids

    edamam_response = requests.get('https://api.edamam.com/search', params = params)
    edamam_response_data = json.loads(edamam_response.text)

    try:
        for recipe in spooncacular_response_data['results']:
            if True:
                recipe_info = requests.get("https://api.spoonacular.com/recipes/"+str(recipe['id'])+"/information?"+spooncalcular_api_key+"&includeNutrition=true")
                recipe_json = json.loads(recipe_info.text)
                recipe['link'] = recipe_json['sourceUrl']
            else:
                recipe['link'] = ""
            response_data['results'].append(recipe)
        for recipe in edamam_response_data['hits']:
            edamam_recipe = {}
            edamam_recipe['link'] = recipe['recipe']['url']
            edamam_recipe['id'] = 0
            edamam_recipe['title'] = recipe['recipe']['label']
            edamam_recipe['image'] = recipe['recipe']['image']
            response_data['results'].append(edamam_recipe)

    except Exception as e:
        print("ERROR: "+ str(e))
        traceback.print_exc()
    
    return response_data

@app.route('/detail/<object_id>')
def spooncalcular_detail(object_id):

    response = requests.get("https://api.spoonacular.com/recipes/"+str(object_id)+"/information?"+spooncalcular_api_key+"&includeNutrition=true")

    return response.text

@app.route('/search_ingredient/<ingredients>')
def spooncalcular_search_ingredients(ingredients):

    spooncacular_response_data = requests.get("https://api.spoonacular.com/recipes/findByIngredients?"+spooncalcular_api_key +"&ingredients="+str(ingredients))
    response_data = {'results':[]}

    try:
        for recipe in spooncacular_response_data['results']:
            if True:
                recipe_info = requests.get("https://api.spoonacular.com/recipes/"+str(recipe['id'])+"/information?"+spooncalcular_api_key+"&includeNutrition=true" + "&number=40")
                recipe_json = json.loads(recipe_info.text)
                recipe['link'] = recipe_json['sourceUrl']
            else:
                recipe['link'] = ""
            response_data['results'].append(recipe)

    except Exception as e:
        print("ERROR: "+ str(e))
        traceback.print_exc()
    
    return response_data



################################################################################################
# edama doksi: https://developer.edamam.com/edamam-docs-recipe-api


@app.route('/edamam/search_recipe/<name>')
def edamam_auto_complete(name):
    params = (
        ("q", name),
        ("from", "0"),
        ("to", "10"),
    ) + edamam_ids

    response = requests.get('https://api.edamam.com/search', params = params)
    return response.json()
