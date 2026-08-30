# Backend API Store - from KOPLING to CVT

RESTful Backend API untuk aplikasi Store yang dibangun menggunakan **Node.js + Express.js + PostgreSQL**.

Project ini dibuat sebagai backend service yang menyediakan:

- User Management
- Authentication menggunakan JWT
- Role Authorization (`user` / `admin`)
- Category Management
- Product Management
- PostgreSQL Database
- Repository Pattern
- Controller & Route Separation
- Environment Configuration

---

## 1. Tech Stack

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | JavaScript Runtime              |
| Express.js | Backend Web Framework           |
| PostgreSQL | Relational Database             |
| pg         | PostgreSQL Client untuk Node.js |
| JWT        | Authentication                  |
| bcrypt     | Password Hashing                |
| dotenv     | Environment Configuration       |
| ESLint     | Code Quality                    |
| Prettier   | Code Formatting                 |

---

# 2. Project Architecture

Project menggunakan pemisahan layer agar lebih mudah dikembangkan dan di-maintain.

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
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── repositories/
│   │   ├── category.repository.js
│   │   ├── product.repository.js
│   │   └── user.repository.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── scripts/
│   │   └── hashPassword.js
│   │
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── package-lock.json
├── package.json
└── README.md
```

### Architecture Flow

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
Repository
   │
   ▼
PostgreSQL
```

Contoh request:

```text
POST /api/auth/login
        │
        ▼
authRoutes.js
        │
        ▼
authController.js
        │
        ▼
user.repository.js
        │
        ▼
PostgreSQL
```

---

# 3. Prerequisites

Sebelum menjalankan project, pastikan sudah menginstall:

## Node.js

Recommended menggunakan Node.js LTS.

Check:

```bash
node --version
```

Contoh:

```text
v22.x.x
```

Check npm:

```bash
npm --version
```

---

# 4. PostgreSQL

Project menggunakan PostgreSQL sebagai database.

Pastikan PostgreSQL sudah terinstall dan service PostgreSQL sedang berjalan.

Tools yang dapat digunakan untuk mengelola database:

- pgAdmin
- DBeaver
- PostgreSQL CLI

---

# 5. Clone Repository

Clone repository:

```bash
git clone <REPOSITORY_URL>
```

Masuk ke folder project:

```bash
cd backend-api-store
```

Contoh:

```bash
cd D:\backend-api-store
```

---

# 6. Install Dependencies

Setelah clone repository, install semua dependency:

```bash
npm install
```

Jangan menjalankan:

```bash
npm install prisma @prisma/client
```

Project ini **tidak menggunakan Prisma**.

Database connection menggunakan PostgreSQL driver (`pg`) secara langsung.

---

# 7. Environment Configuration

Project membutuhkan environment variable untuk konfigurasi database dan JWT.

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

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1h
```

> Jangan commit `.env` ke Git.

---

# 8. `.env.example`

Repository harus menyediakan:

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
JWT_EXPIRES_IN=1h
```

Team member cukup membuat:

```text
.env
```

berdasarkan `.env.example`.

---

# 9. Database Setup

Buat database PostgreSQL.

Contoh database:

```text
backend_api
```

Menggunakan pgAdmin:

```text
Servers
└── PostgreSQL
    └── Databases
        └── backend_api
```

Atau menggunakan SQL:

```sql
CREATE DATABASE backend_api;
```

---

# 10. Database Tables

Project menggunakan beberapa table utama:

```text
users
categories
products
```

Relasi:

```text
categories
     │
     │ 1
     │
     │
     │ N
   products
```

Sedangkan:

```text
users
```

digunakan untuk authentication dan authorization.

---

# 11. Users Table

Contoh struktur:

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

Contoh:

```text
id | name  | email              | role
---|-------|--------------------|------
1  | John  | john@mail.com      | user
2  | Admin | admin@mail.com     | admin
```

---

# 12. Categories Table

Contoh struktur:

```text
categories
├── id
├── name
├── description
├── created_at
└── updated_at
```

---

# 13. Products Table

Contoh struktur:

```text
products
├── id
├── name
├── description
├── price
├── stock
├── category_id
├── created_at
└── updated_at
```

