==========================
TASK MANAGER API - TECHNICAL DOCUMENTATION 
==========================

1. Architecture Overview
----------------------------
Language: TypeScript
Framework: Express 5
ORM: TypeORM
Database: PostgreSQL

Layered Architecture:
[Route] → [Middleware] → [Controller] → [Service] → [Repository (TypeORM)] → [DB]

Layer Descriptions:
- Route: Defines HTTP method and endpoint.
- Middleware: Handles authentication (JWT), authorization (roles), and errors.
- Controller: Receives req/res, calls service, sends response.
- Service: Contains business logic (ownership checks, password hashing, token generation).
- Repository: Database interactions via TypeORM.
- DB: PostgreSQL.

2. Data Flow Example (Create a new task)
----------------------------------------------------------
1. Client sends: POST /api/v1/tasks
   Header: Authorization: Bearer <token>
   Body: { "title": "Learn TypeORM" }

2. Route (tasks.routes.ts): router.post('/', requiredAuth, tasksController.create)

3. requiredAuth middleware:
   - Extracts token from Authorization header.
   - Verifies token using authService.verifyToken().
   - Adds req.user = { id: decoded.id }.

4. tasksController.create:
   - Gets userId = req.user.id.
   - Calls taskService.create(req.body, userId).

5. tasksService.create:
   - Creates task object: taskRepository.create({ ...taskData, userId }).
   - Saves to database: taskRepository.save(task).

6. TypeORM generates and executes INSERT query.

7. Response to client: status 201 + task data.

3. Key Files and Their Responsibilities
-----------------------------------------
src/server.ts                 → Initializes database connection and starts server.
src/app.ts                    → Express setup, middleware registration, route mounting.
src/data-source.ts            → TypeORM configuration.
src/config/env.ts             → Loads environment variables from .env.
src/entities/User.ts          → User model (fields, relations).
src/entities/Task.ts          → Task model (fields, relations).
src/services/auth.service.ts  → Signup, login, token verification.
src/services/tasks.service.ts → Task CRUD with ownership checks.
src/controllers/auth.controller.ts  → Signup and login endpoints.
src/controllers/tasks.controller.ts → Task endpoints.
src/middleware/requiredAuth.ts      → JWT validation, adds req.user.
src/middleware/requiredRole.ts      → Role-based access control.
src/middleware/errorHandler.ts      → Global error handler.
src/utils/catchAsync.ts             → Wraps async controllers to prevent crashes.

4. How catchAsync Works
-------------------------
- Wraps async controller functions.
- If an error occurs, it catches it and passes it to next(error).
- Without catchAsync, async errors would crash the server.

Example:
export const getAll = catchAsync(async (req, res) => {
   const tasks = await taskService.findAll();
   res.json(tasks);
});

5. How AppError and errorHandler Work
--------------------------------------
AppError extends Error {
   constructor(message, statusCode) {
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
   }
}

errorHandler(err, req, res, next) {
   if (err instanceof AppError) {
      return res.status(err.statusCode).json({ status: err.status, message: err.message });
   }
   console.error(err);
   res.status(500).json({ status: 'error', message: 'Something went wrong!' });
}

6. Security
-------------
- Passwords are hashed with bcrypt (salt rounds = 12).
- JWT tokens expire in 15 minutes (short for better security).
- Each user can only access their own tasks (userId checked in service).
- Admin routes are protected with requiredRole('admin').
- Sensitive variables are stored in .env file.

7. Migrations (Optional)
-------------------------
If you need to change database schema, use migrations.

Commands:
   npm run migrate:generate   → Creates a migration file based on entity changes.
   npm run migrate:run        → Applies pending migrations to database.
   npm run migrate:revert     → Reverts the last migration.

8. Common Errors and Solutions
--------------------------------
Error: "JWT_ACCESS_SECRET is not defined"
   Cause: Environment variable missing.
   Solution: Add it to .env file.

Error: "Invalid or expired token"
   Cause: Token expired or invalid.
   Solution: Login again to get a new token.

Error: "No migrations are pending"
   Cause: No new migration files or already executed.
   Solution: If you changed entities, run migrate:generate first.

Error: "Cannot find module '...'"
   Cause: Package not installed.
   Solution: Run npm install.

9. Useful Scripts
------------------
npm run dev          → Run in development mode (nodemon + ts-node).
npm run build        → Compile TypeScript to dist/.
npm run start        → Run compiled version.
npm run typeorm      → Access TypeORM CLI.

10. Summary
------------
This project uses a clean, layered architecture that:
- Makes code maintainable.
- Provides high testability.
- Includes basic security (JWT, bcrypt, role-based access).
- Is easily extendable (e.g., add Comment module, validation, pagination).