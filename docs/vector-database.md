# Vector Database — ChromaDB

## Purpose
ChromaDB stores vector representations of document chunks and supports similarity search.

## Role in the System
```text
Document
   ↓
Chunk
   ↓
Embedding
   ↓
ChromaDB
   ↓
Similarity Search
```

## Owner
M3 owns ingestion and vector-store implementation. M4 consumes the vector store through the retrieval layer.

## Stored Information
A vector record generally contains:
- Embedding vector
- Chunk text/document content
- Metadata
- Collection information

Example metadata:
```json
{
  "document_id": "doc-001",
  "filename": "example.pdf",
  "page": 4,
  "chunk_id": 17
}
```

## ChromaDB vs PostgreSQL
| System | Purpose |
|---|---|
| PostgreSQL | Users, conversations, messages, document/application metadata |
| ChromaDB | Embeddings, chunks and semantic retrieval |

## Collections
Use a clear collection strategy. If data is separated by user or tenant, enforce that separation consistently in the application.

## Persistence
For local development, configure a persistent ChromaDB storage location rather than relying only on in-memory data.

## Retrieval Interface
M3 should expose a clean interface that allows M4 to:
1. Submit a query/search request.
2. Receive relevant chunks.
3. Receive the associated metadata.

This keeps ingestion/vector-store implementation separate from retrieval logic.

## Security and Data Isolation
Do not expose ChromaDB directly to the public frontend. Access should go through the backend/RAG service layer.
