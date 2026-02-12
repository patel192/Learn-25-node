# Expense Manager — Backend
![Backend CI](https://github.com/patel192/Learn-25-node/actions/workflows/ci.yml/badge.svg)

A backend REST API for an **Expense Management application**.  
This server handles expense data storage, retrieval, and basic operations, and is designed to work with a frontend client.

The backend is built using **Node.js and Express**, with a database for persistent storage.

---

## 🧭 Overview

The **Expense Manager Backend** provides APIs to:

- Create new expense records
- Retrieve stored expenses
- Manage expense-related data
- Serve as the data layer for a frontend expense tracker

It follows a simple and clear backend structure suitable for learning, extension, and real-world usage.

---

## 🛠️ Tech Stack

- **Node.js** — JavaScript runtime  
- **Express.js** — Web framework for building APIs  
- **MongoDB** — Database for storing expense data  
- **Mongoose** — ODM for MongoDB  
- **dotenv** — Environment variable management  
- **CORS** — Cross-origin request handling  

---

## 📁 Project Structure

```plaintext
├─ app.js                   — Express app configuration
├─ server.js                — Production server entry point
├─ src/
│  ├─ routes/               — API route definitions
│  ├─ Controllers/          — Request handling logic
│  ├─ models/               — Database schemas
│  ├─ middleware/           — Auth & role middleware
│
├─ tests/                   — API test suites
│  ├─ setup.js              — Test database connection setup
│
├─ jest.config.js           — Jest configuration
├─ package.json             — Project metadata and scripts
└─ .env                     — Environment variables (not committed)

```
🚀 Getting Started
Follow these steps to run the backend locally.

### 1. Clone the repository
```bash
git clone https://github.com/patel192/Learn-25-node.git
cd Learn-25-node
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a .env file in the root directory and add:

env
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the server
```bash
npm start
```
or (if using nodemon):

```bash
npm run dev
```
The server will start on:

arduino
```bash
http://localhost:5000
```

## 🔗 API Endpoints (Example)

> Endpoint names may vary based on implementation.

| Method | Endpoint              | Description            |
|------|------------------------|------------------------|
| GET  | /api/expenses          | Fetch all expenses     |
| POST | /api/expenses          | Add a new expense      |
| PUT  | /api/expenses/:id      | Update an expense      |
| DELETE | /api/expenses/:id    | Delete an expense      |

All endpoints accept and return **JSON**.

---

## 🔐 Environment Variables

| Variable          | Description                           |
|------------------|---------------------------------------|
| PORT             | Server port                           |
| MONGO_URI        | Production MongoDB connection string  |
| MONGO_URI_TEST   | Test MongoDB connection string        |
| JWT_SECRET       | Secret key for JWT authentication      |


---

## 🌐 Frontend Integration

This backend is designed to work with a frontend application built using **React / Vite**.  
The frontend communicates with the backend using **HTTP requests** (`fetch` or `axios`).

### Ensure the following:
- Correct API base URL is configured in the frontend
- CORS is enabled on the backend

---

## 🧪 Automated Testing

This backend uses:

- **Jest** — Test runner  
- **Supertest** — HTTP endpoint testing  
- **MongoDB Test Database** — Isolated test environment  

### Run tests
```bash
npm test
```
Run tests with coverage
```bash
npm run test:coverage
```

Coverage reports will be generated inside:
```bash
/coverage
```

Open in browser:
```bash
coverage/lcov-report/index.html
```

Test Architecture
app.js exports the Express app (no server listening).
server.js starts the production server.
tests/setup.js connects to the test database before tests and closes it afterward.

Tests run in isolated test database to prevent production data corruption.
---

## 💡 Possible Enhancements

Future improvements may include:

- User authentication (JWT)
- Expense categories and analytics
- Input validation
- Pagination and filtering
- Role-based access
- Improved logging and error handling

---

## 📌 Purpose of This Project

This project was built to:

- Practice backend development with Node.js
- Understand REST API design principles
- Work with databases and data models
- Connect backend services with a frontend UI

---

## 📞 Contact

For questions or collaboration:

- **GitHub:** https://github.com/patel192  
- **LinkedIn:** https://www.linkedin.com/in/patel-muhammad-658952355/
- **Email:** patelmuhammad192@gmail.com

---

## ⚙️ Continuous Integration (CI)

This repository uses **GitHub Actions** for automated testing.

On every push or pull request:

1. Dependencies are installed
2. Tests are executed
3. Build fails if any test fails

CI workflow file:
.github/workflows/ci.yml

This ensures code quality and prevents broken deployments.
⭐ This backend is part of a **full stack Expense Manager application**.

