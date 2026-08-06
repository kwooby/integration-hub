from flask import Blueprint, jsonify, request
from database import get_db_connection

payments_bp = Blueprint("payments", __name__)

ALLOWED_PAYMENT_STATUSES = [
    "Pending",
    "Paid",
    "Failed",
    "Refunded"
]

# HELPERS
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

def find_payment(payment_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM payments
            WHERE id = %s
        """, (payment_id,))

        payment = cursor.fetchone()

        return payment
    finally:
        cursor.close()
        conn.close()

# GET
@payments_bp.route("/payments", methods=["GET"])
def get_payments():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM payments
            ORDER BY id;
        """)

        payments = cursor.fetchall()

        return jsonify(payments)

    finally:
        cursor.close()
        conn.close()

@payments_bp.route("/payments/<int:payment_id>", methods=["GET"])
def get_payment(payment_id):
    payment = find_payment(payment_id)

    if payment is None:
        return jsonify({
            "error": "Payment not found."
        }), 404

    return jsonify(payment)

# POST
@payments_bp.route("/payments", methods=["POST"])
def create_payments():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        data = request.get_json()

        order_id = data["order_id"]
        status = data["status"]
        amount = data["amount"]
        transaction_id = data["transaction_id"]

        order = order_exists(order_id)

        if order is None:
            return jsonify({
                "error": "Order not found."
            }), 404

        cursor.execute("""
            SELECT *
            FROM payments
            WHERE order_id = %s
        """, (order_id,))

        existing_payment = cursor.fetchone()

        if existing_payment is not None:
            return jsonify({
                "error": "Payment already exists for this order."
            }), 400

        if status not in ALLOWED_PAYMENT_STATUSES:
            return jsonify({
                "error": "Invalid payment status."
            }), 400

        if amount <= 0:
            return jsonify({
                "error": "Amount must be greater than zero."
            }), 400

        if amount != order["total"]:
            return jsonify({
                "error": "Payment amount does not match order total."
            }), 400

        if not transaction_id:
            return jsonify({
                "error": "Transaction ID is required."
            }), 400

        cursor.execute("""
            INSERT INTO payments (order_id, status, amount, transaction_id)
            VALUES (%s, %s, %s, %s)
            """, (order_id, status, amount, transaction_id))

        conn.commit()

        return jsonify({
            "message": "Payment created."
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

# PATCH
@payments_bp.route("/payments/<int:payment_id>", methods=["PATCH"])
def patch_payment(payment_id):
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No fields provided."
        }), 400

    payment = find_payment(payment_id)

    if payment is None:
        return jsonify({
            "error": "Payment not found."
        }), 404

    order = order_exists(payment["order_id"])
    status = data.get("status", payment["status"])
    amount = data.get("amount", payment["amount"])
    transaction_id = data.get("transaction_id", payment["transaction_id"])

    if status not in ALLOWED_PAYMENT_STATUSES:
        return jsonify({
            "error": "Invalid payment status."
        }), 400

    if amount <= 0:
        return jsonify({
            "error": "Amount must be greater than zero."
        }), 400

    if amount != order["total"]:
        return jsonify({
            "error": "Amount must match order total."
        }), 400

    if not transaction_id:
        return jsonify({
            "error": "Transaction ID cannot be empty."
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE payments
            SET
                status = %s,
                amount = %s,
                transaction_id = %s
            WHERE id = %s;
        """, (status, amount, transaction_id, payment_id))

        conn.commit()

        return jsonify({
            "message": "Payment updated."
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