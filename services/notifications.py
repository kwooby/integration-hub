from flask import Blueprint, jsonify, request
from database import get_db_connection

notifications_bp = Blueprint("notifications", __name__)

ALLOWED_NOTIFICATION_STATUSES = [
    "Pending",
    "Sent",
    "Failed"
]

ALLOWED_NOTIFICATION_TYPES = [
    "Order Confirmation",
    "Payment Confirmation",
    "Shipment Created",
    "Out For Delivery",
    "Delivered"
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

def find_notification(notification_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM notifications
            WHERE id = %s
        """, (notification_id,))

        notification = cursor.fetchone()

        return notification
    finally:
        cursor.close()
        conn.close()

# GET
@notifications_bp.route("/notifications", methods=["GET"])
def get_notifications():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM notifications
        ORDER BY id;
    """)

    notifications = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(notifications)

@notifications_bp.route("/notifications/<int:notification_id>", methods=["GET"])
def get_notification(notification_id):
    notification = find_notification(notification_id)

    if notification is None:
        return jsonify({
            "error": "Notification not found."
        }), 404

    return jsonify(notification)

# POST
@notifications_bp.route("/notifications", methods=["POST"])
def create_notifications():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is required."
            }), 400

        type = data["type"]
        status = data["status"]
        sent_at = data.get("sent_at")

        order_id = data["order_id"]

        order = order_exists(order_id)

        if order is None:
            return jsonify({
                "error": "Order not found."
            }), 404

        if status not in ALLOWED_NOTIFICATION_STATUSES:
            return jsonify({
                "error": "Invalid notification status."
            }), 400

        if type not in ALLOWED_NOTIFICATION_TYPES:
            return jsonify({
                "error": "Invalid notification type."
            }), 400

        if status == "Sent" and not sent_at:
            return jsonify({
                "error": "Sent at is required when status is 'Sent'."
            }), 400

        if status != "Sent" and sent_at:
            return jsonify({
                "error": "Sent at can only be determined when status is 'Sent'."
            }), 400

        cursor.execute("""
            INSERT INTO notifications (order_id, type, status, sent_at)
            VALUES (%s, %s, %s, %s)
            RETURNING *;
        """, (order_id, type, status, sent_at))

        notification = cursor.fetchone()

        conn.commit()

        return jsonify(notification), 201

    except Exception as e:
        conn.rollback()
        print(e)

        return jsonify({
            "error": "Something went wrong."
        }), 500

    finally:
        cursor.close()
        conn.close()

# PATCH
@notifications_bp.route("/notifications/<int:notification_id>", methods=["PATCH"])
def patch_notification(notification_id):
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required."
        }), 400

    if "status" not in data:
        return jsonify({
            "error": "Status field is required."
        }), 400

    notification = find_notification(notification_id)

    if notification is None:
        return jsonify({
            "error": "Notification not found."
        }), 404

    status = data.get("status", notification["status"])
    sent_at = data.get("sent_at", notification["sent_at"])

    if status not in ALLOWED_NOTIFICATION_STATUSES:
        return jsonify({
            "error": "Invalid notification status."
        }), 400

    if status == "Sent" and not sent_at:
        return jsonify({
            "error": "Sent at is required when status is 'Sent'."
        }), 400

    if status != "Sent" and sent_at:
        return jsonify({
            "error": "Sent at can only be determined when status is 'Sent'."
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE notifications
            SET
                status = %s,
                sent_at = %s
            WHERE id = %s
            RETURNING *;
        """, (status, sent_at, notification_id))

        notification = cursor.fetchone()

        conn.commit()

        return jsonify(notification)

    except Exception as e:
        conn.rollback()
        print(e)

        return jsonify({
            "error": "Unexpected error occurred."
        }), 500

    finally:
        cursor.close()
        conn.close()

# DELETE
