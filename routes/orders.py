from flask import Flask, Blueprint, jsonify
from database import get_db_connection

orders_bp = Blueprint("orders", __name__)

@orders_bp.route('/orders')
def get_orders():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM orders
        ORDER BY id;
    """)

    orders = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(orders)