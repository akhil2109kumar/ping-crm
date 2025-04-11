from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "fastapi_user")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "fastapi_password")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "fastapi_practice")
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")

    DATABASE_URL: str = f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

    class Config:
        case_sensitive = True

settings = Settings()
