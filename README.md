# NGO Website Workspace

Phase 1 delivers a working MERN foundation for the NGO platform. The backend handles data capture while the frontend provides navigable UI scaffolding and ready-made forms.

```
.
├── backend/      # Express + MongoDB API
└── frontend/     # React + Vite single-page app
```

## Backend Quick Start
1. `cd backend`
2. `npm install`
3. `cp .env.example .env` (Windows PowerShell: `Copy-Item .env.example .env`)
4. Add your MongoDB Atlas URI to `.env`
5. `npm run dev` (nodemon) or `npm start`

Key routes:
- `GET /` → health check (`API Running`)
- `POST /api/volunteers` → create volunteer record
- `POST /api/contacts` → create contact submission

## Frontend Quick Start
1. `cd frontend`
2. `npm install`
3. `cp .env.example .env` and set `VITE_API_BASE_URL=http://localhost:5000/api`
4. `npm run dev` to launch Vite on port 5173

> The volunteer and contact forms now POST to the backend, so keep `npm run dev` running inside `backend/` while you work on the UI.

Included pages + routes:
- `/` Home hero + stats
- `/about` Mission pillars
- `/works` Project highlights
- `/volunteer` Volunteer form (client-only for now)
- `/contact` Contact form (client-only for now)

## Best Practices Adopted Here
- Isolate environment variables per app (`backend/.env`, `frontend/.env`).
- Keep shared contracts (models, API schemas) documented before wiring Axios calls.
- Use feature folders (`config`, `controllers`, `routes`, `models`) so future modules drop in cleanly.
- Centralize HTTP concerns via `frontend/src/services/api.js` so Phase 2 only swaps in actual endpoints.

## Next Steps
- Wire the volunteer/contact forms to the backend using Axios.
- Add authentication/role-based dashboards.
- Introduce shared ESLint/Prettier configs at the repo root if desired.
