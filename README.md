# 👤 User CRUD Module

This branch (`feature/user-crud`) contains the complete CRUD operations
for managing users in the Task Manager API, including role management.

------------------------------------------------------------------------

## 📦 What's included?

-   Get all users (admin only)
-   Get a single user (authenticated user or admin)
-   Update user information (authenticated user or admin)
-   Delete a user (admin only)
-   Change user role (admin only)
-   Integration with authentication (`requiredAuth` middleware)
-   Role-based protection (`requiredRole('admin')`)
-   Centralized error handling

------------------------------------------------------------------------

## 🚀 API Endpoints

Base URL: `http://localhost:3000/api/v1`

All endpoints require authentication (JWT token).

  Method   Endpoint            Description           Auth required
  -------- ------------------- --------------------- ---------------
  GET      `/users`            Get all users         Admin only
  GET      `/users/:id`        Get a specific user   Authenticated
  PATCH    `/users/:id`        Update a user         Authenticated
  DELETE   `/users/:id`        Delete a user         Admin only
  PATCH    `/users/:id/role`   Change user role      Admin only

------------------------------------------------------------------------

## 📁 Project Structure

``` text
src/
├── controllers/
│   └── userController.ts
├── services/
│   └── userService.ts
├── routes/
│   └── userRoutes.ts
├── entities/
│   └── User.ts
├── middleware/
│   ├── requiredAuth.ts
│   └── requiredRole.ts
└── app.ts
```

------------------------------------------------------------------------

## 🔐 Role Management

  Role        Permissions
  ----------- ---------------------------------------------------------
  admin       Full access: view all users, change roles, delete users
  moderator   Can view users, update their own profile
  user        Can view and update their own profile

Only admin users can: - Delete other users - Change user roles - Get all
users

------------------------------------------------------------------------

## 📌 Notes

-   This branch is independent from `feature/auth` and
    `feature/task-crud`
-   It depends on authentication middleware
-   After merging to main, users will be managed securely with
    role-based access

------------------------------------------------------------------------

## 🚀 Git Commands

``` bash
git checkout feature/user-crud
touch README.md
git add README.md
git commit -m "docs(user): add README for user CRUD module"
git push origin feature/user-crud
```

Happy Coding! 🚀
