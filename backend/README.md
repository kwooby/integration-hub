# Integration Hub - BACKEND

A Flask-based backend API designed to simulate an integration hub connecting common business resources such as orders, payments, shipments, notifications, products, and inventory.

The project is being developed as a full-stack application, with a React frontend planned to consume the Flask API.

## Architecture

```text
React Frontend
      │
      ▼
Flask API
      │
      ▼
PostgreSQL Database
```

The backend is contained in the `backend` directory, with the frontend planned as a separate React application.

## Current Resources

The API currently supports:

* Users
* Orders
* Order Items
* Payments
* Shipments
* Notifications
* Products
* Inventory

## API Operations

Resources follow a consistent REST-style structure where applicable:

| Method | Purpose                    |
| ------ | -------------------------- |
| GET    | Retrieve resources         |
| POST   | Create resources           |
| PATCH  | Partially update resources |
| DELETE | Delete resources           |

### Products

The Products resource currently supports full CRUD functionality:

```text
GET     /products
GET     /products/<product_id>
POST    /products
PATCH   /products/<product_id>
DELETE  /products/<product_id>
```

Product SKUs are generated automatically by the backend using the PostgreSQL product ID sequence.

## Backend Structure

```text
integration-hub/
│
├── backend/
│   ├── .venv/
│   ├── app.py
│   ├── database.py
│   ├── products.py
│   ├── orders.py
│   ├── payments.py
│   ├── shipments.py
│   ├── notifications.py
│   ├── users.py
│   ├── inventory.py
│   ├── seed.sql
│   ├── requirements.txt
│
├── frontend/    
│    └── React application (planned)
│
├── .gitignore
└── README.md
```

Resource files contain their own routes and resource-specific helper functions. Database connections are handled through shared database functionality.

## Database

The application uses PostgreSQL for persistent data storage.

The database contains relationships between resources, including:

```text
Orders
  │
  ├── Order Items
  │
  ├── Payments
  │
  └── Shipments

Products
  │
  └── Inventory

Orders
  │
  └── Notifications
```

Foreign-key constraints are used to maintain relationships and prevent invalid references between resources.

## Validation & Error Handling

The API includes validation for required fields, resource existence, valid status values, invalid prices, duplicate records, and foreign-key constraints.

Common HTTP responses include:

* `200 OK` — Successful request
* `201 Created` — Resource successfully created
* `400 Bad Request` — Invalid or missing request data
* `404 Not Found` — Requested resource does not exist
* `409 Conflict` — Request conflicts with an existing resource or database constraint
* `500 Internal Server Error` — Unexpected server error

Database operations use transaction handling with rollback behavior for unexpected errors.

## Technologies

### BACKTECH

* Python
* Flask
* PostgreSQL
* psycopg2
* SQLAlchemy
* Alembic
* python-dotenv

### FRONTTECH

* React
* Vite

The React frontend will be developed separately and will consume the Flask API.

## Development Environment

The backend uses a Python virtual environment located inside the `backend` directory.

Dependencies are listed in:

```text
backend/requirements.txt
```

The frontend will maintain its own Node.js dependencies and development environment.

## Project Goals

The Integration Hub is intended to demonstrate:

* REST API development
* Flask application architecture
* PostgreSQL database design
* CRUD operations
* Database relationships and foreign keys
* API validation and error handling
* Backend/frontend integration
* React development
* Integration-focused application architecture

## Current Status

### Backend

**Feature development:** Complete

The backend resources have been implemented and standardized. Final endpoint testing and cleanup remain before beginning frontend integration.

### Frontend

**Status:** Not yet implemented

The next major phase of development is building the React frontend and connecting it to the Flask API.

## Future Development

Planned work includes:

* Complete final backend endpoint testing
* Build the React frontend
* Connect React components to the Flask API
* Display and manage API resources through the frontend
* Add integration-focused UI functionality
* Continue improving validation and error handling
* Deploy the completed application
