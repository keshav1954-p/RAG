# RAG Application Architecture

## Overview
This project is a full-stack Retrieval-Augmented Generation (RAG) web application.

## High-Level Flow
```text
React Frontend
      |
      v
FastAPI Backend
      |
      +--------------------+
      |                    |
      v                    v
PostgreSQL             RAG Pipeline
      |                    |
Users, chats,             +--> Ingestion
messages, metadata        |
                           +--> ChromaDB
                           |
                           +--> Retrieval
                           |
                           +--> LLM
                           |
                           +--> Answer + Sources
```

## Main Components
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Python, FastAPI, Pydantic, Uvicorn
- Relational database: PostgreSQL
- Vector database: ChromaDB
- RAG: document ingestion, embeddings, retrieval and generation
- LLM: configurable provider
- Development: Git/GitHub, Docker and environment variables

## Team Ownership
- M1: PostgreSQL, Docker, CI/CD, deployment and infrastructure
- M2: Backend, frontend integration and overall system integration
- M3: Ingestion, embeddings and ChromaDB
- M4: Retrieval, generation and RAG evaluation
