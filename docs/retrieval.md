# Retrieval

## Purpose
Retrieval finds the document chunks most relevant to a user's question.

## Basic Flow
```text
User Question
      |
      v
Query Embedding
      |
      v
ChromaDB Similarity Search
      |
      v
Top-K Chunks
      |
      v
Context
      |
      v
LLM
```

## Primary Owner
M4.

## Initial Retrieval
The first implementation should use semantic similarity search with a configurable Top-K value.

Example:
```text
Question
  ↓
Embedding
  ↓
ChromaDB
  ↓
Top 5 relevant chunks
```

The actual value of K should be evaluated using the project's test documents.

## Metadata Filtering
Where required, retrieval can be restricted using metadata such as:
- user/document ownership
- document ID
- file type
- page
- collection

## Later Improvements
After the basic pipeline works, consider:
- MMR
- Reranking
- Query rewriting
- Hybrid keyword + vector search
- Context compression

Do not add these before measuring the basic retriever.

## Retrieval Quality
Evaluate:
- Are the relevant chunks retrieved?
- Are irrelevant chunks being returned?
- Is enough context available for the LLM?
- Are source references correct?

## Generation Boundary
M4 passes retrieved context to the generation component. The LLM should be instructed to ground its answer in the retrieved context when the application's task requires document-grounded answers.
