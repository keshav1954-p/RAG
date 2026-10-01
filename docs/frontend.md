# Frontend Architecture

## Technology
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Zustand or React Context, depending on implementation
- React Markdown

## Main Features
- Login/authentication
- Dashboard
- Document upload
- Chat interface
- Conversation/history view
- Source panel
- Responsive design

## Typical Structure
```text
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── store/
│   └── ...
├── package.json
└── vite.config.*
```

## API Communication
The frontend communicates with FastAPI through HTTP requests.

```text
React
  |
  | Axios
  v
FastAPI
```

## Important Rules
- Do not put server-side secrets in frontend code.
- Store only public frontend configuration in frontend environment variables.
- Handle loading, error and empty states.
- Keep API calls in a dedicated service layer where practical.
- Display source metadata returned by the backend.
