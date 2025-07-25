# calorie
web based calorie finder
from flask import Flask, request, jsonify, render_template, send_from_directory
import sqlite3
app = Flask(__name__, static_folder='static', template_folder='static')

def get_calories_from_db(food_name):
    conn = sqlite3.connect('calories.db')
    c = conn.cursor()
    c.execute('SELECT calories FROM foods WHERE name = ?', (food_name,))
    result = c.fetchone()
    conn.close()
    return result[0] if result else None

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/calories")
def get_calories():
    food = request.args.get("food", "").strip().lower()
    calories = get_calories_from_db(food)
    if calories is not None:
        return jsonify({"food": food, "calories": calories})
    else:
        return jsonify({"food": food, "calories": None, "error": "Food not found"}), 404

@app.route('/manifest.json')
def manifest():
    return send_from_directory(app.static_folder, "manifest.json")

@app.route('/service-worker.js')
def sw():
    return send_from_directory(app.static_folder, "service-worker.js")

if __name__ == "__main__":
    app.run(debug=True)
