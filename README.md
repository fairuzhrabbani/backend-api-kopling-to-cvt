# Backend API Store

RESTful Backend API untuk aplikasi e-commerce sederhana yang dibangun menggunakan **Node.js, Express.js, dan PostgreSQL**.

Project ini dibuat sebagai learning project sekaligus simulasi backend API untuk latihan:

- REST API Development
- PostgreSQL Database
- Authentication & Authorization
- JWT
- Role-Based Access Control
- API Testing
- Database Testing
- Test Automation
- Code Quality
- CI/CD

> **Note:** Project ini tidak menggunakan Prisma. Database interaction dilakukan menggunakan package `pg`.

---

# 📌 Project Scope

Fitur yang tersedia saat ini:

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization
- User Management
- Category Management
- Product Management
- Shopping Cart
- PostgreSQL Database
- Repository Pattern
- Service Layer
- Controller Layer
- Jest & Supertest API Testing
- ESLint
- Prettier

### Tidak termasuk

Fitur berikut **tidak digunakan dalam project saat ini**:

- Order
- Checkout
- Payment
- Order History

---

# 🛠️ Technology Stack

| Technology   | Purpose               |
| ------------ | --------------------- |
| Node.js      | JavaScript Runtime    |
| Express.js   | Backend Web Framework |
| PostgreSQL   | Relational Database   |
| pg           | PostgreSQL Driver     |
| bcrypt       | Password Hashing      |
| jsonwebtoken | JWT Authentication    |
| Jest         | Testing Framework     |
| Supertest    | API Testing           |
| ESLint       | Code Quality          |
| Prettier     | Code Formatting       |
| pgAdmin      | PostgreSQL Management |
| DBeaver      | Database Client       |

---

# 📦 Dependencies

Current dependencies:

```text
@eslint/js
bcrypt
bcryptjs
dotenv
eslint
express
jest
jsonwebtoken
pg
prettier
supertest
```

Project menggunakan **ES Modules**.

Contoh:

```javascript
import express from 'express';
```

bukan:

```javascript
const express = require('express');
```

---

# 📁 Project Structure

```text
backend-api-store/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   │   └── cartController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── repositories/
│   │   ├── auth.repository.js
│   │   ├── category.repository.js
│   │   ├── product.repository.js
│   │   ├── user.repository.js
│   │   └── cart.repository.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   └── cartRoutes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── category.service.js
│   │   ├── product.service.js
│   │   └── cart.service.js
│   │
│   ├── scripts/
│   │   └── hashPassword.js
│   │
│   └── server.js
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── tests/
│   ├── auth/
│   ├── categories/
│   ├── products/
│   ├── users/
│   └── cart/
│
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── prettier.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

# 🏗️ Application Architecture

Project menggunakan layered architecture:

```text
Client
  │
  ▼
Routes
  │
  ▼
Middleware
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
Repository
  │
  ▼
PostgreSQL
```

Contoh request:

```text
POST /api/cart/items
        │
        ▼
cartRoutes.js
        │
        ▼
authenticateToken
        │
        ▼
cartController.js
        │
        ▼
cart.service.js
        │
        ▼
cart.repository.js
        │
        ▼
PostgreSQL
```

---

# 🗄️ Database

Project menggunakan **PostgreSQL**.

Database yang digunakan:

```text
backend_api
```

Database dapat dikelola menggunakan:

- pgAdmin
- DBeaver
- PostgreSQL CLI

---

# 📊 Database Schema

Saat ini terdapat beberapa table utama:

```text
categories
products
users
carts
cart_items
```

Relationship:

```text
categories
    │
    └──── products
              │
              └──── cart_items
                       │
                       └──── carts
                              │
                              └──── users
```

Secara sederhana:

```text
User
 │
 └── Cart
      │
      └── Cart Items
             │
             └── Product
                    │
                    └── Category
