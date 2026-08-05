import psycopg2
import os
from dotenv import load_dotenv
from flask import Flask, jsonify

from database import get_db_connection

from routes.users import users_bp
from routes.products import products_bp
from routes.orders import orders_bp
from services.shipments import shipments_bp

load_dotenv()

app = Flask(__name__)

app.register_blueprint(users_bp)
app.register_blueprint(products_bp)
app.register_blueprint(orders_bp)

app.register_blueprint(shipments_bp)

@app.route('/')
def home():
        return "Integration Hub API Running"

if __name__ == "__main__":
    app.run(debug=True)