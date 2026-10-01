# Backend Architecture

## Technology
- Python
- FastAPI
- Pydantic
- Uvicorn
- SQLAlchemy
- PostgreSQL
- JWT/authentication components as implemented
- python-dotenv

## Responsibilities
The backend is the integration layer between the frontend, PostgreSQL and the RAG pipeline.

## Suggested Structure
```text
backend/
├── auth/
├── config/
├── database/
├── exceptions/
├── models/
├── routes/
├── services/
├── utils/
├── main.py
├── .env.example
└── requirements.txt
```

## Request Flow
```text
Frontend
   |
   v
FastAPI Route
   |
   v
Validation
   |
   v
Service Layer
   |
   +--> PostgreSQL
   |
   +--> RAG Pipeline
   |
   v
Response
```

## Design Principles
- Routes should remain thin.
- Business logic belongs in services.
- Database access should be isolated.
- Pydantic schemas should validate external input/output.
- Authentication should be applied to protected endpoints.
- Secrets belong in environment variables.
