from flask import Flask, Blueprint, jsonify, request
from database import get_db_connection

shipments_bp = Blueprint("shipments", __name__)

def order_exists(order_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM orders
            WHERE id = %s
        """, (order_id,))

        order = cursor.fetchone()
        return order

    finally:
        cursor.close()
        conn.close()

@shipments_bp.route("/shipments", methods=["GET"])
def get_shipments():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM shipments
        ORDER BY id;
    """)

    shipments = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(shipments)

@shipments_bp.route("/shipments", methods=["POST"])
def create_shipments():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        data = request.get_json()

        order_id = data["order_id"]
        carrier = data["carrier"]
        tracking_number = data["tracking_number"]
        status = data["status"]

        order = order_exists(order_id)

        if order is None:
            return jsonify({
                "error": "Order not found."
            }), 404

        cursor.execute("""
            SELECT *
            FROM shipments
            WHERE order_id = %s
        """, (order_id,))

        existing_shipment = cursor.fetchone()

        if existing_shipment is not None:
            return jsonify({
                "error": "Shipment already exists for this order."
            }), 400

        cursor.execute("""
            INSERT INTO shipments (order_id, carrier, tracking_number, status)
            VALUES (%s, %s, %s, %s)
        """, (order_id, carrier, tracking_number, status))

        conn.commit()

        return jsonify({
            "message": "Shipment created."
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

@shipments_bp.route("/shipments/<int:shipment_id>", methods=["GET"])
def get_shipment(shipment_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM shipments
            WHERE id = %s
        """, (shipment_id,))

        shipment = cursor.fetchone()

        if shipment is None:
            return jsonify({
                "error": "Shipment not found."
            }), 404

        return jsonify(shipment)

    except Exception as e:
        print(e)

        return jsonify({
            "message": "An unexpected error occurred."
        }), 500
    finally:
        cursor.close()
        conn.close()