`category_id` merupakan foreign key menuju:

```text
categories.id
```

---

# 14. Database Connection

Database connection terdapat di:

```text
src/config/database.js
```

Connection menggunakan PostgreSQL driver.

Contoh konfigurasi:

```javascript
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;
```

---

# 15. Test Database Connection

Saat server dijalankan, aplikasi akan melakukan pengecekan database connection.

Jika berhasil:

```text
Database connected successfully
Database time: ...
Server running on http://localhost:3000
```

Jika gagal:

```text
Database connection failed
```

Periksa:

- PostgreSQL service
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD

---

# 16. Run Application

Development mode:

```bash
npm run dev
```

Application akan berjalan di:

```text
http://localhost:3000
```

Health check:

```http
GET http://localhost:3000/
```

Response:

```json
{
  "success": true,
  "message": "Backend API Store is running"
}
```

---

# 17. Available NPM Scripts

## Development

```bash
npm run dev
```

Menjalankan server menggunakan Node.js watch mode.

---

## Start

```bash
npm start
```

Menjalankan server secara normal.

---

## ESLint

```bash
npm run lint
```

Digunakan untuk melakukan pengecekan kualitas kode.

---

## Prettier

Format seluruh project:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

---

# 18. Authentication

Authentication menggunakan:

```text
JWT - JSON Web Token
```

Flow login:

```text
Client
  │
  │ POST /api/auth/login
  ▼
Auth Controller
  │
  ▼
User Repository
  │
  ▼
PostgreSQL
  │
  ▼
Validate Password
  │
  ▼
Generate JWT
  │
  ▼
Return Token
```

---

# 19. Login API

Endpoint:

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "admin@mail.com",
  "password": "Password123"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

---

# 20. Using JWT Token

Setelah login berhasil, copy token.

Gunakan token pada endpoint yang membutuhkan authentication.

Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

Contoh:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

# 21. JWT Middleware

Endpoint yang membutuhkan authentication akan melewati:

```text
authMiddleware.js
```

Flow:

```text
Request
   │
   ▼
Authorization Header
   │
   ▼
Extract JWT
   │
   ▼
Verify JWT
   │
   ├── Invalid → 401 Unauthorized
   │
   ▼
Valid Token
   │
   ▼
Controller
```

---

# 22. Role Authorization

Project memiliki dua role:

```text
user
admin
```

Role authorization digunakan untuk membatasi endpoint tertentu.

Contoh:

```text
User
 │
 ├── GET categories       ✅
 ├── GET products         ✅
 ├── POST category        ❌
 ├── PUT category         ❌
 └── DELETE category      ❌

Admin
 │
 ├── GET categories       ✅
 ├── POST category        ✅
 ├── PUT category         ✅
 └── DELETE category      ✅
```

---

# 23. Category API

Base URL:

```text
/api/categories
```

## Get All Categories

```http
GET /api/categories
```

Contoh:

```bash
GET http://localhost:3000/api/categories
```

---

## Get Category By ID

```http
GET /api/categories/:id
```

Contoh:

```bash
GET http://localhost:3000/api/categories/1
```

---

## Create Category

```http
POST /api/categories
```

Request:

```json
{
  "name": "Electronics",
  "description": "Electronic products"
}
```

---

## Update Category

```http
PUT /api/categories/:id
```

Contoh:

```http
PUT /api/categories/1
```

Request:

```json
{
  "name": "Electronic Devices",
  "description": "Electronic products and devices"
}
```

---

## Delete Category

```http
DELETE /api/categories/:id
```

Contoh:

```http
DELETE /api/categories/1
```

---

# 24. Product API

Base URL:

```text
/api/products
```

## Get All Products

```http
GET /api/products
```

---

## Get Product By ID

```http
GET /api/products/:id
```

Contoh:

```http
GET /api/products/1
```

---

## Create Product

```http
POST /api/products
```

Contoh request:

```json
{
  "name": "Mechanical Keyboard",
  "description": "RGB Mechanical Keyboard",
  "price": 750000,
  "stock": 20,
  "category_id": 1
}
```