```

---

# 👤 Users

Struktur utama:

```text
users
├── id
├── name
├── email
├── password
├── role
├── created_at
└── updated_at
```

Role yang digunakan:

```text
user
admin
```

User yang melakukan registration akan otomatis mendapatkan:

```text
role = user
```

User tidak dapat menentukan role sendiri ketika melakukan registration.

Contoh request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

Akan menghasilkan user:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

Password tidak dikembalikan dalam response.

---

# 🔐 Authentication

Authentication menggunakan:

```text
JWT - JSON Web Token
```

Flow:

```text
Register
   │
   ▼
Hash Password
   │
   ▼
Save User
   │
   ▼
Login
   │
   ▼
Validate Password
   │
   ▼
Generate JWT
   │
   ▼
Client
```

Token digunakan untuk mengakses endpoint yang membutuhkan authentication.

Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 🔑 JWT Secret

JWT menggunakan environment variable:

```env
JWT_SECRET=backend-api-store-super-secret-key
```

`JWT_SECRET` digunakan untuk:

- Sign JWT
- Verify JWT
- Memastikan token tidak dimanipulasi

Contoh payload JWT:

```javascript
{
  id: user.id,
  email: user.email,
  role: user.role
}
```

> Jangan commit `.env` ke repository.

---

# 📝 Registration API

Endpoint:

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

Expected response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

Role otomatis:

```text
user
```

---

# 🔐 Login API

Endpoint:

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

Token digunakan untuk endpoint yang membutuhkan authentication.

Contoh:

```http
Authorization: Bearer JWT_TOKEN
```

---

# 🛡️ Role Authorization

Project memiliki dua role:

```text
user
admin
```

Authentication:

```text
JWT
 ↓
authenticateToken
 ↓
req.user
```

Authorization:

```text
req.user.role
 ↓
roleMiddleware
 ↓
Allow / Reject
```

Contoh:

```text
User
 ├── Login
 ├── View Product
 ├── View Category
 └── Manage Own Cart

Admin
 ├── Manage Users
 ├── Manage Products
 ├── Manage Categories
 └── Manage Cart
```

Endpoint tertentu membutuhkan role:

```text
ADMIN
```

---

# 👥 User API

Endpoint:

```text
GET    /api/users
GET    /api/users/:id
DELETE /api/users/:id
```

Endpoint management user tertentu membutuhkan:

```text
Authentication
+
Admin Authorization
```

Contoh:

```http
GET /api/users
Authorization: Bearer <ADMIN_TOKEN>
```

---

# 📂 Category API

Available endpoints:

```text
GET    /api/categories
GET    /api/categories/:id
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
```

Contoh:

```http
GET http://localhost:3000/api/categories
```

Response:

```json
{
  "success": true,
  "data": []
}
```

---

# 📦 Product API

Available endpoints:

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Product memiliki relationship dengan category:

```text
products.category_id
        │
        ▼
categories.id
```

Contoh product:

```json
{
  "name": "Mechanical Keyboard",
  "description": "Gaming keyboard",
  "price": 750000,
  "stock": 20,
  "category_id": 1
}
```

---

# 🛒 Cart API

Cart digunakan untuk menyimpan product yang dipilih oleh user.

Available endpoints:

```text
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:id
DELETE /api/cart/items/:id
DELETE /api/cart
```

Semua endpoint Cart membutuhkan authentication.

---

## Get Cart

```http
GET /api/cart
Authorization: Bearer <USER_TOKEN>
```

---

## Add Product to Cart

```http
POST /api/cart/items
Authorization: Bearer <USER_TOKEN>
Content-Type: application/json
```

Request:

```json
{
  "productId": 1,
  "quantity": 2
}
```

User ID tidak dikirim dari request body.

User ID diperoleh dari JWT:

```text
JWT
 ↓
authenticateToken
 ↓
req.user.id
 ↓
