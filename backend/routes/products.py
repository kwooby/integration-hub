from flask import Flask, Blueprint, jsonify
from backend.database import get_db_connection

products_bp = Blueprint("products", __name__)

@products_bp.route('/products')
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM products
        ORDER BY id;
    """)

    products = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(products)