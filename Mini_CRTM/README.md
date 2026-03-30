# Mini CRM

A full-stack Mini CRM web application with JWT authentication, customer management, follow-up tasks, dashboard metrics, and a modern responsive UI.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt

## Folder Structure

```text
Mini_CRTM/
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   |-- utils/
|   |   |-- app.js
|   |   `-- server.js
|   |-- .env.example
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- hooks/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- utils/
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- .env.example
|   |-- index.html
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   |-- vite.config.js
|   `-- package.json
`-- README.md
```

## MongoDB Schemas

### User Schema

- `name`: string, required
- `email`: string, required, unique
- `password`: string, required, hashed with bcrypt
- `createdAt`, `updatedAt`: timestamps

### Customer Schema

- `user`: ObjectId reference to `User`
- `name`: string, required
- `email`: string, required
- `phone`: string, required
- `company`: string, required
- `status`: enum `Lead | Active | Inactive`
- `notes`: string
- `createdAt`: date
- `createdAt`, `updatedAt`: timestamps

### Task Schema

- `user`: ObjectId reference to `User`
- `customer`: ObjectId reference to `Customer`
- `title`: string, required
- `description`: string
- `dueDate`: date, required
- `completed`: boolean
- `createdAt`, `updatedAt`: timestamps

## API Endpoints

### `/api/auth`

- `POST /register`
- `POST /login`
- `GET /me`

### `/api/customers`

- `GET /`
- `GET /stats`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

### `/api/tasks`

- `GET /`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

## Setup Instructions

### 1. Install everything from the project root

```bash
cd Mini_CRTM
npm install
npm run install:all
```

### 2. Create env files

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

Update `backend/.env` with your MongoDB connection string and JWT secret.

### 3. Run in development

```bash
npm run dev
```

This starts:

- Frontend on `http://localhost:5173`
- Backend on `http://localhost:5000`

The frontend proxies `/api` requests to the backend automatically during development.

### 4. Run as a single localhost link

```bash
npm run single
```

This builds the frontend and serves both frontend and backend from one Express server.

Open:

- `http://localhost:5000`

That single link will load the React app, and the API will also be available under the same host at `/api`.

### 5. Use the app

1. Register a new account.
2. Login to access the dashboard.
3. Add customers from the Customers page.
4. Create follow-up tasks from the Tasks page.
5. Review metrics and recent activity on the dashboard.

## Notes

- Passwords are hashed with bcrypt before saving.
- JWT protects customer and task routes.
- Every user only accesses their own customers and tasks.

## Deploy On Vercel

Deploy this project as two Vercel projects from the same GitHub repo.

### Frontend project

- Root Directory: `Mini_CRTM/frontend`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable:
  - `VITE_API_URL=https://your-backend-project.vercel.app/api`

### Backend project

- Root Directory: `Mini_CRTM/backend`
- Framework Preset: `Other`
- Install Command: `npm install`
- Build Command: leave empty
- Output: handled by `vercel.json`
- Environment Variables:
  - `MONGODB_URI=your_mongodb_atlas_connection_string`
  - `JWT_SECRET=your_secure_secret`
  - `CLIENT_URL=https://your-frontend-project.vercel.app`

### Important

- Use MongoDB Atlas, not a local MongoDB instance, for production.
- The backend is configured for Vercel serverless execution and reuses MongoDB connections when possible.
- After deploying the backend, copy its public URL into the frontend `VITE_API_URL` variable and redeploy the frontend.
