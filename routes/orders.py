from flask import Flask, Blueprint, jsonify, request
from database import get_db_connection

orders_bp = Blueprint("orders", __name__)

@orders_bp.route('/orders', methods=["GET"])
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

@orders_bp.route('/orders', methods=["POST"])
def create_order():
    
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        data = request.get_json()

        user_id = data["user_id"]
        status = data["status"]
        product_id = data["product_id"]
        quantity = data["quantity"]

        cursor.execute("""
            SELECT *
            FROM users
            WHERE id = %s
        """, (user_id,))

        user = cursor.fetchone()

        cursor.execute("""
            SELECT *
            FROM products
            WHERE id = %s
        """, (product_id,))

        product = cursor.fetchone()

        cursor.execute("""
            SELECT *
            FROM inventory
            WHERE product_id = %s
        """, (product_id,))

        inventory = cursor.fetchone()

        if user is None:
            return jsonify({
                "error": "User not found."
            }), 404
        
        if product is None:
            return jsonify({
                "error": "Product not found."
            }), 404

        if inventory is None:
            return jsonify({
                "error": "Inventory record not found."
            }), 404
        
        price = product["price"]
        total = price * quantity
        stock = inventory["quantity"]

        if quantity > stock:
            return jsonify({
                "error": "Insufficient inventory."
            }), 400

        cursor.execute("""
            INSERT INTO orders (user_id, status, total)
            VALUES (%s, %s, %s)
            RETURNING id;
        """, (user_id, status, total))

        order_id = cursor.fetchone()["id"]

        cursor.execute("""
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (%s, %s, %s, %s)
        """, (order_id, product_id, quantity, price))
        
        cursor.execute("""
            UPDATE inventory
            SET quantity = quantity - %s
            WHERE product_id = %s
        """, (quantity, product_id))

        conn.commit()
        
        return jsonify({
            "message": "Order created",
            "order_id": order_id
        })

    except Exception as e:
        conn.rollback()
        print(e)

        return jsonify({
            "error": "An unexpected error occurred."
        }), 500

    finally:
        cursor.close()
        conn.close()

@orders_bp.route("/orders/<int:order_id>", methods=["GET"])
def get_order(order_id):

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM orders
            where id = %s
        """, (order_id,))

        order = cursor.fetchone()

        if order is None:
            return jsonify({
                "error": "Order not found."
            }), 404

        return jsonify(order)

    except Exception as e:
        print(e)
        
        return jsonify({
            "message": "An unexpected error occurred."
        }), 500

    finally:
        cursor.close()
        conn.close()
