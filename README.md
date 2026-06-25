# 📋 Task CRUD Module

This branch (`feature/task-crud`) contains the complete CRUD (Create, Read, Update, Delete) operations for managing tasks in the Task Manager API.

---

## 📦 What's included?

* Full CRUD operations for tasks
* **Ownership validation** – each user can only access their own tasks
* Integration with authentication (`requiredAuth` middleware)
* Task status:

  * `pending`
  * `in-progress`
  * `completed`
* Task priority:

  * `low`
  * `medium`
  * `high`
* Optional `dueDate` and `description` fields
* Auto-assigned `userId` from authenticated user
* Centralized error handling for task operations

---

# 🚀 API Endpoints

Base URL:

```text
http://localhost:3000/api/v1
```

All endpoints require authentication (JWT token).

| Method | Endpoint     | Description                           | Auth Required |
| ------ | ------------ | ------------------------------------- | ------------- |
| GET    | `/tasks`     | Get all tasks of current user         | ✅             |
| GET    | `/tasks/:id` | Get specific task (ownership checked) | ✅             |
| POST   | `/tasks`     | Create a new task                     | ✅             |
| PATCH  | `/tasks/:id` | Update a task (owner only)            | ✅             |
| DELETE | `/tasks/:id` | Delete a task (owner only)            | ✅             |

---

# 📄 Request & Response Examples

## 1. Get All Tasks

### Request

```http
GET /api/v1/tasks
Authorization: Bearer <your_token>
```

### Response (200 OK)

```json
{
  "status": "success",
  "results": 2,
  "data": {
    "tasks": [
      {
        "id": 1,
        "title": "Learn TypeORM",
        "description": "Read documentation and practice",
        "status": "pending",
        "priority": "medium",
        "dueDate": null,
        "userId": 1,
        "comments": []
      },
      {
        "id": 2,
        "title": "Build Task Manager API",
        "description": "Complete the project",
        "status": "in-progress",
        "priority": "high",
        "dueDate": "2025-12-31T23:59:59.000Z",
        "userId": 1,
        "comments": []
      }
    ]
  }
}
```

---

# 2. Get Single Task

### Request

```http
GET /api/v1/tasks/1
Authorization: Bearer <your_token>
```

### Response (200 OK)

```json
{
  "status": "success",
  "data": {
    "task": {
      "id": 1,
      "title": "Learn TypeORM",
      "description": "Read documentation and practice",
      "status": "pending",
      "priority": "medium",
      "dueDate": null,
      "userId": 1,
      "comments": []
    }
  }
}
```

### Error Response (404 Not Found)

```json
{
  "status": "fail",
  "message": "Task not found"
}
```

---

# 3. Create Task

### Request

```http
POST /api/v1/tasks
Authorization: Bearer <your_token>
Content-Type: application/json
```

### Body

```json
{
  "title": "Learn TypeORM",
  "description": "Read documentation and practice",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2025-12-31T23:59:59.000Z"
}
```

### Response (201 Created)

```json
{
  "status": "success",
  "data": {
    "task": {
      "id": 3,
      "title": "Learn TypeORM",
      "description": "Read documentation and practice",
      "status": "pending",
      "priority": "medium",
      "dueDate": "2025-12-31T23:59:59.000Z",
      "userId": 1,
      "comments": []
    }
  }
}
```

---

# 4. Update Task

### Request

```http
PATCH /api/v1/tasks/1
Authorization: Bearer <your_token>
Content-Type: application/json
```

### Body

```json
{
  "status": "completed",
  "priority": "high"
}
```

### Response (200 OK)

```json
{
  "status": "success",
  "data": {
    "task": {
      "id": 1,
      "title": "Learn TypeORM",
      "description": "Read documentation and practice",
      "status": "completed",
      "priority": "high",
      "dueDate": null,
      "userId": 1,
      "comments": []
    }
  }
}
```

---

# 5. Delete Task

### Request

```http
DELETE /api/v1/tasks/1
Authorization: Bearer <your_token>
```

### Response (204 No Content)

```json
{
  "status": "success",
  "data": null
}
```

### Error Response (403 Forbidden)

```json
{
  "status": "fail",
  "message": "You do not have permission"
}
```

---

# ⚠️ Error Handling

| Status Code | Message                    | Description                                    |
| ----------- | -------------------------- | ---------------------------------------------- |
| 401         | You are not logged in      | Missing or invalid token                       |
| 403         | You do not have permission | Trying to access another user's task           |
| 404         | Task not found             | Task does not exist or belongs to another user |
| 400         | Validation error           | Invalid input data                             |

---

# 📁 Project Structure (Related Files)

```text
src/
├── controllers/
│   └── tasks.controller.ts       # Task controller
│
├── services/
│   └── tasks.service.ts          # Task business logic
│
├── routes/
│   └── tasks.routes.ts           # Task routes
│
├── entities/
│   └── Task.ts                   # Task entity (status, priority)
│
├── middleware/
│   └── requiredAuth.ts           # Authentication middleware
│
└── app.ts                        # Mount tasks routes
```

---

# 🧪 Testing with Thunder Client / Postman

## 1. Login First

```http
POST /api/v1/auth/login
```

Body:

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

Copy the returned token.

---

## 2. Create a Task

```http
POST /api/v1/tasks
```

Header:

```text
Authorization: Bearer <token>
```

Body:

```json
{
  "title": "My first task",
  "status": "pending"
}
```

---

## 3. Get All Tasks

```http
GET /api/v1/tasks
```

Header:

```text
Authorization: Bearer <token>
```

---

## 4. Update Task

```http
PATCH /api/v1/tasks/1
```

Header:

```text
Authorization: Bearer <token>
```

Body:

```json
{
  "status": "completed"
}
```

---

## 5. Delete Task

```http
DELETE /api/v1/tasks/1
```

Header:

```text
Authorization: Bearer <token>
```

---

# 🔐 Ownership Logic

Every task is automatically associated with the authenticated user.

Example:

```typescript
const userId = req.user.id;

const task = await taskService.create(
  req.body,
  userId
);
```

All queries include `userId` filtering to ensure users can only access their own tasks:

```typescript
async findAll(userId: number) {
    return await this.taskRepository.find({
        where: {
            userId
        }
    });
}
```

---

# 📌 Notes

* This branch is independent from `feature/auth`.
* It depends on the authentication module (`requiredAuth` middleware).
* After merging into `main`, tasks will be protected by JWT authentication.

---

# 🚀 Git Commands

```bash
# Switch to feature/task-crud branch
git checkout feature/task-crud

# Create README file
touch README.md

# Add file
git add README.md

# Commit
git commit -m "docs(task): add README for task CRUD module"

# Push to GitHub
git push origin feature/task-crud
```

---

Happy Coding! 🚀
