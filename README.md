# Task Manager with Role-Based Access Control (RBAC)

A simple full-stack task manager built with a React (Vite) frontend and a Node.js/Express backend using SQLite. The application supports user registration and authentication (JWT), role-based permissions (user and admin), and basic task CRUD operations.

---

## Features

- **Authentication:** register and log in with JWT; passwords are hashed with `bcrypt`; roles supported: `user` and `admin`.
- **Tasks:** users can create, read, update, and delete their own tasks. Admins can view and manage all tasks and view the list of users.
- **Task fields:** `title` (required), `description`, `status` (`pending`, `in-progress`, `completed`), `createdBy`, `createdAt`.

---

## Project Structure

Root layout:

```
backend/
	controllers/
	middleware/
	models/
	routes/
	server.js
frontend/
	src/
		components/
		context/
		pages/
		services/
		App.jsx
		main.jsx
	package.json
README.md
```

---

## Installation

1. Clone the repository and open the project directory:

```bash
git clone YOUR_REPO_URL
cd task-manager-rbac-with-env
```

2. Set up the backend and frontend separately (instructions below).

---

## Backend (Node.js + Express + SQLite)

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file in the `backend` folder with the following values (adjust as needed):

```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_FILE=./database.sqlite
```

3. Start the backend server (use the script defined in `backend/package.json`):

```bash
npm run dev
```

The backend API will be available at `http://localhost:5000` by default.

---

## Frontend (React + Vite)

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create a `.env` file in the `frontend` folder with the API URL:

```
VITE_API_URL=http://localhost:5000/api
```

3. Start the frontend dev server:

```bash
npm run dev
```

The frontend dev server typically runs at `http://localhost:5173`.

---

## API Endpoints (Overview)

Base URL: `http://localhost:5000/api`

Auth:
- `POST /api/register` — create a new user
- `POST /api/login` — authenticate and receive a JWT

Tasks (protected):
- `GET /api/tasks` — users: own tasks; admins: all tasks
- `POST /api/tasks` — create a new task
- `GET /api/tasks/:id` — get a single task
- `PUT /api/tasks/:id` — update a task (only owner or admin)
- `DELETE /api/tasks/:id` — delete a task (only owner or admin)

Admin:
- `GET /api/users` — (admin only) list all users

Refer to the code in `backend/routes` and `backend/controllers` for detailed behavior and request/response shapes.

---

## Deployment Notes

- Backend: host on a platform that supports Node.js (Render, Heroku, DigitalOcean App Platform, etc.). Ensure the `DATABASE_FILE` path and environment variables are configured in the host.
- Frontend: deploy to Vercel, Netlify, or any static host. Set `VITE_API_URL` to your production backend URL.

---

## Contributing

If you want to contribute, open an issue or submit a pull request. Suggested improvements: better validation, tests, and production-ready DB setup (e.g., migrate to PostgreSQL).

---

## License

This project does not include a specific license file. Add a `LICENSE` if you wish to specify terms for reuse.
