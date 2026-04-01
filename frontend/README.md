# NGO Frontend (React + Vite)

Phase 2 now wires the Volunteer and Contact forms to the Express API while keeping a clean React router shell.

## Commands

```bash
cd frontend
npm install
cp .env.example .env        # add API base URL
npm run dev                 # http://localhost:5173
npm run build               # production bundle
```

## Structure

```
src/
├── components/            # Navbar, Footer, shared UI atoms
├── pages/                 # Home/About/Works/Volunteer/Contact screens
├── services/api.js        # Axios instance ready for backend integration
├── App.jsx                # Router + layout shell
└── main.jsx               # React entry point
```

## Environment Variables

- Copy `.env.example` → `.env`
- `VITE_API_BASE_URL` defaults to `http://localhost:5000/api`
- Start the backend (`npm run dev` inside `../backend`) before testing forms.
- Restart `npm run dev` after editing.

## Next Steps

- Add dashboards or toast notifications for admin workflows.
- Layer in a design system (Tailwind, Chakra, etc.) if you need reusable primitives.
