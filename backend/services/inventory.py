from flask import Blueprint, jsonify, request
from backend.database import get_db_connection
from psycopg2 import errors

inventory_bp = Blueprint("inventory", __name__)

# HELPERS 

def find_product(product_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM products
            WHERE id = %s
        """, (product_id,))

        product = cursor.fetchone()

        return product

    finally:
        cursor.close()
        conn.close()

def find_inventory(inventory_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM inventory
            WHERE id = %s
        """, (inventory_id,))

        inventory = cursor.fetchone()

        return inventory
    finally:
        cursor.close()
        conn.close()

# GET
@inventory_bp.route("/inventory")
def get_inventory():
    
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM inventory
            ORDER BY id
        """)

        inventory = cursor.fetchall()

        return jsonify(inventory), 200

    except Exception as e:
        print(e)

        return jsonify({
                "message": "An unexpected error occurred."
        }), 500
    finally:
        cursor.close()
        conn.close()

@inventory_bp.route("/inventory/<int:inventory_id>", methods=["GET"])
def get_one_inventory(inventory_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM inventory
            WHERE id = %s
        """, (inventory_id,))

        one_inventory = cursor.fetchone()

        if one_inventory is None:
            return jsonify({
                "error": "Inventory not found."
            }), 404

        return one_inventory

    except Exception as e:
        print(e)

        return jsonify({
            "message": "An unexpected error occurred."
        }), 500
    finally:
        cursor.close()
        conn.close()