Cart
```

Hal ini mencegah user memasukkan cart milik user lain.

---

## Update Cart Item

```http
PUT /api/cart/items/:id
Authorization: Bearer <USER_TOKEN>
```

Request:

```json
{
  "quantity": 3
}
```

---

## Remove Cart Item

```http
DELETE /api/cart/items/:id
Authorization: Bearer <USER_TOKEN>
```

---

## Clear Cart

```http
DELETE /api/cart
Authorization: Bearer <USER_TOKEN>
```

---

# 🔄 Cart Flow

```text
Register
   │
   ▼
Login
   │
   ▼
JWT Token
   │
   ▼
Get Products
   │
   ▼
Add Product to Cart
   │
   ▼
View Cart
   │
   ├── Update Quantity
   │
   ├── Remove Item
   │
   └── Clear Cart
```

---

# 🌱 Database Seed

Project menyediakan:

```text
database/schema.sql
database/seed.sql
```

## schema.sql

Digunakan untuk membuat struktur database:

```text
categories
products
users
carts
cart_items
```

## seed.sql

Digunakan untuk memasukkan initial/test data.

Contoh:

```text
Categories
Products
Users
```

Seed data membantu seluruh anggota team menggunakan database dengan kondisi awal yang konsisten.

---

# ⚙️ Prerequisites

Sebelum menjalankan project, install:

### Node.js

Recommended:

```text
Node.js 20+
```

Check:

```bash
node --version
```

```bash
npm --version
```

### PostgreSQL

Check:

```bash
psql --version
```

### Git

Check:

```bash
git --version
```

---

# 🚀 Installation

Clone repository:

```bash
git clone <REPOSITORY_URL>
```

Masuk ke project:

```bash
cd backend-api-store
```

Install dependencies:

```bash
npm install
```

> `npm install` akan membaca `package.json` dan menginstall seluruh dependency yang dibutuhkan. Tidak perlu menjalankan `npm install pg bcrypt jsonwebtoken` secara manual jika repository sudah memiliki `package.json` dan `package-lock.json`.

---

# 🔧 Environment Setup

Buat file:

```text
.env
```

Contoh:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=backend_api
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=backend-api-store-super-secret-key
```

Sesuaikan:

```text
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
```

dengan konfigurasi PostgreSQL masing-masing developer.

---

# 🗄️ Database Setup

## Step 1 — Create Database

Buka pgAdmin atau DBeaver.

Create database:

```text
backend_api
```

---

## Step 2 — Create Tables

Jalankan:

```text
database/schema.sql
```

Script akan membuat:

```text
categories
products
users
carts
cart_items
```

---

## Step 3 — Insert Seed Data

Jalankan:

```text
database/seed.sql
```

Setelah selesai, database siap digunakan.

---

# ▶️ Running Application

Development:

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

Health check:

```http
GET http://localhost:3000/
```

Expected:

```json
{
  "success": true,
  "message": "Backend API Store is running"
}
```

---

# 📜 NPM Scripts

Contoh script yang digunakan:

```bash
npm run dev
```

Development server menggunakan Node.js watch mode.

Lint:

```bash
npm run lint
```

Format:

```bash
npm run format
```

Check format:

```bash
npm run format:check
```

Testing:

```bash
npx jest
```

atau:

```bash
npx jest --runInBand
```

---

# 🧪 API Testing

Project menggunakan:

```text
Jest
+
Supertest
```

Struktur testing:

```text
tests/
│
├── auth/
│   ├── register.test.js
│   └── login.test.js
│
├── categories/
│   └── category.test.js
│
├── products/
│   └── product.test.js
│
├── users/
│   └── user.test.js
│
└── cart/
    └── cart.test.js
```

Testing mencakup:

- Positive Test
- Negative Test
- Validation
- Authentication
- Authorization
- CRUD
- Database-related behavior

---

# 🧪 Recommended Manual Testing Flow

Urutan testing manual yang direkomendasikan:

```text
1. Health Check
       ↓
2. Register User
       ↓
3. Login User
       ↓
4. Get User
       ↓
5. Get Categories
       ↓
6. Get Products
       ↓
7. Add Product to Cart
       ↓
8. Get Cart
       ↓
9. Update Cart Item
       ↓
10. Remove Cart Item
       ↓
11. Clear Cart
```

