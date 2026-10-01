# API Documentation

This document describes the HTTP interface between the frontend and FastAPI backend.

## Base URL
Development example:
```text
http://localhost:8000
```

## Core Endpoints

### Authentication
```text
POST /auth/register
POST /auth/login
```

Purpose:
- Create a user
- Authenticate a user
- Return authentication information

### Upload
```text
POST /upload
```

Purpose:
- Accept a supported document
- Validate the file
- Send it to the ingestion pipeline
- Store application metadata in PostgreSQL
- Store processed vectors in ChromaDB

### Chat
```text
POST /chat
```

Purpose:
- Accept a user question
- Retrieve relevant document chunks
- Generate an answer with the LLM
- Return the answer and source information

### History
```text
GET /history
```

Purpose:
- Return the authenticated user's conversation history.

## API Design Rules
- Use Pydantic request/response schemas.
- Validate uploaded files.
- Return appropriate HTTP status codes.
- Do not expose secrets.
- Keep RAG implementation details behind service interfaces.
- Document any endpoint changes in this file.

## Example Chat Response
```json
{
  "answer": "Generated answer...",
  "sources": [
    {
      "document": "example.pdf",
      "page": 3
    }
  ]
}
```

The exact response schema must match the implemented Pydantic models.