---

## Update Product

```http
PUT /api/products/:id
```

Contoh:

```http
PUT /api/products/1
```

---

## Delete Product

```http
DELETE /api/products/:id
```

Contoh:

```http
DELETE /api/products/1
```

---

# 25. User API

Base URL:

```text
/api/users
```

## Get Users

```http
GET /api/users
```

---

## Get User By ID

```http
GET /api/users/:id
```

---

## Create User

```http
POST /api/users
```

Contoh:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "user"
}
```

Password akan disimpan dalam bentuk **hashed password**, bukan plain text.

---

## Update User

```http
PUT /api/users/:id
```

---

## Delete User

```http
DELETE /api/users/:id
```

---

# 26. API Authorization Matrix

| Endpoint                     | Authentication | User | Admin |
| ---------------------------- | -------------: | ---: | ----: |
| POST `/api/auth/login`       |             ❌ |   ✅ |    ✅ |
| GET `/api/categories`        |             ✅ |   ✅ |    ✅ |
| GET `/api/categories/:id`    |             ✅ |   ✅ |    ✅ |
| POST `/api/categories`       |             ✅ |   ❌ |    ✅ |
| PUT `/api/categories/:id`    |             ✅ |   ❌ |    ✅ |
| DELETE `/api/categories/:id` |             ✅ |   ❌ |    ✅ |
| GET `/api/products`          |             ✅ |   ✅ |    ✅ |
| GET `/api/products/:id`      |             ✅ |   ✅ |    ✅ |
| POST `/api/products`         |             ✅ |   ❌ |    ✅ |
| PUT `/api/products/:id`      |             ✅ |   ❌ |    ✅ |
| DELETE `/api/products/:id`   |             ✅ |   ❌ |    ✅ |

> Sesuaikan tabel ini apabila authorization pada implementasi endpoint berbeda.

---

# 27. Manual Testing

API dapat dites menggunakan:

- Postman
- Insomnia
- Bruno
- curl
- Browser untuk GET endpoint sederhana

Recommended:

```text
Postman
```

---

# 28. Recommended Testing Flow

Untuk testing manual, jalankan berdasarkan urutan berikut.

### Step 1 — Health Check

```http
GET /
```

Expected:

```json
{
  "success": true,
  "message": "Backend API Store is running"
}
```

---

### Step 2 — Login

```http
POST /api/auth/login
```

Simpan JWT token.

---

### Step 3 — Get Categories

```http
GET /api/categories
```

Gunakan:

```http
Authorization: Bearer <TOKEN>
```

---

### Step 4 — Get Category

```http
GET /api/categories/1
```

---

### Step 5 — Create Category

Login sebagai admin.

Kemudian:

```http
POST /api/categories
```

---

### Step 6 — Update Category

```http
PUT /api/categories/1
```

---

### Step 7 — Delete Category

```http
DELETE /api/categories/1
```

---

### Step 8 — Product CRUD

Lakukan:

```text
GET
GET by ID
POST
PUT
DELETE
```

---

# 29. HTTP Status Code

API menggunakan HTTP status code sesuai kondisi request.

| Status | Meaning                  |
| -----: | ------------------------ |
|    200 | Request berhasil         |
|    201 | Resource berhasil dibuat |
|    400 | Bad Request              |
|    401 | Unauthorized             |
|    403 | Forbidden                |
|    404 | Resource tidak ditemukan |
|    409 | Conflict                 |
|    500 | Internal Server Error    |

---

# 30. Error Response

Format error response:

```json
{
  "success": false,
  "message": "Category not found"
}
```

Untuk error tertentu dapat mengandung:

```json
{
  "success": false,
  "message": "Failed to fetch category",
  "error": "Error detail"
}
```

---

# 31. Git Workflow

Setelah clone repository:

```bash
git checkout -b feature/nama-feature
```

Contoh:

```bash
git checkout -b feature/product-api
```

Setelah selesai:

```bash
git status
```

Kemudian:

```bash
git add .
```

Commit:

```bash
git commit -m "feat: add product CRUD API"
```

Push:

```bash
git push origin feature/product-api
```

Kemudian buat Pull Request ke branch utama.

---

# 32. Important Git Rules

Jangan commit:

```text
.env
node_modules/
```

Pastikan `.gitignore` memiliki:

```gitignore
node_modules/
.env
.env.*
!.env.example
coverage/
logs/
*.log
```

---

# 33. Team Setup

Setiap developer memiliki environment database sendiri.

Contoh:

```text
Developer A
     │
     ▼
