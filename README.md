# Integration Hub

A full-stack integration and order management application designed to simulate how multiple business systems can communicate through a centralized API.

Integration Hub provides a Flask REST API backed by PostgreSQL, with a React frontend currently being developed to provide a user-friendly interface for interacting with the system.

## Current Status

**Active Development**

The backend API and PostgreSQL database are substantially implemented, including CRUD operations and validation across the primary resources.

The React frontend is currently under development. The initial application structure, Dashboard, navigation, and responsive layout are being built before connecting the frontend to the existing API.

## Tech-Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* ESLint

### Backend

* Python
* Flask
* Flask Blueprints
* PostgreSQL
* psycopg2

### Development-Testing

* VS Code
* Postman
* pgAdmin
* Git / GitHub

## Architecture

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │                     │
                    │  Dashboard          │
                    │  Navbar             │
                    │  Sidebar            │
                    │  Application Pages  │
                    └──────────┬──────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌─────────────────────┐
                    │     Flask API       │
                    │                     │
                    │ Users               │
                    │ Orders              │
                    │ Products            │
                    │ Inventory           │
                    │ Payments            │
                    │ Shipments           │
                    │ Notifications       │
                    └──────────┬──────────┘
                               │
                               │ SQL
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │                     │
                    │ Application Data    │
                    └─────────────────────┘
```

## Project Structure

The project is organized into separate frontend and backend applications.

```text
Integration-Hub/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MainContent.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── ...
│   └── ...
│
├── .gitignore
└── README.md
```

> The frontend structure is actively evolving as additional pages and routing are introduced.

## Backend

The backend acts as the central integration layer for the application.

### API Resources

| Resource      | Supported Operations                |
| ------------- | ----------------------------------- |
| Users         | GET, GET by ID, POST, PATCH         |
| Orders        | GET, GET by ID, POST, PATCH         |
| Products      | GET, GET by ID, POST, PATCH, DELETE |
| Inventory     | API development                     |
| Payments      | GET, GET by ID, POST                |
| Shipments     | GET, GET by ID, POST, PATCH         |
| Notifications | GET, GET by ID, POST, PATCH         |

The API includes validation and error handling to prevent invalid or inconsistent data from entering the system.

Examples include:

* Required field validation
* Duplicate record prevention
* Foreign-key validation
* Valid status validation
* Positive payment and product amounts
* Payment amount validation against the associated order
* Shipment and notification validation
* Appropriate HTTP status codes for successful and failed requests

## Database

Integration Hub uses PostgreSQL for persistent application data.

The database models the relationships between the major business resources, including:

```text
Users
  │
  ▼
Orders
  ├── Payments
  ├── Shipments
  └── Notifications

Products
  │
  ▼
Inventory
```

PostgreSQL provides persistent storage for the application's users, orders, products, inventory, payments, shipments, and notifications.

## Frontend

The React frontend is being developed as the user-facing application for Integration Hub.

The initial component architecture is:

```text
App
│
├── Navbar
│
├── Sidebar
│
└── MainContent
    │
    └── Dashboard
```

### Dashboard

The Dashboard is currently the primary frontend page.

It includes planned overview sections for:

* Orders
* Payments
* Shipments
* Notifications

The Dashboard also contains:

* Recent orders table
* Recent notifications table
* Overview information
* Navigation through the application shell
* Dashboard statistic cards

The current focus is on establishing a clean, responsive layout and consistent visual design before connecting the Dashboard to live API data.

## Frontend-Roadmap

The frontend is being developed in stages:

* [x] Initialize React application with Vite
* [x] Remove default Vite starter content
* [x] Establish global CSS foundation
* [x] Create initial component structure
* [x] Create Dashboard page
* [x] Establish Navbar, Sidebar, and MainContent structure
* [x] Begin Dashboard layout
* [x] Add Dashboard statistic cards
* [x] Add initial order and notification tables
* [ ] Finish Dashboard styling
* [ ] Refine responsive application layout
* [ ] Establish consistent frontend visual style
* [ ] Add application routing
* [ ] Create resource pages
* [ ] Connect React frontend to Flask API
* [ ] Replace placeholder Dashboard data with live API data
* [ ] Add loading and error states
* [ ] Perform final UI and code cleanup

## Running the Project

### BackEnd

From the project root, activate the Python virtual environment and start the Flask application.

```bash
python -m flask run
```

The backend provides the REST API consumed by the frontend.

### FrontEnd

Navigate to the frontend directory and install the required packages:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Vite will provide the local development URL for the frontend.

## Environment-Variables

Sensitive configuration such as database credentials should be stored in environment variables rather than committed to the repository.

A typical backend environment configuration includes values for:

```text
DB_HOST
DB_NAME
DB_USER
DB_PASSWORD
DB_PORT
```

The `.env` file should remain excluded from version control.

## Development-Goals

Integration Hub is being built as a portfolio project to demonstrate practical full-stack development skills, including:

* REST API design
* CRUD operations
* Database design and relationships
* Server-side validation
* Error handling
* PostgreSQL integration
* React component architecture
* Frontend application design
* API consumption
* Responsive UI development
* Git-based development workflow

The project is intentionally being developed from the backend outward so that the React application can consume a functional API rather than relying solely on mock data.

## Future-Improvements

Potential future improvements include:

* Authentication and authorization
* More advanced order workflows
* Inventory management functionality
* API status monitoring
* Improved dashboard analytics
* More detailed resource views
* Frontend form validation
* Improved loading and error states
* Automated testing
* Deployment configuration

## Project-Philosophy

**Build a realistic backend integration layer first, then build a frontend that makes the system useful and understandable to a real user.**

The goal is not simply to demonstrate individual technologies, but to demonstrate how those technologies work together as a complete application.
