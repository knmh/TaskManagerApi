# Task Manager 

A REST API for managing tasks with JWT authentication, role-based access (admin, user, moderator), and admin capabilities to change user roles. Built with Express.js, TypeScript, TypeORM, and PostgreSQL.

## Features

- User signup & login with JWT (15 min token expiry)
- Authentication via `requiredAuth` middleware
- Role-based authorization via `requiredRole`
- Full CRUD for users (only admin can delete)
- Full CRUD for tasks (each user sees/edits only their own tasks)
- Admin can change roles of other users (`PATCH /api/v1/admin/users/:userId/role`)
- Centralized error handling (`AppError` + `errorHandler`)
- `catchAsync` wrapper to prevent server crashes from async errors
- Migration support using TypeORM CLI

## Tech Stack

- Node.js + Express 5
- TypeScript
- TypeORM (with PostgreSQL)
- jsonwebtoken (JWT)
- bcryptjs (password hashing)
- dotenv (environment variables)

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)

### Steps

### 1. Clone the repository:
```bash
git clone https://github.com/knmh/TaskManagerApi.git
cd TaskManagerApi
```

### 2. Install dependencies:

```bash
   npm install
```
### 3. Create a .env file based on the example below (update values to match your database settings):

```bash
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=taskmanager
   JWT_ACCESS_SECRET=your_super_secret_key_change_this
```

### 4. Run migrations to create database tables:

```bash
   npm run migrate:run
```

> Note: If your database already contains tables, you may need to drop them first or temporarily set synchronize: true in data-source.ts (development only).

### 5. Start the development server:
 ```bash
   npm run dev
```
   Server runs at http://localhost:3000. Health check: GET /health.



## PROJECT STRUCTURE

```tree
src/
├── config/          # Environment variables
├── controllers/     # Auth, User, Task, Admin controllers
├── entities/        # TypeORM models (User, Task)
├── middleware/      # requiredAuth, requiredRole, errorHandler, notFound
├── migrations/      # Migration files
├── routes/          # API route definitions
├── services/        # Business logic (UserService, AuthService, TasksService)
├── types/           # Custom types (AuthRequest)
├── utils/           # catchAsync helper
├── app.ts           # Express app setup
├── data-source.ts   # TypeORM database connection
└── server.ts        # Entry point
```

## AUTHENTICATION & AUTHORIZATION

- Most routes require Authorization: Bearer <token> header (except /auth/signup and /auth/login).
- User roles: user (default), moderator, admin.
- Use requiredRole('admin', 'moderator') to restrict access.

## TECHNICAL DOCUMENTATION

https://github.com/knmh/Task-Management-V2/blob/377dc7fd0b27b3268bd7e3ec822b94d6e20a981d/TASK%20MANAGER%20API%20-%20TECHNICAL%20DOCUMENTATION

### 1. Authentication (/auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Login, returns JWT |




### 2. Users (`/users`)

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | ✅ (any logged-in user) |
| GET | `/users/:id` | Get a single user | ✅ |
| POST | `/users` | Create a user (simple signup) | ❌ |
| PATCH | `/users/:id` | Update a user | ✅ |
| DELETE | `/users/:id` | Delete a user | ✅ (admin only) |

### 3. Tasks (`/tasks`)

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| GET | `/tasks` | Get all tasks of the current user | ✅ |
| GET | `/tasks/:id` | Get a task (ownership checked) | ✅ |
| POST | `/tasks` | Create a new task (owner = current user) | ✅ |
| PATCH | `/tasks/:id` | Update a task (owner only) | ✅ |
| DELETE | `/tasks/:id` | Delete a task (owner only) | ✅ |

   Example request body for creating a task:
   ```bash
   {
     "title": "Learn TypeORM",
     "description": "Read documentation and practice",
     "status": "PENDING",
     "priority": "HIGH",
     "dueDate": "2025-12-31T23:59:59.000Z"
   }
 ```

### 4. Admin (`/admin`)

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|---------------|
| PATCH | `/admin/users/:userId/role` | Change a user's role | ✅ + `admin` role |
## TESTING WITH THUNDER CLIENT / POSTMAN

1. Create a new user: POST /auth/signup
2. Login: POST /auth/login – copy the returned token.
3. For subsequent requests, add header: Authorization: Bearer <your_token>
4. Test endpoints for /users, /tasks, and /admin.

## MIGRATIONS 

- Generate a migration after entity changes:
```bash
  npm run migrate:generate
```
- Run pending migrations:
```bash
  npm run migrate:run
```
- Revert the last migration:
 ```bash
  npm run migrate:revert
  ```
 > Note: For migrations to work, ensure your database schema is in sync with entities (or start with an empty database). Keep synchronize: false in data-source.ts.

## FUTURE IMPROVEMENTS

- Input validation with zod
- Comment module for task comments
- Pagination & filtering for tasks
- Logging with winston
- Unit and integration tests

## LICENSE

ISC

## AUTHOR

Hediyeh Kianmehr