PostgreSQL
backend_api

Developer B
     │
     ▼
PostgreSQL
backend_api

Developer C
     │
     ▼
PostgreSQL
backend_api
```

Masing-masing developer wajib membuat `.env` sendiri.

Jangan membagikan:

```text
DB_PASSWORD
JWT_SECRET
```

melalui Git repository.

---

# 34. Troubleshooting

## Problem: Cannot connect to PostgreSQL

Error:

```text
ECONNREFUSED
```

Check:

```text
PostgreSQL service
```

Kemudian check `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=backend_api
DB_USER=postgres
DB_PASSWORD=your_password
```

---

## Problem: Cannot find module

Contoh:

```text
ERR_MODULE_NOT_FOUND
```

Jalankan:

```bash
npm install
```

Pastikan nama file dan import path benar.

Contoh:

```javascript
import categoryRepository from '../repositories/category.repository.js';
```

Perhatikan ekstensi:

```text
.js
```

Karena project menggunakan:

```json
"type": "module"
```

---

## Problem: Port already in use

Jika port `3000` digunakan aplikasi lain:

```env
PORT=3001
```

Kemudian:

```bash
npm run dev
```

---

# 35. Development Guidelines

Sebelum melakukan commit:

```bash
npm run lint
```

Kemudian:

```bash
npm run format:check
```

Jika formatting bermasalah:

```bash
npm run format
```

Kemudian ulangi:

```bash
npm run lint
npm run format:check
```

---

# 36. Development Flow

Recommended development flow:

```text
1. Clone repository
       ↓
2. npm install
       ↓
3. Setup PostgreSQL
       ↓
4. Create database
       ↓
5. Create .env
       ↓
6. Configure database
       ↓
7. Run npm run dev
       ↓
8. Test GET /
       ↓
9. Test Login
       ↓
10. Test JWT
       ↓
11. Test CRUD
       ↓
12. npm run lint
       ↓
13. npm run format:check
       ↓
14. Commit
       ↓
15. Push branch
       ↓
16. Pull Request
```

---

# 37. Quick Start

Untuk developer yang sudah familiar dengan project:

```bash
git clone <REPOSITORY_URL>

cd backend-api-store

npm install
```

Buat:

```text
.env
```

Isi:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=backend_api
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1h
```

Pastikan PostgreSQL aktif dan database sudah tersedia.

Kemudian:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Expected:

```json
{
  "success": true,
  "message": "Backend API Store is running"
}
```

---

# 38. Project Status

Current development phases:

```text
Phase 1
├── Node.js Project Setup
├── Express.js
├── PostgreSQL
└── Environment Configuration

Phase 2
├── PostgreSQL Connection
├── Database Repository
├── Category CRUD
└── Product CRUD

Phase 3
├── Authentication
├── Password Hashing
├── JWT Login
├── JWT Middleware
└── Role Authorization

Phase 4
└── API Development / Extension
```

---

# 39. Future Improvements

Planned improvements:

- [ ] Input Validation
- [ ] Centralized Error Handler
- [ ] Pagination
- [ ] Search & Filtering
- [ ] API Documentation dengan Swagger/OpenAPI
- [ ] Unit Testing
- [ ] Integration Testing
- [ ] API Automation Testing
- [ ] Jest
- [ ] SuperTest
- [ ] Faker.js
- [ ] API Test Report
- [ ] Docker
- [ ] CI/CD dengan GitHub Actions
- [ ] Database Migration
- [ ] Refresh Token
- [ ] Rate Limiting
- [ ] Request Logging
- [ ] Security Hardening

---

# 40. Author

Backend API Store

Built with:

```text
Node.js
Express.js
PostgreSQL
JWT
JavaScript
```
