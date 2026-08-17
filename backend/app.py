import psycopg2
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask import Flask

from backend.routes.users import users_bp
from backend.routes.products import products_bp
from backend.routes.orders import orders_bp
from backend.services.shipments import shipments_bp
from backend.services.payments import payments_bp
from backend.services.notifications import notifications_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(users_bp)
app.register_blueprint(products_bp)
app.register_blueprint(orders_bp)

app.register_blueprint(shipments_bp)
app.register_blueprint(payments_bp)
app.register_blueprint(notifications_bp)

@app.route('/')
def home():
        return "Integration Hub API Running"

if __name__ == "__main__":
    app.run(debug=True)