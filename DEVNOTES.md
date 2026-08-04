# DEVELOPER NOTES FOR INTEGRATION HUB API

*TURN DEBUG OFF BEFORE DEPLOYING

----------

## 08/04/2026

----------

ORDERS:
    -Completed POST /orders endpoint
    -Implemented order creation workflow
    -Created associated order_items records
    -Implemented server-side price retrieval
    -Calculated order totals on the server

----------

VALIDATION:
    -Validated user existence before order creation
    -Validated product existence before order creation
    -Validated inventory record existence
    -Prevented orders with insufficient inventory

----------

INVENTORY:
    -Updated inventory after successful order creation
    -Separated inventory validation from product validation
    -Prevented inventory updates when validation fails

----------

DATABASE:
    -Implemented transaction handling
    -Added commit/rollback workflow
    -Ensured atomic database operations
    -Refactored resource cleanup using try/except/finally

----------

API:
    -Added GET /orders/'id'
    -Implemented SQL JOIN between orders and order_items
    -Returned related order item data with order lookup
    -Tested all endpoints with Postman

----------

LEARNED:
    -Transactions should commit only after all database operations succeed
    -SQL JOINs connect related tables through foreign keys
    -Calculated pricing should come from the database, not the client
    -Distinguished between business validation errors and unexpected exceptions

----------

NEXT:
    -Improve GET /orders/'int'
    -Return cleaner JOIN results
    -Select specific columns instead of SELECT *
    -Include product information in JOIN response
    -Shipping module
    -Create shipments
    -Retrieve shipments
    -Update shipment status
    -Payment simulation
    -Notification service
    -Authentication
    -Portfolio polish
    -API documentation
    -Architecture diagram
    -Deployment

## 08/03/2026

----------
PROJECT SETUP:
    -Initial project commit
    -Configured Flask project/database connectivity
    -Installed project dependencies
    -Generated requirements.txt
    -Established initial project structure

----------
DATABASE:
    -Implemented relational database schema
    -Connected Flask to Postgres database
    -Seeded development data

----------
API:
    -Added API endpoints:
        -"/users"
        -"/products"
        -"/orders"
    -Refactored routes using Flask Blueprints

----------
NEXT - Sorted by Priority:
    -Build POST/orders
        -Create an order
        -Create order items
        -Don't worry about inventory yet here
    -Validation
        -User must exist
        -Product must exist
    -Inventory
        -Checks inventory quantity
        -Reject orders with insufficient stock
        -Reduce inventory after successful order
    -Transactions
    -API Improvements
    -Final Polish
