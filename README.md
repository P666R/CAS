# Content Approval System

A Node.js/Express backend for a content approval system where users can submit content (e.g., articles, posts), and admins can review, approve, or reject submissions. The system includes JWT-based authentication, role-based access control, and MongoDB for data persistence.

## Features

- **User Authentication**:
  - Sign up and log in with JWT (stored in HTTP-only cookies).
  - Role-based access control.
- **Content Management**:
  - Users can submit content with a title and body.
  - Admins can view all submissions, approve, or reject them with an optional rejection reason.
  - Filter content by status.
- **Security**:
  - Input validation using Zod schemas.
  - Protected routes with middleware for authentication (protect) and authorization (restrictTo).
  - Password hashing with bcrypt.
  - Mongoose schema validation using mongoose built-in validator and validator library.
- **Production-Grade Practices**:
  - TypeScript for type safety.
  - Structured error handling with custom error classes.
  - Logging with Pino (pretty-printed in development, JSON in production).
  - ESLint and Prettier for code quality.
  - Class-based dependency injection.
  - Feature based and layered architecture.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Validation**: Zod, validator
- **Environment Management**: dotenv, envalid
- **Error Handling**: serialize-error
- **Logging**: Pino
- **Dev Tools**: ESLint, Prettier, Husky, nodemon, ts-node

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/P666R/CAS.git
   cd content-approval-system
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   ```bash
   cp .env.example .env
   ```

4. **Start the Server**:

   ```bash
   npm run dev
   ```

## API Endpoints

- **POST /api/v1/auth/signup**: User sign up, Public route.
- **POST /api/v1/auth/login**: User login, Public route.
- **GET /api/v1/auth/logout**: User logout, Public route.
- **POST /api/v1/users**: create user, Protected and Admin route.
- **GET /api/v1/users/:id**: get user, Protected and Admin route.
- **GET /api/v1/content**: get all submissions with optional filters, Protected and Admin route.
- **POST /api/v1/content**: create submission, Protected and User route.
- **PATCH /api/v1/content/:id**: update a submission (approve or reject with optional rejection reason), Protected and Admin route.

## Folder Structure

```bash
- 📂 __content-approval-system__
  - 📂 __logs__
    - 📄 [app.log](logs/app.log)
  - 📂 __src__
    - 📂 __features__
      - 📂 __content__
        - 📂 __controllers__
          - 📄 [content.controller.ts](src/features/content/controllers/content.controller.ts)
        - 📂 __interfaces__
          - 📄 [content.interface.ts](src/features/content/interfaces/content.interface.ts)
        - 📂 __models__
          - 📄 [content.model.ts](src/features/content/models/content.model.ts)
        - 📂 __repositories__
          - 📄 [content.repository.ts](src/features/content/repositories/content.repository.ts)
        - 📂 __routes__
          - 📄 [content.route.ts](src/features/content/routes/content.route.ts)
        - 📂 __schemas__
          - 📄 [content.schema.ts](src/features/content/schemas/content.schema.ts)
        - 📂 __services__
          - 📄 [content.service.ts](src/features/content/services/content.service.ts)
      - 📂 __user__
        - 📂 __controllers__
          - 📄 [auth.controller.ts](src/features/user/controllers/auth.controller.ts)
          - 📄 [user.controller.ts](src/features/user/controllers/user.controller.ts)
        - 📂 __interfaces__
          - 📄 [user.interface.ts](src/features/user/interfaces/user.interface.ts)
        - 📂 __models__
          - 📄 [user.model.ts](src/features/user/models/user.model.ts)
        - 📂 __repositories__
          - 📄 [user.repository.ts](src/features/user/repositories/user.repository.ts)
        - 📂 __routes__
          - 📄 [auth.route.ts](src/features/user/routes/auth.route.ts)
          - 📄 [user.route.ts](src/features/user/routes/user.route.ts)
        - 📂 __schemas__
          - 📄 [user.schema.ts](src/features/user/schemas/user.schema.ts)
        - 📂 __services__
          - 📄 [auth.service.ts](src/features/user/services/auth.service.ts)
          - 📄 [user.service.ts](src/features/user/services/user.service.ts)
    - 📂 __global__
      - 📂 __config__
        - 📂 __db__
          - 📄 [db.config.ts](src/global/config/db/db.config.ts)
        - 📂 __env__
          - 📄 [env.config.ts](src/global/config/env/env.config.ts)
        - 📂 __mongodb__
          - 📄 [mongodb.config.ts](src/global/config/mongodb/mongodb.config.ts)
      - 📂 __errors__
        - 📄 [custom.error.ts](src/global/errors/custom.error.ts)
        - 📄 [handler.error.ts](src/global/errors/handler.error.ts)
      - 📂 __interfaces__
        - 📄 [request.interface.ts](src/global/interfaces/request.interface.ts)
      - 📂 __logging__
        - 📄 [logger.ts](src/global/logging/logger.ts)
      - 📂 __middlewares__
        - 📄 [auth.middleware.ts](src/global/middlewares/auth.middleware.ts)
        - 📄 [requestValidator.middleware.ts](src/global/middlewares/requestValidator.middleware.ts)
      - 📂 __routes__
        - 📄 [app.route.ts](src/global/routes/app.route.ts)
      - 📂 __utils__
        - 📄 [catchAsync.util.ts](src/global/utils/catchAsync.util.ts)
        - 📄 [excludeFields.util.ts](src/global/utils/excludeFields.util.ts)
    - 📄 [index.ts](src/index.ts)
    - 📄 [server.ts](src/server.ts)
    - 📄 [type.d.ts](src/type.d.ts)
  - 📄 [commitlint.config.js](commitlint.config.js)
  - 📄 [eslint.config.mjs](eslint.config.mjs)
  - 📄 [list.md](list.md)
  - 📄 [node_modules](node_modules)
  - 📄 [nodemon.json](nodemon.json)
  - 📄 [package-lock.json](package-lock.json)
  - 📄 [package.json](package.json)
  - 📄 [README.md](README.md)
  - 📄 [tsconfig.json](tsconfig.json)
```
