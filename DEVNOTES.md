# DEVELOPER NOTES FOR INTEGRATION HUB API

*TURN DEBUG OFF BEFORE DEPLOYING

----------

## 08/06/2026

----------

COMPLETED:
-PATCH /SHIPMENTS:
    -Implemented `PATCH /shipments/<shipment_id>`
    -Added support for partial shipment updates using `PATCH`
    -Added validation for valid shipment statuses
    -Added validation to prevent empty carrier, tracking number, and status fields

-/PAYMENTS:
    -Created the `payments` database table
    -Implemented `GET /payments`
    -Implemented `GET /payments/<payment_id>`
    -Implemented `POST /payments`
    -Implemented `PATCH /payments/<payment_id>`
    -Added validation to ensure an order exists before creating a payment
    -Prevented duplicate payments for the same order
    -Added validation for allowed payment statuses
    -Added validation to ensure payment amounts are greater than zero
    -Added business validation to ensure payment amounts match the associated order total
    -Added validation to prevent empty transaction IDs
    -Established a foreign key relationship between `paymentsorder_id` and `ordersid`
    -Tested successful payment creation, duplicate payment validation, invalid payment statuses, invalid payment amounts, and empty transaction IDs

ISSUES ENCOUNTERED:
    -Worked through designing partial updates using `dataget()` while preserving existing field values
    -Refactored repeated shipment lookup logic into reusable helper functions to simplify route handlers
    -Adjusted validation order to check resource existence before performing additional business validations

NEXT:
    -Implement the remaining `PATCH` endpoints for the API
    -Add consistent validation across all resources where applicable
    -Test all endpoints end-to-end to verify resource relationships and business rules
    -Begin polishing the API for portfolio presentation and documentation

## 08/05/2026

----------

COMPLETED:
    -Created the `shipments` database table
    -Implemented `GET /shipments`
    -Implemented `GET /shipments/<shipment_id>`
    -Implemented `POST /shipments`
    -Added validation to ensure an order exists before creating a shipment
    -Prevented duplicate shipments for the same order
    -Established a foreign key relationship between `shipmentsorder_id` and `ordersid`
    -Tested successful shipment creation, duplicate shipment validation, and invalid order validation

ISSUES ENCOUNTERED:
    -pgAdmin Query Tool was connected to the wrong database, preventing the `shipments` table from being created
    -Initial shipment tests failed because deleted order IDs were assumed to still exist
    -Attempting to reuse the `get_order` route highlighted the difference between HTTP route handlers and reusable database lookup logic

NEXT:
    -Implement `PATCH /shipments/<shipment_id>/status`
    -Update shipment status lifecycle (pending → shipped → delivered)
    -Begin simulating shipment updates from an external integration

----------

## 08/04/2026

----------

ORDERS:
    -Completed POST /orders endpoint
    -Implemented order creation workflow
    -Created associated order_items records
    -Implemented server-side price retrieval
    -Calculated order totals on the server

VALIDATION:
    -Validated user existence before order creation
    -Validated product existence before order creation
    -Validated inventory record existence
    -Prevented orders with insufficient inventory

INVENTORY:
    -Updated inventory after successful order creation
    -Separated inventory validation from product validation
    -Prevented inventory updates when validation fails

DATABASE:
    -Implemented transaction handling
    -Added commit/rollback workflow
    -Ensured atomic database operations
    -Refactored resource cleanup using try/except/finally

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
    -Generated requirementstxt
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
