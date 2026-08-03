# Integration Hub

Integration Hub is a backend portfolio project built with Flask and PostgreSQL that simulates how enterprise systems communicate through a REST API.

The project focuses on backend architecture, relational database design, and business workflows such as order processing and inventory management.

## Tech Stack

* Python
* Flask
* PostgreSQL
* psycopg2
* Render

## Current Features

* PostgreSQL database integration
* Relational database schema
* Flask Blueprints
* REST API endpoints:

  * `GET /users`
  * `GET /products`
  * `GET /orders`

## Planned Features

* Create and update orders
* Inventory management
* Shipping workflow
* Payment processing
* Notification system

## Running the Project

```bash
pip install -r requirements.txt
flask run
```

Create a `.env` file containing:

```env
DATABASE_URL=your_database_url
```
