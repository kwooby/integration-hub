from flask import Flask, Blueprint, jsonify
from database import get_db_connection

users_bp = Blueprint("users", __name__)

@users_bp.route('/users')
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