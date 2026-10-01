# Project Setup

## Prerequisites
Install:
- Python 3.x
- Node.js and npm
- Git
- PostgreSQL
- Docker (recommended)
- A supported LLM API key if using a cloud LLM

## Clone
```bash
git clone <REPOSITORY_URL>
cd RAG
```

## Backend
```bash
cd backend
python -m venv venv
```

Windows PowerShell:
```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies according to the project's requirements file.

## Environment
Create `.env` from `.env.example`.

Never commit real API keys or secrets.

Typical variables may include:
```text
DATABASE_URL=
CHROMA_DB_PATH=
LLM_API_KEY=
JWT_SECRET=
```

Use the exact variable names defined by the implementation.

## Frontend
```bash
cd frontend
npm install
npm run dev
```

## Backend
Run the FastAPI application with Uvicorn according to the project's entry point, for example:
```bash
uvicorn backend.main:app --reload
```

## PostgreSQL
Create the configured database and ensure the `DATABASE_URL` points to it.

## ChromaDB
Use the configured local or deployed ChromaDB storage according to the RAG implementation.

## Development Rule
Run frontend and backend separately during development and verify API connectivity before testing the complete RAG flow.
