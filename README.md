# Finance Data Processing & Access Control Backend

## Overview

This project is a backend system designed for a finance dashboard where users can manage financial records based on their roles. It focuses on clean API design, proper data handling, and role-based access control.

The system allows users to create, view, and analyze financial data such as income and expenses, while enforcing permissions depending on user roles.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Joi Validation

---

## Features

### 1. Authentication & Authorization

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Role-based access control (RBAC)

### 2. User Roles

| Role    | Permissions                                       |
| ------- | ------------------------------------------------- |
| Viewer  | View dashboard data only                          |
| Analyst | View financial records and dashboard              |
| Admin   | Full access (create, update, delete, manage data) |

---

### 3. Financial Records Management

* Create, update, delete financial records
* Filter by type and category
* Pagination support
* Ownership validation (users can only modify their own records)

---

### 4. Dashboard APIs

* Total income
* Total expenses
* Net balance
* Monthly trends (income vs expense)
* Category-wise summary

---

### 5. Validation & Error Handling

* Joi-based request validation
* Consistent API response format
* Proper HTTP status codes
* Error handling using try-catch blocks

---

## API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

---

### Records

* `POST /api/records` (Admin)
* `GET /api/records` (Admin, Analyst)
* `PATCH /api/records/:id` (Admin)
* `DELETE /api/records/:id` (Admin)

Query Params:

* `type` → income / expense
* `category`
* `page`, `limit`

---

### Dashboard

* `GET /api/dashboard`
* `GET /api/dashboard/monthly`
* `GET /api/dashboard/categories`

---

## Postman - [Postman Link](https://avinashh-26-7448418.postman.co/workspace/Avinash-Personal~0526759a-9338-43b6-82a3-f1386fc0b1c4/collection/48447502-1bec6233-4d40-4502-8d2b-a4b82fc3c194?action=share&creator=48447502)

## API Response Format

### Success

```json
{
  "success": true,
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Avinash-Alapati/finance-backend.git
cd finance-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

---

## Design Decisions

* Used MongoDB for flexible schema and easy aggregation queries
* Implemented middleware-based RBAC for clean access control
* Used aggregation pipelines for dashboard analytics instead of manual calculations
* Separated controllers, routes, and middleware for maintainability

---

## Assumptions

* Each record belongs to a single user
* Admin users manage financial data
* No multi-tenant system implemented
* Authentication is token-based (no sessions)

---

## Possible Improvements

* Add user management APIs (update role/status)
* Add search functionality
* Add rate limiting and security enhancements
* Add unit and integration tests
* Add Swagger API documentation

---

## Conclusion

This project demonstrates backend fundamentals including API design, access control, data validation, and aggregation-based analytics. The focus was on building a clean and maintainable system rather than overengineering.

---
