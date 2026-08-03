# DEVELOPER NOTES FOR INTEGRATION HUB API

*TURN DEBUG OFF BEFORE DEPLOYING

----------

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
