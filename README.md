# Integration Hub

Integration Hub is a backend portfolio project that simulates how enterprise systems coordinate orders, inventory, payments, shipping, users, and notifications through a centralized API.

Rather than each service operating independently, the Integration Hub acts as the orchestration layer that validates requests, coordinates business logic, updates shared data, and records the results of each operation.

The goal of this project is to demonstrate backend software engineering concepts commonly used in production systems, including REST APIs, relational database design, transactions, SQL joins, data validation, and business workflow automation.

---

## Features

### Users

* Create new users
* Retrieve all users
* Retrieve individual users by ID
* Update user information using PATCH
* Validate required user fields
* Prevent duplicate email addresses
* Preserve existing user information during partial updates

### Orders

* Create new orders
* Retrieve all orders
* Retrieve individual orders by ID
* Associate orders with order items
* Calculate order totals on the server
* Update order status using PATCH

### Inventory

* Validate available inventory before creating an order
* Prevent purchases when stock is insufficient
* Automatically reduce inventory after successful orders

### Data Validation

* Validate users before order creation
* Validate products before order creation
* Validate inventory records before processing
* Validate that orders exist before shipments, payments, or notifications are created
* Prevent duplicate shipments
* Prevent duplicate payments
* Prevent duplicate email addresses for users
* Validate payment amounts against the associated order total
* Validate shipment, payment, and notification statuses
* Validate notification types
* Validate notification timestamps based on notification status
* Inventory is checked before creating an order

### Database

* PostgreSQL relational database
* Foreign key relationships
* Unique constraints
* SQL JOIN queries
* Transaction management using commit and rollback
* Server-generated IDs
* Server-side timestamps where appropriate

### Shipping Module

* Create shipments linked to existing orders
* Retrieve all shipments
* Retrieve individual shipments by ID
* Prevent duplicate shipments for the same order
* Validate that an order exists before creating a shipment
* Store carrier, tracking number, shipment status, and shipping timestamps
* Update shipment information using PATCH

### Payments Module

* Create payments linked to existing orders
* Retrieve all payments
* Retrieve individual payments by ID
* Update payment information using PATCH
* Prevent duplicate payments for the same order
* Validate that an order exists before creating a payment
* Validate payment statuses
* Ensure payment amounts match the associated order total
* Store payment status, transaction ID, and amount

### Notifications Module

* Create notifications linked to existing orders
* Retrieve all notifications
* Retrieve individual notifications by ID
* Update notification status using PATCH
* Validate notification statuses
* Validate notification types
* Track when notifications are sent using `sent_at`
* Require `sent_at` when a notification status is `Sent`
* Keep `sent_at` empty while notifications remain `Pending`
* Support multiple notifications for the same order

### API

* RESTful endpoints
* JSON request and response handling
* Consistent HTTP status codes
* Partial updates using PATCH
* Error handling with try/except/finally
* Resource-specific database helper functions
* Postman endpoint testing

---

## Technology Stack

* Python
* Flask
* PostgreSQL
* psycopg2
* Git
* GitHub
* Postman

---

## Current Architecture

Client
│
▼
Flask API (Integration Hub)
│
├── Users
├── Products
├── Inventory
├── Orders
├── Order Items
├── Payments
├── Shipments
└── Notifications

---

## Database Concepts Demonstrated

* Relational database design
* Primary and foreign keys
* Unique constraints
* One-to-many relationships
* SQL joins
* Transactions
* Server-side business logic
* Data validation
* Database-generated IDs
* Partial record updates
* Referential integrity

---

## Project Goals

This project is being built to simulate the responsibilities of an enterprise integration platform. Rather than focusing on a single CRUD application, Integration Hub demonstrates how multiple business domains interact while maintaining data integrity and consistent workflows.

Current development focuses on:

* User management
* Order processing
* Inventory management
* Payment simulation
* Shipping workflows
* Notification services
* API validation and error handling

Future versions will continue expanding these integrations while improving authentication, testing, documentation, and overall architecture.

---

## Status

🚧 Active Development

This project is actively being expanded to simulate real-world backend integrations while following clean architecture and REST API design principles.
