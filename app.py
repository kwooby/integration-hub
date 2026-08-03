import psycopg2
import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from database import get_db_connection

load_dotenv()

app = Flask(__name__)

@app.route('/users')
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM users
        ORDER BY id;
    """)

    users = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(users)

@app.route('/')
def home():
        return "Integration Hub API Running"

if __name__ == "__main__":
    app.run(debug=True)