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

# POST

@inventory_bp.route("/inventory", methods=["POST"])
def create_inventory():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is required."
            }), 400

        quantity = data.get("quantity")
        product_id = data.get("product_id")

        if quantity is None:
            return jsonify({
                "error": "Quantity is required."
            }), 400

        if quantity < 0:
            return jsonify({
                "error": "Inventory quantity must be 0 or more."    
            }), 400

        if product_id is None:
            return jsonify({
                "error": "Product ID is required."
            }), 400

        product = find_product(product_id)

        if product is None:
            return jsonify({
                "error": "Product not found."
            }), 404

        cursor.execute("""
            SELECT * FROM inventory
            WHERE product_id = %s
        """, (product_id,))

        inventory = cursor.fetchone()

        if inventory:
            cursor.execute("""
                UPDATE inventory
                SET quantity = quantity + %s
                WHERE product_id = %s
                RETURNING *
            """, (quantity, product_id))
        else:
            cursor.execute("""
                INSERT INTO inventory (product_id, quantity)
                VALUES (%s, %s)
                RETURNING *
            """, (product_id, quantity))

        inventory = cursor.fetchone()

        conn.commit()

        return jsonify({
            "message": "Inventory created.",
            "inventory": inventory
        }), 201
        
    except Exception as e:
        print(e)

        return jsonify({
            "message": "An unexpected error occurred."    
        }), 500
    finally:
        cursor.close()
        conn.close()

# PATCH

@inventory_bp.route("/inventory/<int:inventory_id>", methods=["PATCH"])
def patch_inventory(inventory_id):
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body required."    
        }), 400

    inventory = find_inventory(inventory_id)

    if inventory is None:
        return jsonify({
            "error": "Inventory not found."    
        }), 404

    quantity = data.get("quantity", inventory["quantity"])

    if quantity is None:
        return jsonify({
            "error": "Quantity is required."
        }), 400

    if quantity < 0:
        return jsonify({
            "error": "Inventory must me equal to or more than 0."
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE inventory
            SET 
                quantity = %s
            WHERE id = %s
            RETURNING *;
        """, (quantity, inventory_id))

        inventory = cursor.fetchone()

        conn.commit()

        return jsonify({
            "message": "Inventory udpated.",
            "inventory": inventory
        }), 200

    except Exception as e:
        conn.rollback()
        print(e)

        return jsonify({
            "message": "An unexpected error occurred."    
        }), 500
    finally:
        cursor.close()
        conn.close()

# DELETE

@inventory_bp.route("/inventory/<int:inventory_id>", methods=["DELETE"])
def delete_inventory(inventory_id):
    inventory = find_inventory(inventory_id)

    if inventory is None:
        return jsonify({
            "error": "Inventory not found."    
        }), 404

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            DELETE FROM inventory
            WHERE id = %s
        """, (inventory_id,))

        conn.commit()

        return jsonify({
            "message": "Inventory deleted successfully."    
        }), 200
    except Exception as e:
        conn.rollback()
        print(e)

        return jsonify({
            "error": "An unexpected error occurred."
        }), 500
    finally:
        cursor.close()
        conn.close()