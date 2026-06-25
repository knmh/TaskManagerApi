# 🔐 Authentication & Authorization Module

This branch (`feature/auth`) contains the complete authentication and authorization system for the Task Manager API.

---

## 📦 What's included?

* User **signup** and **login** with JWT
* Password hashing with **bcryptjs**
* JWT token generation and verification
* Role-based access control (**admin**, **user**, **moderator**)
* Protected routes with `requiredAuth` and `requiredRole` middleware
* Centralized error handling for authentication

---

# 🚀 API Endpoints

Base URL:

```
http://localhost:3000/api/v1
```

---

## 1. Signup (Register new user)

### Endpoint

| Method | Endpoint       | Description               |
| ------ | -------------- | ------------------------- |
| POST   | `/auth/signup` | Create a new user account |

### Request Body

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Response (201 Created)

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

# 2. Login (Authenticate user)

### Endpoint

| Method | Endpoint      | Description                 |
| ------ | ------------- | --------------------------- |
| POST   | `/auth/login` | Login and receive JWT token |

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Response (200 OK)

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

# 🛡️ Protected Routes

To access protected routes, include the JWT token in the Authorization header:

```text
Authorization: Bearer <your_token_here>
```

---

## requiredAuth Middleware

Used for routes that require authentication (logged-in users).

Responsibilities:

* Verify JWT token
* Attach user information to request
* Reject missing or invalid tokens

Response when unauthorized:

```
401 Unauthorized
```

---

## requiredRole Middleware

Used for routes that require specific roles.

Example:

```typescript
requiredRole('admin')
```

Only users with the `admin` role can access the route.

Response when permission is denied:

```
403 Forbidden
```

---

# 📁 Project Structure (Related Files)

```
src/
├── config/
│   └── env.ts                     # JWT secret and expiresIn
│
├── middleware/
│   ├── requiredAuth.ts            # JWT verification
│   └── requiredRole.ts             # Role-based authorization
│
├── controllers/
│   └── auth.controller.ts          # Signup & login logic
│
├── services/
│   └── auth.service.ts             # Business logic for auth
│
├── routes/
│   └── auth.routes.ts              # Route definitions
│
├── types/
│   └── index.ts                    # AuthRequest type
│
└── utils/
    ├── jwt.ts                      # Generate & verify JWT
    └── bcrypt.ts                   # Hash & compare passwords
```

---

# 🧪 Testing with Thunder Client / Postman

## 1. Signup

**Method**

```
POST
```

**URL**

```
http://localhost:3000/api/v1/auth/signup
```

**Body**

```json
{
  "username": "test",
  "email": "test@example.com",
  "password": "123456"
}
```

---

## 2. Login

**Method**

```
POST
```

**URL**

```
http://localhost:3000/api/v1/auth/login
```

**Body**

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

Copy the returned token from the response.

---

## 3. Access Protected Route (Example)

**Method**

```
GET
```

**URL**

```
http://localhost:3000/api/v1/users
```

Header:

```text
Authorization: Bearer <your_token>
```

---

# ⚠️ Error Handling

| Status Code | Message                                         | Description              |
| ----------- | ----------------------------------------------- | ------------------------ |
| 400         | Please provide username, email and password     | Missing required fields  |
| 400         | Password must be at least 6 characters          | Password too short       |
| 400         | User already exists with this email or username | Duplicate entry          |
| 401         | You are not logged in                           | Missing or invalid token |
| 401         | Invalid email or password                       | Incorrect credentials    |
| 403         | You do not have permission                      | Insufficient role        |
| 404         | User not found                                  | User does not exist      |

---

# 🔐 Environment Variables

Make sure these variables exist in your `.env` file:

```env
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=7d
```

---

# 📌 Notes

* This branch is independent from `main` and `feature/task-crud`.
* It only handles authentication and authorization.
* After merging into `main`, you can use:

  * `requiredAuth`
  * `requiredRole`

  in other modules such as:

  * Tasks
  * Comments
  * Other protected resources

---

# 🚀 Git Commands

Create and push this documentation:

```bash
# Switch to feature/auth branch
git checkout feature/auth

# Create README file
touch README.auth.md

# Add file
git add README.auth.md

# Commit
git commit -m "docs: add README for authentication module"

# Push to GitHub
git push origin feature/auth
```

---

Happy Coding! 🚀
