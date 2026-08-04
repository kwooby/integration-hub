# Integration Hub

Integration Hub is a backend portfolio project that simulates how enterprise systems coordinate orders, inventory, payments, shipping, and notifications through a centralized API.

Rather than each service operating independently, the Integration Hub acts as the orchestration layer that validates requests, coordinates business logic, updates shared data, and records the results of each operation.

The goal of this project is to demonstrate backend software engineering concepts commonly used in production systems, including REST APIs, relational database design, transactions, SQL joins, and business workflow automation.

---

## Features

### Orders

* Create new orders
* Retrieve all orders
* Retrieve individual orders by ID
* Associate orders with order items
* Calculate order totals on the server

### Inventory

* Validate available inventory before creating an order
* Prevent purchases when stock is insufficient
* Automatically reduce inventory after successful orders

### Data Validation

* Validate users before order creation
* Validate products before order creation
* Validate inventory records before processing

### Database

* PostgreSQL relational database
* Foreign key relationships
* SQL JOIN queries
* Transaction management using commit and rollback

### API

* RESTful endpoints
* JSON request and response handling
* Consistent HTTP status codes
* Error handling with try/except/finally

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
   ├── Payments (In Progress)
   ├── Shipping (In Progress)
   └── Notifications (Planned)

---

## Database Concepts Demonstrated

* Relational database design
* Primary and foreign keys
* One-to-many relationships
* SQL joins
* Transactions
* Server-side business logic
* Data validation

---

## Project Goals

This project is being built to simulate the responsibilities of an enterprise integration platform. Rather than focusing on a single CRUD application, Integration Hub demonstrates how multiple business domains interact while maintaining data integrity and consistent workflows.

Current development focuses on:

* Order processing
* Inventory management
* Payment simulation
* Shipping workflows
* Notification services

Future versions will continue expanding these integrations while improving authentication, testing, documentation, and overall architecture.

---

## Status

🚧 Active Development

This project is actively being expanded to simulate real-world backend integrations while following clean architecture and REST API design principles.
