from flask import Flask, Blueprint, jsonify, request
from backend.database import get_db_connection
from psycopg2 import errors

products_bp = Blueprint("products", __name__)

# HELPERS
def find_product(product_id):
    conn = get_db_connection()
    cursor= conn.cursor()

    try:
        cursor.execute("""
            SELECT *
            FROM products
            WHERE id = %s
        """, (product_id,))

        product= cursor.fetchone()

        return product
    finally:
        cursor.close()
        conn.close()

def generate_sku(product_id):
    return f"PROD-{product_id:04d}"

# GET
@products_bp.route("/products")
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

@products_bp.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = find_product(product_id)

    if product is None:
        return jsonify({
            "error": "Product not found."
        }), 404

    return jsonify(product)

# POST
@products_bp.route("/products", methods=["POST"])
def create_product():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "Request body is required."
            }), 400

        product_name = data.get("product_name")
        price = data.get("price")

        if not product_name or not product_name.strip():
            return jsonify({
                "error": "Product name is required."
            }), 400

        if price is None:
            return jsonify({
                "error": "Price is required."
            }), 400

        if price <= 0:
            return jsonify({
                "error": "Price must be greater than 0."
            }), 400

        cursor.execute("""
            SELECT nextval('products_id_seq');
        """)

        product_id = cursor.fetchone()["nextval"]

        sku = generate_sku(product_id)

        cursor.execute("""
            INSERT INTO products (id, sku, product_name, price)
            VALUES (%s, %s, %s, %s)
            RETURNING *;
        """, (product_id, sku, product_name, price))

        product = cursor.fetchone()

        conn.commit()

        return jsonify({
            "message": "Product created.",
            "product": product
        }), 201
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
@products_bp.route("/products/<int:product_id>", methods=["PATCH"])
def patch_product(product_id):
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required."
        }), 400

    product = find_product(product_id)

    if product is None:
        return jsonify({
            "error": "Product not found."
        }), 404

    product_name = data.get("product_name", product["product_name"])
    price = data.get("price", product["price"])

    if not product_name or not product_name.strip():
        return jsonify({
            "error": "Product name is required."
        }), 400

    product_name = product_name.strip()

    if price is None:
        return jsonify({
            "error": "Price is required."
        }), 400

    if price <= 0:
        return jsonify({
            "error": "Price must be greater than 0."
        }), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE products
            SET
                product_name = %s,
                price = %s
            WHERE id = %s
            RETURNING *;
        """, (product_name, price, product_id))

        product = cursor.fetchone()

        conn.commit()

        return jsonify({
            "message": "Product information updated.",
            "product": product
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

# DELETE
@products_bp.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    product = find_product(product_id)

    if product is None:
        return jsonify({
            "error": "Product not found."
        }), 404

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            DELETE FROM products
            WHERE id = %s
        """, (product_id,))

        conn.commit()

        return jsonify({
            "message": "Product deleted successfully."
        }), 200
    except errors.ForeignKeyViolation:
        conn.rollback()

        return jsonify({
            "error": "Product cannot be deleted because it has existing inventory."
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