# RAG Pipeline

## Purpose
RAG combines retrieval from the project's document knowledge base with LLM generation.

## Complete Flow
```text
Document Upload
      |
      v
Document Ingestion
      |
      v
Text Extraction
      |
      v
Chunking
      |
      v
Embeddings
      |
      v
ChromaDB
      |
      |
User Question
      |
      v
Query Embedding
      |
      v
Similarity Retrieval
      |
      v
Relevant Chunks
      |
      v
Prompt + Context
      |
      v
LLM
      |
      v
Answer + Sources
```

## Ingestion Side
Owned primarily by M3:
- Load documents
- Extract text
- Clean text
- Split into chunks
- Generate embeddings
- Store vectors and metadata in ChromaDB

## Retrieval and Generation Side
Owned primarily by M4:
- Convert the query to an embedding
- Search ChromaDB
- Select relevant chunks
- Construct context
- Build the LLM prompt
- Generate an answer
- Return source information

## Backend Integration
M2 connects the RAG pipeline to FastAPI endpoints.

## Data Stores
### PostgreSQL
Stores application/relational information.

### ChromaDB
Stores embeddings, chunks and retrieval metadata.

## Initial Version
Start with:
1. Basic chunking
2. Embedding generation
3. ChromaDB similarity search
4. Top-K retrieval
5. Context-based LLM generation
6. Source metadata

Advanced features such as reranking, hybrid search and query rewriting can be added later.
