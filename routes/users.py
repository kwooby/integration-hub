from flask import Blueprint, jsonify, request
from database import get_db_connection
from psycopg2 import errors

users_bp = Blueprint("users", __name__)

# HELPERS
def find_user(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM users
            WHERE id = %s
        """, (user_id,))

        user = cursor.fetchone()

        return user

    finally:
        cursor.close()
        conn.close()

# GET
@users_bp.route("/users")
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

@users_bp.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = find_user(user_id)

    if user is None:
        return jsonify({
                "error": "User not found."
        }), 404

    return jsonify(user)

# POST
@users_bp.route("/users", methods=["POST"])
def create_user():
    conn= get_db_connection()
    cursor = conn.cursor()

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is required."
            }), 400

        name = data.get("name")
        email = data.get("email")

        if not name or not name.strip():
            return jsonify({
                "error": "Name is required."
            }), 400

        if not email or not email.strip():
            return jsonify({
                "error": "Email is required."
            }), 400

        name = name.strip()
        email = email.strip()

        cursor.execute("""
            SELECT *
            FROM users
            WHERE email = %s
        """, (email,))

        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({
                "error": "Email already exists."
            }), 409

        cursor.execute("""
            INSERT INTO users (name, email)
            VALUES (%s, %s)
            RETURNING *
        """, (name, email))

        user = cursor.fetchone()

        conn.commit()

        return jsonify(user), 201

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
@users_bp.route("/users/<int:user_id>", methods=["PATCH"])
def patch_user(user_id):
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No fields provided."
        }), 400

    user = find_user(user_id)

    if user is None:
        return jsonify({
            "error": "User not found."
        }), 404

    name = data.get("name", user["name"])
    email = data.get("email", user["email"])

    if not name or not name.strip():
        return jsonify({
            "error": "Name cannot be empty."
        }), 400

    if not email or not email.strip():
        return jsonify({
            "error": "Email cannot be empty."
        }), 400

    name = name.strip()
    email = email.strip()

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM users
            WHERE email = %s
            AND id != %s
        """, (email, user_id))

        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({
                "error": "Email already exists."
            }), 409
        
        cursor.execute("""
            UPDATE users
            SET
                name = %s,
                email = %s
            WHERE id = %s
            RETURNING *
        """, (name, email, user_id))

        user = cursor.fetchone()

        conn.commit()

        return jsonify({
            "message": "User information updated.",
            "user": user
            })

    except Exception as e:
        conn.rollback()
        print(e)

        return jsonify({
            "error" : "An unexpected error occurred."
        }), 500

    finally:
        cursor.close()
        conn.close()

# DELETE
@users_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = find_user(user_id)

    if user is None:
        return jsonify({
            "error": "User not found."
        }), 404

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            DELETE FROM users
            WHERE id = %s
        """, (user_id,))

        conn.commit()

        return jsonify({
            "message": "User deleted successfully."
        }), 200

    except errors.ForeignKeyViolation:
        conn.rollback()

        return jsonify({
            "error": "User cannot be deleted because they have existing orders."
        }), 409

    except Exception as e:
        conn.rollback()
        print(e)

        return jsonify({
            "error": "An unexpected error occurred."
        }), 500

    finally:
        cursor.close()
        conn.close()