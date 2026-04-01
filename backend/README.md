# NGO Website Backend (Phase 1)

Phase 1 of the NGO website backend uses Node.js, Express, and MongoDB to capture volunteer registrations and contact form submissions. This README assumes you are inside the `backend/` directory at the repository root.

## Tech Stack
- Node.js + Express for the HTTP API
- MongoDB Atlas + Mongoose for data persistence
- CORS and JSON middleware enabled by default

## Project Structure
```
config/          # Database connection helper
controllers/     # Route handlers / business logic
models/          # Mongoose schemas for collections
routes/          # Express routers grouped by feature
server.js        # Application entry point
.env.example     # Sample environment variables
```

## Getting Started
1. Install Node.js 18+ from [nodejs.org](https://nodejs.org/).
2. Clone or download this repository, then install dependencies from the `backend/` folder:
   ```bash
   cd backend
   npm install
   ```
3. Copy the sample environment file inside `backend/` and add your own values:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with a valid `MONGO_URI` (see MongoDB Atlas steps below) and optionally change `PORT`.
5. Start the API in development mode with live reload (still inside `backend/`):
   ```bash
   npm run dev
   ```
   or run once without nodemon:
   ```bash
   npm start
   ```
6. Visit `http://localhost:5000/` to verify you get `API Running`.

## MongoDB Atlas Setup
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas/database) and create a free account.
2. Create a new project and click **Build a Database** → choose the free Shared tier.
3. Select a cloud provider/region, then set a username and password for your database user.
4. Under **Network Access**, add `0.0.0.0/0` while developing so your local machine can connect.
5. Click **Connect** → **Drivers** and copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/ngo?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with the credentials you created and choose a database name (e.g., `ngo`).

## Environment Variables
Create a file named `.env` inside the `backend/` directory:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/ngo
ADMIN_TOKEN=super-secret-admin-token
```
- `ADMIN_TOKEN` secures the admin-only GET/DELETE endpoints. Share it only with trusted dashboards.
- Never commit `.env` to version control and restart the server after changing values.

## API Endpoints
| Method | Route                | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | `/`                 | Health check (`API Running`)   |
| POST   | `/api/volunteers`   | Register a new volunteer       |
| GET    | `/api/volunteers`   | List submitted volunteers (admin token required) |
| DELETE | `/api/volunteers/:id` | Remove a volunteer entry (admin) |
| POST   | `/api/contacts`     | Submit a contact form message  |
| GET    | `/api/contacts`     | List contact form submissions (admin) |
| DELETE | `/api/contacts/:id` | Remove a contact entry (admin) |

Each POST route expects JSON bodies that match the fields in their respective models. Attach the `x-admin-token` header (value = `ADMIN_TOKEN`) when hitting protected routes.

## Next Steps
- Add validation and rate limiting for public forms.
- Wire analytics/logging pipelines and move secrets to a managed vault before production.
