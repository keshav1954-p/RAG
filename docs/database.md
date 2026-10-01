# PostgreSQL Database

## Purpose
PostgreSQL stores relational application data. It is separate from ChromaDB.

## PostgreSQL Responsibilities
Typical data includes:
- Users
- Authentication-related records
- Documents and document metadata
- Conversations
- Messages
- Timestamps
- Processing status

## Example Relationships
```text
User
 |
 +----< Document
 |
 +----< Conversation
             |
             +----< Message
```

## Technology
- PostgreSQL
- SQLAlchemy
- Alembic for migrations, if used

## Database Access
The FastAPI backend communicates with PostgreSQL through the database layer.

```text
FastAPI
   |
   v
SQLAlchemy
   |
   v
PostgreSQL
```

## Security
- Never commit database passwords.
- Keep `DATABASE_URL` in `.env`.
- Use a separate production database configuration.
- Apply migrations through Alembic if migrations are enabled.

## PostgreSQL vs ChromaDB
PostgreSQL answers:
> What application data belongs to this user?

ChromaDB answers:
> Which document chunks are semantically relevant to this query?
