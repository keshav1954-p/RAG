from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # Application
    app_name: str = "RAG Knowledge Assistant"
    app_version: str = "1.0.0"
    debug: bool = True

    # Server
    host: str = "127.0.0.1"
    port: int = 8000

    # Gemini / LLM
    gemini_api_key: str

    # Authentication
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # File storage
    upload_dir: str = "../data/pdfs"

    # Vector database
    chroma_db_path: str = "../data/chroma_db"

    # AI models
    embedding_model: str = "all-MiniLM-L6-v2"
    llm_model: str = "gemini-2.5-flash"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )


settings = Settings()