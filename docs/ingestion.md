# Document Ingestion

## Purpose
The ingestion pipeline converts uploaded documents into searchable chunks and stores their embeddings in ChromaDB.

## Pipeline
```text
PDF / DOCX / TXT
      |
      v
Loader
      |
      v
Text Extraction
      |
      v
Cleaning
      |
      v
Chunking
      |
      v
Embedding
      |
      v
ChromaDB
```

## Responsibilities
Primary owner: M3.

## Supported Documents
The exact supported formats depend on the implementation. Common initial formats:
- PDF
- DOCX
- TXT

## Chunking
Chunking should:
- Preserve meaningful context.
- Use a consistent chunk size.
- Use overlap where appropriate.
- Preserve useful metadata such as filename and page number.

Example metadata:
```json
{
  "document_id": "123",
  "filename": "machine-learning.pdf",
  "page": 10,
  "chunk_id": 42
}
```

## Embeddings
Each chunk is converted into a numerical vector using the selected embedding model.

## Storage
The vector and its metadata are stored in ChromaDB.

## Quality Checks
M3 should test:
- Empty documents
- Unsupported files
- Corrupt documents
- Very large documents
- Chunk sizes
- Metadata correctness
- Duplicate documents

## Security
Uploaded files must be validated and handled safely. Do not commit user-uploaded documents to GitHub.