Admin testing:

```text
1. Login Admin
       ↓
2. Get Users
       ↓
3. Delete User
       ↓
4. Manage Categories
       ↓
5. Manage Products
```

---

# 📊 HTTP Status Codes

API menggunakan HTTP status code sesuai kondisi request.

| Status | Meaning                        |
| -----: | ------------------------------ |
|    200 | Request berhasil               |
|    201 | Resource berhasil dibuat       |
|    400 | Bad Request / Validation Error |
|    401 | Unauthorized / Token Invalid   |
|    403 | Forbidden / Permission Denied  |
|    404 | Resource Not Found             |
|    409 | Conflict                       |
|    500 | Internal Server Error          |

Contoh:

```json
{
  "success": false,
  "message": "Category not found"
}
```

---

# 🔒 Security

Jangan commit:

```text
.env
```

ke Git.

Gunakan:

```text
.env.example
```

Contoh:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=backend_api
DB_USER=postgres
DB_PASSWORD=

JWT_SECRET=
```

Password user harus disimpan menggunakan hashing:

```text
bcrypt
```

Bukan plaintext.

Jangan menyimpan:

- Database password
- JWT secret production
- Access token
- API secret
- Credential

di repository.

---

# 🌳 Git Workflow

Recommended workflow:

```text
main
 │
 ├── feature/authentication
 ├── feature/user
 ├── feature/category
 ├── feature/product
 └── feature/cart
```

Membuat branch:

```bash
git checkout -b feature/cart
```

Check perubahan:

```bash
git status
```

Add:

```bash
git add .
```

Commit:

```bash
git commit -m "feat: implement cart API"
```

Push:

```bash
git push origin feature/cart
```

Kemudian buat Pull Request ke:

```text
main
```

---

# 👨‍💻 Team Setup

Team member cukup melakukan:

```bash
git clone <REPOSITORY_URL>
```

```bash
cd backend-api-store
```

```bash
npm install
```

Kemudian:

```text
1. Install PostgreSQL
2. Create database backend_api
3. Run schema.sql
4. Run seed.sql
5. Create .env
6. Configure PostgreSQL credentials
7. Run npm run dev
```

Test:

```http
GET http://localhost:3000/
```

Jika mendapatkan:

```json
{
  "success": true,
  "message": "Backend API Store is running"
}
```

berarti backend berhasil dijalankan.

---

# 🧭 API Summary

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## Users

```text
GET    /api/users
GET    /api/users/:id
DELETE /api/users/:id
```

## Categories

```text
GET    /api/categories
GET    /api/categories/:id
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
```

## Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Cart

```text
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:id
DELETE /api/cart/items/:id
DELETE /api/cart
```

---

# 🎯 Project Learning Goals

Project ini digunakan untuk mempraktikkan:

## Backend

- Node.js
- Express.js
- REST API
- PostgreSQL
- `pg`
- Repository Pattern
- Service Layer
- Controller Layer
- Middleware

## Authentication

- Registration
- Login
- bcrypt
- JWT
- Authentication Middleware
- Role Authorization

## E-Commerce

```text
User
 ↓
Authentication
 ↓
Category
 ↓
Product
 ↓
Cart
```

## QA & Automation

- API Testing
- CRUD Testing
- Authentication Testing
- Authorization Testing
- Negative Testing
- Validation Testing
- Database Validation
- Jest
- Supertest
- ESLint
- Prettier

---

# 🚧 Future Improvements

Fitur yang dapat dikembangkan di masa depan:

- Request Validation menggunakan Joi / Zod
- Pagination
- Product Search
- Product Filtering
- Product Sorting
- Centralized Error Handler
- API Logging
- Swagger / OpenAPI
- Jest Coverage
- Database Transaction
- Database Indexing
- Docker
- Docker Compose
- GitHub Actions
- CI/CD Pipeline
- API Automation Reporting
- Allure Report

---

# 📄 License

This project is intended for learning, development, and API automation testing purposes.
